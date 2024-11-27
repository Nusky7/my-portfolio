import emailjs from 'emailjs-com';

const SERVICE_ID = 'nusky_service';
const TEMPLATE_ID = 'nusky_template';
const USER_ID = '39FmjBf7JrQSw9E-2'; 

/**
 * Envía un email usando EmailJS.
 * @param {Object} formData - Datos del formulario (nombre, email, mensaje).
 */
document.addEventListener("DOMContentLoaded", () => {
function sendEmail(formData) {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, USER_ID)
    .then(response => {
      console.log('Email enviado correctamente:', response.status, response.text);
      return response;
    })
    .catch(error => {
      console.error('Error al enviar el email:', error);
      throw error;
    });
}


// Enviar email
emailForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = {
      from_name: emailForm.elements['name'].value,
      from_email: emailForm.elements['email'].value,
      message: emailForm.elements['message'].value,
    };
  
    try {
      await sendEmail(formData);
      alert('¡Mensaje enviado con éxito! 😄');
      emailForm.reset(); 
    } catch (error) {
      alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo. 😥');
    }
  });

});