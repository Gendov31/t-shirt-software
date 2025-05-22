document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('style-options');
  
    try {
      const response = await fetch('https://primary-production-5c317.up.railway.app/webhook/044f6e5d-b51e-4db5-ab2d-0202aa7523c6');
      const data = await response.json();

  
      const styles = data?.[0]?.styles || [];
  
      styles.forEach(item => {
        const name = item.name || 'unknown';
        const imageUrl = item.image || '';
  
        if (imageUrl) {
          const div = document.createElement('div');
          div.className = 'style-option';
          div.dataset.name = name;
  
          const img = document.createElement('img');
          img.src = imageUrl;
          img.alt = name;
  
          div.appendChild(img);
          container.appendChild(div);
  
          // ✅ Add selection logic
          div.addEventListener('click', () => {
            // Remove existing selection
            document.querySelectorAll('.style-option').forEach(el => el.classList.remove('selected'));
  
            // Highlight selected
            div.classList.add('selected');
  
            // Store selection in global formData
            window.formData = window.formData || {};
            window.formData.style = name;
  
            // Hide error message if shown
            const styleError = document.getElementById('styleError');
            if (styleError) {
              styleError.style.display = 'none';
            }
  

          });
        }
      });
    } catch (error) {
      console.error('Error loading styles:', error);
    }
  });
  