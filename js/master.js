/* ============================================================
   SISTEMA DE IDIOMA UNIFICADO – VERSION 2025
   Emiliano Naranjo – Funciona en ES ↔ EN sin romper rutas
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* === 1. Detectar idioma actual === */
  const path = window.location.pathname;
  const htmlLang = document.documentElement.lang || "";
  const isEnglish = path.includes("/en/") || htmlLang.toLowerCase().startsWith("en");
  localStorage.setItem("preferredLanguage", isEnglish ? "en" : "es");

  /* === 2. Calcular la base real del sitio (sirve para GitHub Pages o raíz) === */
  const computeBasePath = () => {
    const segments = path.split("/");

    if (!path.endsWith("/")) {
      segments.pop(); // quitamos archivo
    } else if (segments.length && segments[segments.length - 1] === "") {
      segments.pop(); // quitamos vacío extra
    }

    const enIndex = segments.indexOf("en");
    let base = enIndex !== -1 ? segments.slice(0, enIndex).join("/") : segments.join("/");

    if (!base.startsWith("/")) base = "/" + base;
    if (!base.endsWith("/")) base += "/";

    return base === "//" ? "/" : base;
  };

  const basePath = computeBasePath();

  /* === 3. Normalizar menú === */
  const navList = document.querySelector("nav ul");
  if (!navList) return;

  navList.querySelectorAll(".lang-switch").forEach(n => n.remove());

  const esToEn = {
    "index.html": "en/index.html",
    "sobre.html": "en/about.html",
    "publicaciones.html": "en/publications.html",
    "talleres.html": "en/workshops.html",
    "entrevistas.html": "en/interviews.html",
    "contacto.html": "en/contact.html",
  };

  const enToEs = {
    "index.html": "index.html",
    "about.html": "sobre.html",
    "publications.html": "publicaciones.html",
    "workshops.html": "talleres.html",
    "interviews.html": "entrevistas.html",
    "contact.html": "contacto.html",
  };

  const currentSegments = path.split("/").filter(Boolean);
  const currentFile = currentSegments.pop() || "index.html";
  const normalizedFile = currentFile.includes(".") ? currentFile : "index.html";

  const switchTarget = isEnglish
    ? `${basePath}${enToEs[normalizedFile] || "index.html"}`
    : `${basePath}${esToEn[normalizedFile] || "en/index.html"}`;

  const li = document.createElement("li");
  li.classList.add("lang-switch");

  li.innerHTML = `
    <a href="${switchTarget}" class="lang-btn" aria-label="Cambiar idioma">
      ${isEnglish ? "🇦🇷 Español" : "🇬🇧 English"}
    </a>
  `;

  navList.appendChild(li);

  /* === 4. Corregir enlaces del menú automáticamente (mantiene idioma actual) === */
  navList.querySelectorAll("a").forEach(a => {
    if (a.closest(".lang-switch")) return;

    const href = a.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return;

    const clean = href
      .replace(/^\//, "")
      .replace(/^\.\.\//, "")
      .replace(/^\.\//, "");

    const normalized = isEnglish
      ? `en/${clean.replace(/^en\//, "")}`
      : clean.replace(/^en\//, "");

    a.setAttribute("href", `${basePath}${normalized}`);
  });

});
