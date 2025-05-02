document.addEventListener("DOMContentLoaded", () => {
const emailTab = document.getElementById('email-tab');
const telegramTab = document.getElementById('telegram-tab');
const whatsappTab = document.getElementById('whatsapp-tab');
const emailForm = document.getElementById('email-form');
const whatsappForm = document.getElementById('whatsapp-form');
const telegramForm = document.getElementById('telegram-form');
const loadingSpinner = document.getElementById("loading-spinner");
const subtitle = document.getElementById("panel-subtitle");


  const swiper = new Swiper('.swiper-container', {
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
  
changeCVLang('es');

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  toastMsg.innerHTML = msg;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3900);
}

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
    translations = await response.json();
    console.log("Translations loaded:", translations);
    applyTranslations(translations); 
    initializeRateIt(); 
  } catch (error) {
    console.error("Error loading translations:", error);
  }
};

  const applyTranslations = (translations) => {
  // Menu
  document.querySelector('a[href="#main-content"]').textContent = translations.menu.about_me;
  document.querySelector('a[href="#projects"]').textContent = translations.menu.projects;
  document.querySelector('a[href="#skills"]').textContent = translations.menu.stack;
  document.querySelector('a[href="#player"]').textContent = translations.menu.audio_player;
  document.querySelector('a[href="#comments-section"]').innerHTML = translations.menu.resources_comments;
  document.querySelector('a[href="#action-panel"]').innerHTML = translations.menu.download_cv;
  document.querySelector('a[href="#contact"]').textContent = translations.menu.contact;
  document.querySelector('a[href="https://services.nusky7studio.es"]').textContent = translations.menu.intro_panel;
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
  document.getElementById("landingInmo").innerHTML = translations.projects.landingInmo;
  document.getElementById("blog").innerHTML = translations.projects.blog;
  document.getElementById("project").innerHTML = translations.projects.project;
  document.getElementById("project1").innerHTML = translations.projects.project1;
  document.getElementById("project2").innerHTML = translations.projects.project2;
  document.getElementById("project3").innerHTML = translations.projects.project3;
  document.getElementById("project4").innerHTML = translations.projects.project4;
  document.getElementById("project5").innerHTML = translations.projects.project5;
  //Action Panel
  document.getElementById("button-text").innerHTML = translations.panel.buttonText;
  document.getElementById("button-text1").innerHTML = translations.panel.buttonText1;
  document.getElementById("panel-title").innerHTML = translations.panel.panelTitle;
  document.getElementById("panel-subtitle").innerHTML = translations.panel.panelSubitle;
  document.getElementById("panel-text").innerHTML = translations.panel.panelText;
  document.getElementById("contact-title").innerHTML = translations.panel.contact;
  // Player
  document.getElementById("song-title").innerHTML = translations.player.songs;
  document.getElementById("videos-title").innerHTML = translations.player.videos;
  // Forms
  // document.querySelectorAll("form").forEach(form => {
  //   form.querySelectorAll("input, textarea").forEach(input => {
  //     const name = input.getAttribute("name");
  //     if (translations.form[name]) {
  //       input.placeholder = translations.form[name]; 
  //     }

      
  //   });
    // Forms
    document.querySelectorAll("form").forEach(form => {
      // Inputs y textareas
      form.querySelectorAll("input, textarea").forEach(input => {
        const name = input.getAttribute("name");
        if (translations.form[name]) {
          input.placeholder = translations.form[name];
        }
  
        // Checkbox → traducir label
        if (input.type === "checkbox" && translations.form[name]) {
          const label = input.closest("label");
          if (label) {
            // Limpia el label y vuelve a insertar el input y el texto traducido
            label.innerHTML = '';
            label.appendChild(input);
            label.append(" " + translations.form[name]);
          }
        }        
      });
  
      // Selects: solo si el placeholder del primer <option> coincide
      form.querySelectorAll("select").forEach(select => {
        select.querySelectorAll("option").forEach(option => {
          const value = option.value;
          if (translations.form[value]) {
            option.textContent = translations.form[value];
          } else if (value === "" && translations.form.interest) {
            option.textContent = translations.form.interest;
          }
        });
      });

      document.querySelectorAll(".privacy-text").forEach(el => {
        if (translations.form.privacy) {
          el.innerHTML = `
            <input type="checkbox" checked readonly class="accent-rose-500 mr-2 pointer-events-none select-none" />
            ${translations.form.privacy}
          `;
        }
      });
     
      // Botón submit
      const submitButton = form.querySelector("button[type='submit']");
      if (submitButton && translations.form.submit) {
        submitButton.textContent = translations.form.submit;
      }
  
      // Botón de llamada
      const callButton = form.querySelector('button[onclick*="tel:"]');
      if (callButton && translations.form.call) {
        callButton.textContent = translations.form.call;
      }
    });
  
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
  document.getElementById("t-text5").innerHTML = translations.terminal.txt5;
  document.getElementById("http").innerHTML = translations.terminal.http;
  document.getElementById("effects").innerHTML = translations.terminal.effects;
  document.getElementById("development").innerHTML = translations.terminal.development;
  document.getElementById("databases").innerHTML = translations.terminal.databases;
  document.getElementById("maps").innerHTML = translations.terminal.maps;
  document.getElementById("design").innerHTML = translations.terminal.design;
  document.getElementById("community").innerHTML = translations.terminal.community;

    };
     

