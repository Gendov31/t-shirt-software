document.addEventListener('DOMContentLoaded', async () => {
  const gallery = document.getElementById('inspiration-gallery');
  if (!gallery) return;

  gallery.innerHTML = '';

  try {
    const response = await fetch('https://primary-production-5c317.up.railway.app/webhook/044f6e5d-b51e-4db5-ab2d-0202aa7523c6');
    const data = await response.json();



    const inspirationsObj = data.find(d => d.inspirations);
    const inspirations = inspirationsObj?.inspirations || [];

    inspirations.forEach(item => {
      const caption = item.caption || '';
      const description = item.description || '';
      const imageUrl = item.image || '';

      if (imageUrl) {
        const div = document.createElement('div');
        div.className = 'inspiration-item';
        div.dataset.caption = caption;
        div.dataset.description = description;

        const img = document.createElement('img');
        img.src = imageUrl;
        img.className = 'inspiration-img';
        img.alt = caption;

        const captionDiv = document.createElement('div');
        captionDiv.className = 'inspiration-caption';
        captionDiv.textContent = caption;

        div.appendChild(img);
        div.appendChild(captionDiv);
        gallery.appendChild(div);
      }
    });

    gallery.addEventListener('click', (event) => {
      const clickedItem = event.target.closest('.inspiration-item');
      if (!clickedItem) return;

      const description = clickedItem.dataset.description;

      window.formData = window.formData || {};
      window.formData.sceneDescription = description;

      const sceneDescription = document.getElementById('scene-description');
      if (sceneDescription) {
        sceneDescription.value = description;
        sceneDescription.classList.add('flash');
        setTimeout(() => sceneDescription.classList.remove('flash'), 300);
      }

      document.querySelectorAll('.inspiration-item').forEach(el => el.classList.remove('selected'));
      clickedItem.classList.add('selected');
    });

  } catch (error) {
    console.error('Error loading inspiration items:', error);
  }
});
