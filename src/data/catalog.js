// ─── Данные каталога ───────────────────────────────────────────
const CATEGORIES = [
  { id: 'meals',     label: 'Комплексное питание', icon: 'assets/dish-3.png' },
  { id: 'drinks',    label: 'Напитки',             icon: 'assets/drink-3.png' },
  { id: 'breakfast', label: 'Завтрак',             icon: 'assets/icon-breakfast.png' },
  { id: 'salads',    label: 'Салаты и закуски',    icon: 'assets/salad-3.png' },
  { id: 'hot',       label: 'Горячие блюда',       icon: 'assets/hot-3.png' },
  { id: 'sides',     label: 'Гарниры',             icon: 'assets/garnir-3.png' },
  { id: 'bread',     label: 'Хлеб',                icon: 'assets/bread-3.png' },
  { id: 'pastry',    label: 'Выпечка',             icon: 'assets/bake-3.png' },
  { id: 'fruits',    label: 'Фрукты',              icon: 'assets/fruit-3.png' },
  { id: 'desserts',  label: 'Десерты',             icon: 'assets/dessert-3.png' },
  { id: 'toppings',  label: 'Топинги',             icon: 'assets/topping-3.png' },
  { id: 'disposable',label: 'Одноразовая посуда',  icon: 'assets/disp-3.png' },
];

