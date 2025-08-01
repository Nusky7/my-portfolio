// let API_KEY = "";

// fetch('../../config.json')
//   .then(res => res.json())
//   .then(config => {
//       API_KEY = config.API_KEY;
//       fetchYouTubeVideos(); 
//   });

// const CHANNEL_ID = "UCPq_GszDHaxqJYOfTT9mwxw"; 
// const SEARCH_QUERY = "tutorial Tailwind CSS JavaScript";
const MAX_RESULTS = 6; 
const VIDEO_ID_DESTACADO = "y_3FGZGlCIc";
const videoContainer = document.getElementById('youtube-videos');
const videoMsg = document.getElementById('video-message');

async function fetchYouTubeVideos() {
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${VIDEO_ID_DESTACADO}&key=${API_KEY}`;
    const searchUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLMtUu92TsgfXSMpuo9e3mdUqwp6G7ThG1&maxResults=${MAX_RESULTS}&key=${API_KEY}`;

    try {
        const [videoResponse, searchResponse] = await Promise.all([
            fetch(videoUrl),
            fetch(searchUrl)
        ]);

        const videoData = await videoResponse.json();
        const searchData = await searchResponse.json();

        if (videoData.error || searchData.error) {
            console.error("Error de la API:", videoData.error || searchData.error);
            videoMsg.innerHTML = `<p class="text-center text-emerald-100">Error al cargar videos.</p>`;
            return;
        }

        let featuredVideo = videoData.items.length > 0 ? videoData.items[0] : null;

        let otherVideos = (searchData.items || [])
        .map(item => ({
            id: item.snippet.resourceId.videoId,
            snippet: item.snippet
        }))
        .filter(video => video.id !== VIDEO_ID_DESTACADO); 

        let finalVideos = [...otherVideos];
        finalVideos.splice(2, 0, featuredVideo); 

        displayVideos(finalVideos);

    } catch (error) {
        console.error("Error al recuperar los videos:", error);
        videoMsg.innerHTML = `<p class="text-center text-emerald-100">Error al cargar los videos.</p>`;
    }
}


// Función para mostrar los videos
function displayVideos(videos) {
    videoContainer.innerHTML = videos.map(video => {
        const { title, thumbnails } = video.snippet;
        const videoId = video.id.videoId || video.id; 

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
