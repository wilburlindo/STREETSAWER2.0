fetch('/api/catalog')
  .then(res => res.json())
  .then(data => {
    const catalog = document.getElementById('catalog');
    data.forEach(product => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2)}</p>
      `;
      catalog.appendChild(div);
    });
  });