
const promoCodes = {
    "NUSKY710": 0.10,
    "LANZADERA5": 0.05,
    "N7VIPS": 0.20 
  };

  document.querySelectorAll('.leer-mas-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.leer-mas-container');
      const expanded = container.classList.toggle('expanded');

      if (expanded) {
        container.style.maxHeight = container.scrollHeight + "px";
        btn.textContent = "Leer menos";
      } else {
        container.style.maxHeight = "300px";
        btn.textContent = "Leer más";
      }
    });
  });
  
  let appliedDiscount = 0;

  const phoneInput = document.querySelector("input[name='phone']");
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "es",
    preferredCountries: [
      "es", "it", "fr", "gb", "ch", "be", "de", "dk",
      "gr", "ie", "nl", "no", "pt", "se", "us"
    ],
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
  });

  function applyPromo() {
    const input = document.getElementById("promoCode").value.trim().toUpperCase();
    const feedback = document.getElementById("promoFeedback");
  
    if (promoCodes[input]) {
      appliedDiscount = promoCodes[input];
      feedback.textContent = `Descuento del ${appliedDiscount * 100}% aplicado ✅`;
      feedback.classList.remove("hidden");
      document.getElementById("promoCode").value = ""; 
      calculateQuote(); // recalcula con descuento
    } else {
      appliedDiscount = 0;
      feedback.innerHTML = '<span class="text-rose-500">Código no válido ❌</span>';
      document.getElementById("promoCode").value = ""; 
      feedback.classList.remove("hidden");
      calculateQuote(); // Elimina el descuento anterior si el campo está vacío
    }
  }     

function resetForm() {
    document.getElementById("quoteForm").reset();
    document.getElementById("formOptions").classList.add("hidden");
    document.getElementById("total").textContent = "0 €";
    document.getElementById("ivaInfo").classList.add("hidden");
    document.getElementById("promoFeedback").classList.add("hidden");
    document.getElementById("promoCode").value = ""; 
    appliedDiscount = 0;
  }
  
