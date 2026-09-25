# HomeWork — Express: Query и Route параметры

Простое Express-приложение с Products API.

## Запуск

```bash
npm install
npm start
```

Сервер запустится на `http://localhost:3000`.

## Endpoints

| Метод | URL | Описание |
|---|---|---|
| GET | `/products` | Все продукты. Поддерживает query-параметры `take` и `category` |
| GET | `/products/:id` | Один продукт по id |

### Query-параметры `/products`

- `take` — ограничивает количество возвращаемых продуктов. Если значение некорректно (например `take=test`), параметр игнорируется.
- `category` — фильтрует продукты по категории (регистр не важен). Если категория не передана — фильтрация не применяется. Если продуктов такой категории нет — возвращается пустой массив со статусом `200 OK`.
- Параметры `take` и `category` работают совместно (фильтр по категории применяется первым, затем обрезка по `take`).
- Исходный массив `products` не мутируется — все операции выполняются над копией.

## Примеры запросов (готово для проверки в Postman)

```
GET http://localhost:3000/products
GET http://localhost:3000/products?take=2
GET http://localhost:3000/products?take=test
GET http://localhost:3000/products?category=electronics
GET http://localhost:3000/products?category=furniture
GET http://localhost:3000/products?category=unknown
GET http://localhost:3000/products?category=electronics&take=2
GET http://localhost:3000/products/1
GET http://localhost:3000/products/999
GET http://localhost:3000/products/test
```

Готовая коллекция для импорта в Postman лежит в файле `HomeWork.postman_collection.json`.

## Git-флоу для сдачи задания

```bash
git checkout -b feat/products-api
git add .
git commit -m "feat: add products API with query params support"
git push -u origin feat/products-api
```

Дальше создайте Pull Request из `feat/products-api` в `main`/`master`, дождитесь проверки и сделайте merge.
