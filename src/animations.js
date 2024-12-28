document.addEventListener("DOMContentLoaded", () => {
const headerContent = document.getElementById("header-content");
const coffee = document.getElementById('coffee');
const coffeeImg = document.getElementById('coffee-img');
const name = document.getElementById('name');
const socialBts = document.getElementById('social-bts');
const button = document.getElementById('offBtn');
const screen = document.getElementById('monitorscreen');
const screenList = document.getElementById('screen-list');
const led = document.getElementById('led');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const tvBrand = document.getElementById('tv-brand');
const comentsDiv = document.getElementById('comments-section');
const scrollAmount = 100;


function updateLayout() {
    if (window.innerWidth <= 839) {
        headerContent.classList.remove('flex');
        headerContent.classList.add('grid');
        donateBtn.classList.add('mx-auto');
        coffee.classList.add('hidden');
        coffeeImg.classList.add('mt-3');
        socialBts.classList.remove('ml-7');
    } else {
        headerContent.classList.remove('grid');
        headerContent.classList.add('flex');
        donateBtn.classList.remove('mx-auto');
        donateBtn.classList.add('mx-3');
        coffee.classList.remove('hidden');
        coffeeImg.classList.remove('mt-3');
        socialBts.classList.add('ml-7');
    }
}
function updateName() {
    if (window.innerWidth <= 680) {
        name.textContent = 'Alba T.B.';
      
        comentsDiv.classList.remove('p-6');
        comentsDiv.classList.add('p-1');
    } else {
        name.textContent = 'Alba Tolosa Bonora';
       
        comentsDiv.classList.add('p-6');
        comentsDiv.classList.remove('p-1');
    }
}
function updateBrand() {
    if (window.innerWidth <= 440) {
        tvBrand.classList.add('hidden', 'p-0');
        }
    else {
            tvBrand.classList.remove('hidden');
        }
}function updateBrand() {
    if (window.innerWidth <= 330) {
        tvBrand.classList.add('hidden', 'p-0');
        }
    else {
            tvBrand.classList.remove('hidden');
        }
}
    
    window.addEventListener('resize', function () {
    updateLayout(); updateName(); updateBrand();
});

    updateLayout();
    updateName();
    updateBrand();


// Función para el on/off de la pantalla y LED
button.addEventListener('click', function() {
  const isScreenOff = screen.classList.toggle('screen-off');
  screenList.classList.toggle('hidden', isScreenOff);

  if (isScreenOff) {
    button.classList.replace('bg-rose-900', 'bg-stone-500');
    led.classList.replace('bg-green-500', 'bg-red-800');
    led.classList.replace('border-green-500', 'border-red-800');
    led.classList.replace('shadow-[0_0_3px_1.5px_rgba(0,255,0,0.6)]', 'shadow-[0_0_3px_1.5px_rgba(255,0,0,0.6)]');
  } else {
    button.classList.replace('bg-stone-500', 'bg-rose-900');
    led.classList.replace('bg-red-800', 'bg-green-500');
    led.classList.replace('border-red-800', 'border-green-500' );
    led.classList.replace('shadow-[0_0_3px_1.5px_rgba(255,0,0,0.6)]', 'shadow-[0_0_3px_1.5px_rgba(0,255,0,0.6)]');
  }
});

// Evento para desplazar hacia arriba la lista TV
prevBtn.addEventListener("click", () => {
    screenList.scrollBy({
        top: -scrollAmount, 
        left: 0, 
        behavior: "smooth" 
    });
});

// Desplazar hacia abajo
nextBtn.addEventListener("click", () => {
    screenList.scrollBy({
        top: scrollAmount, 
        left: 0, 
        behavior: "smooth"
    });
});

});