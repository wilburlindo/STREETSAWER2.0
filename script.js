// script.js - comportamento simples: carrinho local + toasts + form
document.addEventListener('DOMContentLoaded', () => {
  const addBtns = document.querySelectorAll('.add-btn');
  const cartCount = document.getElementById('cartCount');
  const toast = document.getElementById('toast');
  const cartBtn = document.getElementById('cartBtn');
  const yearEl = document.getElementById('year');

  // data
  let cart = JSON.parse(localStorage.getItem('skateCart') || '[]');
  updateCartUI();

  addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      addToCart({name, price, qty:1});
      showToast(`${name} adicionado ao carrinho`);
    });
  });

  cartBtn.addEventListener('click', () => {
    showCartModal();
  });

  // contact form
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Mensagem enviada — obrigado! (simulada)');
    contactForm.reset();
  });

  // helpers
  function addToCart(item){
    // merge by name
    const existing = cart.find(i => i.name === item.name);
    if(existing) existing.qty += 1;
    else cart.push(item);
    saveCart();
    updateCartUI();
  }

  function saveCart(){
    localStorage.setItem('skateCart', JSON.stringify(cart));
  }

  function updateCartUI(){
    const totalQty = cart.reduce((s, i) => s + (i.qty || 0), 0);
    cartCount.textContent = totalQty;
  }

  function showToast(text, ms = 2200){
    toast.textContent = text;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(6px)';
    }, ms);
  }

  function showCartModal(){
    if(cart.length === 0){
      showToast('Carrinho vazio');
      return;
    }
    // quick modal via window.prompt (simples)
    const lines = cart.map(i => `${i.qty}× ${i.name} — R$ ${(i.price*i.qty).toFixed(2)}`);
    const total = cart.reduce((s,i)=>s + i.price*i.qty, 0);
    const text = lines.join('\n') + `\n\nTotal: R$ ${total.toFixed(2)}\n\nContinuar para checkout? (simulado)`;
    if(confirm(text)){
      cart = [];
      saveCart();
      updateCartUI();
      showToast('Obrigado pela compra (simulada)!');
    }
  }

  // set year
  yearEl.textContent = new Date().getFullYear();
});
