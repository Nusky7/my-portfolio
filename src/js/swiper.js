document.addEventListener('DOMContentLoaded', () => {
new Swiper('.swiper-container', {   
    effect: 'cards',
    cardsEffect: {
      rotate: true,
      slideShadows: true,
      perSlideOffset: 15,
      perSlideRotate: 6,
    },
    autoHeight: true,
    centeredSlides: true, 
    loop: true,
    slidesPerView: 1,
    zoom: {
      limitToOriginalSize: false,
      minRatio: 0.3,
      maxRatio: 2,
      panOnMouseMove: true,
      toggle: true,
    },
    autoplay: {
      delay: 5100,
      pauseOnMouseEnter: true,
      disableOnInteraction: true 
    },
    
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1500: {
      slidesPerView: 3,
    },
  },
});
});