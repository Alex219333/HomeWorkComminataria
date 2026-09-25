const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Массив продуктов (минимум 5, у нас 6)
const products = [
  { id: 1, name: 'Laptop', price: 1200, category: 'electronics' },
  { id: 2, name: 'Smartphone', price: 800, category: 'electronics' },
  { id: 3, name: 'Chair', price: 150, category: 'furniture' },
  { id: 4, name: 'Table', price: 300, category: 'furniture' },
  { id: 5, name: 'Headphones', price: 100, category: 'electronics' },
  { id: 6, name: 'Sofa', price: 700, category: 'furniture' },
];

// Небольшая страница-заглушка для корня, чтобы было видно, что сервер жив
app.get('/', (req, res) => {
  res.send(
    'Products API is running. Try GET /products or GET /products/:id'
  );
});

// GET /products - все продукты + поддержка query-параметров take и category
app.get('/products', (req, res) => {
  const { take, category } = req.query;

  // Исходный массив не мутируем - работаем с копией
  let result = [...products];

  // Фильтрация по категории (если параметр передан)
  if (category !== undefined) {
    result = result.filter(
      (p) => p.category.toLowerCase() === String(category).toLowerCase()
    );
  }

  // Ограничение количества (если параметр передан и он корректен)
  if (take !== undefined) {
    const takeNum = Number(take);
    if (!Number.isNaN(takeNum) && Number.isInteger(takeNum) && takeNum >= 0) {
      result = result.slice(0, takeNum);
    }
    // Если take некорректный (например "test") - просто игнорируем параметр,
    // ошибку не выбрасываем, возвращаем результат без обрезки
  }

  res.status(200).json(result);
});

// GET /products/:id - получение одного продукта по id
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const idNum = Number(id);

  if (!Number.isInteger(idNum)) {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }

  const product = products.find((p) => p.id === idNum);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.status(200).json(product);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
