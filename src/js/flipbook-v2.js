(() => {
  const JSON_URL = '/src/locales/es.json'; // cambia a '/src/locales/en.json' si quieres
  const COVER_GRADIENT = 'linear-gradient(135deg,#6b21a8,#581c87)'; // purple-800

  const state = {
    artworks: [],
    activeImgIndex: [],  // índice de imagen activa por obra
    currentSheet: 0,     // arrancamos con sheet 0 girada (libro abierto en obra 0)
    totalSheets: 0
  };

  const $ = (sel, el=document) => el.querySelector(sel);
  const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));

  function splitText(html, maxLen=1200){
    if (!html) return {left:'', right:''};
    if (html.length <= maxLen) return {left: html, right: ''};
    const near = html.lastIndexOf('<br>', maxLen + 200);
    const cut = near > maxLen * .6 ? near + 4 : maxLen;
    return {left: html.slice(0,cut), right: html.slice(cut)};
  }

  function leftSide(art, pageNumber){
  const { titulo, año, texto } = art || {};
  const year = año ? `(${año})` : '';
  const { left } = splitText(texto || '', 1100);

  return `
    <div class="paper side bg-[#0f0f13]">
      <!-- mitad CON contenido -->
      <div class="half left p-5 overflow-auto">
        <div class="text-left">
          ${titulo ? `<p class="font-semibold text-base">${titulo}</p>` : ``}
          ${year ? `<p class="opacity-70 -mt-1 mb-2">${year}</p>` : ``}
          <div class="leading-relaxed text-sm">${left||''}</div>
        </div>
        <div class="absolute bottom-3 right-4 text-[11px] opacity-60">${pageNumber}</div>
      </div>
      <!-- mitad VACÍA pero OPACA para tapar capas inferiores -->
      <div class="half right bg-[#0f0f13]"></div>
    </div>`;
}

function rightSide(art, artIndex, pageNumber){
  const imgs = Array.isArray(art?.imagenes) ? art.imagenes : [];
  const idx  = clamp(state.activeImgIndex[artIndex] ?? 0, 0, Math.max(imgs.length-1,0));
  const cur  = imgs[idx];

  const thumbs = imgs.length > 1
    ? `<div class="grid grid-cols-6 gap-1 mt-2">
        ${imgs.map((src,j)=>`
          <button class="thumb border border-zinc-700 rounded overflow-hidden ${j===idx?'active':''}"
                  data-art="${artIndex}" data-img="${j}" aria-label="Miniatura ${j+1}">
            <img src="${src}" class="w-full h-[38px] object-cover pointer-events-none">
          </button>`).join('')}
       </div>`
    : '';

  return `
    <div class="paper side bg-[#0f0f13]">
      <!-- mitad VACÍA pero OPACA -->
      <div class="half left bg-[#0f0f13]"></div>

      <!-- mitad CON contenido -->
      <div class="half right p-5 overflow-auto">
        <div class="rounded-md border border-zinc-700 bg-black/30 aspect-[4/3] grid place-items-center overflow-hidden">
          ${cur ? `<img class="main-img w-full h-full object-contain select-none pointer-events-none"
                         data-art="${artIndex}" src="${cur}" alt="${(art?.titulo)||''}">`
                : `<div class="opacity-60 text-xs">Sin imagen</div>`}
        </div>
        ${thumbs}
        <div class="absolute bottom-3 right-4 text-[11px] opacity-60">${pageNumber}</div>
      </div>
    </div>`;
}


  function coverSheet(firstLeftHTML){
  return `
    <div class="sheet" data-sheet="0" style="z-index:9999">
      <!-- Portada morada ocupando toda la cara -->
      <div class="side" style="background:linear-gradient(135deg,#6b21a8,#581c87)"></div>
      <!-- Dorso: izquierda de obra 0 (ya tapa la mitad derecha) -->
      <div class="side back">
        ${firstLeftHTML}
      </div>
    </div>`;
}

function middleSheet(k, rightOfPrevHTML, leftOfCurHTML, z){
  return `
    <div class="sheet" data-sheet="${k}" style="z-index:${z}">
      <!-- Frontal: derecha de obra k-1 (ya tapa la mitad izquierda) -->
      <div class="side">
        ${rightOfPrevHTML}
      </div>
      <!-- Dorso: izquierda de obra k (ya tapa la mitad derecha) -->
      <div class="side back">
        ${leftOfCurHTML}
      </div>
    </div>`;
}

