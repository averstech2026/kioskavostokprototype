/** Путь к фото товара: Vite (dev/build) → images/…; GitHub Pages из ветки → public/images/… */
export function productImage(path) {
  if (!path || typeof window === 'undefined') return path;

  const onGhPages = window.location.hostname.endsWith('github.io');
  const rawSourceDeploy = [...document.scripts].some((s) => {
    const src = s.getAttribute('src') || '';
    return src.includes('src/main.js');
  });

  if (onGhPages && rawSourceDeploy) {
    return path.replace(/^images\//, 'public/images/');
  }

  return path;
}
