function showCategory(category) {
    const tabs = document.querySelectorAll(".tab-btn");

    tabs.forEach(tab => {
        if (tab.dataset.category === category) {
            tab.classList.add("text-emerald-100", "bg-zinc-900", "animate-glowText2");
            tab.classList.remove("text-white");
        } else {
            tab.classList.remove("text-emerald-100", "bg-zinc-900", "animate-glowText2");
            tab.classList.add("text-white");
        }
    });

    // Mostrar la sección correspondiente
    document.querySelectorAll(".category-section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(category).classList.remove("hidden");

}


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
                postElement.classList.add("bg-zinc-950", "hover:shadow-emerald", "hover:scale-105", "pb-2", "rounded-lg", "shadow-xl", "transition-all");

                postElement.innerHTML = `
                    <a href="${post.url}" class="block ">
                        <img src="${post.image}" alt="${post.title}" class="w-full h-auto object-cover rounded-t-lg mb-4">
                        <h2 class="text-xl text-pink-100 font-semibold px-3">${post.title}</h2>
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

    // // Set the default active tab
    showCategory("dispositivos-android");

    const tabs = document.querySelectorAll(".tab-btn");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const category = tab.getAttribute("data-category");
            showCategory(category);
        });
    });


    });