const PRODUCTS = [
  // Комплексное питание
  { id: 'lunch1', category: 'meals', name: 'Бизнес Ланч 1', price: 370,
    image: 'assets/products/lunch1.jpg',
    composition: 'Суп, второе блюдо, гарнир, напиток' },
  { id: 'lunch2', category: 'meals', name: 'Бизнес Ланч 2', price: 390,
    image: 'assets/products/lunch2.jpg',
    composition: 'Салат, горячее, гарнир, хлеб' },
  { id: 'lunch3', category: 'meals', name: 'Обед офисный', price: 350,
    image: 'assets/products/lunch3.jpg',
    composition: 'Первое, второе, компот' },
  { id: 'lunch4', category: 'meals', name: 'Комплексный обед', price: 410,
    image: 'assets/products/lunch4.jpg',
    composition: 'Суп, салат, горячее, напиток' },
  { id: 'lunch5', category: 'meals', name: 'Ланч лёгкий', price: 320,
    image: 'assets/products/lunch5.jpg',
    composition: 'Салат, сэндвич, сок' },

  // Напитки
  { id: 'water1', category: 'drinks', name: 'Витаминная вода Апельсин', price: 34,
    image: 'assets/products/water1.jpg' },
  { id: 'water2', category: 'drinks', name: 'Витаминная вода Имбирь', price: 34,
    image: 'assets/products/water2.jpg' },
  { id: 'coffee', category: 'drinks', name: 'Кофе растворимый 3в1', price: 67,
    image: 'assets/products/coffee.jpg' },
  { id: 'tea', category: 'drinks', name: 'Чай чёрный', price: 45,
    image: 'assets/products/tea.jpg' },
  { id: 'juice', category: 'drinks', name: 'Сок яблочный 0,2 л', price: 55,
    image: 'assets/products/juice.jpg' },

  // Завтрак
  { id: 'omelet', category: 'breakfast', name: 'Омлет натуральный', price: 120,
    image: 'assets/products/omelet.jpg',
    composition: 'Яйца, молоко, зелень' },
  { id: 'syrniki', category: 'breakfast', name: 'Сырники творожные', price: 97,
    image: 'assets/products/syrniki.jpg',
    composition: 'Творог, яйцо, мука, сметана' },
  { id: 'cheese_sandwich', category: 'breakfast', name: 'Бутерброд с сыром', price: 87,
    image: 'assets/products/toast.jpg',
    composition: 'Хлеб, сыр, масло' },
  { id: 'ham_sandwich', category: 'breakfast', name: 'Сэндвич с ветчиной и сыром', price: 153,
    image: 'assets/products/lunch5.jpg',
    composition: 'Хлеб, ветчина, сыр, соус' },
  { id: 'porridge', category: 'breakfast', name: 'Каша овсяная', price: 75,
    image: 'assets/products/porridge.jpg',
    composition: 'Овсяные хлопья, молоко' },
  { id: 'pancakes', category: 'breakfast', name: 'Блины с вареньем', price: 110,
    image: 'assets/products/pancakes.jpg',
    composition: 'Блины, варенье, сметана' },
  { id: 'buckwheat_porridge', category: 'breakfast', name: 'Каша гречневая', price: 65,
    image: 'assets/products/buckwheat_porridge.jpg',
    composition: 'Гречка, масло' },

  // Салаты и закуски
  { id: 'caesar', category: 'salads', name: 'Салат Цезарь', price: 145,
    image: 'assets/products/caesar.jpg' },
  { id: 'veggie_salad', category: 'salads', name: 'Салат овощной', price: 95,
    image: 'assets/products/veggie_salad.jpg' },
  { id: 'vinaigrette', category: 'salads', name: 'Винегрет', price: 85,
    image: 'assets/products/vinaigrette.jpg' },
  { id: 'cheese_plate', category: 'salads', name: 'Сырная тарелка', price: 160,
    image: 'assets/products/cheese_plate.jpg' },
  { id: 'greek_salad', category: 'salads', name: 'Салат греческий', price: 130,
    image: 'assets/products/greek_salad.jpg' },
  { id: 'chicken_salad', category: 'salads', name: 'Салат с курицей', price: 140,
    image: 'assets/products/chicken_salad.jpg' },
  { id: 'coleslaw', category: 'salads', name: 'Салат коул-слоу', price: 90,
    image: 'assets/products/coleslaw.jpg' },

  // Горячие блюда
  { id: 'cutlet', category: 'hot', name: 'Котлета по-домашнему', price: 155,
    image: 'assets/products/cutlet.jpg' },
  { id: 'chicken_grill', category: 'hot', name: 'Куриное филе гриль', price: 185,
    image: 'assets/products/chicken_grill.jpg' },
  { id: 'goulash', category: 'hot', name: 'Гуляш говяжий', price: 175,
    image: 'assets/products/goulash.jpg' },
  { id: 'baked_fish', category: 'hot', name: 'Рыба запечённая', price: 195,
    image: 'assets/products/baked_fish.jpg' },
  { id: 'beef_stew', category: 'hot', name: 'Плов с говядиной', price: 165,
    image: 'assets/products/beef_stew.jpg' },
  { id: 'meatballs', category: 'hot', name: 'Тефтели в сметанном соусе', price: 150,
    image: 'assets/products/meatballs.jpg' },
  { id: 'pork_chop', category: 'hot', name: 'Свиная отбивная', price: 180,
    image: 'assets/products/pork_chop.jpg' },

  // Гарниры
  { id: 'pasta', category: 'sides', name: 'Макароны отварные', price: 55,
    image: 'assets/products/pasta.jpg' },
  { id: 'buckwheat', category: 'sides', name: 'Гречка', price: 50,
    image: 'assets/products/buckwheat.jpg' },
  { id: 'rice', category: 'sides', name: 'Рис белый', price: 50,
    image: 'assets/products/rice.jpg' },
  { id: 'mashed', category: 'sides', name: 'Картофельное пюре', price: 60,
    image: 'assets/products/mashed.jpg' },
  { id: 'steamed_veg', category: 'sides', name: 'Овощи на пару', price: 70,
    image: 'assets/products/steamed_veg.jpg' },

  // Хлеб
  { id: 'wheat', category: 'bread', name: 'Хлеб пшеничный', price: 4,
    image: 'assets/products/wheat.jpg',
    cartLabel: 'Хлеб пшеничный — 30 г' },
  { id: 'rye', category: 'bread', name: 'Хлеб ржаной', price: 4,
    image: 'assets/products/rye.jpg',
    cartLabel: 'Хлеб ржаной — 30 г' },
  { id: 'toast', category: 'bread', name: 'Хлеб тостовый', price: 10,
    image: 'assets/products/toast.jpg',
    cartLabel: 'Хлеб тостовый — 36 г' },
  { id: 'ciabatta', category: 'bread', name: 'Чиабатта с соусом песто', price: 41,
    image: 'assets/products/ciabatta.jpg',
    cartLabel: 'Чиабатта с соусом песто — 35 г' },
  { id: 'baguette', category: 'bread', name: 'Багет французский', price: 35,
    image: 'assets/products/baguette.jpg',
    cartLabel: 'Багет французский — 80 г' },
  { id: 'bun_sweet', category: 'bread', name: 'Булочка сдобная', price: 18,
    image: 'assets/products/bun_sweet.jpg',
    cartLabel: 'Булочка сдобная — 45 г' },
  { id: 'lavash', category: 'bread', name: 'Лаваш армянский', price: 22,
    image: 'assets/products/lavash.jpg',
    cartLabel: 'Лаваш армянский — 60 г' },

  // Выпечка
  { id: 'croissant', category: 'pastry', name: 'Круассан', price: 65,
    image: 'assets/products/croissant.jpg' },
  { id: 'cinnamon', category: 'pastry', name: 'Булочка с корицей', price: 55,
    image: 'assets/products/cinnamon.jpg' },
  { id: 'pirozhok', category: 'pastry', name: 'Пирожок с капустой', price: 45,
    image: 'assets/products/pirozhok.jpg' },
  { id: 'apple_pastry', category: 'pastry', name: 'Слойка с яблоком', price: 60,
    image: 'assets/products/apple_pastry.jpg' },
  { id: 'pretzel', category: 'pastry', name: 'Плюшка с маком', price: 48,
    image: 'assets/products/pretzel.jpg' },
  { id: 'donut', category: 'pastry', name: 'Пончик с глазурью', price: 52,
    image: 'assets/products/donut.jpg' },
  { id: 'muffin', category: 'pastry', name: 'Маффин шоколадный', price: 58,
    image: 'assets/products/muffin.jpg' },

  // Фрукты
  { id: 'apple', category: 'fruits', name: 'Яблоко', price: 25,
    image: 'assets/products/apple.jpg' },
  { id: 'banana', category: 'fruits', name: 'Банан', price: 30,
    image: 'assets/products/banana.jpg' },
  { id: 'orange', category: 'fruits', name: 'Апельсин', price: 35,
    image: 'assets/products/orange.jpg' },
  { id: 'fruit_mix', category: 'fruits', name: 'Фруктовый микс', price: 90,
    image: 'assets/products/fruit_mix.jpg' },
  { id: 'pineapple', category: 'fruits', name: 'Ананасы нарезка', price: 185,
    image: 'assets/products/fruit_mix.jpg' },
  { id: 'pear', category: 'fruits', name: 'Груша', price: 28,
    image: 'assets/products/pear.jpg' },
  { id: 'grapes', category: 'fruits', name: 'Виноград', price: 45,
    image: 'assets/products/grapes.jpg' },
  { id: 'kiwi', category: 'fruits', name: 'Киви', price: 32,
    image: 'assets/products/kiwi.jpg' },

  // Десерты
  { id: 'cheesecake', category: 'desserts', name: 'Чизкейк', price: 135,
    image: 'assets/products/cheesecake.jpg' },
  { id: 'tiramisu', category: 'desserts', name: 'Тирамису', price: 145,
    image: 'assets/products/tiramisu.jpg' },
  { id: 'chia', category: 'desserts', name: 'Десерт кокос. молоко с чиа', price: 125,
    image: 'assets/products/chia.jpg',
    cartLabel: 'Десерт кокос. молоко с сем. чиа, 100 г' },
  { id: 'icecream', category: 'desserts', name: 'Мороженое', price: 80,
    image: 'assets/products/icecream.jpg' },
  { id: 'brownie', category: 'desserts', name: 'Брауни', price: 95,
    image: 'assets/products/brownie.jpg' },
  { id: 'eclair', category: 'desserts', name: 'Эклер', price: 75,
    image: 'assets/products/eclair.jpg' },
  { id: 'honey_cake', category: 'desserts', name: 'Медовик', price: 120,
    image: 'assets/products/honey_cake.jpg' },

  // Топинги
  { id: 'milk', category: 'toppings', name: 'Молоко сгущённое — 30 г', price: 30,
    image: 'assets/products/milk.jpg' },
  { id: 'tomato_sauce', category: 'toppings', name: 'Соус томатный', price: 25,
    image: 'assets/products/tomato_sauce.jpg' },
  { id: 'cheese_sauce', category: 'toppings', name: 'Соус сырный', price: 35,
    image: 'assets/products/cheese_sauce.jpg' },
  { id: 'mayo', category: 'toppings', name: 'Майонез порционный', price: 15,
    image: 'assets/products/mayo.jpg' },
  { id: 'ketchup', category: 'toppings', name: 'Кетчуп порционный', price: 15,
    image: 'assets/products/ketchup.jpg' },
  { id: 'mustard', category: 'toppings', name: 'Горчица порционная', price: 12,
    image: 'assets/products/mustard.jpg' },
  { id: 'pesto', category: 'toppings', name: 'Соус песто — 30 г', price: 40,
    image: 'assets/products/pesto.jpg' },

  // Одноразовая посуда
  { id: 'container', category: 'disposable', name: 'Контейнер прямоуг. PP чёрный', price: 11,
    image: 'assets/products/container.jpg',
    cartLabel: 'Контейнер прямоуг. PP чёрный, 750 мл' },
  { id: 'cutlery_set', category: 'disposable', name: 'Набор вилка/ложка/нож', price: 8,
    image: 'assets/products/cutlery_set.jpg' },
  { id: 'cup', category: 'disposable', name: 'Стакан одноразовый', price: 5,
    image: 'assets/products/cup.jpg' },
  { id: 'napkins', category: 'disposable', name: 'Салфетки', price: 3,
    image: 'assets/products/napkins.jpg' },
  { id: 'lid', category: 'disposable', name: 'Крышка для контейнера', price: 4,
    image: 'assets/products/lid.jpg' },
  { id: 'straw', category: 'disposable', name: 'Трубочка одноразовая', price: 2,
    image: 'assets/products/straw.jpg' },
  { id: 'food_wrap', category: 'disposable', name: 'Плёнка пищевая', price: 6,
    image: 'assets/products/food_wrap.jpg' },
];

