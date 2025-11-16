/* ============================================================
   SISTEMA DE IDIOMA UNIFICADO – VERSION FINAL
   Emiliano Naranjo – 2025
   Funciona en ES ↔ EN sin modificar cada página individual
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* === 1. Detectar idioma actual === */
  const path = window.location.pathname;
  const isEnglish = path.includes("/en/");
  const basePath = "/emilianonaranjo/";   // <-- GitHub Pages Folder
  localStorage.setItem("preferredLanguage", isEnglish ? "en" : "es");

  /* === 2. Normalizar menú === */
  const navList = document.querySelector("nav ul");
  if (!navList) return;

  navList.querySelectorAll(".lang-switch").forEach(n => n.remove());

  const li = document.createElement("li");
  li.classList.add("lang-switch");

  // En inglés → volver a español
  // En español → ir a inglés
  const target = isEnglish
    ? `${basePath}index.html`
    : `${basePath}en/index.html`;

  li.innerHTML = `
    <a href="${target}" class="lang-btn" aria-label="Cambiar idioma">
      ${isEnglish ? "🇦🇷 Español" : "🇬🇧 English"}
    </a>
  `;

  navList.appendChild(li);

  /* === 3. Corregir enlaces del menú automáticamente === */
  navList.querySelectorAll("a").forEach(a => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("http")) return;

    if (isEnglish) {
      if (!href.startsWith("../")) {
        a.setAttribute("href", "../" + href);
      }
    } else {
      if (href.startsWith("../")) {
        a.setAttribute("href", href.replace("../", ""));
      }
    }
  });

});
