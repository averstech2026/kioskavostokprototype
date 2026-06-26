import { state } from './core/state.js';
import { updateCartBadge } from './core/cart.js';
import { renderMenu } from './ui/menu.js';
import { renderSearchKeyboard } from './ui/search.js';
import {
  renderEmailKeyboard,
  updatePrintReceiptUI,
} from './ui/payment.js';
import { fitKiosk } from './ui/layout.js';
import { bindKioskEvents } from './ui/events.js';

function seedDemoCart() {
  ['container', 'milk', 'chia', 'wheat', 'ciabatta', 'toast', 'rye'].forEach((id) => {
    state.cart[id] = 1;
  });
  updateCartBadge();
}

function init() {
  fitKiosk();
  renderEmailKeyboard();
  renderSearchKeyboard();
  updatePrintReceiptUI();
  seedDemoCart();
  renderMenu();
  updateCartBadge();
  bindKioskEvents();

  window.addEventListener('resize', fitKiosk);
  window.addEventListener('orientationchange', fitKiosk);
  window.visualViewport?.addEventListener('resize', fitKiosk);
  window.visualViewport?.addEventListener('scroll', fitKiosk);

  Promise.all([
    ...['assets/logo.png', 'assets/card.png'].map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = img.onerror = resolve;
          img.src = src;
        }),
    ),
    document.fonts?.ready ?? Promise.resolve(),
  ]).finally(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add('kiosk-ready');
      });
    });
  });
}

init();
