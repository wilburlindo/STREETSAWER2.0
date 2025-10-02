const express = require('express');
const path = require('path');
const app = express();
const products = require('./data/catalog.json');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/catalog', (req, res) => {
  res.json(products);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Vida Loka Wear no ar: http://localhost:${PORT}`));
