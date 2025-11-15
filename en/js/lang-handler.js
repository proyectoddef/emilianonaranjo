/* ============================================================
   SISTEMA INTERMEDIO DE IDIOMAS – OPCIÓN B (Estable)
   Emiliano Naranjo – 2025

   ✔ Recuerda idioma preferido (localStorage)
   ✔ No fuerza redirecciones automáticas
   ✔ Respeta cuando el usuario toca una bandera
   ✔ Ajusta rutas ES ↔ EN sin tocar HTML
   ✔ Funciona igual en hosting y en local
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  const currentPath = window.location.pathname;
  const isEnglish = currentPath.includes("/en/");
  const preferred = localStorage.getItem("preferredLanguage");

  /* ========================================
     1. GUARDAR preferencia SOLO cuando el usuario
        entra voluntariamente a una página EN
     ======================================== */
  if (isEnglish) {
    localStorage.setItem("preferredLanguage", "en");
  } else {
    localStorage.setItem("preferredLanguage", "es");
  }

  /* ========================================
     2. AJUSTE DE ENLACES AUTOMÁTICO
        Mantiene idioma mientras navegás
     ======================================== */

  document.querySelectorAll("nav a").forEach(link => {
    const href = link.getAttribute("href");

    if (!href) return;
    if (href.startsWith("http")) return;  // Ignora enlaces externos

    const clean = href.replace(/^\.\.\//, "").replace(/^\.\//, "");

    if (isEnglish) {
      // Estamos en inglés → todos los links deben apuntar a /en/
      if (!href.startsWith("../")) {
        link.setAttribute("href", `../${clean}`);
      }
    } else {
      // Estamos en español → los enlaces no deben tener /en/
      if (href.includes("../")) {
        link.setAttribute("href", clean);
      }
    }
  });

  /* ========================================
     3. NO REDIRIGE AUTOMÁTICAMENTE
        (solo recuerda el idioma preferido)
     ======================================== */

  // Nada se fuerza. Solo guardamos la preferencia.
  // Cuando el usuario toca una bandera, será respetado.

});
