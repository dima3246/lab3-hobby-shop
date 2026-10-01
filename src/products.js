export const products = [
  {id: 'paint', name: 'Акриловые краски', category: 'Рисование', description: '12 цветов для бумаги, холста и дерева.', price: 59000, stock: 8},
  {id: 'brush', name: 'Набор кистей', category: 'Рисование', description: 'Пять синтетических кистей разных размеров.', price: 39000, stock: 12},
  {id: 'sketchbook', name: 'Скетчбук A5', category: 'Рисование', description: '60 плотных листов для повседневных зарисовок.', price: 45000, stock: 10},
  {id: 'yarn', name: 'Хлопковая пряжа', category: 'Рукоделие', description: 'Мягкий моток 100 г для вашего нового проекта.', price: 28000, stock: 15},
  {id: 'beads', name: 'Набор для украшений', category: 'Рукоделие', description: 'Бусины, шнур и фурнитура в одном комплекте.', price: 62000, stock: 5},
  {id: 'model', name: 'Сборная модель самолёта', category: 'Моделирование', description: 'Набор деталей с инструкцией для сборки.', price: 129000, stock: 3}
];
export const rubles = value => new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 2}).format(value / 100);
export function filterProducts(query = '', category = 'all') {
  const search = query.trim().toLocaleLowerCase('ru');
  return products.filter(p => (category === 'all' || p.category === category) && p.name.toLocaleLowerCase('ru').includes(search));
}
