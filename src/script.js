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

// loadTranslations("es");
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

startBtn.addEventListener("click", () => {
  audio.currentTime = startFromSecond;
  audio.volume = 0; 
  audio.play();

  const fadeInDuration = 5000;
  const intervalDuration = 33; 
  const volumeIncrement = 1 / (fadeInDuration / intervalDuration); 

  const fadeIn = setInterval(() => {
    if (audio.volume < 1) {
      audio.volume = Math.min(audio.volume + volumeIncrement, 1);
    } else {
      clearInterval(fadeIn);
    }
  }, intervalDuration);


  setTimeout(() => {
  typeText();
  }, 20); 

    startBtn.classList.add("hidden"); 
});

stopAudioBtn.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0; 
  stopAudioBtn.classList.add("hidden"); 
});
audio.addEventListener("ended", () => {
  stopAudioBtn.classList.add("hidden"); 
});


function typeText() {
  introText.innerHTML = "<span class='typing'>Hello, I'm</span>";

  setTimeout(() => {
    introText.innerHTML = "<span class='typing'>Hello, I'm</span><br><span class='typing'>Alba Tolosa Bonora</span>";

    setTimeout(() => {
      introText.classList.add("erase");

      setTimeout(() => {
        introText.classList.remove("erase");
        introText.innerHTML = "<span class='typing git'>@Nusky7</span>";

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
// window.onload = typeText;
// window.onload.audio.mute();


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
  document.getElementById("project1").innerHTML = translations.projects.project1;
  document.getElementById("project2").innerHTML = translations.projects.project2;
  document.getElementById("project3").innerHTML = translations.projects.project3;
  document.getElementById("project4").innerHTML = translations.projects.project4;
  //Action Panel
  document.getElementById("button-text").innerHTML = translations.panel.buttonText;
  document.getElementById("panel-title").innerHTML = translations.panel.panelTitle;
  document.getElementById("panel-text").innerHTML = translations.panel.panelText;
  // Player
  document.getElementById("song-title").innerHTML = translations.player.songs;

};

// Animar botón seleccionado
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

// Idioma predeterminado
loadTranslations("es");

});

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




