import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');
const js = fs.readFileSync(path.join(src, '_extracted-app.js'), 'utf8');
const lines = js.split('\n');

const markers = [
  [1, 'data/catalog.js', null],
  [260, 'core/state.js', null],
  [288, 'core/navigation.js', 'navigation'],
  [327, 'core/cart.js', 'cart'],
  [414, 'ui/menu.js', 'menu'],
  [614, 'ui/search.js', 'search'],
  [737, 'ui/voice.js', 'voice'],
  [1225, 'ui/cartView.js', 'cartView'],
  [1260, 'ui/payment.js', 'payment'],
  [1397, 'ui/product.js', 'product'],
  [1434, 'core/order.js', 'order'],
  [1559, 'ui/events.js', 'events'],
  [1718, 'ui/layout.js', 'layout'],
  [1765, 'main-init.js', 'init'],
];

function sliceSection(startLine) {
  const idx = markers.findIndex((m) => m[0] === startLine);
  const start = startLine - 1;
  const end = idx < markers.length - 1 ? markers[idx + 1][0] - 2 : lines.length - 1;
  return lines.slice(start, end + 1).join('\n');
}

const headers = {
  'data/catalog.js': '',

  'core/state.js': ``,

  'core/navigation.js': `import { state } from './state.js';
import { stopVoiceRecognition } from '../ui/voice.js';
import { renderCart } from '../ui/cartView.js';
import { renderPayment } from '../ui/payment.js';
import { renderMenu } from '../ui/menu.js';
import { renderSearch } from '../ui/search.js';
import { renderVoice } from '../ui/voice.js';
import { updateCustomerStatus } from './order.js';

`,

  'core/cart.js': `import { state } from './state.js';
import { PRODUCTS } from '../data/catalog.js';
import { isVoiceScreenActive } from './navigation.js';
import { renderMenu } from '../ui/menu.js';
import { renderSearchResults } from '../ui/search.js';
import { renderVoiceResults } from '../ui/voice.js';
import { renderCart } from '../ui/cartView.js';
import { updateProductCartAction } from '../ui/product.js';

`,

  'ui/menu.js': `import { state } from '../core/state.js';
import { CATEGORIES, PRODUCTS } from '../data/catalog.js';
import { formatPrice, cartIconSvg } from '../core/cart.js';

`,

  'ui/search.js': `import { state } from '../core/state.js';
import { PRODUCTS, SEARCH_KEYBOARD_ROWS, SEARCH_KB_ICON } from '../data/catalog.js';
import { formatPrice, getSubtotal, cartIconSvg, cartQtyControl } from '../core/cart.js';
import { navigateTo } from '../core/navigation.js';

`,

  'ui/voice.js': `import { state } from '../core/state.js';
import {
  CATEGORIES,
  PRODUCTS,
  VOICE_DEMO_PHRASES,
  VOICE_CATEGORY_TRIGGERS,
} from '../data/catalog.js';
import {
  formatPrice,
  addToCart,
  setCartQty,
  cartQtyControl,
} from '../core/cart.js';
import {
  navigateTo,
  isVoiceScreenActive,
  showModal,
  hideModal,
} from '../core/navigation.js';
import { filterProductsByQuery } from './search.js';

`,

  'ui/cartView.js': `import { state } from '../core/state.js';
import { PRODUCTS } from '../data/catalog.js';
import {
  formatPrice,
  getSubtotal,
  getCartItemLabel,
  cartQtyControl,
} from '../core/cart.js';

`,

  'ui/payment.js': `import { state } from '../core/state.js';
import { DEMO_CUSTOMER, EMAIL_KEYBOARD_ROWS } from '../data/catalog.js';
import {
  formatPrice,
  getSubtotal,
  getCartTotal,
} from '../core/cart.js';
import { showModal, hideModal } from '../core/navigation.js';

`,

  'ui/product.js': `import { state } from '../core/state.js';
import { CATEGORIES } from '../data/catalog.js';
import { cartIconSvg } from '../core/cart.js';
import { navigateTo } from '../core/navigation.js';

`,

  'core/order.js': `import { state } from './state.js';
import { DEMO_CUSTOMER } from '../data/catalog.js';
import {
  formatPrice,
  getCartCount,
  getCartTotal,
  updateCartBadge,
} from './cart.js';
import {
  navigateTo,
  showModal,
  hideModal,
} from './navigation.js';
import { renderMenu } from '../ui/menu.js';
import { renderSearchResults } from '../ui/search.js';
import { renderVoiceResults, closeVoiceSearch } from '../ui/voice.js';
import { renderCart } from '../ui/cartView.js';
import { setPrintReceipt, updatePrintReceiptUI } from '../ui/payment.js';

`,

  'ui/events.js': `import { state } from '../core/state.js';
import { navigateTo, showModal } from '../core/navigation.js';
import {
  getCartCount,
  addToCart,
  setCartQty,
} from '../core/cart.js';
import {
  openSearch,
  appendSearchChar,
  backspaceSearch,
  clearSearchQuery,
} from './search.js';
import {
  openVoiceSearch,
  toggleVoiceListening,
  applyVoiceToSearch,
  clearVoiceList,
  setVoiceQty,
  pickVoiceChoiceProduct,
  dismissVoiceChoice,
} from './voice.js';
import {
  filterToCategory,
  showAllCategories,
  setMenuView,
  scrollMenuRow,
  scrollToCategory,
} from './menu.js';
import { openProduct } from './product.js';
import {
  tryPay,
  proceedToPayment,
  clearCart,
  resetOrder,
  applyCustomer,
  removeCustomer,
  startSubsidyPayment,
  cancelCustomerCard,
  startPayment,
  confirmTerminalPay,
  cancelTerminalPay,
  submitRating,
} from '../core/order.js';
import {
  togglePrintReceipt,
  confirmReceiptCustomer,
  confirmReceiptEmail,
  cancelReceiptEmail,
  appendReceiptEmailChar,
  backspaceReceiptEmail,
} from './payment.js';

`,

  'ui/layout.js': ``,

  'main-init.js': `import { state } from './core/state.js';
import { updateCartBadge } from './core/cart.js';
import { renderMenu } from './ui/menu.js';
import {
  renderEmailKeyboard,
  renderSearchKeyboard,
  updatePrintReceiptUI,
} from './ui/payment.js';
import { renderSearch } from './ui/search.js';
import { fitKiosk } from './ui/layout.js';

`,
};