function toggleFormOptions() {
    const checkbox = document.getElementById("customForm");
    const container = document.getElementById("formOptions");
    container.classList.toggle("hidden", !checkbox.checked);
  }

  function calculateQuote() {
    const base = parseInt(document.getElementById("webType").value);
    const urgency = parseFloat(document.getElementById("urgency").value);
    const pages = Math.max(1, parseInt(document.getElementById("pages").value));
    const pageCost = pages > 1 ? (pages - 1) * 60 : 0;
    const supportExtra = parseInt(document.getElementById("supportLevel").value) || 0;
  
    const extras = [...document.querySelectorAll('input[type="checkbox"]:checked')]
      .filter(el => el.id !== "customForm" && !isNaN(parseInt(el.value)))
      .reduce((sum, el) => sum + parseInt(el.value), 0);
  
    const extraForms = document.getElementById("customForm").checked
      ? parseInt(document.getElementById("formCount").value) * 50
      : 0;
  
    const hostingCost = parseFloat(document.getElementById("hostingOption").value) || 0;
    const extraDomainsCost = parseFloat(document.getElementById("extraDomains").value) || 0;
  
    const customHours = parseInt(document.getElementById("customHours").value) || 0;
    const hourlyRate = 30;
    const hourlyCost = customHours * hourlyRate;
    const subtotal = base + extras + extraForms + pageCost + supportExtra + hostingCost + extraDomainsCost + hourlyCost;
    const totalBase = subtotal * urgency;
    const ivaCheckbox = document.getElementById("includeIVA");
    const ivaRate = ivaCheckbox && ivaCheckbox.checked ? 0.21 : 0;
    const discountAmount = totalBase * appliedDiscount;
    const totalWithDiscount = totalBase - discountAmount;
    const ivaAmount = totalWithDiscount * ivaRate;
    const totalConIVA = totalWithDiscount + ivaAmount;
  
    document.getElementById("total").textContent = totalConIVA.toFixed(2) + " €";
  
    const ivaInfo = document.getElementById("ivaInfo");
    if (ivaCheckbox && ivaCheckbox.checked) {
      ivaInfo.classList.remove("hidden");
      document.getElementById("ivaAmount").textContent = ivaAmount.toFixed(2);
    } else {
      ivaInfo.classList.add("hidden");
    }
  }    
  // Añade el logo y los datos del cliente al presupuesto
  function addLogoToPDF(doc, callback) {
    const img = new Image();
    img.src = "/img/logos/nSteel.png"; 
    img.crossOrigin = "anonymous";
  
    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Hacer el canvas cuadrado usando el lado más largo
      const size = Math.max(img.width, img.height);
      canvas.width = size;
      canvas.height = size;
      
      const ctx = canvas.getContext("2d");
      // Centrar la imagen en el canvas cuadrado
      const x = (size - img.width) / 2;
      const y = (size - img.height) / 2;
      ctx.drawImage(img, x, y);
      
      const base64 = canvas.toDataURL("image/png");
      // Usar el mismo tamaño para ancho y alto en el PDF
      doc.addImage(base64, "PNG", 150, 10, 30, 30);
      
      let yPos = 40;
      const clientName = document.getElementById("clientName").value.trim();
      const clientEmail = document.getElementById("clientEmail").value.trim();
      const clientPhone = document.getElementById("clientPhone").value.trim();

      doc.setFontSize(13);
      doc.setTextColor(80);
      doc.text(`Cliente: ${clientName || "-"}`, 20, yPos); yPos += 7;
      doc.text(`Email: ${clientEmail || "-"}`, 20, yPos); yPos += 7;
      doc.text(`Teléfono: ${clientPhone || "-"}`, 20, yPos); yPos += 10;

      doc.setTextColor(0);

      callback(doc, yPos); 
    };
  
    img.onerror = () => {
      console.warn("No se pudo cargar el logo. Se generará el PDF sin él.");
      callback(doc);
    };
  }
  // GENERAR PRESUPUESTO PDF
  function generateQuotePDF(callback) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    addLogoToPDF(doc, (docWithLogo, y) => {
      const maxWidth = 170;
  
      docWithLogo.setFontSize(16);
      docWithLogo.text("Presupuesto Estimado de Desarrollo Web", 20, 30);
      docWithLogo.setFontSize(12);
  
      const webType = document.getElementById("webType");
      const webText = webType.options[webType.selectedIndex].text;
      const webTextClean = webText.replace(/\s+/g, " ").trim();
      docWithLogo.text(docWithLogo.splitTextToSize(`• Tipo de web: ${webTextClean}`, maxWidth), 20, y);
      y += 8;
  
      const pages = parseInt(document.getElementById("pages").value);
      const pageExtra = pages > 1 ? (pages - 1) * 60 : 0;
      docWithLogo.text(`• Nº de páginas: (x${pages}) +${pageExtra} €`, 20, y); y += 8;
  
      const support = document.getElementById("supportLevel");
      const supportText = support.options[support.selectedIndex].innerText.trim().replace(/\s+/g, " ");
      const soporteWrapped = docWithLogo.splitTextToSize(`• Soporte en festivos: ${supportText}`, maxWidth);
      docWithLogo.text(soporteWrapped, 20, y);
      y += soporteWrapped.length * 8;
  
      const hosting = document.getElementById("hostingOption");
      let hostingText = hosting.options[hosting.selectedIndex].innerText || '';
      hostingText = hostingText.replace(/\s+/g, " ").trim();
      const hostingCost = parseFloat(hosting.value) || 0;
      const hostingWrapped = docWithLogo.splitTextToSize(`• Hosting: ${hostingText}`, maxWidth);
      docWithLogo.text(hostingWrapped, 20, y);
      y += hostingWrapped.length * 8;
  
      const extraDomains = document.getElementById("extraDomains");
      let extraDomainsText = extraDomains.options[extraDomains.selectedIndex].innerText || '';
      extraDomainsText = extraDomainsText.replace(/\s+/g, " ").trim();
      const extraDomainsCost = parseFloat(extraDomains.value) || 0;
      const extraDomainsWrapped = docWithLogo.splitTextToSize(`• Dominios/subdominios: ${extraDomainsText}`, maxWidth);
      docWithLogo.text(extraDomainsWrapped, 20, y);
      y += extraDomainsWrapped.length * 8;
  
      const customFormChecked = document.getElementById("customForm").checked;
      const formCount = parseInt(document.getElementById("formCount").value);
      const extraForms = customFormChecked ? parseInt(document.getElementById("formCount").value) * 50 : 0;
      if (customFormChecked) {
        docWithLogo.text(`• Formularios adicionales: (x${formCount}) +${extraForms} €`, 20, y); y += 8;
      }
  
      const urgencyFactor = parseFloat(document.getElementById("urgency").value);
      const urgencyText = document.getElementById("urgency").options[document.getElementById("urgency").selectedIndex].text;
      if (urgencyFactor > 1) {
        docWithLogo.text(`• Plazo: ${urgencyText}`, 20, y); y += 8;
      }
  
      const checkboxes = [...document.querySelectorAll('input[type="checkbox"]:checked')]
        .filter(el => el.id !== "customForm" && el.id !== "includeIVA" && !isNaN(parseInt(el.value)));
  
      if (checkboxes.length > 0) {
        docWithLogo.text("• Funcionalidades:", 20, y); y += 7;
        checkboxes.forEach(cb => {
          // const cleanLabel = cb.parentElement.textContent.trim().replace(/\+\d+[\s€]*$/, " ").trim();
          const cleanLabel = cb.parentElement.textContent
            .replace(/\+\d+[^\d\w\n\r]+(€|€\/mes)?/gi, "")
            .replace(/\s+/g, " ")
            .trim();
          const price = parseInt(cb.value);
          const wrapped = docWithLogo.splitTextToSize(`- ${cleanLabel}: +${price} €`, maxWidth);
          docWithLogo.text(wrapped, 24, y);
          y += wrapped.length * 6.5;
        });
      }
  
      const base = parseInt(document.getElementById("webType").value);
      const supportExtra = parseInt(document.getElementById("supportLevel").value) || 0;
      const extras = checkboxes.reduce((sum, el) => sum + parseInt(el.value), 0);
      const customHours = parseInt(document.getElementById("customHours").value) || 0;
      const hourlyRate = 30;
      const hourlyCost = customHours * hourlyRate;

      if (customHours > 0) {
        docWithLogo.text(`• Contratación por horas: (x${customHours}) +${hourlyCost} €`, 20, y); y += 8;
      }
      const subtotal = base + extras + extraForms + pageExtra + supportExtra + hostingCost + extraDomainsCost + hourlyCost;
  
      y += 5;
      docWithLogo.text(`Subtotal (sin IVA): ${subtotal.toFixed(2)} €`, 20, y); y += 8;
  
      const discountAmount = subtotal * appliedDiscount;
      const totalAfterDiscount = subtotal - discountAmount;
      if (appliedDiscount > 0) {
        docWithLogo.text(`Descuento aplicado (${(appliedDiscount * 100).toFixed(0)}%): -${discountAmount.toFixed(2)} €`, 20, y); y += 8;
      }
  
      const urgencyAmount = totalAfterDiscount * (urgencyFactor - 1);
      const totalWithUrgency = totalAfterDiscount * urgencyFactor;
      if (urgencyFactor > 1) {
        docWithLogo.text(`Incremento por urgencia: +${urgencyAmount.toFixed(2)} €`, 20, y); y += 8;
      }
  
      const ivaCheckbox = document.getElementById("includeIVA");
      const ivaRate = ivaCheckbox && ivaCheckbox.checked ? 0.21 : 0;
      const ivaAmount = totalWithUrgency * ivaRate;
      const totalConIVA = totalWithUrgency + ivaAmount;
      if (ivaRate > 0) {
        docWithLogo.text(`IVA (21%): ${ivaAmount.toFixed(2)} €`, 20, y); y += 8;
      }
  
      docWithLogo.setFontSize(14);
      docWithLogo.setTextColor(22, 199, 132);
      docWithLogo.text(`Total estimado: ${totalConIVA.toFixed(2)} €`, 20, y); y += 30;
  
      const pageWidth = docWithLogo.internal.pageSize.getWidth();
      docWithLogo.setFontSize(11);
      docWithLogo.setTextColor(150);
      docWithLogo.text("Presupuesto generado automáticamente desde N7Studio", pageWidth / 2, y, { align: "center" }); y += 6;
      docWithLogo.text("* Valor aproximado, para obtener un presupuesto definitivo envía tu propuesta.", pageWidth / 2, y, { align: "center" });
  
      callback(docWithLogo);
    });
  }

  function downloadPDF() {
    generateQuotePDF(doc => doc.save("N7Studio_presupuesto_web.pdf"));
  }

  

  function sendQuoteByEmail() {
    generateQuotePDF(doc => {
      const pdfBlob = doc.output("blob");
      
      const clientName = document.getElementById("clientName").value.trim();
      const clientEmail = document.getElementById("clientEmail").value.trim();
      const clientPhone = document.getElementById("clientPhone").value.trim(); 
      const totalValue = document.getElementById("total").textContent.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 
      // Requerir datos cliente para enviar
      if (!clientName || !clientEmail || !clientPhone) {
        showToast("⚠️ Por favor, completa todos los datos del cliente antes de enviar tu propuesta.");
        return;
      }  

      if (!emailRegex.test(clientEmail)) {
        showToast("⚠️ Introduce un correo electrónico válido.");
        return;
      }

      // Calcular antes de enviar (si no se envian los valores preseleccionados)
      if (!totalValue || totalValue === "0 €" || totalValue === "0.00 €") {
        showToast("⚠️ Calcula el presupuesto antes de enviarlo.");
        return;
      }
      // Descargar automáticamente al cliente
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "N7Studio_presupuesto_web.pdf";
      a.click();
      URL.revokeObjectURL(url);
  
      // Enviar por email
      const formData = new FormData();
      formData.append("pdf", pdfBlob, "presupuesto_web.pdf");
      formData.append("clientName", clientName);
      formData.append("clientEmail", clientEmail);
      formData.append("clientPhone", clientPhone);
  
      fetch("https://nusky7studio.es/php/send_quote.php", {
        method: "POST",
        body: formData
      })
      .then(res => res.text())
      .then(response => {
        if (response.includes("Enviado")) {
          showToast(`✅ PDF descargado <br>El presupuesto ha sido enviado a N7Studio y a ${clientEmail}`);
        } else {
          showToast("❌ Hubo un error al enviar el email... <br>Inténtalo más tarde o contacta con N7Studio por otra vía.");
        }
      })
      .catch(err => showToast("Error al enviar: " + err));
    });
  }

  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
  
    toastMsg.innerHTML = msg;
    toast.classList.remove('hidden');
  
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 6000);
  }
    