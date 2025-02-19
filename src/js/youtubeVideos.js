const API_KEY = "";
// const CHANNEL_ID = "UCPq_GszDHaxqJYOfTT9mwxw"; 
const SEARCH_QUERY = "tutorial Tailwind CSS JavaScript";
const MAX_RESULTS = 6;

//   async function loadConfig() {
//     try {
//         const response = await fetch('./config.json');
//         const config = await response.json();
//         const API_KEY = config.YOUTUBE_API_KEY;

//         // Ahora puedes usar API_KEY
//         console.log("API Key cargada:", API_KEY);
//         fetchYouTubeVideos(API_KEY); 
//     } catch (error) {
//         console.error("Error al cargar la configuración:", error);
//     }
// }

// loadConfig();

// Elemento donde mostrar los videos
const videoContainer = document.getElementById('youtube-videos');
const videoMsg = document.getElementById('video-message');

// Función para obtener los videos
async function fetchYouTubeVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(SEARCH_QUERY)}&maxResults=${MAX_RESULTS}&order=date&type=video&key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Manejo de errores de la API
        if (data.error) {
            console.error("Error de la API:", data.error.message);
            videoMsg.innerHTML = `
                <p class="text-center text-emerald-100">
                    Límite de la API de YouTube superado.
                </p>
                <div class="inline-flex items-center justify-center w-full">
                    <hr class="w-72 py-0.5 my-3 bg-emerald-300 bg-opacity-60 border-0 rounded">
                    <div class="absolute px-3 -translate-x-1/2 bg-neutral-950 rounded-full left-1/2">
                        ❌
                    </div>
                </div>
                <p class="text-center text-emerald-100">
                    ${data.error.message}
                </p>`;
            return;
        }

        // Verifica si hay videos
        if (data.items && data.items.length > 0) {
            videoMsg.innerHTML = ""; // 
            displayVideos(data.items);
        } else {
            videoMsg.innerHTML = `
            <p class="text-center text-emerald-100">
                    No se encontraron videos. Intenta de nuevo más tarde.
                </p>
                <div class="inline-flex items-center justify-center w-full">
                   <hr class="w-72 py-0.5 my-3 bg-emerald-300 bg-opacity-60 border-0 rounded">
                    <div class="absolute px-3 -translate-x-1/2 bg-neutral-950 rounded-full left-1/2">
                        ❌
                    </div>
                </div>
                <p class="text-center text-emerald-100">
                    No videos found. Try again later.
                </p>`;
        }

// Captura de errores en el bloque try-catch
} catch (error) {
    console.error("Error al recuperar los videos:", error);
    videoMsg.innerHTML = `
        <p class="text-center text-emerald-100">
            Hubo un error al cargar los videos. Por favor, verifica tu conexión.
        </p>
        <div class="inline-flex items-center justify-center w-full">
             <hr class="w-72 py-0.5 my-3 bg-emerald-300 bg-opacity-60 border-0 rounded">
             <div class="absolute px-3 -translate-x-1/2 bg-neutral-950 rounded-full left-1/2">
                ❌
            </div>
        </div>
        <p class="text-center text-emerald-100">
            An error occurred while loading videos. Please check your connection.
        </p>`;
}

}

// Mostrar los videos en el contenedor
function displayVideos(videos) {
    videoContainer.innerHTML = videos.map(video => {
        const { title, thumbnails } = video.snippet;
        const videoId = video.id.videoId;

        return `
           <div class="p-2.5 w-full h-auto shadow-md rounded-md hover:shadow-lg transition-shadow duration-300 overflow-hidden" style="background: linear-gradient(180deg, #3b3b3b, #262626);">
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="block">
                    <div class="aspect-w-16 aspect-h-9">
                        <img src="${thumbnails.high.url}" loading="lazy"  alt="${title}" class="yt-img w-full h-full object-cover">
                    </div>
              
                <div class="px-1 pt-0.5 flex items-center space-x-2">
                    <div class="shadow-[0_0_4px_2px_rgb(0,255,200,0.6)] p-0.5 w-1 h-1 ml-2 mr-0 bg-emerald-400 rounded-full animate-pulse"></div>
                    <h3 class="ml-0 mt-1 text-center text-emerald-100 hover:text-emerald-300 line-clamp-2">
                        ${title}
                    </h3>
                    </div>
                </a>
            </div>
        `;
    }).join('');
}
fetchYouTubeVideos();
