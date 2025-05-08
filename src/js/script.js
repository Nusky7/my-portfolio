 
document.addEventListener("DOMContentLoaded", () => {
  
function toggleAboutText() {
  const desc = document.getElementById("about-description");
  const btn = document.getElementById("toggle-about");
  desc.classList.toggle("max-h-[8.5rem]");
  if (btn.innerText === "Leer más") {
    btn.innerText = "Cerrar";
  } else {
    btn.innerText = "Leer más";
  }
}

const toggleBtn = document.getElementById("toggle-about");
if (toggleBtn) {
  toggleBtn.addEventListener("click", toggleAboutText);
}

  
// changeCVLang('es');

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  toastMsg.innerHTML = msg;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3900);
}

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

  //Cambiar URL CV
  const cvLink = document.getElementById("cv");
    if (cvLink && translations.lanzadera?.cvUrl) {
      cvLink.href = translations.lanzadera.cvUrl;
    }

  // Menu
  document.querySelector('a[href="#main-content"]').textContent = translations.menu.about_me;
  document.querySelector('a[href="#projects"]').textContent = translations.menu.projects;
  document.querySelector('a[href="#skills"]').textContent = translations.menu.stack;
  document.querySelector('a[href="#player"]').textContent = translations.menu.audio_player;
  // document.querySelector('a[href="#comments-section"]').innerHTML = translations.menu.resources_comments;
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
  document.getElementById("pWeb-title").innerHTML = translations.projects.pWebTitle;
  document.getElementById("presupuestoWeb").innerHTML = translations.projects.presupuestoWeb;
  document.getElementById("galaVlc").innerHTML = translations.projects.galaValencia;
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
  // Banner final
  document.getElementById("ban2txt").innerHTML = translations.panel.bannerTxt;
  // Player
  document.getElementById("song-title").innerHTML = translations.player.songs;
  document.getElementById("videos-title").innerHTML = translations.player.videos;
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

      document.querySelectorAll(".form-extra").forEach(el => {
        if (translations.form.extra) {
          el.textContent = translations.form.extra;
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
  const donateWith = document.getElementById('donate-with');
  if (donateWith && translations.donations?.text) {
    donateWith.innerHTML = translations.donations.text;
  }

  const coffeeButton = document.getElementById('coffee');
  if (coffeeButton && translations.donations?.button) {
    coffeeButton.innerHTML = translations.donations.button;
  }

  const btext = document.getElementById('btext');
  if (btext && translations.donations?.btext) {
    btext.innerHTML = translations.donations.btext;
}

  // Terminal
  document.getElementById('t-text').innerHTML = translations.terminal.title;
  document.getElementById('t-text1').innerHTML = translations.terminal.txt;
  document.getElementById('t-text2').innerHTML = translations.terminal.txt1;
  document.getElementById('t-text3').innerHTML = translations.terminal.txt2;
  document.getElementById('t-text4').innerHTML = translations.terminal.txt3;
  // document.getElementById('comments-title').innerHTML = translations.terminal.txt4;
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
  function fetchRatings() {
    console.log("Llamando a fetchRatings...");
    $.get('https://nusky7studio.es/php/get_ratings.php', function (res) {
        console.log("Respuesta de ratings:", res);
        if (res.status === 'success') {
            $('#total-votes').text(t('ratingStats.votes', { total: res.total_votes }));
            $('#average-rating').text(t('ratingStats.average', { average: res.average_rating.toFixed(1) }));
            $('.rateit').rateit('value', res.average_rating);
        } else {
            console.warn("Respuesta no fue success:", res);
        }
    }).fail(function(err) {
        console.error("Error en fetchRatings:", err);
    });
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

});