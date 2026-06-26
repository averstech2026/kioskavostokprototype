import fs from 'fs';

const head = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>IFCM TECH — Киоск самообслуживания</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: '#1E1B4B',
            'navy-dark': '#1A1F4C',
            kiosk: '#F3F4F6',
            'kiosk-red': '#E11D48',
            'pay-red': '#FF0000',
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
          },
        },
      },
    };
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="preload" as="image" href="assets/logo.png" />
  <link rel="preload" as="image" href="assets/card.png" />
</head>
`;

const body = fs.readFileSync('src/_extracted-body.html', 'utf8');
const tail = `
  <script type="module" src="/src/main.js"></script>
</html>
`;

fs.writeFileSync('index.html', head + body + tail);
console.log('index.html written');
