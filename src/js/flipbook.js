// flipbook.js — Estado por página + thumbs fiables + rehidratación
(() => {
  const root = document.getElementById('flip-carousel');
  if (!root) { console.error('No se encontró #flip-carousel'); return; }

  // Estado: índice de imagen activa por página
  // (se conserva entre renders/cambios de idioma)
    const state = {
    activeImgIndex: [], // p. [0,2,1,...]
    arts: []            // se rellena en cada render
  };

  // Utilidad: bloquea/revierte pequeños “saltos” de scroll del carrusel padre
  function lockCarouselDuring(fn) {
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    const x = root.scrollLeft;
    try { fn(); }
    finally {
      root.scrollLeft = x;
      root.style.scrollBehavior = prevBehavior || '';
    }
  }

  // Split de texto preservando <br> a nivel “aproximado” por longitud
  function splitHtmlByChars(html, maxLen = 1200) {
    if (!html || html.length <= maxLen) return { left: html || '', right: '' };
    const near = html.lastIndexOf('<br>', maxLen + 200);
    const cut = near > maxLen * 0.6 ? near + 4 : maxLen; // 4 = "<br>"
    return { left: html.slice(0, cut), right: html.slice(cut) };
  }

  // Slide por obra (doble página). Usa estado inicial para fijar la imagen.
  function slideHTML(art, pageIndex) {
    const { titulo, año, texto, imagenes = [] } = art;
    const year = año ? `(${año})` : '';
    const { left, right } = splitHtmlByChars(texto || '', 1200);
    const hasRightText = right && right.trim().length > 0;

    const initialIdx = Number.isInteger(state.activeImgIndex[pageIndex])
      ? state.activeImgIndex[pageIndex]
      : 0;

    const safeIdx = Math.min(Math.max(initialIdx, 0), Math.max(imagenes.length - 1, 0));
    const currentSrc = imagenes[safeIdx] || '';

    // Construye thumbs marcando la activa desde estado
    const thumbsHTML = imagenes.length > 1
      ? `<div class="thumbs">
           ${imagenes.map((src, i) => `
             <button type="button" tabindex="-1" draggable="false"
                     class="thumb${i === safeIdx ? ' active' : ''}"
                     data-page="${pageIndex}" data-index="${i}" data-src="${src}"
                     aria-label="miniatura ${i+1}">
               <img src="${src}" alt="">
             </button>`).join('')}
         </div>`
      : '';

  const imagesBlock = `
  <div class="mode mode-images">
    ${currentSrc
      ? `<div class="image-box">
           <img class="main-img" id="main-img-${pageIndex}" data-page="${pageIndex}"
                src="${currentSrc}" alt="${titulo||''}" loading="lazy" style="display:block">
         </div>`
      : `<div style="opacity:.6">Sin imagen</div>`
    }

    ${thumbsHTML}
  </div>`;



    const textBlock = `
      <div class="mode mode-text${hasRightText ? '' : ' hidden'}">
        <div class="right-text">${hasRightText ? right : ''}</div>
      </div>`;

    const toggleBtn = hasRightText
      ? `<div class="right-actions">
           <button type="button" class="toggle-mode" data-state="images">Ver texto completo</button>
         </div>`
      : ``;

    return `
      <div class="carousel-item">
        <div class="page-container">
          <!-- IZQUIERDA -->
          <div class="page left-page">
            <div>
              ${titulo ? `<p style="margin:0;text-indent:1rem;font-size:1.2em;color:#582423;"><u>${titulo}</u></p>` : ``}
              ${year ? `<p style="margin:0;opacity:.75">${year}</p><br>` : ``}
              <div style="margin:0;text-indent:1rem">${left||''}</div>
            </div>
          </div>

          <!-- DERECHA -->
          <div class="page right-page">
            <div>
              ${imagesBlock}
              ${textBlock}
              ${toggleBtn}
            </div>
          </div>
        </div>
      </div>`;
  }

 function renderFromTranslations(tr) {
  const arts = Array.isArray(tr.artworks) ? tr.artworks : [];

  // Asegura estado (si no existe, inicializa a 0)
  arts.forEach((_, i) => {
    if (!Number.isInteger(state.activeImgIndex[i])) state.activeImgIndex[i] = 0;
  });

  // Limpia items previos (dejando el .sprite)
  [...root.querySelectorAll('.carousel-item')].forEach(n => n.remove());

  // Inserta con estado aplicado
  const html = arts.map((art, idx) => slideHTML(art, idx)).join('');
  root.insertAdjacentHTML('beforeend', html);

  // Ajusta --slides
  root.style.setProperty('--slides', String(Math.max(arts.length, 1)));

  // Rehidrata
  rehydrateImages(arts);

  // ✅ Guarda artworks para Prev/Next y sincroniza slide activo
  state.arts = arts;
  initActiveSlideSync();
}  // ← solo una llave de cierre


  function rehydrateImages(arts) {
  const pages = root.querySelectorAll('.page.right-page');
  pages.forEach((page, idx) => {
    const imgs = Array.isArray(arts[idx]?.imagenes) ? arts[idx].imagenes : [];
    if (!imgs.length) return;

    const i = Math.min(Math.max(state.activeImgIndex[idx] ?? 0, 0), imgs.length - 1);

    const mainImg = page.querySelector('.mode-images .main-img');
    if (mainImg && mainImg.getAttribute('src') !== imgs[i]) {
      mainImg.setAttribute('src', imgs[i]);
    }
    page.querySelectorAll('.thumb').forEach((b, j) => {
      b.classList.toggle('active', j === i);
    });
  });
}


  // Delegación: thumbs + toggle texto
  function attachDelegates() {
    // Evita que el focus de botones provoque “snap”
    root.addEventListener('mousedown', (e) => {
      const thumb = e.target.closest('.thumb');
      if (thumb) { e.preventDefault(); } // evita focus
    }, { passive: false });

    root.addEventListener('click', (e) => {
      const thumb = e.target.closest('.thumb');
      if (thumb) {
        e.preventDefault();
        e.stopPropagation();
        const pageIndex = parseInt(thumb.dataset.page, 10);
        const imgIndex  = parseInt(thumb.dataset.index, 10);
        const spread    = thumb.closest('.page.right-page');
        const mainImg   = spread?.querySelector('.mode-images .main-img');
        const newSrc    = thumb.dataset.src;

        if (mainImg && newSrc && Number.isInteger(pageIndex) && Number.isInteger(imgIndex)) {
          lockCarouselDuring(() => {
            // Actualiza DOM visible
            mainImg.src = newSrc;
            spread.querySelectorAll('.thumb').forEach(b => b.classList.remove('active'));
            thumb.classList.add('active');
            // Guarda estado
            state.activeImgIndex[pageIndex] = imgIndex;
            // Limpia focus para evitar scroll a “focused”
            thumb.blur();
            if (document.activeElement === thumb) document.activeElement.blur();
          });
        }
        return;
      }


      const toggle = e.target.closest('.toggle-mode');
      if (toggle) {
        e.preventDefault();
        e.stopPropagation();
        const spread   = toggle.closest('.page.right-page');
        const modeImg  = spread.querySelector('.mode-images');
        const modeText = spread.querySelector('.mode-text');
        const cur      = toggle.dataset.state || 'images';
        lockCarouselDuring(() => {
          if (cur === 'images') {
            modeImg.classList.add('hidden');
            modeText.classList.remove('hidden');
            toggle.dataset.state = 'text';
            toggle.textContent = 'Ver imágenes';
          } else {
            modeText.classList.add('hidden');
            modeImg.classList.remove('hidden');
            toggle.dataset.state = 'images';
            toggle.textContent = 'Ver texto completo';
          }
        });
      }
    });
  }

  function initActiveSlideSync() {
  const slides = Array.from(root.querySelectorAll('.carousel-item'));

  function mostVisible() {
    if (!slides.length) return -1;
    const cr = root.getBoundingClientRect();
    let best = -1;
    let bestArea = -1;

    for (let i = 0; i < slides.length; i++) {
      const r = slides[i].getBoundingClientRect();
      // solape con el viewport del carrusel, no con la ventana
      const x = Math.max(0, Math.min(r.right, cr.right) - Math.max(r.left, cr.left));
      const y = Math.max(0, Math.min(r.bottom, cr.bottom) - Math.max(r.top, cr.top));
      const area = x * y;
      if (area > bestArea) { bestArea = area; best = i; }
    }
    return best;
  }

  function sync() {
    const i = mostVisible();
    if (i < 0) return;
    slides.forEach((s, idx) => s.classList.toggle('is-active', idx === i));
  }

  const onScroll = throttleRaf(sync);
  root.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', throttleRaf(sync));

  // marca al montar
  requestAnimationFrame(sync);
}



  function throttleRaf(fn) {
    let ticking = false;
    return (...args) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        fn(...args);
      });
    };
  }


  // Carga JSON por idioma
  async function loadArtbook(lang='es') {
    const res = await fetch(`../locales/${lang}.json`);
    const tr  = await res.json();
    renderFromTranslations(tr);
  }

  // Idiomas (si existen los botones)
  document.getElementById('lang-switch-es')?.addEventListener('click', () => loadArtbook('es'));
  document.getElementById('lang-switch-en')?.addEventListener('click', () => loadArtbook('en'));

  attachDelegates();
  loadArtbook('es');
})();
