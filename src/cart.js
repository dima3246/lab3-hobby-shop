export function setQuantity(cart, product, quantity) {
  if (!Number.isInteger(quantity) || quantity < 0 || quantity > product.stock) throw new RangeError('Недопустимое количество');
  const next = {...cart};
  if (quantity === 0) delete next[product.id];
  else next[product.id] = quantity;
  return next;
}
export function cartTotal(cart, products) {
  return products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);
}
export function validateCustomer(name, email) {
  if (!name.trim()) return 'Укажите имя.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Укажите корректный email.';
  return '';
}
