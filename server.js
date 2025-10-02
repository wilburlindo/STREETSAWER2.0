const express = require('express');
const app = express();
const path = require('path');
const products = require('./data/products.json');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
