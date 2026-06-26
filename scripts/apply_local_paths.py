"""Set all product image paths in index.html to assets/products/{id}.jpg."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"


def main() -> None:
    html = HTML.read_text(encoding="utf-8")
    ids = re.findall(r"\{ id: '([^']+)'", html.split("const PRODUCTS = [", 1)[1].split("];", 1)[0])
    for product_id in ids:
        local = f"assets/products/{product_id}.jpg"
        html = re.sub(
            rf"(id: '{re.escape(product_id)}'[^}}]+?image: ')[^']+(')",
            rf"\g<1>{local}\g<2>",
            html,
            count=1,
            flags=re.DOTALL,
        )
    HTML.write_text(html, encoding="utf-8")
    print(f"Updated {len(ids)} product paths in index.html")


if __name__ == "__main__":
    main()
