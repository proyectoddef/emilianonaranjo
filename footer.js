document.addEventListener("DOMContentLoaded", () => {
  // Evitamos duplicar el footer cuando la plantilla ya trae uno incluido.
  if (document.querySelector("footer")) return;

  const footer = `
    <footer>
      <img src="images/logos/en-logo.svg" alt="Logo Emiliano Naranjo" class="footer-logo">
      <p>Educación inclusiva | Derechos Humanos | Anticapacitismo</p>
      <p>© 2025 Emiliano Naranjo — Todos los derechos reservados.</p>
    </footer>
  `;

  // Inserta el footer solo cuando falta en la página.
  document.body.insertAdjacentHTML("beforeend", footer);
});
