/**
 * Одноразовый скрипт: скачивает фото товаров с images.unsplash.com
 * и сохраняет в public/images/ для автономной работы киоска.
 *
 * Важно: unsplash.com может быть недоступен без VPN.
 * Включите VPN и запустите: node download-images.js
 * Повторить только недокачанные: node download-images.js
 * Перекачать всё заново:     node download-images.js --force
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, 'public', 'images');
const MIN_BYTES = 8_000;
const DELAY_MS = 300;
const MAX_RETRIES = 2;
const REQUEST_TIMEOUT_MS = 12_000;

const ARGS = new Set(process.argv.slice(2));
const FORCE = ARGS.has('--force');
const SKIP_CHECK = ARGS.has('--no-check');

const FILE_ALIASES = {
  lunch1: 'lunch-1.jpg',
  lunch2: 'lunch-2.jpg',
  lunch3: 'lunch-office.jpg',
  water1: 'juice-orange.jpg',
  water2: 'tea-ginger.jpg',
  omelet: 'omelette.jpg',
  porridge: 'oatmeal.jpg',
  veggie_salad: 'salad.jpg',
};

const IMG = 'w=500&h=500&fit=crop&q=85&auto=format';

/** @type {{ id: string; photo: string; label: string }[]} */
const PRODUCTS = [
  { id: 'lunch1', photo: 'photo-1546069901-ba9599a7e63c', label: 'Бизнес Ланч 1' },
  { id: 'lunch2', photo: 'photo-1504674900247-0877df9cc836', label: 'Бизнес Ланч 2' },
  { id: 'lunch3', photo: 'photo-1414235077428-338989a2e8c0', label: 'Обед офисный' },
  { id: 'lunch4', photo: 'photo-1555939594-58d7cb561ad1', label: 'Комплексный обед' },
  { id: 'lunch5', photo: 'photo-1528735602780-2552fd46c7af', label: 'Ланч лёгкий' },

  { id: 'water1', photo: 'photo-1600271886742-f049cd451bba', label: 'Витаминная вода Апельсин' },
  { id: 'water2', photo: 'photo-1556679343-c7306c1976bc', label: 'Витаминная вода Имбирь' },
  { id: 'coffee', photo: 'photo-1495474472287-4d71bcdd2085', label: 'Кофе растворимый 3в1' },
  { id: 'tea', photo: 'photo-1547592166-23ac45744acd', label: 'Чай чёрный' },
  { id: 'juice', photo: 'photo-1613478223719-2ab802f8298d', label: 'Сок яблочный' },

  { id: 'omelet', photo: 'photo-1525351484163-7529414344d8', label: 'Омлет натуральный' },
  { id: 'syrniki', photo: 'photo-1488477181941-7818cb87f5d3', label: 'Сырники творожные' },
  { id: 'cheese_sandwich', photo: 'photo-1528735602780-2552fd46c7af', label: 'Бутерброд с сыром' },
  { id: 'ham_sandwich', photo: 'photo-1553909489-fc5a8f654fc8', label: 'Сэндвич с ветчиной и сыром' },
  { id: 'porridge', photo: 'photo-1482049016688-2d3e1b311543', label: 'Каша овсяная' },
  { id: 'pancakes', photo: 'photo-1567620905732-2d1ec7ab7445', label: 'Блины с вареньем' },
  { id: 'buckwheat_porridge', photo: 'photo-1596797038530-2c107229654b', label: 'Каша гречневая' },

  { id: 'caesar', photo: 'photo-1546793665-c74683f339c1', label: 'Салат Цезарь' },
  { id: 'veggie_salad', photo: 'photo-1512621776951-a57141f2eefd', label: 'Салат овощной' },
  { id: 'vinaigrette', photo: 'photo-1540420773420-3366772f4999', label: 'Винегрет' },
  { id: 'cheese_plate', photo: 'photo-1486299243471-172cca45b730', label: 'Сырная тарелка' },
  { id: 'greek_salad', photo: 'photo-1540189549336-e6e99c3679fe', label: 'Салат греческий' },
  { id: 'chicken_salad', photo: 'photo-1607532948064-95898d09382d', label: 'Салат с курицей' },
  { id: 'coleslaw', photo: 'photo-1625937286074-0caee328e227', label: 'Салат коул-слоу' },

  { id: 'cutlet', photo: 'photo-1551782450-17144efb9c50', label: 'Котлета по-домашнему' },
  { id: 'chicken_grill', photo: 'photo-1606755962773-d324e166a853', label: 'Куриное филе гриль' },
  { id: 'goulash', photo: 'photo-1574481925229-ba9bc9b010ae', label: 'Гуляш говяжий' },
  { id: 'baked_fish', photo: 'photo-1519708227418-c8fd9a32b779', label: 'Рыба запечённая' },
  { id: 'beef_stew', photo: 'photo-1546834369-6a39be22574a', label: 'Плов с говядиной' },
  { id: 'meatballs', photo: 'photo-1529042410759-befb1204bda8', label: 'Тефтели в сметанном соусе' },
  { id: 'pork_chop', photo: 'photo-1432136632590-849e173d3f5d', label: 'Свиная отбивная' },

  { id: 'pasta', photo: 'photo-1551183053-bf91a1d81141', label: 'Макароны отварные' },
  { id: 'buckwheat', photo: 'photo-1596797038530-2c107229654b', label: 'Гречка' },
  { id: 'rice', photo: 'photo-1536304993881-ff6e9eefa2a6', label: 'Рис белый' },
  { id: 'mashed', photo: 'photo-1459411621453-7b03977f4bfc', label: 'Картофельное пюре' },
  { id: 'steamed_veg', photo: 'photo-1540420773420-3366772f4999', label: 'Овощи на пару' },

  { id: 'wheat', photo: 'photo-1509440159596-0249088772ff', label: 'Хлеб пшеничный' },
  { id: 'rye', photo: 'photo-1549931319-a545dcf3bc73', label: 'Хлеб ржаной' },
  { id: 'toast', photo: 'photo-1586444248902-2f64eddc13df', label: 'Хлеб тостовый' },
  { id: 'ciabatta', photo: 'photo-1612184212888-4f4d2285d4f8', label: 'Чиабатта с соусом песто' },
  { id: 'baguette', photo: 'photo-1586444248902-2f64eddc13df', label: 'Багет французский' },
  { id: 'bun_sweet', photo: 'photo-1555507036-ab1f4038808a', label: 'Булочка сдобная' },
  { id: 'lavash', photo: 'photo-1628840042765-356cda07504e', label: 'Лаваш армянский' },

  { id: 'croissant', photo: 'photo-1555507036-ab1f4038808a', label: 'Круассан' },
  { id: 'cinnamon', photo: 'photo-1607958200813-88489c288dfd', label: 'Булочка с корицей' },
  { id: 'pirozhok', photo: 'photo-1621303830770-0dee472a6cfe', label: 'Пирожок с капустой' },
  { id: 'apple_pastry', photo: 'photo-1535920527002-b35e967229eb', label: 'Слойка с яблоком' },
  { id: 'pretzel', photo: 'photo-1586444248902-2f64eddc13df', label: 'Плюшка с маком' },
  { id: 'donut', photo: 'photo-1551024506-0bccd828d307', label: 'Пончик с глазурью' },
  { id: 'muffin', photo: 'photo-1607958200813-88489c288dfd', label: 'Маффин шоколадный' },

  { id: 'apple', photo: 'photo-1560806887-1e4cd0b6cbd6', label: 'Яблоко' },
  { id: 'banana', photo: 'photo-1571771894821-ce9b6d11d08b', label: 'Банан' },
  { id: 'orange', photo: 'photo-1547514704-5bb1bdebb434', label: 'Апельсин' },
  { id: 'fruit_mix', photo: 'photo-1610348722811-84333ea25fc9', label: 'Фруктовый микс' },
  { id: 'pineapple', photo: 'photo-1550256659-ed2092ab8b91', label: 'Ананасы нарезка' },
  { id: 'pear', photo: 'photo-1566845853971-8e0620013c34', label: 'Груша' },
  { id: 'grapes', photo: 'photo-1537640538965-79bb298714d9', label: 'Виноград' },
  { id: 'kiwi', photo: 'photo-1585052814086-385e2e99b030', label: 'Киви' },

  { id: 'cheesecake', photo: 'photo-1533134242443-76ecedb7eb67', label: 'Чизкейк' },
  { id: 'tiramisu', photo: 'photo-1571877227204-a64ee8f2fa0a', label: 'Тирамису' },
  { id: 'chia', photo: 'photo-1488477181941-7818cb87f5d3', label: 'Десерт кокос. молоко с чиа' },
  { id: 'icecream', photo: 'photo-1563805042-7684c019e1cb', label: 'Мороженое' },
  { id: 'brownie', photo: 'photo-1606313564200-e75d5e30476e', label: 'Брауни' },
  { id: 'eclair', photo: 'photo-1587241329681-1c3d7b16325b', label: 'Эклер' },
  { id: 'honey_cake', photo: 'photo-1578985545062-69928b1d9587', label: 'Медовик' },

  { id: 'milk', photo: 'photo-1563636619-e9143da7973b', label: 'Молоко сгущённое' },
  { id: 'tomato_sauce', photo: 'photo-1472476440877-eeb3a74d0f5e', label: 'Соус томатный' },
  { id: 'cheese_sauce', photo: 'photo-1626844132502-94b0996dc6ec', label: 'Соус сырный' },
  { id: 'mayo', photo: 'photo-1472476440877-eeb3a74d0f5e', label: 'Майонез порционный' },
  { id: 'ketchup', photo: 'photo-1472476440877-eeb3a74d0f5e', label: 'Кетчуп порционный' },
  { id: 'mustard', photo: 'photo-1472476440877-eeb3a74d0f5e', label: 'Горчица порционная' },
  { id: 'pesto', photo: 'photo-1474979266404-7eaacbcd87c5', label: 'Соус песто' },

  { id: 'container', photo: 'photo-1589939705384-51851341a8da', label: 'Контейнер' },
  { id: 'cutlery_set', photo: 'photo-1604719312566-8912e9227c6a', label: 'Набор вилка/ложка/нож' },
  { id: 'cup', photo: 'photo-1514226219047-6fe93d490c27', label: 'Стакан одноразовый' },
  { id: 'napkins', photo: 'photo-1582738056706-13449a817be6', label: 'Салфетки' },
  { id: 'lid', photo: 'photo-1589939705384-51851341a8da', label: 'Крышка для контейнера' },
  { id: 'straw', photo: 'photo-1625776013531-aa9a1a4b4d6b', label: 'Трубочка одноразовая' },
  { id: 'food_wrap', photo: 'photo-1582738056706-13449a817be6', label: 'Плёнка пищевая' },
];

