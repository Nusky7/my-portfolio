

document.addEventListener("DOMContentLoaded", function () {
      fetch("../locales/posts.json")
        .then(response => response.json())
        .then(posts => {
            console.log("Posts cargados:", posts);
            let desarrolloContainer = document.getElementById("posts-desarrollo");
            let androidContainer = document.getElementById("posts-android");

            if (!desarrolloContainer || !androidContainer) {
                console.error("❌ ERROR: No se encontraron los contenedores de las categorías.");
                return;
            }

            posts.forEach(post => {
                let postElement = document.createElement("article");
                postElement.classList.add("bg-zinc-950", "md:opacity-95", "hover:shadow-emerald", "hover:opacity-100", "hover:scale-105", "pb-2", "rounded-lg", "shadow-xl", "transition-all");

                postElement.innerHTML = `
                    <a href="${post.url}" class="block ">
                        <img src="${post.image}" alt="${post.title}" class="w-full h-auto object-cover rounded-t-lg mb-4">
                        <h2 class="text-xl text-emerald-200 font-semibold px-3">${post.title}</h2>
                        <p class="text-gray-400 font-orbi text-sm px-3">${post.date}</p>
                        <p class="mt-2 px-3">${post.content.substring(0, 100)}...</p>
                        <span class="text-emerald-300 font-orbi mt-2 block px-3">Leer más →</span>
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


        VANTA.NET({
            el: "#html",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0x151516,
            // backgroundColor: 0x1f1f1f,
            color: 0x658e89,
            // color: 0x8ad8cf,
            //   color: 0x3ffff1,
            points: 18.00,
            maxDistance: 18.00,
            spacing: 15.00
        })
    
     const tabs = document.querySelectorAll(".tab-btn");

    function showCategory(category) {
        tabs.forEach(tab => {
            if (tab.dataset.category === category) {
                tab.classList.add("text-emerald-100", "bg-zinc-900", "animate-glowText2");
                tab.classList.remove("text-white");
            } else {
                tab.classList.remove("text-emerald-100", "bg-zinc-900", "animate-glowText2");
                tab.classList.add("text-white");
            }
        });
    }

    // Set the default active tab
    showCategory("desarrollo-web");

    // Attach event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            showCategory(this.dataset.category);
        });
    });

    });