function lastSheet(N, rightOfLastHTML){
  return `
    <div class="sheet" data-sheet="${N}" style="z-index:${1000-N}">
      <!-- Frontal: derecha de la última obra -->
      <div class="side">
        ${rightOfLastHTML}
      </div>
      <!-- Dorso: contraportada -->
      <div class="side back">
        <div class="paper side bg-[#0d0d12] grid place-content-center text-center">
          <div>
            <h2 class="text-xl font-semibold">Gracias por leer ✦</h2>
            <p class="opacity-80 mt-2">Fin del libro.</p>
          </div>
        </div>
      </div>
    </div>`;
}



  function renderBook(){
    const left0    = leftSide(A[0], 1);
const rightPrev = rightSide(A[k-1], k-1, 2*k);
const leftCur   = leftSide(A[k], 2*k + 1);
const rightLast = rightSide(A[N-1], N-1, 2*N);


    // tamaño del viewport (2:3 aprox)
    const viewport = $('#viewport');
    const width = Math.min(980, (window.innerWidth || 980) - 32);
    const height = Math.max(380, Math.min(Math.round(width * 2/3), 720));
    viewport.style.width  = width + 'px';
    viewport.style.height = height + 'px';

    if (!N){
      book.innerHTML = `<div class="grid place-items-center w-full h-full">Sin datos</div>`;
      return;
    }

    state.activeImgIndex = Array.from({length:N}, (_,i)=> state.activeImgIndex[i] ?? 0);

    const sheets = [];
    // sheet 0: portada(front) + left(obra 0, back)
    sheets.push( coverSheet( leftPageHTML(A[0], 1) ) );

    // sheets 1..N-1: right(obra k-1, front) + left(obra k, back)
    for (let k=1; k<=N-1; k++){
      const rightPrev = rightPageHTML(A[k-1], k-1, 2*k);
      const leftCur   = leftPageHTML(A[k],     2*k + 1);
      sheets.push( middleSheet(k, rightPrev, leftCur, 1000 - k) );
    }

    // sheet N: right(obra N-1) + contraportada
    const rightLast = rightPageHTML(A[N-1], N-1, 2*N);
    sheets.push( lastSheet(N, rightLast) );

    book.innerHTML = sheets.join('');

    state.totalSheets  = N; // 0..N
    state.currentSheet = 0; // sólo la 0 girada al iniciar (libro abierto en obra 0)
    applyFlip(true);
    attachEvents();
    updateIndicator();
    console.log(`Flipbook listo: ${N} obras, ${state.totalSheets+1} hojas (incl. portada).`);
  }

  function applyFlip(initial=false){
    const all = [...document.querySelectorAll('.sheet')];
    all.forEach((s,i)=>{
      if (i <= state.currentSheet) s.classList.add('flipped');
      else s.classList.remove('flipped');
      s.style.zIndex = (all.length - i + 10).toString();
    });
    if (initial) {
      all[0]?.classList.add('flipped');   // ver back de sheet 0 (izq obra 0)
      all[1]?.classList?.remove('flipped'); // front sheet 1 = der obra 0
    }
    $('#prev').disabled = state.currentSheet <= 0;
    $('#next').disabled = state.currentSheet >= state.totalSheets;
    updateIndicator();
  }

  function updateIndicator(){
    const curWork = clamp(state.currentSheet + 1, 1, state.artworks.length);
    $('#indicator').textContent = `${curWork} / ${state.artworks.length}`;
  }

  function goNext(){
    if (state.currentSheet < state.totalSheets) {
      state.currentSheet++;
      applyFlip();
    }
  }
  function goPrev(){
    if (state.currentSheet > 0) {
      state.currentSheet--;
      applyFlip();
    }
  }

  function attachEvents(){
    const viewport = $('#viewport');
    $('#next').onclick = goNext;
    $('#prev').onclick = goPrev;

    viewport.onclick = (e)=>{
      const r = viewport.getBoundingClientRect();
      const x = e.clientX - r.left;
      if (x > r.width * 0.6) goNext();
      else if (x < r.width * 0.4) goPrev();
    };
    window.onkeydown = (e)=>{
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft')  goPrev();
    };

    // thumbs
    $('#book').addEventListener('click', (e)=>{
      const t = e.target.closest('.thumb');
      if (!t) return;
      const artIndex = parseInt(t.dataset.art, 10);
      const imgIndex = parseInt(t.dataset.img, 10);
      if (Number.isNaN(artIndex) || Number.isNaN(imgIndex)) return;

      state.activeImgIndex[artIndex] = imgIndex;

      const main = document.querySelector(`.main-img[data-art="${artIndex}"]`);
      const src  = t.querySelector('img')?.getAttribute('src');
      if (main && src) main.setAttribute('src', src);

      // marcar activa sólo en ese bloque de miniaturas
      const sheetForArt = main?.closest('.sheet');
      (sheetForArt || document).querySelectorAll(`.thumb[data-art="${artIndex}"]`).forEach(b=> b.classList.remove('active'));
      t.classList.add('active');
    });

    // re-render responsive
    window.onresize = ()=>{
      // re‑render conservando obra/imagen actual
      const cur = state.currentSheet;
      const copyIdx = [...state.activeImgIndex];
      renderBook();
      state.currentSheet = Math.min(cur, state.totalSheets);
      state.activeImgIndex = copyIdx;
      applyFlip();
    };
  }

  // ===== Init: carga tu JSON real =====
  (async function init(){
    try{
      const res = await fetch(JSON_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const tr  = await res.json();
      state.artworks = Array.isArray(tr.artworks) ? tr.artworks : [];
    }catch(err){
      console.error('No se pudo cargar /src/locales/es.json', err);
      state.artworks = []; // sin datos
    }
    renderBook();
  })();
})();
