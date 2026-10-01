import {filterProducts, rubles} from './products.js';
const catalog = document.querySelector('#catalog');
const search = document.querySelector('#search');
const category = document.querySelector('#category');
function renderCatalog() {
  const visible = filterProducts(search.value, category.value);
  document.querySelector('#count').textContent = `Найдено товаров: ${visible.length}`;
  catalog.innerHTML = visible.map(p => `<article class="product"><p class="category">${p.category}</p><h3>${p.name}</h3><p class="description">${p.description}</p><div class="price">${rubles(p.price)}</div><p class="muted">В наличии: ${p.stock}</p><button disabled>Корзина в разработке</button></article>`).join('');
  if (!visible.length) catalog.innerHTML = '<p class="muted">Товаров по этому запросу не найдено.</p>';
}
search.addEventListener('input', renderCatalog);
category.addEventListener('change', renderCatalog);
renderCatalog();
