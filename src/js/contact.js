document.addEventListener("DOMContentLoaded", () => {
  const emailTab = document.getElementById("email-tab");
  const telegramTab = document.getElementById("telegram-tab");
  const whatsappTab = document.getElementById("whatsapp-tab");

  const emailForm = document.getElementById("email-form");
  const telegramForm = document.getElementById("telegram-form");
  const whatsappForm = document.getElementById("whatsapp-form");
  const loadingSpinner = document.getElementById("loading-spinner");

  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
  
    toastMsg.innerHTML = msg;
    toast.classList.remove('hidden');
  
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 4100);
  }

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

  const toggleTabs = (activeForm, ...inactiveForms) => {
    activeForm.classList.remove("hidden");
    inactiveForms.forEach((form) => form.classList.add("hidden"));
  };

  // Tab switching logic
  emailTab.addEventListener("click", () => {
    toggleTabs(emailForm, telegramForm, whatsappForm);
  });

  telegramTab.addEventListener("click", () => {
    toggleTabs(telegramForm, emailForm, whatsappForm);
  });

  whatsappTab.addEventListener("click", () => {
    toggleTabs(whatsappForm, emailForm, telegramForm);
  });

  // Helper to get extras
  const getExtras = (form) => {
    const extras = [];
    if (form.elements["express"]?.checked) extras.push("☑️ Landing Page");
    if (form.elements["seo"]?.checked) extras.push("☑️ Mejora SEO");
    if (form.elements["branding"]?.checked) extras.push("☑️ Dominio y Correo");
    return extras.join(" ");
  };
   
  const phoneInput = document.querySelector("input[name='phone']");
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "es",
    preferredCountries: [
      "es", "it", "fr", "gb", "ch", "be", "de", "dk",
      "gr", "ie", "nl", "no", "pt", "se", "us"
    ],
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
  });

  // EMAIL FORM handler
  emailForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loadingSpinner.classList.remove("hidden");

    const name = emailForm.elements["name"].value.trim();
    const email = emailForm.elements["email"].value.trim();
    const interes = emailForm.elements["interes"].value;
    const phone = emailForm.elements["phone"].value;
    const message = emailForm.elements["message"].value.trim();
    const extras = getExtras(emailForm);

    if (!name || !email || !phone) {
      showToast("⚠️ Por favor, completa todos los campos obligatorios.");
      loadingSpinner.classList.add("hidden");
      return;
    }

    const fullMessage = `
      ${message}
    `;

    try {
      const response = await fetch("https://nusky7studio.es/php/send_email.php", {
        method: "POST",
        mode: "cors", 
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ 
          name, 
          email, 
          message: fullMessage,
          phone,         
          prefix: '+' + iti.getSelectedCountryData().dialCode,
          interes,         
          extras
        }),        
      });

      if (response.ok) {
        showToast("Mensaje enviado con éxito. <br>Pronto recibirás una respuesta.");
        emailForm.reset();
      } else {
        throw new Error("Fallo al enviar el formulario.");
      }
    } catch (error) {
      console.error(error);
      showToast("❌ Hubo un error al enviar tu mensaje. Inténtalo más tarde o utiliza los otros formularios");
    } finally {
      loadingSpinner.classList.add("hidden");
    }
  });

  // TELEGRAM FORM
  telegramForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = telegramForm.elements["user"].value.trim();
    const interes = telegramForm.elements["interes"].value;
    const web = telegramForm.elements["web"].value.trim();
    const message = telegramForm.elements["message"].value.trim();
    const extras = getExtras(telegramForm);

    if (!username || !message) {
      showToast("⚠️ Por favor, completa los campos obligatorios.");
      return;
    }

    const fullMsg = `
      Usuario de Telegram: ${username}
      Interés: ${interes}
      Web actual: ${web || "No indicada"}
      Extras: ${extras || "Ninguno"}
      Mensaje: ${message}
          `.trim();

    const encodedMsg = encodeURIComponent(fullMsg);
    window.open(`https://t.me/Nusky_7?text=${encodedMsg}`, "_blank");
  });

  // WHATSAPP FORM
  whatsappForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = whatsappForm.elements["name"].value.trim();
    const interes = whatsappForm.elements["interes"].value;
    const web = whatsappForm.elements["web"].value.trim();
    const message = whatsappForm.elements["message"].value.trim();
    const extras = getExtras(whatsappForm);

    if (!name || !message) {
      showToast("⚠️ Por favor, completa los campos obligatorios.");
      return;
    }

    const fullMsg = `
      Nombre: ${name}
      Interés: ${interes}
      Web actual: ${web || "No indicada"}
      Extras: ${extras || "Ninguno"}
      Mensaje: ${message}
          `.trim();

          const encodedMsg = encodeURIComponent(fullMsg);
          window.open(`https://wa.me/34675260296?text=${encodedMsg}`, "_blank");
        });


});
