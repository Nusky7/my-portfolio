const RSS_FEEDS = [
  'https://www.xda-developers.com/feed/news/',
  'https://www.xataka.com/feedburner.xml',
  // 'https://es.wired.com/feed/gadgets/rss',
  'https://hipertextual.com/feed',
  'https://es.gizmodo.com/feed',
  // 'https://elchapuzasinformatico.com/informatica/feed/',
  // 'https://www.cronista.com/files/rss/it.xml',
  // 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada',
  // 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/tecnologia/portada',
  // 'https://es.wired.com/feed/rss',
  // 'https://www.htcmania.com/external.php?type=RSS2',

];
const proxyUrl = "https://api.allorigins.win/raw?url=";

 function showCategory(category) {
      // Oculta todas las secciones de categoría
      document.querySelectorAll('.category-section').forEach(section => {
        section.classList.add('hidden');
      });
      // Muestra la sección correspondiente
      document.getElementById(category).classList.remove('hidden');
      
      // Si se selecciona "Noticias RRSS", cargar el feed
      if (category === 'noticias-rrss') {
        loadRSS();
      }
    }
    
   // Función para cambiar entre feeds
function loadRSS(feedIndex = 0) {
    fetch(proxyUrl + RSS_FEEDS[feedIndex])
        .then(response => response.text())
        .then(str => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(str, 'application/xml');
            const items = xml.querySelectorAll('item');
            let html = '';
            
            items.forEach((item, index) => {
                if (index < 12) { // Mostrar 12 posts
                    const title = item.querySelector('title') ? item.querySelector('title').textContent : 'Sin título';
                    const link = item.querySelector('link') ? item.querySelector('link').textContent : '#';
                    const pubDate = item.querySelector('pubDate') ? item.querySelector('pubDate').textContent : '';
                    const description = item.querySelector("description") ? item.querySelector("description").textContent : "";
                    let imageUrl = "";

                    // Buscar imagen en <media:thumbnail>
                    const mediaThumbnail = item.getElementsByTagName("media:thumbnail");
                    if (mediaThumbnail.length > 0) {
                        imageUrl = mediaThumbnail[0].getAttribute("url");
                    }

                    // Buscar imagen en <media:content>
                    if (!imageUrl) {
                        const mediaContent = item.getElementsByTagName("media:content");
                        if (mediaContent.length > 0) {
                            imageUrl = mediaContent[0].getAttribute("url");
                        }
                    }

                    // Buscar imagen en <enclosure>
                    if (!imageUrl) {
                        const enclosure = item.querySelector("enclosure");
                        if (enclosure) {
                            imageUrl = enclosure.getAttribute("url");
                        }
                    }

                    // Buscar imagen en la descripción usando regex
                    if (!imageUrl) {
                        const imgRegex = /<img[^>]+src="([^">]+)"/g;
                        const match = imgRegex.exec(description);
                        if (match) {
                            imageUrl = match[1];
                        }
                    }

                    // Si aún no hay imagen, usa una imagen de respaldo
                    if (!imageUrl) {
                        imageUrl = "https://via.placeholder.com/300x200?text=No+Image";
                    }

                    html += `
                        <article class="mb-4 pb-2 bg-zinc-950 opacity-95 hover:border border-emerald-200 hover:opacity-100 rounded-lg hover:scale-105">
                            ${imageUrl ? `<img src="${imageUrl}" alt="${title}" class="w-full h-45 rounded-t-lg mb-2">` : ''}
                            <h3 class="text-lg mx-4 line-clamp-3 hover:scale-105">
                                <a href="${link}" target="_blank" rel="noopener noreferrer" class="hover:text-teal-200 drop-shadow-lg hover:animate-glowText2 text-emerald-200">${title}</a>
                            </h3>
                            <p class="text-sm text-center text-gray-400 mx-4 py-1">${pubDate}</p>
                        </article>
                    `;
                }
            });

            document.getElementById('rss-container').innerHTML = html;

            // Cambiar color del botón activo
            document.querySelectorAll(".rss-btn").forEach(btn => {
                btn.classList.remove("bg-teal-700");
                btn.classList.add("bg-gray-600");
            });

            // Seleccionar el botón activo y cambiar su color
            const btnIds = ["btn-xataka", "btn-xda", "btn-gadgets", "btn-varios"];
            document.getElementById(btnIds[feedIndex]).classList.remove("bg-gray-600");
            document.getElementById(btnIds[feedIndex]).classList.add("bg-teal-700");

        })
        .catch(error => {
            console.error('Error al cargar el feed RSS:', error);
            document.getElementById('rss-container').innerHTML = '<p>Error al cargar las noticias.</p>';
        });
}

// Cargar el primer feed por defecto al iniciar
document.addEventListener("DOMContentLoaded", () => loadRSS(0));