function unsplashUrl(photo) {
  return `https://images.unsplash.com/${photo}?${IMG}`;
}

function fileName(id) {
  return FILE_ALIASES[id] ?? `${id}.jpg`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidFile(filePath) {
  try {
    return fs.statSync(filePath).size >= MIN_BYTES;
  } catch {
    return false;
  }
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`таймаут ${ms / 1000} с`)), ms);
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); },
    );
  });
}

function downloadOnce(url, dest, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 8) {
      reject(new Error('слишком много редиректов'));
      return;
    }

    const client = url.startsWith('https') ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) KioskImageDownloader/2.0',
          Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
          Referer: 'https://unsplash.com/',
        },
      },
      (res) => {
        const { statusCode, headers } = res;

        if (statusCode >= 300 && statusCode < 400 && headers.location) {
          const nextUrl = new URL(headers.location, url).href;
          res.resume();
          downloadOnce(nextUrl, dest, redirectCount + 1).then(resolve).catch(reject);
          return;
        }

        if (statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${statusCode}`));
          return;
        }

        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const data = Buffer.concat(chunks);
          if (data.length < MIN_BYTES) {
            reject(new Error(`файл слишком мал (${data.length} байт)`));
            return;
          }
          fs.writeFileSync(dest, data);
          resolve(dest);
        });
        res.on('error', reject);
      },
    );

    req.on('error', reject);
    req.setTimeout(REQUEST_TIMEOUT_MS, () => {
      req.destroy(new Error('сеть не отвечает'));
    });
  });
}

async function probeUnsplash() {
  const probe = path.join(OUT_DIR, '_probe.jpg');
  try {
    await withTimeout(
      downloadOnce(unsplashUrl('photo-1546069901-ba9599a7e63c'), probe),
      REQUEST_TIMEOUT_MS,
    );
    return true;
  } catch {
    return false;
  } finally {
    if (fs.existsSync(probe)) fs.unlinkSync(probe);
  }
}

async function downloadWithRetry(url, dest, onAttempt) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    onAttempt?.(attempt);
    try {
      return await withTimeout(downloadOnce(url, dest), REQUEST_TIMEOUT_MS);
    } catch (err) {
      lastError = err;
      if (attempt < MAX_RETRIES) {
        await sleep(500);
      }
    }
  }
  throw lastError;
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    console.log(`Создана папка: ${OUT_DIR}`);
  }

  console.log(`Источник: images.unsplash.com`);
  console.log(`Папка:    ${OUT_DIR}`);
  console.log(`Товаров:  ${PRODUCTS.length}`);

  if (!SKIP_CHECK) {
    process.stdout.write('\nПроверка доступа к Unsplash... ');
    const reachable = await probeUnsplash();
    if (!reachable) {
      console.log('НЕТ');
      console.log(`
Unsplash недоступен из терминала (блокировка / VPN не работает для Node).

Скачайте через браузер:
  1. npm run dev:images
  2. Откроется http://localhost:5188/product-images.html
  3. Выберите папку public/images

Или повторите в терминале с VPN: node download-images.js --no-check
`);
      process.exit(1);
    }
    console.log('OK\n');
  } else {
    console.log('');
  }

  const photoCache = new Map();
  let ok = 0;
  let skipped = 0;
  let fail = 0;
  const failed = [];

  for (let i = 0; i < PRODUCTS.length; i++) {
    const { id, photo, label } = PRODUCTS[i];
    const file = fileName(id);
    const dest = path.join(OUT_DIR, file);
    const url = unsplashUrl(photo);
    const num = `[${i + 1}/${PRODUCTS.length}]`;

    if (!FORCE && isValidFile(dest)) {
      console.log(`${num} ${label} → ${file} ... пропуск (уже есть)`);
      skipped++;
      continue;
    }

    process.stdout.write(`${num} ${label} → ${file} ... `);

    try {
      if (photoCache.has(photo)) {
        fs.copyFileSync(photoCache.get(photo), dest);
      } else {
        await downloadWithRetry(url, dest, (attempt) => {
          if (attempt > 1) process.stdout.write(`(повтор ${attempt}) `);
        });
        photoCache.set(photo, dest);
      }
      const sizeKb = Math.round(fs.statSync(dest).size / 1024);
      console.log(`OK (${sizeKb} КБ)`);
      ok++;
    } catch (err) {
      console.log(`ОШИБКА: ${err.message}`);
      fail++;
      failed.push({ id, file, label, error: err.message });
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
    }

    if (i < PRODUCTS.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`\nГотово: ${ok} скачано, ${skipped} пропущено, ${fail} с ошибкой.`);

  if (fail > 0) {
    console.log('\nНе удалось скачать:');
    for (const item of failed) {
      console.log(`  - ${item.label} (${item.file}): ${item.error}`);
    }
    console.log('\nЕсли видите ECONNRESET — Unsplash заблокирован для терминала.');
    console.log('Используйте браузер: npm run dev:images → http://localhost:5188/product-images.html');
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('Критическая ошибка:', err);
  process.exit(1);
});
