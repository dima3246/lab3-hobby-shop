import {products, filterProducts, rubles} from './products.js';
import {setQuantity, cartTotal, validateCustomer} from './cart.js';
const catalog = document.querySelector('#catalog');
const search = document.querySelector('#search');
const category = document.querySelector('#category');
const status = document.querySelector('#status');
let cart = {};
let confirmation = '';
try {
  const stored = JSON.parse(localStorage.getItem('hobby-cart') || '{}');
  if (stored && typeof stored === 'object') for (const p of products) {
    const quantity = stored[p.id];
    if (Number.isInteger(quantity) && quantity > 0 && quantity <= p.stock) cart[p.id] = quantity;
  }
} catch { cart = {}; }
function persist() { try {localStorage.setItem('hobby-cart', JSON.stringify(cart));} catch {} }
function renderCatalog() {
  const visible = filterProducts(search.value, category.value);
  document.querySelector('#count').textContent = `Найдено товаров: ${visible.length}`;
  catalog.innerHTML = visible.map(p => `<article class="product"><p class="category">${p.category}</p><h3>${p.name}</h3><p class="description">${p.description}</p><div class="price">${rubles(p.price)}</div><p class="muted">В наличии: ${p.stock}</p><button data-add="${p.id}" ${((cart[p.id] || 0) >= p.stock) ? 'disabled' : ''}>В корзину</button></article>`).join('');
  if (!visible.length) catalog.innerHTML = '<p class="muted">Товаров по этому запросу не найдено.</p>';
}
function renderCart() {
  const panel = document.querySelector('#cart-panel');
  const selected = products.filter(p => cart[p.id]);
  panel.innerHTML = '<h2 id="cart-heading">Корзина</h2>';
  if (!selected.length) panel.innerHTML += '<p class="muted">Выберите товар в каталоге.</p>';
  else {
    panel.innerHTML += selected.map(p => `<div class="cart-item"><h3>${p.name}</h3><div class="cart-controls"><input type="number" min="1" max="${p.stock}" step="1" value="${cart[p.id]}" data-quantity="${p.id}" aria-label="Количество: ${p.name}"><span>${rubles(p.price * cart[p.id])}</span><button data-remove="${p.id}" aria-label="Удалить: ${p.name}">Удалить</button></div></div>`).join('');
    panel.innerHTML += `<div class="cart-total"><span>Итого</span><span>${rubles(cartTotal(cart, products))}</span></div><form id="checkout"><label>Имя<input name="name" autocomplete="name" required maxlength="80"></label><label>Email<input name="email" type="email" autocomplete="email" required maxlength="150"></label><button type="submit">Оформить учебный заказ</button><p class="order-note">Заказ демонстрационный. Оплата и отправка товаров не выполняются.</p></form>`;
  }
  if (confirmation) {
    const message = document.createElement('p'); message.className = 'confirmation'; message.setAttribute('role','status'); message.textContent = confirmation; panel.append(message);
  }
}
function update() {persist(); renderCatalog(); renderCart();}
catalog.addEventListener('click', event => {
  const button = event.target.closest('[data-add]'); if (!button) return;
  const product = products.find(p => p.id === button.dataset.add);
  try {cart = setQuantity(cart, product, (cart[product.id] || 0) + 1); confirmation = ''; status.textContent = `${product.name} добавлен в корзину.`; update();}
  catch {status.textContent = 'Такого количества товара нет на складе.';}
});
document.querySelector('#cart-panel').addEventListener('click', event => {
  const button = event.target.closest('[data-remove]'); if (!button) return;
  const product = products.find(p => p.id === button.dataset.remove);
  cart = setQuantity(cart, product, 0); status.textContent = `${product.name} удалён из корзины.`; update();
});
document.querySelector('#cart-panel').addEventListener('change', event => {
  const input = event.target.closest('[data-quantity]'); if (!input) return;
  const product = products.find(p => p.id === input.dataset.quantity);
  try {cart = setQuantity(cart, product, Number(input.value)); status.textContent = 'Количество изменено.';}
  catch {status.textContent = `Введите целое количество от 1 до ${product.stock}.`;}
  update();
});
document.querySelector('#cart-panel').addEventListener('submit', event => {
  if (event.target.id !== 'checkout') return;
  event.preventDefault();
  const data = new FormData(event.target);
  const error = validateCustomer(String(data.get('name')), String(data.get('email')));
  if (error) {status.textContent = error; return;}
  if (!Object.keys(cart).length) {status.textContent = 'Добавьте товар в корзину.'; return;}
  const total = rubles(cartTotal(cart, products));
  confirmation = `Учебный заказ HOB-${Date.now().toString().slice(-6)} оформлен. Сумма: ${total}.`;
  cart = {}; status.textContent = 'Учебный заказ оформлен.'; update();
});
search.addEventListener('input', renderCatalog);
category.addEventListener('change', renderCatalog);
renderCatalog(); renderCart();
