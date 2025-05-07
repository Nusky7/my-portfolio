document.addEventListener("DOMContentLoaded", function () {
  // header - donations
  const headerContent = document.getElementById("header-content");
  const coffee = document.getElementById('coffee');
  const coffeeImg = document.getElementById('coffee-img');
  const name = document.getElementById('name');
  const socialBts = document.getElementById('social-bts');
  //  Monitor - TV
  const button = document.getElementById('offBtn');
  const screen = document.getElementById('monitorscreen');
  const screenList = document.getElementById('screen-list');
  const led = document.getElementById('led');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const tvBrand = document.getElementById('tv-brand');
  const comentsDiv = document.getElementById('comments-section');
  const scrollAmount = 100;
  const advertisement = document.getElementById('advertisement');
  // Intro - Main
  const startBtn = document.getElementById("start-btn");
  const introScreen = document.getElementById("intro-screen");
  const introText = document.getElementById("intro-text");
  const mainContent = document.getElementById("main-content");
  const profile = document.getElementById("profile");
  const animeImg = document.querySelector(".anime-img");
  const realImg = document.querySelector(".real-img");
  const headerAnimeImg = document.querySelector(".header-anime-img");
  const headerRealImg = document.querySelector(".header-real-img");
  const headerImg = document.getElementById("header-img");
  const audio = document.getElementById("miAudio");
  const skipBtn = document.getElementById("skip-btn");
  const skipBtn2 = document.getElementById("skip-btn2");
  const introContent = document.getElementById("intro-content");
  const stopBtn = document.getElementById("stopAudioBtn");
  const controlPanel = document.getElementById("control-panel");
  const toggleMusic = document.querySelector('.peer');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeSlider2 = document.getElementById('volume-slider2');
  const ledOff = document.getElementById('led-off');
  const ledOn = document.getElementById('led-on');
  const ledOnTxt = document.getElementById('led-txt');
  const ledOffTxt = document.getElementById('led-txt-off');
  const sliderSkip = document.getElementById('sliderSkip-container');
  const hideVolume = document.getElementById('hide-volume');
  const volumeBkg = document.getElementById('volume-bkg');
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const menuBkg = document.getElementById('menu-bkg');
  const subtitle = document.getElementById("panel-subtitle");
  
  // Variables e Inicializadores
  // MusicOn - Delay
  let isMusicOn = false;
  const startFromSecond = 120;
  let isFF = true;
  // IntroScreen - cPanel - Volume
  audio.load();
  // Inicializar los sliders
  volumeSlider.value = 60;
  toggleMusic.checked = false;

  // Animación CV - Contrata mis servicios hoy misme
function startAnimation() {
  subtitle.classList.add("animate-blinkAndBounce");

  setTimeout(() => {
    subtitle.classList.remove("animate-blinkAndBounce");
  }, 4000);
  setTimeout(startAnimation, 9999);
}
startAnimation();
  
  // Al cargar la pagina
  window.addEventListener('load', () => {
    document.getElementById("intro-content").classList.remove("hidden");
    document.getElementById("preloader").classList.add("hidden");
    updateSliderBackground(volumeSlider);
    updateSliderBackground(volumeSlider2);
  });
  
  
  // Alternar el menú al hacer clic
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    menuBkg.classList.toggle('hidden');
    menuToggle.classList.toggle('animate-colorSlow');
  });

  // Cierra el menú al hacer clic en un enlace
  document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      menuBkg.classList.add('hidden');
      menuToggle.classList.remove('animate-colorSlow');
    });
  });
  
  menuBkg.addEventListener('click',() => {
    menu.classList.add('hidden');
    menuBkg.classList.add('hidden');
    menuToggle.classList.remove('animate-colorSlow');
   });


// Función para añadir reglas CSS dinámicamente
const addRule = (function (style) {
  const sheet = document.head.appendChild(style).sheet;
  let isFF = true;
  return function (selector, css) {
    if (isFF) {
      if (sheet.cssRules.length > 0) {
        sheet.deleteRule(0);
      }
      try {
        sheet.insertRule(`${selector} { ${css} }`, 0);
      } catch (ex) {
        isFF = false;
      }
    }
  };
    })(document.createElement("style"));

