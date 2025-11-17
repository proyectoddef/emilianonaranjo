document.addEventListener("DOMContentLoaded", () => {
  // Prevent duplicate footers when the English pages already include one.
  if (document.querySelector("footer")) return;

  const footer = `
    <footer>
      <img src="../images/logos/en-logo.svg" alt="Logo Emiliano Naranjo" class="footer-logo">
      <p>Inclusive Education | Human Rights | Anti-Ableism</p>
      <p>© 2025 Emiliano Naranjo — All rights reserved.</p>
    </footer>
  `;

  // Only inject the footer when it is missing in the template.
  document.body.insertAdjacentHTML("beforeend", footer);
});
