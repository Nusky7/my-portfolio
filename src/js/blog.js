document.addEventListener("DOMContentLoaded", function () {
      fetch("locales/posts.json")
        .then(response => response.json())
        .then(posts => {
            console.log("📌 Posts cargados:", posts);
            let desarrolloContainer = document.getElementById("posts-desarrollo");
            let androidContainer = document.getElementById("posts-android");

            if (!desarrolloContainer || !androidContainer) {
                console.error("❌ ERROR: No se encontraron los contenedores de las categorías.");
                return;
            }

            posts.forEach(post => {
                let postElement = document.createElement("article");
                postElement.classList.add("bg-zinc-900", "md:opacity-90", "hover:opacity-100", "hover:scale-105", "p-4", "rounded-lg", "shadow-lg", "hover:shadow-xl", "transition-all");

                postElement.innerHTML = `
                    <a href="${post.url}" class="block">
                        <img src="${post.image}" alt="${post.title}" class="w-full h-40 object-cover rounded-lg mb-4">
                        <h2 class="text-xl font-semibold">${post.title}</h2>
                        <p class="text-gray-400 font-orbi text-sm">${post.date} - ${post.author}</p>
                        <p class="mt-2">${post.content.substring(0, 100)}...</p>
                        <span class="text-teal-300 font-orbi mt-2 block">Leer más →</span>
                    </a>
                `;

                // Insertar en la categoría correspondiente
                if (post.category === "Desarrollo Web") {
                    desarrolloContainer.appendChild(postElement);
                } else if (post.category === "Dispositivos y Android") {
                    androidContainer.appendChild(postElement);
                }
            });
        })
        .catch(error => console.error("❌ Error al cargar los posts:", error));
});

// Función para cambiar de categoría al hacer clic en los tabs
function showCategory(category) {
    document.querySelectorAll(".category-section").forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(category).classList.remove("hidden");

    // Quitar la clase de "active" en todos los botones
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("bg-teal-600", "active-tab");
        btn.classList.add("bg-gray-600");
    });

    // Activar el botón seleccionado
    let activeBtn = category === "desarrollo-web" 
        ? document.querySelector('button[onclick="showCategory(\'desarrollo-web\')"]') 
        : document.querySelector('button[onclick="showCategory(\'dispositivos-android\')"]');

    activeBtn.classList.remove("bg-gray-600");
    activeBtn.classList.add("bg-teal-600", "active-tab");

VANTA.NET({
  el: "#html",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
    scaleMobile: 1.00,
  backgroundColor: 0x1f1f1f,
  color: 0x8ad8cf,
//   color: 0x3ffff1,
  points: 18.00,
  maxDistance: 18.00,
  spacing: 15.00
})
// VANTA.BIRDS({
//   el: "#html",
//   mouseControls: true,
//   touchControls: true,
//   gyroControls: false,
//   minHeight: 200.00,
//   minWidth: 200.00,
//   scale: 1.00,
//   scaleMobile: 1.00,
//   backgroundColor: 0x28282B,
//   color1: 0x58D6C3,
//   color2: 0xd997ef,
//   colorMode: "lerpGradient",
//   birdSize: 1.80,
//   speedLimit: 2.50,
//   separation: 60.00,
//   alignment: 30.00,
//   cohesion: 15.00,
//   quantity: 3.00
// })
    
//     VANTA.RINGS({
//   el: "#html",
//   mouseControls: true,
//   touchControls: true,
//   gyroControls: false,
//   minHeight: 200.00,
//   minWidth: 200.00,
//   scale: 1.00,
//   scaleMobile: 1.00
//     })
    
//     VANTA.FOG({
//   el: "#html",
//   mouseControls: true,
//   touchControls: true,
//   gyroControls: false,
//   minHeight: 200.00,
//         minWidth: 200.00,
//     highlightColor: 0xffcf,
//   midtoneColor: 0x0,
//   lowlightColor: 0x7e00ff
// })

}