// Asigna eventos a todos los sliders
document.querySelectorAll(".slider").forEach((slider) => {
    slider.addEventListener("input", function () {
        updateSliderBackground(slider);
    });
});

// Estado inicial
toggleMusic.addEventListener('change', () => {
isMusicOn = toggleMusic.checked;
if (isMusicOn) {
    // Volver al volumen seleccionado por el slider (escalado al 60%)
    audio.volume = (volumeSlider.value / 100);
    ledOn.classList.remove('hidden');
    ledOnTxt.classList.remove('hidden');
    ledOffTxt.classList.add('hidden');
    ledOff.classList.add('hidden');

} else {
  // Silenciar el audio
    // audio.volume = (volumeSlider.value / 0);
    audio.pause();
    ledOn.classList.add('hidden');
    ledOnTxt.classList.add('hidden');
    ledOff.classList.remove('hidden');
    ledOffTxt.classList.remove('hidden');
    stopBtn.classList.add("hidden");
    sliderSkip.classList.add("hidden");
}
});

// Sincronización de sliders con ajuste visual
function syncSliders(source, target) {
    target.value = source.value;
}
const slider = document.querySelector('.slider');

slider.addEventListener('input', (e) => {
    const value = (e.target.value / e.target.max) * 100;
    slider.style.setProperty('--progress', `${value}%`);
});

volumeSlider.addEventListener('input', () => {
    const volume = (volumeSlider.value / 100);
    volumeSlider2.value = volumeSlider.value;
    if (isMusicOn) {
        audio.volume = volume;
    }
    syncSliders(volumeSlider, volumeSlider2);
});

volumeSlider2.addEventListener('input', () => {
    let volume = (volumeSlider2.value / 100);
    // let value = (volumeSlider2.value - volumeSlider2.min) / (volumeSlider2.max - volumeSlider2.min) * 100;
    // fill.style.width = `${value}%`;
    if (isMusicOn) {
        audio.volume = volume;
    }
    syncSliders(volumeSlider2, volumeSlider);
});

function updateSliderBackground(slider) {
let value = volumeSlider.value;
let value2 = volumeSlider2.value;

// Gardiente arcoiris
let gradient = `linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)`;

// Ajustar el progreso visible según el valor del slider
volumeSlider.style.background = `
    ${gradient} no-repeat, 
    linear-gradient(to right, #363636 ${value}%, #363636 100%)`;

volumeSlider2.style.background = `
    ${gradient} no-repeat, 
    linear-gradient(to right, #363636 ${value2}%, #363636 100%)`;

// Ajustar el tamaño del gradiente visible dinámicamente
volumeSlider.style.backgroundSize = `${value}% 100%, 100% 100%`;
volumeSlider2.style.backgroundSize = `${value2}% 100%, 100% 100%`;

if (isFF) {
    // Actualizar para Firefox
    addRule(
    `#${slider.id}::-moz-range-progress`,
    `background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)`
    );
}
}

// Función para saltar la introducción
function skipIntro() {
let startFromSecond = 132;
introScreen.classList.add("hidden");
introContent.classList.add("hidden");
skipBtn2.classList.add("hidden");
mainContent.classList.remove("hidden");
stopBtn.classList.remove("hidden");
menuToggle.classList.remove("hidden");
audio.currentTime = startFromSecond;

if (isMusicOn) {
    audio.play();
    audio.volume = (volumeSlider2.value / 100);
    sliderSkip.classList.remove("hidden");
    volumeBkg.classList.add("bg-black");
    updateSliderBackground(volumeSlider2);
 
} else {
    audio.pause();
    stopBtn.classList.add("hidden");
    sliderSkip.classList.add("hidden");
        setTimeout(() => {
            rotateImage();
        }, 900);
}
}
skipBtn.addEventListener("click", skipIntro);
skipBtn2.addEventListener("click", skipIntro);

