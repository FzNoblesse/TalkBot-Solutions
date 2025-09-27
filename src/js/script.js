// scroll suave al hacer click en el menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Mensaje de confirmación en formulario
const form = document.querySelector("form");
form.addEventListener("submit", e => {
  e.preventDefault();
  alert("Gracias por contactarnos. Te responderemos pronto.");
  form.reset();
});