// Ratings ★ 
let translations = {};
// Función para obtener el texto traducido
function t(key, variables = {}) {
   if (!translations.toastMsgs && !translations.ratingStats) {
    console.warn("Translations not loaded yet!");
    return key;
  }
  let text = key.split('.').reduce((o, i) => (o ? o[i] : null), translations) || key;
  Object.keys(variables).forEach((varKey) => {
    text = text.replace(`{${varKey}}`, variables[varKey]);
  });
  return text;
}

const initializeRateIt = () => {
    if (typeof $.fn.rateit === 'undefined') {
        console.error("RateIt.js no se ha cargado correctamente. Esperando...");
        setTimeout(initializeRateIt, 500); // Reintentar después de 500ms
        return;
    }

    $(document).ready(function () {
        console.log("Inicializando RateIt...");
        $('.rateit').rateit({
            max: 5,
            step: 1,
            backingfld: '#backing',
            resetable: false
        });

        // Verificar si el usuario votó
        if (localStorage.getItem('userVoted')) {
            $('.rateit').rateit('readonly', true);
        }

        // Manejar el evento 'rated'
        $('.rateit').on('rated', function (event, value) {
            if (value === undefined) {
                console.error("El valor de la calificación no fue capturado correctamente.");
            } else {
                console.log("Calificación seleccionada:", value);
                showToast(t('toastMsgs.toastRated', { value: value }));
                localStorage.setItem('userVoted', true);
                $('.rateit').rateit('readonly', true);
            }

            // Enviar la valoración al servidor
            $.post('https://nusky7studio.es/php/save_rating.php', { rating: value }, function (response) {
                const res = JSON.parse(response);
                if (res.status === 'success') {
                    console.log('Rating guardado con éxito.');
                    fetchRatings(); // Actualizar total
                } else {
                    console.log('Error al guardar rating: ' + res.message);
                }
            });
        });

        // Obtener estadísticas de valoraciones
        function fetchRatings() {
            $.get('https://nusky7studio.es/php/get_ratings.php', function (response) {
                const res = JSON.parse(response);
                if (res.status === 'success') {
                    $('#total-votes').text(t('ratingStats.votes', { total: res.total_votes }));
                    $('#average-rating').text(t('ratingStats.average', { average: res.average_rating.toFixed(1) }));
                    $('.rateit').rateit('value', res.average_rating); // Mostrar promedio
                }
            });
        }

        fetchRatings();
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

});