import test from 'node:test';
import assert from 'node:assert/strict';
import {setQuantity, cartTotal, validateCustomer} from '../src/cart.js';
import {products, filterProducts} from '../src/products.js';
test('search and category filter work together', () => {
  assert.equal(filterProducts('КИСТ', 'Рисование')[0].id, 'brush');
  assert.equal(filterProducts('КИСТ', 'Рукоделие').length, 0);
});
test('adding an item does not mutate the previous cart', () => {
  const old = {}; const updated = setQuantity(old, products[0], 2);
  assert.deepEqual(old, {}); assert.equal(updated.paint, 2);
});
test('zero quantity removes the item', () => assert.deepEqual(setQuantity({paint:2}, products[0], 0), {}));
test('stock limit is enforced', () => assert.throws(() => setQuantity({}, products[0], products[0].stock+1), RangeError));
test('negative and infinite quantities are rejected', () => {
  for (const q of [-1, Infinity, NaN]) assert.throws(() => setQuantity({}, products[0], q), RangeError);
});
test('total is calculated in integer kopecks', () => assert.equal(cartTotal({paint:2, brush:1}, products), 157000));
test('name and email must be valid', () => {
  assert.equal(validateCustomer('Дмитрий','student@example.com'), '');
  assert.notEqual(validateCustomer(' ','student@example.com'), '');
  assert.notEqual(validateCustomer('Дмитрий','wrong-email'), '');
});

test('fractional quantities are rejected', () => assert.throws(() => setQuantity({}, products[0], 1.5), RangeError));
