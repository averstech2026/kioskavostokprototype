"""Generate scripts/download_products.html from index.html."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"
OUT = ROOT / "scripts" / "download_products.html"

FIXES = {
    "lunch1": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
    "lunch2": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
    "water1": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
    "juice": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
    "caesar": "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=400&fit=crop",
    "cheese_plate": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
    "chicken_grill": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
    "apple": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    "banana": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    "orange": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
    "fruit_mix": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
}

html = HTML.read_text(encoding="utf-8")
products = []
for pid, url in re.findall(r"\{ id: '([^']+)'[^}]+?image: '([^']+)'", html, re.DOTALL):
    if pid in FIXES:
        url = FIXES[pid]
    products.append({"id": pid, "url": url})

products_json = json.dumps(products, ensure_ascii=False, indent=2)

OUT.write_text(
    f"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Скачать фото товаров (Unsplash)</title>
  <style>
    body {{ font-family: system-ui, sans-serif; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }}
    button {{ font-size: 1rem; padding: 0.75rem 1.25rem; cursor: pointer; }}
    #log {{ margin-top: 1rem; font-family: monospace; font-size: 0.85rem; white-space: pre-wrap; }}
    .ok {{ color: #0a0; }}
    .err {{ color: #c00; }}
  </style>
</head>
<body>
  <h1>Фото товаров с Unsplash</h1>
  <p>Unsplash открывается в браузере, но не из терминала. Эта страница скачает все {len(products)} фото в папку <code>assets/products</code>.</p>
  <ol>
    <li>Убедитесь, что VPN включён (unsplash.com открывается).</li>
    <li>Нажмите кнопку и выберите папку <code>d:\\kioskprototype\\assets\\products</code>.</li>
    <li>После загрузки выполните в терминале: <code>python scripts/apply_local_paths.py</code></li>
  </ol>
  <button id="go">Скачать все фото</button>
  <div id="log"></div>
  <script>
    const PRODUCTS = {products_json};

    const log = (msg, cls = '') => {{
      const el = document.getElementById('log');
      const line = document.createElement('div');
      line.className = cls;
      line.textContent = msg;
      el.appendChild(line);
    }};

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    document.getElementById('go').onclick = async () => {{
      const btn = document.getElementById('go');
      btn.disabled = true;
      document.getElementById('log').innerHTML = '';

      let dir;
      try {{
        dir = await window.showDirectoryPicker({{ mode: 'readwrite' }});
      }} catch (e) {{
        log('Отменено или браузер не поддерживает выбор папки. Используйте Chrome/Edge.', 'err');
        btn.disabled = false;
        return;
      }}

      let ok = 0, fail = 0;
      for (const {{ id, url }} of PRODUCTS) {{
        try {{
          const res = await fetch(url);
          if (!res.ok) throw new Error('HTTP ' + res.status);
          const blob = await res.blob();
          if (blob.size < 1000) throw new Error('файл слишком маленький');
          const fh = await dir.getFileHandle(id + '.jpg', {{ create: true }});
          const w = await fh.createWritable();
          await w.write(blob);
          await w.close();
          log('OK  ' + id + ' (' + blob.size + ' bytes)', 'ok');
          ok++;
        }} catch (e) {{
          log('FAIL ' + id + ': ' + e.message, 'err');
          fail++;
        }}
        await sleep(250);
      }}

      log('\\nГотово: ' + ok + ' ok, ' + fail + ' fail');
      if (ok > 0) {{
        log('Теперь запустите: python scripts/apply_local_paths.py');
      }}
      btn.disabled = false;
    }};
  </script>
</body>
</html>
""",
    encoding="utf-8",
)
print(f"Wrote {OUT} ({len(products)} products)")
