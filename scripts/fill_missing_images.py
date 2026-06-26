"""Ensure every product has a local image; fill gaps from existing pool."""
from __future__ import annotations

import random
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"
OUT_DIR = ROOT / "assets" / "products"
MIN_SIZE = 1000
SEED = 42


def product_ids(html: str) -> list[str]:
    block = html.split("const PRODUCTS = [", 1)[1].split("];", 1)[0]
    return re.findall(r"\{ id: '([^']+)'", block)


def pool_files() -> list[Path]:
    return sorted(
        p
        for p in OUT_DIR.glob("*.jpg")
        if not p.name.startswith("_") and p.stat().st_size >= MIN_SIZE
    )


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
    ids = product_ids(html)
    pool = pool_files()
    if not pool:
        raise SystemExit("No images in assets/products/")

    rng = random.Random(SEED)
    created = 0

    for product_id in ids:
        dest = OUT_DIR / f"{product_id}.jpg"
        if not dest.exists() or dest.stat().st_size < MIN_SIZE:
            src = rng.choice(pool)
            shutil.copy2(src, dest)
            created += 1
            print(f"filled {product_id} <- {src.name}")

    mapping = {pid: f"assets/products/{pid}.jpg" for pid in ids}
    HTML.write_text(patch_html(html, mapping), encoding="utf-8")
    print(f"\nUpdated {len(ids)} paths in index.html ({created} new images)")


if __name__ == "__main__":
    main()