const UPSELL_PRICE = 50;

const DEMO_CUSTOMER = {
  name: 'Петров Алексей Сергеевич',
  balance: 1250,
  email: 'petron@mail.ru',
};

const EMAIL_KEYBOARD_ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', '.', '-', '_'],
];

const SEARCH_KEYBOARD_ROWS = [
  ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
  ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
  ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ё'],
];

const SEARCH_KB_ICON = {
  backspace: `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 6l6 6-6 6"/>
    <path d="M6 7h10a2 2 0 012 2v6a2 2 0 01-2 2H6l3.5-5L6 7z"/>
    <path d="M13.5 10.5l3 3M16.5 10.5l-3 3"/>
  </svg>`,
  enter: `<svg fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 10l-4 4 4 4"/><path stroke-linecap="round" d="M5 14h10a3 3 0 003-3V6"/>
  </svg>`,
  shift: `<svg fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4l8 8h-5v8H9v-8H4l8-8z"/>
  </svg>`,
  bookmark: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7 4h10v16l-5-3-5 3V4z"/>
  </svg>`,
};

export {
  CATEGORIES,
  PRODUCTS,
  UPSELL_PRICE,
  DEMO_CUSTOMER,
  EMAIL_KEYBOARD_ROWS,
  SEARCH_KEYBOARD_ROWS,
  SEARCH_KB_ICON,
};
