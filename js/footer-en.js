// English footer injector (safe for existing footers)
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("footer")) return;

  const isEnglish = window.location.pathname.includes("/en/");
  const prefix = isEnglish ? ".." : ".";

  const footer = `
    <footer>
      <img src="${prefix}/images/logos/en-logo.svg" alt="Logo" class="footer-logo">
      <p>Inclusive Education | Human Rights | Anti-Ableism</p>
      <p>© 2025 Emiliano Naranjo — All rights reserved.</p>
    </footer>
  `;

  document.body.insertAdjacentHTML("beforeend", footer);
});
