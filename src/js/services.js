
    // Anima el SVG al cargar la página
gsap.from(".hero", { opacity: 0, y: -120, duration: 1 });
   
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');

  langBtn.addEventListener('click', () => {
    langMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
      langMenu.classList.add('hidden');
    }
  });

function toggleService(btn) {
  const card = btn.closest(".service-card");
  const content = card.querySelector(".service-content");
  const arrowIcon = btn.querySelector(".icon-wrap");
  const mainIcon = card.querySelector(".main-icon");
  const allCards = document.querySelectorAll(".service-card");
  

  allCards.forEach(c => {
    const otherContent = c.querySelector(".service-content");
    const otherBtn = c.querySelector(".toggle-btn");
    const otherArrow = otherBtn?.querySelector(".icon-wrap");
    const otherMainIcon = c.querySelector(".main-icon");
    const otherToggleIcon = c.querySelector(".toggle-icon");

    if (c === card) {
      const isOpen = content.classList.contains("max-h-60");
      content.classList.toggle("max-h-0", isOpen);
      content.classList.toggle("max-h-60", !isOpen);

      arrowIcon?.classList.toggle("rotate-180", !isOpen);
      arrowIcon?.classList.toggle("text-purple-400", !isOpen);
      arrowIcon?.classList.toggle("text-purple-100", isOpen);
      mainIcon?.classList.toggle("rotate-45", !isOpen);
    } else {
      otherContent.classList.remove("max-h-60");
      otherContent.classList.add("max-h-0");
      otherArrow?.classList.remove("rotate-180");
      otherMainIcon?.classList.remove("rotate-45");
      otherToggleIcon?.classList.replace("text-slate-200", "text-purple-400");
      otherArrow?.classList.remove("text-purple-400");
      otherArrow?.classList.add("text-purple-100");
    }
  });
}
window.blinkPresupuesto = function () {
  const btn = document.querySelector('[href="https://nusky7studio.es/presupuesto"]');
  if (!btn) return;

  btn.classList.remove('animate-borderGlow3', 'text-white');

  setTimeout(() => {
    btn.classList.add('animate-blink', 'scale-105', 'text-md', 'bg-white', 'text-black', 'font-semibold');
  }, 200);

  setTimeout(() => {
    btn.classList.remove('animate-blink', 'scale-105', 'text-md', 'bg-white', 'text-black', 'font-semibold');
    btn.classList.add('animate-borderGlow3', 'text-white');
  }, 1500);
};

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector('[href="https://nusky7studio.es/presupuesto"]');
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault(); // si no quieres que vaya al enlace directamente
    blinkPresupuesto();
    window.open(btn.href, '_blank');
  });
});

    
let pasoIndex = 0;
const pasos = document.querySelectorAll('.paso');
const title = document.querySelectorAll('.title')
setInterval(() => {
  pasos.forEach((p, i) => {
    p.classList.toggle('animate-borderGlow2', i === pasoIndex);
    p.classList.toggle('text-purple-400', i === pasoIndex);
    p.classList.toggle('shadow-lg', i === pasoIndex);
  });
  title.forEach((t, i) => {
    t.classList.toggle('animate-glowText', i === pasoIndex);
    t.classList.toggle('text-3xl', i === pasoIndex);
  });
  pasoIndex = (pasoIndex + 1) % pasos.length;
}, 3800);


