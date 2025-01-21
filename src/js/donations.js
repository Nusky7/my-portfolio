document.addEventListener("DOMContentLoaded", () => {
const donateBtn = document.getElementById('donateBtn');
const donationModal = document.getElementById('donationModal');
const closeModal = document.getElementById('closeModal');
const paypalBtn = document.getElementById('paypalBtn');
const kofiBtn = document.getElementById('kofiBtn');
const stripeBtn = document.getElementById('stripeBtn');
const btcAddress = "bc1qzn5dj9vlcwhc0x502yeev5w4uuml34rqc6y6u9";
const copyBtcBtn = document.getElementById("copyBtcBtn");
const headerContent = document.getElementById("header-content");
const coffee = document.getElementById('coffee');
const coffeeImg = document.getElementById('coffee-img');
const name = document.getElementById('name');
const socialBts = document.getElementById('social-bts');

    

/**
 * Muestra el modal de donaciones al hacer clic en el botón de donación.
 * @param {Event} event - Evento de clic.
 */
donateBtn.addEventListener('click', (event) => {
    console.log('Botón de donación clickeado');
    donationModal.classList.remove('hidden'); 
    donateBtn.classList.add('scale-110');
    coffee.classList.remove('opacity-0');
    coffeeImg.classList.remove('border-2');
    coffeeImg.classList.add('animate-flash');
});

/**
 * Cierra el modal de donaciones al hacer clic en el botón de cierre.
 */
closeModal.addEventListener('click', () => {
    console.log('Botón de cerrar clickeado');
    donationModal.classList.add('hidden');
     donateBtn.classList.remove('scale-110');
    coffee.classList.add('opacity-0');
    coffeeImg.classList.remove('animate-flash');
    
});

/**
 * Redirige al usuario a la página de PayPal para donaciones.
 */
paypalBtn.addEventListener('click', () => {
    window.open('https://www.paypal.me/Nusky7', '_blank'); 
    donationModal.classList.add('hidden'); 
    donateBtn.classList.remove('scale-110');
    coffee.classList.add('opacity-0');
    coffeeImg.classList.remove('animate-flash');
   
});

/**
 * Redirige al usuario a la página de Ko-fi para donaciones.
 */
kofiBtn.addEventListener('click', () => {
    window.open('https://ko-fi.com/nusky7', '_blank'); 
    donationModal.classList.add('hidden'); 
    donateBtn.classList.remove('scale-110');
    coffee.classList.add('opacity-0');
    coffeeImg.classList.remove('animate-flash');
});

/**
 * Redirige al usuario a la página de Stripe para donaciones.
 */
stripeBtn.addEventListener('click', () => {
    window.open('https://donate.stripe.com/00g14ngOpcPEdrycMM', '_blank');
    donationModal.classList.add('hidden'); 
    donateBtn.classList.remove('scale-110');
    coffee.classList.add('opacity-0');
    coffeeImg.classList.remove('animate-flash');
});
    
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  toastMsg.innerHTML = msg;
    toast.classList.remove('hidden');
    
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3900);
}

/**
 * Copia la dirección de Bitcoin al portapapeles.
 */
    copyBtcBtn.addEventListener("click", (event) => {
        event.preventDefault();
        let message = `<p class="animate-colorCycle"> ₿ Direccion copiada al portapapeles...<span class="animate-flashSlow">▎</span></p>`;
        navigator.clipboard.writeText(btcAddress) 
        .then(() => {
            showToast(message); 
        })
        .catch(err => {
            console.error("Failed to copy text: ", err); 
            showToast("Fallo al copiar la dirección. Por favor inténtalo de nuevo."); 
        });
    });
});

