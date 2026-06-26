import { state } from './state.js';
import { DEMO_CUSTOMER } from '../data/catalog.js';
import { formatPrice } from './format.js';
import {
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
import { resetReceiptSettings } from '../ui/payment.js';
import { updateCustomerStatus } from '../ui/customer.js';

// ─── Новая логика: оплата через upsell ─────────────────────────
function tryPay() {
  if (getCartCount() === 0) return;
  if (!state.upsellShown) {
    showModal('modal-upsell');
  } else {
    navigateTo('payment');
  }
}

function proceedToPayment(withUpsell) {
  hideModal('modal-upsell');
  state.upsellShown = true;
  state.upsellAdded = withUpsell;
  navigateTo('payment');
}

function clearCart() {
  state.cart = {};
  state.upsellAdded = false;
  state.upsellShown = false;
  updateCartBadge();
  renderCart();
  if (state.screen === 'menu') renderMenu();
  if (state.screen === 'search') renderSearchResults();
  if (state.screen === 'voice') renderVoiceResults();
}

function resetOrder() {
  state.cart = {};
  state.upsellAdded = false;
  state.upsellShown = false;
  state.currentProduct = null;
  state.customer = null;
  state.pendingSubsidyPay = false;
  updateCartBadge();
  updateCustomerStatus();
  hideModal('modal-upsell');
  hideModal('modal-customer-card');
  hideModal('modal-terminal-pay');
  hideModal('modal-voice-choice');
  closeVoiceSearch();
  resetReceiptSettings();
  navigateTo('start');
}

function applyCustomer() {
  state.customer = { ...DEMO_CUSTOMER };
  hideModal('modal-customer-card');
  updateCustomerStatus();
  if (state.pendingSubsidyPay) {
    completeSubsidyPayment();
  }
}

function removeCustomer() {
  state.customer = null;
  updateCustomerStatus();
}

function completeSubsidyPayment() {
  state.pendingSubsidyPay = false;
  navigateTo('pay-success');
}

function startSubsidyPayment() {
  if (state.customer) {
    completeSubsidyPayment();
    return;
  }
  state.pendingSubsidyPay = true;
  showModal('modal-customer-card');
}

function cancelCustomerCard() {
  hideModal('modal-customer-card');
  state.pendingSubsidyPay = false;
}

function startPayment() {
  const totalEl = document.getElementById('terminal-pay-total');
  if (totalEl) totalEl.textContent = formatPrice(getCartTotal());
  showModal('modal-terminal-pay');
}

function confirmTerminalPay() {
  hideModal('modal-terminal-pay');
  navigateTo('pay-success');
}

function cancelTerminalPay() {
  hideModal('modal-terminal-pay');
}

function submitRating() {
  resetOrder();
}

export {
  tryPay,
  proceedToPayment,
  clearCart,
  resetOrder,
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
