window.cerrarPopup = function () {
  const popup = document.getElementById('miPopup');
  popup?.classList.add('hidden', 'animate-reduceAndFade');
};

window.suscribirUsuario = function () {
  const email = document.getElementById('emailInput')?.value;

  if (!email?.includes('@')) {
    alert("❌ Email no válido.");
    return;
  }

  fetch('https://nusky7studio.es/php/suscribe.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert("❌ " + data.error);
      } else {
        document.getElementById('emailInput').style.display = 'none';
        document.getElementById('suscribe-btn').style.display = 'none';
        document.getElementById('popup-links').classList.remove('hidden');
        document.getElementById('aloeLink').classList.remove('hidden');

        let popTitle = document.getElementById('popup-title');
        let popTitle2 = document.getElementById('popup-title2');
        let popDesc = document.getElementById('popup-description');
        popTitle2.classList.add("hidden");
        popTitle.innerHTML = '<span class="animate-blinkAndBounce1 mb-12 text-4xl">🇫🇷🇪🇨🇺🇪🇳🇨🇮🇦🇸⚡<br>𝙎𝙞𝙣𝙘𝙧𝙤𝙣𝙞𝙯𝙖𝙙𝙖𝙨</span>';
        popDesc.innerHTML =
          '<span class="animate-glowText1 text-5xl mb-6">💌</span><br><span class="animate-glowText1">¡Te has unido a mi Club Privado!</span><br> No soy muy pesada, pero te contaré cosas interesantes...';
        popDesc.classList.replace("text-sm", "text-lg");
        popTitle.classList.replace("animate-blinkAndBounce1", "animate-tadaOne");
      }
    })
    .catch(err => {
      console.error("Error al enviar:", err);
      alert("❌ Hubo un error. Inténtalo más tarde.");
    });
};

// 👀 Mostrar el popup cuando el div ancla entra en pantalla
document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.getElementById("popupTrigger");
  const popup = document.getElementById("miPopup");

  if (!trigger || !popup) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        popup.classList.remove("hidden");
        observer.disconnect(); // Deja de observar después de mostrarlo
      }
    });
  }, {
    threshold: 0.3 // Se activa cuando el 30% del div es visible
  });

  observer.observe(trigger);
});