// Función para manejar el botón de inicio
startBtn.addEventListener("click", () => {
  audio.currentTime = startFromSecond;
  audio.volume = (volumeSlider2.value / 100);
  updateSliderBackground(volumeSlider2);
  audio.play();
  skipBtn2.classList.remove("hidden");
  skipBtn2.classList.add("animate-flyIn");
  volumeBkg.classList.remove("bg-black");

  if (isMusicOn) {
    sliderSkip.classList.remove("hidden");
  } else {
    audio.pause();
  }

  // Nueva implementación con TypewriterJS
  const app = document.getElementById('intro-text'); 
  const typewriter = new Typewriter(app, {
    loop: false, 
    delay: 50, 
    deleteSpeed: 50,
    cursor: '|',
  });
  // Iniciar la animación de texto
  typewriter
    .typeString("Hello, I'm")
    .pauseFor(100)
    .typeString("<br><span class='animate-colorCycle'>Alba Tolosa Bonora</span>")
    .pauseFor(600)
    .deleteAll()
    .pauseFor(200)
    .typeString("<span class='animate-colorFast'>@Nusky7</span>")
    .pauseFor(800)
    .deleteAll()
    .callFunction(() => {
      setTimeout(() => {
        introText.classList.add("hidden");
        profile.classList.remove("hidden");
        profile.style.display = "block";
        profile.style.animation = "rotateImage 4s forwards";

        setTimeout(() => {
          animeImg.style.opacity = "0";
          animeImg.style.display = "none";
          realImg.style.opacity = "1";
          realImg.style.display = "block";
        }, 1000);
      }, 200);

      setTimeout(() => {
        mainContent.style.display = "block";
        introScreen.style.display = "none";
        menuToggle.classList.remove("hidden");

        if (isMusicOn) {
          stopBtn.classList.remove("hidden");
          skipBtn2.classList.add("hidden");
          volumeBkg.classList.add("bg-black");
        } else {
          stopBtn.classList.add("hidden");
          rotateImage();
        }
      }, 4500);
    })
    .start();

  startBtn.classList.add("fadeOutScale");
  setTimeout(() => {
    startBtn.classList.add("hidden");
  }, 20);

  controlPanel.classList.add("hidden");
  skipBtn2.classList.remove("animate-flyIn");
  skipBtn2.classList.add("animate-jiggle");
});

  
  hideVolume.addEventListener("click", () => { 
    volumeSlider2.classList.toggle("hidden");
    if (volumeBkg.classList.contains("h-28")) {
        volumeBkg.classList.replace("h-28", "h-72");
    } else {
        volumeBkg.classList.replace("h-72", "h-28");
    }
  });

stopBtn.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0; 
  stopBtn.classList.remove("animate-tadaTwo");
  stopBtn.classList.add("animate-fadeOutScale");
  sliderSkip.classList.add("hidden");
  setTimeout(() => {
    stopBtn.classList.add("hidden"); 
    rotateImage();
  }, 500);
});

  audio.addEventListener("ended", () => {
  stopBtn.classList.remove("animate-tadaTwo");
    stopBtn.classList.add("fadeOutScale");
    sliderSkip.classList.add("hidden");
  setTimeout(() => {
    stopBtn.classList.add("hidden"); 
    rotateImage();
  }, 500); 
});


  function rotateImage() {
  headerAnimeImg.style.animation = "0.5s ease-in-out forwards";
  headerRealImg.style.animation = "rotateImage 0.5s ease-in-out forwards";
  // Cambiar la foto de perfil
  if (headerAnimeImg.classList.contains("hidden")) {
    headerAnimeImg.classList.replace("hidden", "rotate-360");
    headerRealImg.classList.add("hidden");
  } else {
    headerAnimeImg.classList.add("hidden");
    headerRealImg.classList.remove("hidden");
  }
}
  
