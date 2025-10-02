fetch('/api/products')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('products');
    data.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2)}</p>
      `;
      container.appendChild(card);
    });
  });