document.getElementById("generatePreview").addEventListener("click", () => {
    const sliderContainer = document.getElementById("reviewsSlider");
  
    // Покажи слайдъра
    sliderContainer.style.display = "block";
setTimeout(() => sliderContainer.setAttribute("data-loaded", "true"), 50);
  
    // Зареди мнения само веднъж (ако вече не са заредени)
    if (!sliderContainer.dataset.loaded) {
      const testimonials =[
          {
            name: "Мария",
            handle: "@mari4eto",
            text: "Нямах търпение да я разопаковам и като я видях... ШОК 😍 Толкова е смешна и едновременно с това точно като мен! Страхотна работа!"
          },
          {
            name: "Никола",
            handle: "@nik_the_great",
            text: "Подарих я на брат ми и той се смя 10 минути без да спре 🤣 Не можеше да повярва, че е по негова снимка. Тениската стана хит на събирането!"
          },
          {
            name: "Вики",
            handle: "@vikito_xo",
            text: "Мислех, че ще е просто някакъв принт, ама то си е направо изкуство! Всеки детайл – коса, усмивка, даже блузката от снимката – всичко е там ❤️"
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
        spaceBetween: 16,
        grabCursor: true,
      });
  
      // Бележим, че е зареден
      sliderContainer.dataset.loaded = "true";
    }
  });