document.addEventListener("DOMContentLoaded", () => {

    langBtn.addEventListener('click', () => {
    langMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
      langMenu.classList.add('hidden');
    }
  });


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

  gsap.from(".hero", {
    opacity: 0,
    y: -120,
    duration: 1.5,
    ease: "power2.out"
  });
  
  gsap.from(".hero-foto", {
  opacity: 0,
  x: 100,
  duration: 4,
  ease: "power2.out"
});

gsap.from(".projects", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.5,
  ease: "power2.out",
   scrollTrigger: {
    trigger: ".projects",
    start: "top bottom",
    toggleActions: "play none none none"
  }
});
  
  ScrollTrigger.refresh();
  
  gsap.from(".stack", {
  opacity: 0,
  y: 30,
  duration: 1,
  stagger: 0.1,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: ".stack",
    start: "top bottom",
    toggleActions: "play none none none"
  }
  });
  
  gsap.from(".contact", {
  opacity: 0,
  scale: 0.9,
  duration: 3,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".contact",
    start: "top bottom",
    toggleActions: "play none none none"
  }
});

gsap.from(".about", {
  opacity: 0,
  y: 120,
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".description",
    start: "top bottom",
    toggleActions: "play none none none"
  }
});

  window.addEventListener("scroll", () => {
    ScrollTrigger.update();
  });

  document.querySelector('a[href="#proyectos"]').addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector("#proyectos");
    const offset = target.getBoundingClientRect().top + scrollbar.offset.y;

    scrollbar.scrollTo(0, offset, 800); // 800 ms animación
    setTimeout(() => ScrollTrigger.refresh(), 1000); // refresca tras el scroll
  });



  const lang = document.documentElement.lang || "es";

  fetch(`https://nusky7studio.es/locales/projects/${lang}.json`)
    .then(response => response.json())
    .then(data => {
      renderSwiperProyectos(data);
      new Swiper(".mySwiper", {
        effect: "cube",
        grabCursor: true,
        cubeEffect: {
          shadow: true,
          loop: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
       ScrollTrigger.refresh();
    })
    .catch(error => console.error("Error cargando proyectos:", error));
  
   window.addEventListener("load", () => {
    setTimeout(() => ScrollTrigger.refresh(true), 300);
  });
});


function renderSwiperProyectos(proyectos) {
  const wrapper = document.getElementById("projects-wrapper");
  wrapper.innerHTML = "";

  proyectos.forEach((proyecto, i) => {
  const slide = document.createElement("div");
    slide.className = "swiper-slide lg:p-4";

    slide.innerHTML = `
      <div class="bg-zinc-800 pb-6 px-3 pt-3 rounded-3xl shadow hover:shadow-lg transition lg:hover:animate-scale h-full flex flex-col justify-between">
        <img src="${proyecto.imagen[0]}" alt="${proyecto.nombre}" class="carrousel-img rounded-lg mb-4 w-full h-full object-cover" data-index="0" 
            data-proyecto="${i}">
        
        <div class="flex-wrap flex items-center justify-center md:justify-between mb-2 px-6">
        <div class="tech flex flex-wrap items-center gap-2 mb-2">
            ${proyecto.tecnologias
              .map((tech) => `<img id="tech" src="https://nusky7studio.es/img/ico/${tech.toLowerCase()}.webp" alt="${tech}" title="${tech}" class="stack w-12 h-12 hover:animate-jelly cursor-default">`)
              .join("")}
            </div>    
        
            <h3 class="text-2xl font-semibold animate-glowText5 py-3 mx-4">${proyecto.nombre}</h3>
            
            <div class="flex flex-wrap gap-2 ml-2 mx-3">
            <button class="toggle-btn bg-purple-900 px-2 py-1 text-xs rounded-xl hover:bg-purple-600" data-target="1">
                <svg fill="#ffffff" width="33px" height="33px" viewBox="0 -8 72 72" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>mobile</title><path d="M49.75,0H22.25a4,4,0,0,0-4.16,3.78V52.22A4,4,0,0,0,22.25,56h27.5a4,4,0,0,0,4.16-3.78V3.78A4,4,0,0,0,49.75,0ZM31.6,2.73h8.8a.48.48,0,0,1,.5.46.47.47,0,0,1-.5.45H31.6a.47.47,0,0,1-.5-.45A.48.48,0,0,1,31.6,2.73ZM36,54.11a1.9,1.9,0,1,1,2.08-1.89A2,2,0,0,1,36,54.11ZM51,49H21V6H51Z"></path></g></svg>
                </button> 

                  <button class="toggle-btn bg-purple-900 px-2 py-1 text-xs rounded-xl hover:bg-purple-600" data-target="0">
                <svg width="30px" height="30px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>desktop [#232]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-100.000000, -7159.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M62.0006998,7012 C62.0006998,7012.552 61.5528565,7013 61.0010496,7013 L47.0059479,7013 C46.4541411,7013 46.0062978,7012.552 46.0062978,7012 L46.0062978,7002 C46.0062978,7001.448 46.4541411,7001 47.0059479,7001 L61.0010496,7001 C61.5528565,7001 62.0006998,7001.448 62.0006998,7002 L62.0006998,7012 Z M61.9907033,6999 L45.9963013,6999 L45.9923027,6999 C44.888689,6999 44,6999.915 44,7001.02 L44.0069976,7001.04 L44.0069976,7013.04 L44,7013.02 C44,7014.125 44.888689,7015 45.9923027,7015 L45.9963013,7015 L51.9902034,7015 C52.5430099,7015 53.0038487,7015.468 53.0038487,7016.02 L53.0038487,7016.01 C53.0038487,7016.562 52.5430099,7017 51.9902034,7017 L48.9912531,7017 C48.4394462,7017 48.005598,7017.468 48.005598,7018.02 L48.005598,7018.01 C48.005598,7018.562 48.4394462,7019 48.9912531,7019 L58.9877543,7019 C59.5405608,7019 60.0013995,7018.572 60.0013995,7018.02 L60.0013995,7018.01 C60.0013995,7017.458 59.5405608,7017 58.9877543,7017 L55.9888039,7017 C55.4369971,7017 55.0031489,7016.572 55.0031489,7016.02 L55.0031489,7016.01 C55.0031489,7015.458 55.4369971,7015 55.9888039,7015 L61.9907033,7015 L61.9977008,7015.02 C63.0993152,7015.02 64,7014.146 64,7013.043 L64,7013.04 L64,7001.04 L64,7001.037 C64,6999.934 63.0993152,6999.02 61.9977008,6999.02 L61.9907033,6999 Z" id="desktop-[#232]"> </path> </g> </g> </g> </g></svg>
                </button>          
            </div>
        </div>

        <p class="text-xl drop-shadow shadow-black text-zinc-100 mb-3 px-6 pt-1.5">${proyecto.descripcion}</p>
        <div class="flex justify-center mt-auto">
            ${
              proyecto.demo
                ? `<div class="flex justify-center mt-auto hover:animate-heartbeat">
                    <a href="${proyecto.demo}" target="_blank" class="flex items-center gap-2 text-md text-purple-400 bg-purple-900  animate-borderGlow3 rounded-full hover:scale-125 hover:bg-sky-300/35 transition">
                      <svg class="drop-shadow-md shadow-black" fill="#ffffff" width="39px" height="39px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=fill"> <g id="web"> <g id="Vector"> <path d="M15.3222 10.383C15.3796 10.9457 15.4125 11.4903 15.4125 12C15.4125 12.9541 15.2972 14.0315 15.1208 15.1208C14.0315 15.2972 12.9541 15.4125 12 15.4125C11.0502 15.4125 9.97313 15.2975 8.87911 15.1205C8.70281 14.0312 8.5875 12.954 8.5875 12C8.5875 11.4905 8.62039 10.9458 8.67789 10.383C9.82608 10.5668 10.9715 10.6875 12 10.6875C13.0286 10.6875 14.174 10.5668 15.3222 10.383Z" fill="#ffffff"></path> <path d="M16.8752 10.0994C16.9462 10.7579 16.9875 11.399 16.9875 12C16.9875 12.8769 16.8997 13.8389 16.7599 14.8153C18.7425 14.4016 20.575 13.8731 21.5567 13.5722C21.8739 13.475 21.9986 13.4363 22.1658 13.3694C22.2494 13.336 22.326 13.302 22.4259 13.2543C22.4748 12.843 22.5 12.4244 22.5 12C22.5 10.878 22.324 9.79714 21.9982 8.78346L21.9133 8.81017C20.8868 9.12245 18.9652 9.6745 16.8752 10.0994Z" fill="#ffffff"></path> <path d="M21.4017 7.31948C20.3698 7.63221 18.579 8.14039 16.6599 8.53603C16.2178 5.84926 15.443 3.16951 15.0702 1.95598C17.8422 2.80227 20.1273 4.76467 21.4017 7.31948Z" fill="#ffffff"></path> <path d="M15.1117 8.82229C14.0253 8.99781 12.9513 9.1125 12 9.1125C11.0487 9.1125 9.97477 8.99781 8.88843 8.8223C9.30471 6.28005 10.0478 3.68306 10.4278 2.44333C10.525 2.12606 10.5637 2.00144 10.6306 1.83418C10.664 1.75062 10.698 1.67398 10.7457 1.57414C11.157 1.52518 11.5756 1.5 12 1.5C12.4434 1.5 12.8803 1.52748 13.3093 1.58083C13.3184 1.61564 13.3268 1.64679 13.3351 1.67626C13.3597 1.76333 13.3982 1.8857 13.4628 2.09104L13.4696 2.11261C13.7935 3.14223 14.6519 6.01401 15.1117 8.82229Z" fill="#ffffff"></path> <path d="M7.34004 8.536C7.7801 5.86107 8.54986 3.19576 8.92192 1.98181L8.92983 1.95597C6.15777 2.80225 3.8727 4.76465 2.59835 7.31946C3.63018 7.63219 5.42095 8.14036 7.34004 8.536Z" fill="#ffffff"></path> <path d="M2.00184 8.78345C1.67598 9.79714 1.5 10.878 1.5 12C1.5 12.4389 1.52693 12.8715 1.57923 13.2963L1.74471 13.3515L1.74603 13.3519L1.74765 13.3525L1.74879 13.3528C1.80205 13.3705 3.36305 13.886 5.41878 14.3975C5.99886 14.5418 6.61307 14.6844 7.24006 14.8151C7.10025 13.8388 7.0125 12.8769 7.0125 12C7.0125 11.3988 7.05374 10.7577 7.12472 10.0994C5.03428 9.67436 3.11218 9.12212 2.08597 8.80989L2.07883 8.80771L2.00184 8.78345Z" fill="#ffffff"></path> <path d="M12 16.9875C12.8769 16.9875 13.8389 16.8997 14.8153 16.7599C14.4016 18.7425 13.8731 20.575 13.5722 21.5566C13.475 21.8739 13.4363 21.9985 13.3694 22.1658C13.336 22.2494 13.302 22.326 13.2543 22.4259C12.843 22.4748 12.4244 22.5 12 22.5C11.5756 22.5 11.157 22.4748 10.7457 22.4259C10.698 22.326 10.664 22.2494 10.6306 22.1658C10.5637 21.9986 10.525 21.8739 10.4278 21.5567C10.1269 20.5751 9.59846 18.7427 9.18478 16.7603C10.1579 16.8996 11.1201 16.9875 12 16.9875Z" fill="#ffffff"></path> <path d="M5.0385 15.9259C3.73853 15.6024 2.63135 15.2775 1.95597 15.0702C2.97258 18.4002 5.59982 21.0274 8.92983 22.044L8.92192 22.0182C8.59705 20.9582 7.96897 18.7917 7.52191 16.4784C6.6525 16.3103 5.80722 16.1171 5.0385 15.9259Z" fill="#ffffff"></path> <path d="M22.0182 15.0781C20.9582 15.403 18.7915 16.0311 16.4781 16.4781C16.0311 18.7915 15.403 20.9581 15.0781 22.0182L15.0702 22.044C18.4002 21.0274 21.0274 18.4002 22.044 15.0702L22.0182 15.0781Z" fill="#ffffff"></path> <path d="M1.6103 13.323C1.64665 13.3277 1.67628 13.3327 1.68611 13.3349C1.69472 13.337 1.70821 13.3406 1.7131 13.3419L1.72391 13.345L1.72973 13.3468L1.73585 13.3487L1.74098 13.3503C1.7381 13.3494 1.67976 13.3348 1.6103 13.323Z" fill="#ffffff"></path> </g> </g> </g> </g></svg>
                       <span class="sr-only">Ver sitio web</span>
                    </a>
                  </div>`
                : ""
            }          
        </div>
      </div>
    `;

    wrapper.appendChild(slide);
    
      // Botones móvil/escritorio
        document.querySelectorAll(".toggle-btn").forEach(btn =>
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-target");
            const img = btn.closest(".swiper-slide").querySelector(".carrousel-img");
            const proyectoIndex = parseInt(img.dataset.proyecto);

            fetch(`https://nusky7studio.es/locales/projects/es.json`)
            .then(res => res.json())
            .then(data => {
                const imagenes = data[proyectoIndex].imagen || [];
                if (!imagenes[index]) return;
                img.src = imagenes[index];
                img.dataset.index = index;
            });
        })
        );
  });
    
  // carrusel JS
  document.querySelectorAll(".prev-btn").forEach(btn =>
    btn.addEventListener("click", () => changeImage(btn, -1))
  );
  document.querySelectorAll(".next-btn").forEach(btn =>
    btn.addEventListener("click", () => changeImage(btn, 1))
  );
}

