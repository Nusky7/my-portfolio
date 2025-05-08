document.addEventListener("DOMContentLoaded", () => {

    const langToggle = document.getElementById("lang-toggle");
    const flagImg = document.getElementById("lang-flag");
  
    const updateLang = (lang) => {
      loadTranslations(lang);
      langToggle.dataset.lang = lang;
      flagImg.src = lang === "es" ? "/img/en.png" : "/img/es.png"; // icono del idioma alternativo
      flagImg.alt = lang === "es" ? "en" : "es";
    };
  
    langToggle.addEventListener("click", () => {
      const currentLang = langToggle.dataset.lang;
      const nextLang = currentLang === "es" ? "en" : "es";
      updateLang(nextLang);
    });
  

const frases = [
    "🚀 Estás en la lanzadera N7",
    "Accede a mis sitios relevantes",
    "🛰️ Portfolio, Servicios, Blog, CV...",
    "🎨 Diseño, frontend y creatividad",
    "🛸 Enlaces directos a mis mundos",
    "📡 Conexión establecida — N7S"
    ];
    
    let index = 0;
    const texto = document.getElementById("marqueeText");
    
    setInterval(() => {
        index = (index + 1) % frases.length;
        texto.classList.add("opacity-0");
    
        setTimeout(() => {
        texto.textContent = frases[index];
        texto.classList.remove("opacity-0");
        }, 400); // Desvanecer
    }, 9200);

    let translations = {};
  
    const langButtons = document.querySelectorAll(".lang-btn");
    const activeClass = "animate-pulse";
  
    langButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedLang = button.dataset.lang;
  
        // Activar clase visual
        langButtons.forEach((btn) => btn.classList.remove(activeClass));
        button.classList.add(activeClass);
  
        // Cargar traducción
        loadTranslations(selectedLang);
      });
    });
  
    async function loadTranslations(lang) {
      try {
        const res = await fetch(`../locales/${lang}.json`);
        translations = await res.json();
        console.log("Traducciones cargadas:", translations);
        applyTranslations();
      } catch (error) {
        console.error("Error al cargar traducciones:", error);
      }
    }
  
    function applyTranslations() {
      // Título principal
      const titleEl = document.getElementById("lanzadera-title");
      if (titleEl) titleEl.innerHTML = translations.lanzadera.title;
  
      // Subtítulo contacto
      const contactTitle = document.getElementById("contact-title");
      if (contactTitle) contactTitle.innerHTML = translations.lanzadera.contact;

      // Boton Presupuestos
      const quoteBtn = document.getElementById("quote-btn");
      if (quoteBtn) quoteBtn.innerHTML = translations.lanzadera.quoteBtn;

      const quoteTxt = document.getElementById("quote-txt");
      if (quoteTxt) quoteTxt.innerHTML = translations.lanzadera.quoteTxt;
  
      // Meta og:description
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", translations.lanzadera.ogDescription);
  
      // Servicios Web
      const servicesTitle = document.querySelector('[alt="Servicios Web"] + div h3');
      const servicesText = document.querySelector('[alt="Servicios Web"] + div p');
      if (servicesTitle) servicesTitle.textContent = translations.lanzadera.servicesTitle;
      if (servicesText) servicesText.textContent = translations.lanzadera.servicesText;
  
      // Portfolio
      const portfolioTitle = document.querySelector('[alt="Portfolio"] + div h3');
      const portfolioText = document.querySelector('[alt="Portfolio"] + div p');
      if (portfolioTitle) portfolioTitle.textContent = translations.lanzadera.portfolioTitle;
      if (portfolioText) portfolioText.textContent = translations.lanzadera.portfolioText;

       // Blog
        const blogTitle = document.querySelector('[alt="N7Blog"] + div h3');
        const blogText = document.querySelector('[alt="N7Blog"] + div p');
        if (blogTitle) blogTitle.textContent = translations.lanzadera.blogTitle;
        if (blogText) blogText.innerHTML = translations.lanzadera.blogText;

        // Newsletter
        const newsletterTitle = document.querySelector('[alt="N7 Newsletter"] + div h3');
        const newsletterText = document.querySelector('[alt="N7 Newsletter"] + div p');
        if (newsletterTitle) newsletterTitle.textContent = translations.lanzadera.newsletterTitle;
        if (newsletterText) newsletterText.innerHTML = translations.lanzadera.newsletterText;

        // CV
        const cvTitle = document.querySelector('[alt="CV Online"] + div h3');
        const cvText = document.querySelector('[alt="CV Online"] + div p');
        if (cvTitle) cvTitle.textContent = translations.lanzadera.cvTitle;
        if (cvText) cvText.textContent = translations.lanzadera.cvText;

        // Cambiar el enlace del CV según idioma
        const cvLink = document.getElementById("cv");
        if (cvLink) {
          cvLink.href = translations.lanzadera.cvUrl;
}

  
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
    }
  
    loadTranslations("es");
    updateLang("es");
  });
  