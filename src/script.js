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


headerImg.addEventListener("click", () => {
  // Añadir giro
  headerAnimeImg.style.animation = "rotateImage 0.5s forwards";
  headerRealImg.style.animation = "rotateImage 0.5s forwards";
  // Cambiar la foto de perfil
  if (headerAnimeImg.classList.contains("hidden")) {
    headerAnimeImg.classList.remove("hidden");
    headerRealImg.classList.add("hidden");
  } else {
    headerAnimeImg.classList.add("hidden");
    headerRealImg.classList.remove("hidden");
  }
});

// startBtn.addEventListener("click", () => {
//   audio.currentTime = startFromSecond;
//   audio.volume = 0; 
//   audio.play();

//   const fadeInDuration = 5000;
//   const intervalDuration = 33; 
//   const volumeIncrement = 1 / (fadeInDuration / intervalDuration); 

//   const fadeIn = setInterval(() => {
//     if (audio.volume < 1) {
//       audio.volume = Math.min(audio.volume + volumeIncrement, 1);
//     } else {
//       clearInterval(fadeIn);
//     }
//   }, intervalDuration);

//   setTimeout(() => {
//   typeText();
//   }, 20); 

//     startBtn.classList.add("hidden"); 
// });

stopAudioBtn.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0; 
  stopAudioBtn.classList.add("animate-reduceAndFade");
  setTimeout(() => {
    stopAudioBtn.classList.add("animate-reduceAndFade"); 
  }, 100); 
});

audio.addEventListener("ended", () => {
  stopAudioBtn.classList.add("fadeOutScale");
  setTimeout(() => {
    stopAudioBtn.classList.add("hidden"); 
  }, 100); 
});


function typeText() {
  introText.innerHTML = "<span class='typing'>Hello, I'm</span>";

  setTimeout(() => {
    introText.innerHTML = "<span class='typing'>Hello, I'm</span><br><span class='typing animate-colorCycle'>Alba Tolosa Bonora</span>";

    setTimeout(() => {
      introText.classList.add("erase");

      setTimeout(() => {
        introText.classList.remove("erase");
        introText.innerHTML = "<span class='typing git animate-colorFast>@Nusky7</span>";

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
            headerAnimeImg.classList.add("rotate");
            headerRealImg.classList.remove("hidden");
            headerRealImg.classList.add("rotate");
            headerRealImg.classList.add("hidden");
            headerAnimeImg.style.animation = "rotateImage 0.5s forwards";
            headerRealImg.style.animation = "rotateImage 0.5s forwards";
            
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
  emailTab.classList.add('bg-stone-500', 'animate-colorSlow');
  whatsappTab.classList.remove('bg-stone-500', 'animate-colorSlow');
  telegramTab.classList.remove('bg-stone-500', 'animate-colorSlow', 'border-l-2');
  telegramTab.classList.add('border-r-2');
  whatsappTab.classList.add('bg-black');
});

whatsappTab.addEventListener('click', () => {
  whatsappForm.classList.remove('hidden');
  emailForm.classList.add('hidden');
  telegramForm.classList.add('hidden');
  whatsappTab.classList.remove('bg-stone-500', 'border-l-2');
  whatsappTab.classList.add('bg-stone-500', 'animate-colorSlow');
  emailTab.classList.remove('bg-stone-500', 'animate-colorSlow');
  telegramTab.classList.add('border-l-2');
  telegramTab.classList.remove('bg-stone-500', 'animate-colorSlow', 'border-r-2');
  emailTab.classList.add('bg-black','border-l-2');
});

telegramTab.addEventListener('click', () => {
  telegramForm.classList.remove('hidden');
  whatsappForm.classList.add('hidden');
  emailForm.classList.add('hidden');
  telegramTab.classList.remove('bg-black', 'border-l-2');
  telegramTab.classList.add('bg-stone-500', 'animate-colorSlow');
  whatsappTab.classList.remove('bg-stone-500', 'animate-colorSlow', 'border-l-2');
  emailTab.classList.remove('bg-stone-500', 'animate-colorSlow');
  emailTab.classList.add('bg-black', 'border-l-2');
  
});
// Animación CV - Contrata mis servicios hoy misme
function startAnimation() {
  subtitle.classList.add("animate-blinkAndBounce");

  setTimeout(() => {
    subtitle.classList.remove("animate-blinkAndBounce");
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
  document.getElementById("about-heading").textContent = translations.about.heading;
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
    });
    const submitButton = form.querySelector("button[type='submit']");
      if (submitButton) {
        submitButton.textContent = translations.form.submit;
      }
    });
    
};

const langButtons = document.querySelectorAll('.lang-btn');
const activeClass = 'animate-spin';

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


});