headerImg.addEventListener("click", () => {
  // Añadir giro
  rotateImage();
});

  function updateLayout() {
  const ytVideos = document.getElementById('youtube-videos');
    if (window.innerWidth <= 839) {
        headerContent.classList.remove('flex');
        headerContent.classList.add('grid');
        donateBtn.classList.add('mx-auto');
        coffee.classList.add('hidden');
        coffeeImg.classList.add('mt-3');
        socialBts.classList.remove('ml-7');
                
    } 
    if (window.innerWidth <= 924) {
      ytVideos.classList.remove('flex'); 
      ytVideos.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))"; 
       ytVideos.classList.add('grid', 'grid-cols-2');

    } else {
        headerContent.classList.remove('grid');
        headerContent.classList.add('flex');
        donateBtn.classList.remove('mx-auto');
        donateBtn.classList.add('mx-3');
        coffee.classList.remove('hidden');
        coffeeImg.classList.remove('mt-3');
        socialBts.classList.add('ml-7');
        ytVideos.classList.add('flex');
        ytVideos.classList.remove('grid', 'grid-cols-2');
        ytVideos.style.gridTemplateColumns = "";
    }
}
  function updateName() {
    const menuTxt = document.getElementById('menu-txt');
    if (window.innerWidth <= 680) {
      name.innerHTML = 'A L B A<br>🌍<br>T &nbsp; B';
      comentsDiv.classList.remove('p-6');
      comentsDiv.classList.add('p-1');
      menu.classList.replace('w-80', 'w-screen'); 
      menuTxt.classList.replace('right-42', 'left-3');
      
    } else {
        name.textContent = 'Alba Tolosa Bonora';
        comentsDiv.classList.add('p-6');
        comentsDiv.classList.remove('p-1');
        menu.classList.replace('w-screen','w-80');
        menuTxt.classList.replace('left-3', 'right-42');
    }
}
  function updateBrand() {
    const ytVideos = document.getElementById('youtube-videos');
    if (window.innerWidth <= 440) {
        tvBrand.classList.add('hidden', 'p-0');
        ytVideos.style.gridTemplateColumns = "repeat(1, minmax(0, 1fr))";
    } else if (window.innerWidth <= 330) {
        tvBrand.classList.add('hidden', 'p-0');
    } else {
        tvBrand.classList.remove('hidden');
        ytVideos.style.gridTemplateColumns = "";
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
  // screenList.classList.toggle('hidden', isScreenOff);

  if (isScreenOff) {
    channelIndicator.classList.add('hidden');
    advertisement.classList.add('hidden');
    screenList.classList.add('hidden');
    button.classList.replace('bg-rose-900', 'bg-stone-500');
    led.classList.replace('bg-green-500', 'bg-red-800');
    led.classList.replace('border-green-500', 'border-red-800');
    led.classList.replace('shadow-[0_0_3px_1.5px_rgba(0,255,0,0.6)]', 'shadow-[0_0_3px_1.5px_rgba(255,0,0,0.6)]');
  } else {
    advertisement.classList.remove('hidden');
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
  
// Agregar el evento al botón de cambiar de canal
  let currentChannel = 0; 
  const channelIndicator = document.getElementById('channel-indicator');

document.getElementById('channelBtn').addEventListener('click', function () {
  const channels = [
    { id: advertisement, name: 'CH 01' },
    // { id: document.getElementById('preview-projects'), name: 'CH 02' },
    { id: screenList, name: 'CH 02' },
  ];

  // Ocultar el canal actual
  channels[currentChannel].id.classList.add('hidden');
  // Cambiar al siguiente canal (con bucle)
  currentChannel = (currentChannel + 1) % channels.length;
  // Mostrar el nuevo canal
  channels[currentChannel].id.classList.remove('hidden');
  // Actualizar y mostrar el indicador de canal
  channelIndicator.textContent = channels[currentChannel].name;
  channelIndicator.classList.remove('hidden');

  // Ocultar el indicador después de 2 segundos
  setTimeout(() => {
    channelIndicator.classList.add('hidden');
    }, 3000);
  });


 
});