function changeImage(button, direction) {
  const img = button.parentElement.querySelector(".carrousel-img");
  const index = parseInt(img.dataset.index);
  const proyectoIndex = parseInt(img.dataset.proyecto);
  fetch("../locales/proyectos.json")
    .then(res => res.json())
    .then(data => {
      const imagenes = data[proyectoIndex].imagen || [];
      console.log(imagenes);
      if (!imagenes.length) return;
      const nextIndex = (index + direction + imagenes.length) % imagenes.length;
      img.src = imagenes[nextIndex];
      img.dataset.index = nextIndex;
    });
}

console.log(`%c
███╗   ██╗ ███████╗ ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ 
████╗  ██║ ╚════██║ ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗
██╔██╗ ██║     ██╔╝ ███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║
██║╚██╗██║    ██╔╝    ║  ██║   ██║   ██║   ██║██║  ██║██║██║   ██║
██║ ╚████║   ██╔╝   ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝
╚═╝  ╚═══╝   ╚═╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝ 
                      N  7  S  T  U  D  I  O
`, "color: #d8b2ff; font-family: monospace; font-size: 10px;");


console.log(
  "\n\n%c ✦ Nusky7 ✦\n\nWeb design, development, and digital craft with interstellar love. 👽 \n\nhttps://nusky7studio.es",
  "background: black; color: #d8b2ff; font-family: monospace; font-size: 12px; padding: 8px; margin: 7px; border: 1px solid #d8b2ff; border-radius: 1rem; text-align: center;"
);
