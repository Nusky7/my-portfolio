
document.addEventListener("DOMContentLoaded", () => {
  //GSAP Animaciones
  const scroller = document.querySelector("#scroll-container");
  const scrollbar = Scrollbar.init(scroller, {
    damping: 0.07
  });

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value) {
      if (arguments.length) {
        scrollbar.scrollTop = value;
      }
      return scrollbar.scrollTop;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: scroller.style.transform ? "transform" : "fixed"
  });

  scrollbar.addListener(ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller: scroller });

  gsap.from(".hero", { opacity: 0, y: -120, duration: 1 });

  gsap.from("#logoHero", {
    scale: 0.3,
    rotation: 360,
    opacity: 0,
    duration: 1.4,
    delay: 0.6,
    ease: "back.out(1.7)"
  });

  gsap.from("#servicios", {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#servicios",
      start: "top 80%",
    }
  });

gsap.utils.toArray(".service-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "back.out(1.7)",
    delay: i * 0.20,
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      scroller: scroller,
      toggleActions: "play none none none"
    }
  });
});
  
  gsap.utils.toArray(".paso").forEach((paso, i) => {
  gsap.from(paso, {
    opacity: 0,
    y: 30,
    scale: 0.85,
    duration: 1,
    delay: i * 0.30,
    ease: "power2.out",
    scrollTrigger: {
      trigger: paso,
      start: "top 85%",
      scroller: scroller,
      toggleActions: "play none none none"
    }
  });
});

  gsap.utils.toArray(".title").forEach((titulo, i) => {
  gsap.from(titulo, {
    opacity: 0,
    y: 10,
    duration: 0.8,
    ease: "power1.out",
    scrollTrigger: {
      trigger: titulo,
      start: "top 90%",
      scroller: scroller,
      toggleActions: "play none none none"
    }
  });
  });
  
  gsap.from(".process-title", {
  opacity: 0,
  y: -30,
  duration: 1.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".process-title",
    start: "top 90%",
    scroller: scroller,
    toggleActions: "play none none none"
  }
});

gsap.from(".process-text", {
  opacity: 0,
  y: -20,
  duration: 1,
  delay: 0.2,
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".process-text",
    start: "top 90%",
    scroller: scroller,
    toggleActions: "play none none none"
  }
});
  
gsap.from(".proceso-colabs-title", {
  opacity: 0,
  y: 40,
  duration: 1.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".proceso-colabs-title",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});

gsap.from(".proceso-colabs-text", {
  opacity: 0,
  y: 40,
  duration: 1,
  delay: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".proceso-colabs-text",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});

gsap.from(".colab-card", {
  opacity: 0,
  y: 30,
  duration: 1,
  ease: "back.out(1.7)",
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".colab-card",
    start: "top 85%",
    toggleActions: "play none none none"
  }
});

gsap.from("#alba", {
  opacity: 0,
  y: 0,
  scale: 0.7,
  duration: 1.3,
  delay: 0.3,
  ease: "back.out(2)",
  scrollTrigger: {
    trigger: "#alba",
    start: "top 85%",
    toggleActions: "play none none none"
  }
});

gsap.from("#contacto h2", {
  scrollTrigger: {
    trigger: "#contacto",
    start: "top 80%",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out",
});

gsap.from("#contacto p", {
  scrollTrigger: {
    trigger: "#contacto",
    start: "top 80%",
  },
  opacity: 0,
  y: 30,
  delay: 0.2,
  duration: 1,
  ease: "power2.out",
});

gsap.from("#contacto .botones-contacto", {
  scrollTrigger: {
    trigger: "#contacto",
    start: "top 80%",
  },
  opacity: 0,
  scale: 0.95,
  delay: 0.4,
  duration: 1,
  ease: "back.out(1.5)",
});
  
gsap.from(".n7-letter", {
  scrollTrigger: {
    trigger: ".n7s",
    start: "top 90%",
  },
  y: -30,
  opacity: 0,
  duration: 0.6,
  stagger: {
    each: 0.08,
    from: "start"
  },
  ease: "back.out(1.7)"
});

  gsap.from(".n7s-text", {
  scrollTrigger: {
    trigger: ".n7s",
    start: "top 90%",
  },
  opacity: 0,
  y: 20,
  delay: 0.5,
  duration: 0.6,
  ease: "power2.out"
});

  gsap.from("footer ul li", {
  scrollTrigger: {
    trigger: "footer ul",
    start: "top 90%",
  },
  opacity: 0,
  y: 20,
  stagger: 0.1,
  duration: 0.6,
  ease: "power2.out"
});

 gsap.from(".icon", {
  scrollTrigger: {
    trigger: "footer",
    start: "top 90%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  scale: 0.6,
  rotate: 30,
  y: 40,
  stagger: 0.12,
  duration: 0.8,
  ease: "back.out(1.7)"
 });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const targetID = this.getAttribute("href").slice(1);
    const target = document.getElementById(targetID);

    if (target) {
      e.preventDefault();
      scrollbar.scrollTo(0, target.offsetTop - 20, 800); 
    }
  });
  });

  const presupuestoLink = document.querySelector('a[href="#top"]');
  if (presupuestoLink) {
    presupuestoLink.addEventListener("click", (e) => {
      e.preventDefault();

      const hero = document.getElementById("top");
      const btn = document.getElementById("btnPresupuesto");

      if (hero && btn) {
        const offset = hero.offsetTop;
        scrollbar.scrollTo(0, offset - 20, 800); // scroll al hero

        setTimeout(() => {
          blinkPresupuesto();
        }, 850);
      }
    });
  }

  ScrollTrigger.refresh();

  
window.blinkPresupuesto = function () {
  const btn = document.getElementById("btnPresupuesto");
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

});


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


