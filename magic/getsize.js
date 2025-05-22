window.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.size-options');
  const sizeError = document.getElementById('sizeError');
  
  try {
    const response = await fetch('https://n8n.enchantiya.com/webhook/044f6e5d-b51e-4db5-ab2d-0202aa7523c6');
    const data = await response.json();
    
    const sizesObj = data.find(item => item.sizes);
    const sizes = sizesObj?.sizes;
    
    if (!Array.isArray(sizes)) throw new Error('Invalid sizes');
    
    container.innerHTML = '';
    
    sizes.forEach(item => {
      const { size, price } = item;
      
      const div = document.createElement('div');
      div.className = 'size-option';
      div.dataset.size = size;
      div.dataset.price = price;
      
      const h3 = document.createElement('h3');
      h3.textContent = size;
      
      const p = document.createElement('p');
      p.textContent = `${Number(price).toFixed(2)} лв.`;
      
      div.appendChild(h3);
      div.appendChild(p);
      container.appendChild(div);
    });
    
    const sizeOptions = document.querySelectorAll('.size-option');
    
    sizeOptions.forEach(option => {
      option.addEventListener('click', () => {
        sizeOptions.forEach(s => s.classList.remove('selected'));
        option.classList.add('selected');
        
        const selectedSize = option.dataset.size;
        const basePrice = parseFloat(option.dataset.price);
        
        if (!window.formData) window.formData = {};
        window.formData.size = selectedSize;
        window.formData.price = basePrice;
        
        if (sizeError) sizeError.style.display = 'none';
        
        if (typeof updateTotalPrice === 'function') {
          updateTotalPrice();
        }
        

      });
    });
  } catch (err) {
    console.error('Грешка при зареждане на размерите:', err);
  }
});