const exports = {
  'data/catalog.js': `export {
  CATEGORIES,
  PRODUCTS,
  UPSELL_PRICE,
  DEMO_CUSTOMER,
  EMAIL_KEYBOARD_ROWS,
  SEARCH_KEYBOARD_ROWS,
  SEARCH_KB_ICON,
  VOICE_DEMO_PHRASES,
  VOICE_CATEGORY_TRIGGERS,
};
`,

  'core/state.js': `export { state };
`,

  'core/navigation.js': `export {
  SCREENS,
  isVoiceScreenActive,
  navigateTo,
  showModal,
  hideModal,
};
`,

  'core/cart.js': `export {
  getCartCount,
  getCartTotal,
  getSubtotal,
  addToCart,
  setCartQty,
  updateCartBadge,
  formatPrice,
  cartIconSvg,
  getCartItemLabel,
  cartQtyControl,
};
`,

  'ui/menu.js': `export {
  renderSidebar,
  productCard,
  updateViewToggle,
  setMenuView,
  renderGridSection,
  filterToCategory,
  showAllCategories,
  renderMenu,
  getSectionScrollTop,
  scrollSidebarToActive,
  scrollToCategory,
  scrollMenuRow,
};
`,

  'ui/search.js': `export {
  filterProductsByQuery,
  searchResultRow,
  updateSearchQueryDisplay,
  renderSearchResults,
  renderSearchKeyboard,
  renderSearch,
  openSearch,
  appendSearchChar,
  backspaceSearch,
  clearSearchQuery,
};
`,

  'ui/voice.js': `export {
  getSpeechRecognition,
  stopVoiceRecognition,
  setVoiceStatus,
  updateVoiceTranscriptDisplay,
  findVoiceCategoryMatch,
  resolveVoiceQuery,
  addVoiceProduct,
  voiceChoiceRow,
  renderVoiceChoicePanel,
  dismissVoiceChoice,
  pickVoiceChoiceProduct,
  findBestVoiceProduct,
  promoteVoiceItem,
  removeFromVoiceOrder,
  highlightVoiceItem,
  commitVoiceRecognition,
  getVoiceSubtotal,
  getVoiceListCount,
  voiceQtyControl,
  voiceResultRow,
  updateVoiceToolbarState,
  renderVoiceResults,
  renderVoice,
  renderVoiceModal,
  setVoiceQty,
  clearVoiceList,
  startVoiceDemoRecognition,
  startVoiceRecognition,
  toggleVoiceListening,
  openVoiceSearch,
  closeVoiceSearch,
  applyVoiceToSearch,
};
`,

  'ui/cartView.js': `export { renderCart };
`,

  'ui/payment.js': `export {
  renderPayment,
  maskEmail,
  updatePrintReceiptUI,
  setPrintReceipt,
  togglePrintReceipt,
  getReceiptEmailInput,
  renderEmailKeyboard,
  openGuestReceiptModal,
  openCustomerReceiptModal,
  appendReceiptEmailChar,
  backspaceReceiptEmail,
  confirmReceiptCustomer,
  confirmReceiptEmail,
  cancelReceiptEmail,
  resetReceiptSettings,
};
`,

  'ui/product.js': `export {
  updateProductCartAction,
  openProduct,
};
`,

  'core/order.js': `export {
  tryPay,
  proceedToPayment,
  clearCart,
  resetOrder,
  updateCustomerStatus,
  applyCustomer,
  removeCustomer,
  completeSubsidyPayment,
  startSubsidyPayment,
  cancelCustomerCard,
  startPayment,
  confirmTerminalPay,
  cancelTerminalPay,
  submitRating,
};
`,

  'ui/events.js': `export { bindKioskEvents };
`,

  'ui/layout.js': `export { fitKiosk };
`,

  'main-init.js': '',
};

