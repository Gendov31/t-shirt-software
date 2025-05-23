document.getElementById("generatePreview").addEventListener("click", () => {
    const sliderContainer = document.getElementById("reviewsSlider");
  
    // Покажи слайдъра
    sliderContainer.style.display = "block";
setTimeout(() => sliderContainer.setAttribute("data-loaded", "true"), 50);
  
    // Зареди мнения само веднъж (ако вече не са заредени)
    if (!sliderContainer.dataset.loaded) {
      const testimonials =[
        {
          "name": "Пепи",
          "handle": "@pepi_salata",
          "text": "като я видях и се разревах от смях 😭😭 егати попадението"
        },
        {
          "name": "Ани",
          "handle": "@ani4kaa",
          "text": "много сте добри честно! даже кучето го има 😂"
        },
        {
          "name": "Тошко",
          "handle": "@Toshko_Bebsa",
          "text": "стигна навреме за рождения ден и стана работата 🤙"
        },
        {
          "name": "Валя",
          "handle": "@valkatad",
          "text": "аууу как я уцелихте тая физиономия хахах топ сте"
        },
        {
          "name": "Крис",
          "handle": "@kris_ooo",
          "text": "мислех че ше е евтино изглеждаща ама не! мега качествена"
        },
        {
          "name": "Нели",
          "handle": "@nel41r",
          "text": "мъжа ми първо вика КО Е ТВА после не я свали целия ден 😂"
        }
      ];
  
      const container = document.getElementById('testimonialWrapper');
  
      testimonials.forEach(t => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
          <h4>${t.name} <span style="font-weight:normal; color:gray;">${t.handle}</span></h4>
          <p>${t.text}</p>
        `;
        container.appendChild(slide);
      });
  
      new Swiper('.testimonial-slider', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        grabCursor: true,
      });
  
      // Бележим, че е зареден
      sliderContainer.dataset.loaded = "true";
    }
  });