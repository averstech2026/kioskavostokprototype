"""Download Unsplash product photos into assets/products/.

If curl/python cannot reach images.unsplash.com (blocked without VPN), use the
browser tool instead:
  1. Open http://localhost:3456/scripts/download_products.html (VPN on)
  2. Click "Скачать все фото" and pick assets/products
  3. Run: python scripts/apply_local_paths.py
"""
from __future__ import annotations

import re
import shutil
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"
OUT_DIR = ROOT / "assets" / "products"
CACHE_DIR = OUT_DIR / "_cache"
TIMEOUT = 25
DELAY = 0.3


def parse_products(html: str) -> list[tuple[str, str]]:
    return re.findall(
        r"\{ id: '([^']+)'[^}]+?image: '(https://[^']+)'",
        html,
        re.DOTALL,
    )


def photo_key(url: str) -> str:
    match = re.search(r"photo-([a-z0-9-]+)", url)
    return match.group(1) if match else "unknown"


def download(url: str, dest: Path) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
        data = resp.read()
    if len(data) < 1000:
        raise ValueError(f"response too small ({len(data)} bytes)")
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)


def patch_html(html: str, mapping: dict[str, str]) -> str:
    for product_id, local in mapping.items():
        html = re.sub(
            rf"(id: '{re.escape(product_id)}'[^}}]+?image: ')[^']+(')",
            rf"\g<1>{local}\g<2>",
            html,
            count=1,
            flags=re.DOTALL,
        )
    return html


def main() -> None:
    html = HTML.read_text(encoding="utf-8")
    products = parse_products(html)
    if not products:
        raise SystemExit("No Unsplash URLs in index.html — restore URLs or use apply_local_paths.py")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    url_cache: dict[str, Path] = {}
    mapping: dict[str, str] = {}
    failed: list[tuple[str, str]] = []

    for product_id, url in products:
        local = f"assets/products/{product_id}.jpg"
        dest = OUT_DIR / f"{product_id}.jpg"

        try:
            key = photo_key(url)
            if url not in url_cache:
                cached = CACHE_DIR / f"{key}.jpg"
                if not cached.exists() or cached.stat().st_size < 1000:
                    print(f"Downloading {key}...", flush=True)
                    download(url, cached)
                    print(f"  cached {cached.stat().st_size} bytes", flush=True)
                    time.sleep(DELAY)
                url_cache[url] = cached

            shutil.copy2(url_cache[url], dest)
            mapping[product_id] = local
            print(f"OK  {product_id}", flush=True)
        except Exception as exc:
            failed.append((product_id, str(exc)))
            print(f"FAIL {product_id}: {exc}", flush=True)

    if mapping:
        HTML.write_text(patch_html(html, mapping), encoding="utf-8")
        print(f"\nUpdated index.html for {len(mapping)} products")

    print(f"Done: {len(mapping)} ok, {len(failed)} failed")
    if failed:
        print("\nUnsplash blocked? Use scripts/download_products.html in the browser.")
        for product_id, err in failed:
            print(f"  {product_id}: {err}")
        raise SystemExit(1)


if __name__ == "__main__":
    main()