// Special handling for state section - split voice globals to voice.js
const stateBody = sliceSection(260);
const stateMatch = stateBody.match(
  /^const state = \{[\s\S]*?\};\n\n([\s\S]*)/
);
const voiceGlobals = stateMatch ? stateMatch[1].trim() : '';
const stateOnly = stateMatch ? stateBody.slice(0, stateMatch.index + stateMatch[0].indexOf('};') + 2) : stateBody;

// voice section needs voice globals prepended
const voiceBody = voiceGlobals + '\n\n' + sliceSection(737);

// events section - wrap in function
const eventsBody = sliceSection(1559);
const eventsWrapped = eventsBody.replace(
  /^document\.getElementById\('kiosk'\)\.addEventListener\('click',/,
  'export function bindKioskEvents() {\n  document.getElementById(\'kiosk\').addEventListener(\'click\','
) + '\n}';

// layout section - remove window listeners from layout, move to main
const layoutBody = sliceSection(1718)
  .replace(/\nwindow\.addEventListener\('resize', fitKiosk\);[\s\S]*$/, '');

const files = {
  'data/catalog.js': sliceSection(1),
  'core/state.js': stateOnly,
  'core/navigation.js': sliceSection(288),
  'core/cart.js': sliceSection(327),
  'ui/menu.js': sliceSection(414),
  'ui/search.js': sliceSection(614),
  'ui/voice.js': voiceBody,
  'ui/cartView.js': sliceSection(1225),
  'ui/payment.js': sliceSection(1260),
  'ui/product.js': sliceSection(1397),
  'core/order.js': sliceSection(1434),
  'ui/events.js': eventsWrapped,
  'ui/layout.js': layoutBody,
  'main-init.js': sliceSection(1765),
};

for (const [file, body] of Object.entries(files)) {
  const dir = path.dirname(file);
  fs.mkdirSync(path.join(src, dir), { recursive: true });
  const header = headers[file] || '';
  const footer = exports[file] || '';
  const content = `${header}${body}\n\n${footer}`.replace(/\n{3,}/g, '\n\n');
  fs.writeFileSync(path.join(src, file), content);
}

console.log('Modules written:', Object.keys(files).length);
