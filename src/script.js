document.addEventListener("DOMContentLoaded", () => {
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
const startFromSecond = 116.5; 
const emailTab = document.getElementById('email-tab');
const telegramTab = document.getElementById('telegram-tab');
const whatsappTab = document.getElementById('whatsapp-tab');
const emailForm = document.getElementById('email-form');
const whatsappForm = document.getElementById('whatsapp-form');
const telegramForm = document.getElementById('telegram-form');
const loadingSpinner = document.getElementById("loading-spinner");
const subtitle = document.getElementById("panel-subtitle");
const skipBtn = document.getElementById("skip-btn");
const skipBtn2 = document.getElementById("skip-btn2");
const introContent = document.getElementById("intro-content");
const stopBtn = document.getElementById("stopAudioBtn");
const controlPanel = document.getElementById("control-panel");
//Intro Box
const toggleMusic = document.querySelector('.peer');
const volumeSlider = document.getElementById('volume-slider');
const volumeSlider2 = document.getElementById('volume-slider2');
const ledOff = document.getElementById('led-off'); 
const ledOn = document.getElementById('led-on'); 
const ledOnTxt = document.getElementById('led-txt'); 
const ledOffTxt = document.getElementById('led-txt-off'); 
const sliderContainer = document.getElementById('slider-container'); 
  const sliderContainer2 = document.getElementById('slider-container2'); 
  const fill = document.querySelector('.slider-fill');

audio.load();
  

window.addEventListener('load', () => {
  document.getElementById("preloader").style.display = "none";
  document.getElementById("intro-content").classList.remove("hidden");
  sliderContainer.classList.remove("hidden");
  
});
  
  
  
// audio.loop = true;

// Estado inicial
let isMusicOn = true;
// document.querySelector('input[type="checkbox"]').checked = true;
// Función para manejar el estado del toggle
toggleMusic.addEventListener('change', () => {
  isMusicOn = toggleMusic.checked;
  if (isMusicOn) {
    // Volver al volumen seleccionado por el slider (escalado al 60%)
    audio.volume = (volumeSlider.value / 100) * 0.6; 
    ledOn.classList.remove('hidden'); 
    ledOnTxt.classList.remove('hidden');
    ledOffTxt.classList.add('hidden'); 
    ledOff.classList.add('hidden'); 
  } else {
    // Silenciar el audio
    audio.pause();
    ledOn.classList.add('hidden'); 
    ledOnTxt.classList.add('hidden'); 
    ledOff.classList.remove('hidden'); 
    ledOffTxt.classList.remove('hidden'); 
    stopBtn.classList.add("hidden"); 
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

  // function volumeChange() {
    volumeSlider.addEventListener('input', () => {
      const volume = (volumeSlider.value / 100) * 0.7;
      volumeSlider2.value = volumeSlider.value;
      const value = (volumeSlider.value - volumeSlider.min) / (volumeSlider.max - volumeSlider.min) * 100;
      if (isMusicOn) {
        audio.volume = volume;
      }
       syncSliders(volumeSlider, volumeSlider2);
    });
  // }

   volumeSlider2.addEventListener('input', () => {
     let volume = (volumeSlider2.value / 100) * 0.7;
      let value = (volumeSlider2.value - volumeSlider2.min) / (volumeSlider2.max - volumeSlider2.min) * 100;
      fill.style.width = `${value}%`;
      if (isMusicOn) {
        audio.volume = volume; 
     }
      syncSliders(volumeSlider2, volumeSlider);
    });
  
 var isFF = true;

var addRule = (function (style) {
  var sheet = document.head.appendChild(style).sheet;
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

function updateSliderBackground(slider) {
  var value = volumeSlider.value;  

  // Mantener el gradiente de arcoíris fijo
  var gradient = `linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)`;
  
  // Ajustar el progreso visible según el valor del slider
  volumeSlider.style.background = `
    ${gradient} no-repeat, 
    linear-gradient(to right, #fff ${value}%, #fff 100%)`;
  
  volumeSlider2.style.background = `
    ${gradient} no-repeat, 
    linear-gradient(to right, #fff ${value}%, #fff 100%)`;
  
  // Ajustar el tamaño del gradiente visible dinámicamente
  volumeSlider.style.backgroundSize = `${value}% 100%, 100% 100%`;
  volumeSlider2.style.backgroundSize = `${value}% 100%, 100% 100%`;

  if (isFF) {
    // Actualizar para navegadores Firefox
    addRule(
      `#${slider.id}::-moz-range-progress`, 
      `background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)`
    );
  }
}

// Inicializar el slider con un valor del 50% al cargar la página
window.addEventListener('load', function () {
 
  volumeSlider.value = 50; // Valor inicial del slider principal
  volumeSlider2.value = volumeSlider.value; // Sincroniza el segundo slider
  
  // Actualiza el fondo de ambos sliders
  updateSliderBackground(volumeSlider);
  updateSliderBackground(volumeSlider2);
});


// Asigna eventos a todos los sliders
document.querySelectorAll(".slider").forEach((slider) => {
  slider.addEventListener("input", function () {
    updateSliderBackground(slider);
  });
});

// Función para saltar la introducción
function skipIntro() {
  let startFromSecond = 126.8; 
  introScreen.classList.add("hidden"); 
  introContent.classList.add("hidden"); 
  mainContent.classList.remove("hidden"); 
  stopBtn.classList.remove("hidden"); 
  audio.currentTime = startFromSecond;

  if (isMusicOn) {
    audio.play();
    audio.volume = (volumeSlider2.value / 100) * 0.7;
    updateSliderBackground(volumeSlider2);
  } else {
    audio.pause(); 
    stopBtn.classList.add("hidden"); 
    rotateImage();
  }
}
skipBtn.addEventListener("click", skipIntro);
skipBtn2.addEventListener("click", skipIntro);

// Función para manejar el botón de inicio
startBtn.addEventListener("click", () => {
  audio.currentTime = startFromSecond;
  audio.volume = 0; 
  audio.play();
  skipBtn2.classList.remove("hidden");
  sliderContainer2.classList.remove("hidden");
  // sliderContainer.classList.add("mt-12", "z-50");
  skipBtn2.classList.add("animate-flyIn"); 

  const fadeInDuration = 5000;
  const intervalDuration = 33; 
  const volumeIncrement = ((volumeSlider2.value / 100) * 0.7) / (fadeInDuration / intervalDuration); 

  const fadeIn = setInterval(() => {
    if (isMusicOn && audio.volume < (volumeSlider2.value / 100) * 0.7) {
      audio.volume = Math.min(audio.volume + volumeIncrement, (volumeSlider2.value / 100) * 0.7);
    } else {
      clearInterval(fadeIn);
    }
  }, intervalDuration);

  setTimeout(() => {
    typeText();
  }, 20); 

  startBtn.classList.add("fadeOutScale");
  setTimeout(() => {
    startBtn.classList.add("hidden");
  }, 20);
  
     
  skipBtn2.classList.remove("hiden");
  controlPanel.classList.add("hidden");
  skipBtn2.classList.add("animate-jiggle");
});

  
  

stopBtn.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0; 
  stopBtn.classList.remove("animate-tadaTwo");
  stopBtn.classList.add("animate-fadeOutScale");
  setTimeout(() => {
    stopBtn.classList.add("hidden"); 
    rotateImage();
  }, 500);
});

  audio.addEventListener("ended", () => {
  stopBtn.classList.remove("animate-tadaTwo");
  stopBtn.classList.add("fadeOutScale");
  setTimeout(() => {
    stopBtn.classList.add("hidden"); 
    rotateImage();
  }, 500); 
});


  function rotateImage() {
  headerAnimeImg.style.animation = "rotateImage 0.5s ease-in-out forwards";
  headerRealImg.style.animation = "rotateImage 0.5s ease-in-out forwards";
  // Cambiar la foto de perfil
  if (headerAnimeImg.classList.contains("hidden")) {
    headerAnimeImg.classList.remove("hidden");
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


function typeText() {
  introText.innerHTML = "<span class='typing'>Hello, I'm</span>";

  setTimeout(() => {
    introText.innerHTML = "<span class='typing'>Hello, I'm</span><br><span class='typing animate-colorCycle'>Alba Tolosa Bonora</span>";

    setTimeout(() => {
      introText.classList.add("erase");

      setTimeout(() => {
        introText.classList.remove("erase");
        introText.innerHTML = "<span class='typing git animate-colorFast'>@Nusky7</span>";

        setTimeout(() => {
          introText.classList.add("erase");

          setTimeout(() => {
            introText.classList.add("hidden");
            profile.classList.remove("hidden");
            profile.style.display = "block";
            profile.style.animation = "rotateImage 5s forwards";

            setTimeout(() => {
              animeImg.style.opacity = "0";
              animeImg.style.display = "none";
              realImg.style.opacity = "1";
              realImg.style.display = "block";
            }, 1500);

          }, 3000);

          setTimeout(() => {
            mainContent.style.display = "block";
            introScreen.style.display = "none";
            if (isMusicOn) {
              stopBtn.classList.remove("hidden");
            } else {
              stopBtn.classList.add("hidden");
              rotateImage();
            }
            rotateImage();
            rotateImage();
          }, 7200);
        }, 2000);
      }, 2000);
    }, 1800);
  }, 500);
}

changeCVLang('es');

// Enviar email
emailForm.addEventListener("submit", async (event) => {
  event.preventDefault(); 
  emailjs.init("39FmjBf7JrQSw9E-2");
  loadingSpinner.classList.remove("hidden");

  const formData = {
    from_name: emailForm.elements["name"].value,
    from_email: emailForm.elements["email"].value,
    message: emailForm.elements["message"].value,
  };

  try {
    // Envío con EmailJS
    const serviceID = "nusky_service";
    const templateID = "nusky_template";
    await emailjs.send(serviceID, templateID, formData, "39FmjBf7JrQSw9E-2");
    console.log("Enviando datos:", formData);

    alert("¡Mensaje enviado con éxito! 😄");
    emailForm.reset();
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    alert("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo. 😥");
  } finally {
    loadingSpinner.classList.add("hidden");
  }
});
// Enviar Whatsapp
document.getElementById('whatsapp-form').addEventListener('submit', function(event) {
  event.preventDefault(); 
  
  let name = document.getElementById('name').value.trim();
  let msg = document.getElementById('message').value.trim();
  let encodedMessage = encodeURIComponent(`Nombre: ${name}\nMensaje: ${msg}`);
  let phoneNumber = '+34675260296';
  let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  if (!name || !msg) {
    alert("Por favor, completa ambos campos antes de enviar el mensaje.");
    return;
  }
  window.open(whatsappURL, '_blank');
});
// Enviar Telegram
document.getElementById('telegram-form').addEventListener('submit', function(event) {
  event.preventDefault();
  let username = document.getElementById('telegram-username').value.trim();
  let msg = document.getElementById('telegram-message').value.trim();
  let encodedMessage = encodeURIComponent(`Usuario: ${username}\nMensaje: ${msg}`);
  let telegramURL = `https://t.me/Nusky_7?text=${encodedMessage}`;

  if (!username || !msg) {
    alert("Por favor, completa ambos campos antes de enviar el mensaje.");
    return;
  }
  window.open(telegramURL, '_blank');
});
// Cambios estilo carpetita contacto
emailTab.addEventListener('click', () => {
  emailForm.classList.remove('hidden');
  whatsappForm.classList.add('hidden');
  telegramForm.classList.add('hidden');
  emailTab.classList.remove('bg-black', 'border-l-2');
  emailTab.classList.add('bg-stone-600', 'animate-colorSlow');
  whatsappTab.classList.remove('bg-stone-600', 'animate-colorSlow');
  telegramTab.classList.remove('bg-stone-600', 'animate-colorSlow', 'border-l-2');
  telegramTab.classList.add('border-r-2');
  whatsappTab.classList.add('bg-black');
});

whatsappTab.addEventListener('click', () => {
  whatsappForm.classList.remove('hidden');
  emailForm.classList.add('hidden');
  telegramForm.classList.add('hidden');
  whatsappTab.classList.remove('bg-stone-600', 'border-l-2');
  whatsappTab.classList.add('bg-stone-600', 'animate-colorSlow');
  emailTab.classList.remove('bg-stone-600', 'animate-colorSlow');
  telegramTab.classList.add('border-l-2');
  telegramTab.classList.remove('bg-stone-600', 'animate-colorSlow', 'border-r-2');
  emailTab.classList.add('bg-black','border-l-2');
});

telegramTab.addEventListener('click', () => {
  telegramForm.classList.remove('hidden');
  whatsappForm.classList.add('hidden');
  emailForm.classList.add('hidden');
  telegramTab.classList.remove('bg-black', 'border-l-2');
  telegramTab.classList.add('bg-stone-600', 'animate-colorSlow');
  whatsappTab.classList.remove('bg-stone-600', 'animate-colorSlow', 'border-l-2');
  emailTab.classList.remove('bg-stone-600', 'animate-colorSlow');
  emailTab.classList.add('bg-black', 'border-l-2');
  
});
// Animación CV - Contrata mis servicios hoy misme
function startAnimation() {
  subtitle.classList.add("animate-blinkAndBounce");
  // donationTitle.classList.add("animate-blinkAndBounce");

  setTimeout(() => {
    subtitle.classList.remove("animate-blinkAndBounce");
    // donationTitle.classList.remove("animate-blinkAndBounce");
  }, 4000);
  setTimeout(startAnimation, 9999);
}
startAnimation();

const loadTranslations = async (lang) => {
  try {
    const response = await fetch(`./locales/${lang}.json`);
    const translations = await response.json();
    console.log(translations);
    applyTranslations(translations);
  } catch (error) {
    console.error("Error loading translations:", error);
  }
};

const applyTranslations = (translations) => {
  // Principal
  document.getElementById("header-subtitle").innerHTML = translations.header.subtitle;
  document.getElementById("about-heading").innerHTML = translations.about.heading;
  document.getElementById("about-description").innerHTML = translations.about.description;
  // Proyectos
  const showElements = document.querySelectorAll(".show");
    showElements.forEach((element) => {
      element.innerHTML = translations.projects.show;
    });
  document.getElementById("project-title").textContent = translations.projects.title;
  document.getElementById("working").innerHTML = translations.projects.working;
  document.getElementById("project").innerHTML = translations.projects.project;
  document.getElementById("project1").innerHTML = translations.projects.project1;
  document.getElementById("project2").innerHTML = translations.projects.project2;
  document.getElementById("project3").innerHTML = translations.projects.project3;
  document.getElementById("project4").innerHTML = translations.projects.project4;
  //Action Panel
  document.getElementById("button-text").innerHTML = translations.panel.buttonText;
  document.getElementById("panel-title").innerHTML = translations.panel.panelTitle;
  document.getElementById("panel-subtitle").innerHTML = translations.panel.panelSubitle;
  document.getElementById("panel-text").innerHTML = translations.panel.panelText;
  document.getElementById("contact-title").innerHTML = translations.panel.contact;
  // Player
  document.getElementById("song-title").innerHTML = translations.player.songs;
  // Forms
  document.querySelectorAll("form").forEach(form => {
    form.querySelectorAll("input, textarea").forEach(input => {
      const name = input.getAttribute("name");
      if (translations.form[name]) {
        input.placeholder = translations.form[name]; 
      }
      // Donations 
      document.getElementById('donation-title').innerHTML = translations.donations.title;
      document.getElementById('donate-with').innerHTML = translations.donations.text;
      document.getElementById('coffee').innerHTML = translations.donations.button;
      document.getElementById('btext').innerHTML = translations.donations.btext;
      // Terminal
       document.getElementById('t-text').innerHTML = translations.terminal.title;
       document.getElementById('t-text1').innerHTML = translations.terminal.txt;
       document.getElementById('t-text2').innerHTML = translations.terminal.txt1;
       document.getElementById('t-text3').innerHTML = translations.terminal.txt2;
       document.getElementById('t-text4').innerHTML = translations.terminal.txt3;
       document.getElementById('comments-title').innerHTML = translations.terminal.txt4;
  
    });
    const submitButton = form.querySelector("button[type='submit']");
      if (submitButton) {
        submitButton.textContent = translations.form.submit;
      }
    });
    
};

const langButtons = document.querySelectorAll('.lang-btn');
const activeClass = 'animate-pulse';

document.getElementById('lang-switch-es').classList.add(activeClass);
langButtons.forEach(button => {
  button.addEventListener('click', () => {
    langButtons.forEach(btn => btn.classList.remove(activeClass));
    button.classList.add(activeClass);
  });
});

// Cambiar el idioma
document.getElementById("lang-switch-es").addEventListener("click", () => {
  loadTranslations("es");
});
document.getElementById("lang-switch-en").addEventListener("click", () => {
  loadTranslations("en");
});
loadTranslations("es");


function changeCVLang(language) {
  const downloadButton = document.getElementById('download-cv');

  let fileUrl;
  let fileName;

  if (language === 'en') {
    fileUrl = 'https://nusky7studio.es/cv/cv-en.pdf';
    fileName = 'cv-en.pdf';
  } else if (language === 'es') {
    fileUrl = 'https://nusky7studio.es/cv/cv-es.pdf';
    fileName = 'cv-es.pdf';
  }

  downloadButton.onclick = function() {
    const tempLink = document.createElement('a');
    tempLink.href = fileUrl;
    tempLink.target = '_blank'; 
    tempLink.download = fileName; 
    tempLink.click();
  };
}

document.getElementById('lang-switch-en').onclick = function() {
  changeCVLang('en');
};

document.getElementById('lang-switch-es').onclick = function() {
  changeCVLang('es');
  };
  
  VANTA.TOPOLOGY({
  el: "#html",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.30,
  scaleMobile: 1.20,
  color: 0x9f7a8f,
  /*color: 0x9f8898,*/
  backgroundColor: 0x18181B
})
  

});