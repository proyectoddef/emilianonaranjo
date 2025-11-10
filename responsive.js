/* ======= RESPONSIVE.JS (versión estable 2025-11) ======= */
/* Este script garantiza que el CSS responsivo se cargue correctamente,
   mantiene la preferencia de idioma y evita conflictos de rutas. */

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const isEnglish = currentPath.includes("/en/");
  const preferredLang = localStorage.getItem("preferredLanguage");

  // === 1. Carga correcta del CSS ===
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = isEnglish ? "../responsive.css" : "responsive.css"; // ✅ ruta correcta
  document.head.appendChild(link);

  // === 2. Guarda preferencia actual ===
  if (isEnglish) {
    localStorage.setItem("preferredLanguage", "en");
  } else {
    localStorage.setItem("preferredLanguage", "es");
  }

  // === 3. Asegura coherencia de idioma entre enlaces ===
  document.querySelectorAll("nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http")) return;

    if (isEnglish && !href.startsWith("/en/")) {
      const cleanHref = href.replace("../", "").replace("./", "").replace(/^\/+/, "");
      link.setAttribute("href", `/en/${cleanHref}`);
    } else if (!isEnglish && href.includes("/en/")) {
      link.setAttribute("href", href.replace("/en/", "/"));
    }
  });

  // === 4. Redirige a inglés si la preferencia lo indica y estás fuera de /en/ ===
  if (preferredLang === "en" && !isEnglish && currentPath.endsWith("/index.html")) {
    window.location.href = "/en/index.html";
  }
});
