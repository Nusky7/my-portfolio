document.addEventListener("DOMContentLoaded", () => {
const emailTab = document.getElementById('email-tab');
const telegramTab = document.getElementById('telegram-tab');
const whatsappTab = document.getElementById('whatsapp-tab');
const emailForm = document.getElementById('email-form');
const whatsappForm = document.getElementById('whatsapp-form');
const telegramForm = document.getElementById('telegram-form');
const loadingSpinner = document.getElementById("loading-spinner");
const subtitle = document.getElementById("panel-subtitle");

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
whatsappForm.addEventListener('submit', function(event) {
  event.preventDefault(); 
  
  let name = document.getElementById('wName').value.trim();
  let msg = document.getElementById('wMessage').value.trim();
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
telegramForm.addEventListener('submit', function(event) {
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
  // Menu
  document.querySelector('a[href="#main-content"]').textContent = translations.menu.about_me;
  document.querySelector('a[href="#projects"]').textContent = translations.menu.projects;
  document.querySelector('a[href="#skills"]').textContent = translations.menu.stack;
  document.querySelector('a[href="#player"]').textContent = translations.menu.audio_player;
  document.querySelector('a[href="#comments-section"]').innerHTML = translations.menu.resources_comments;
  document.querySelector('a[href="#action-panel"]').innerHTML = translations.menu.download_cv;
  document.querySelector('a[href="#contact"]').textContent = translations.menu.contact;
  document.querySelector('a[href="/"]').textContent = translations.menu.intro_panel;

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
  document.getElementById("videos-title").innerHTML = translations.player.videos;
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
  document.getElementById("t-text5").innerHTML = translations.terminal.txt5;
  document.getElementById("http").innerHTML = translations.terminal.http;
  document.getElementById("effects").innerHTML = translations.terminal.effects;
  document.getElementById("development").innerHTML = translations.terminal.development;
  document.getElementById("databases").innerHTML = translations.terminal.databases;
  document.getElementById("maps").innerHTML = translations.terminal.maps;
  document.getElementById("design").innerHTML = translations.terminal.design;
  document.getElementById("community").innerHTML = translations.terminal.community;
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
    // color: 0x9b8b96,
    // color: 0x7c7679,
    // color: 0x9ca3af,
    color: 0x9f8898,
    backgroundColor: 0x18181B
  })
});