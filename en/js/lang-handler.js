/* ============================================================
   SISTEMA INTERMEDIO DE IDIOMAS – ESTABLE 2025
   Emiliano Naranjo

   ✔ Mantiene navegación dentro del idioma actual
   ✔ No redirige a hosts viejos
   ✔ No cambia idioma por error
   ✔ Respeta la ruta real del sitio
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  const path = window.location.pathname;

  // Detectamos si estamos en /en/
  const isEnglish = path.includes("/en/");

  // Guardamos preferencia SOLO según carpeta actual
  localStorage.setItem("preferredLanguage", isEnglish ? "en" : "es");

  /* ---------------------------------------------------------
     AJUSTAR LOS ENLACES DEL MENÚ
     --------------------------------------------------------- */
  document.querySelectorAll("nav a").forEach(link => {

    const href = link.getAttribute("href");
    if (!href || href.startsWith("http")) return;

    // Quitamos "./" y "../"
    const clean = href.replace(/^\.\//, "").replace(/^\.\.\//, "");

    if (isEnglish) {
      link.href = "../" + clean;
    } else {
      link.href = clean;
    }
  });

  /* ---------------------------------------------------------
     INSERTAR BOTÓN DE IDIOMA
     --------------------------------------------------------- */
  const navList = document.querySelector("nav ul");
  if (!navList) return;

  // Eliminar cualquier botón previo
  navList.querySelectorAll(".lang-switch").forEach(e => e.remove());

  const li = document.createElement("li");
  li.classList.add("lang-switch");

  // Si estoy en ingles → ir a español
  // Si estoy en español → ir a ingles
  const target = isEnglish ? "../index.html" : "en/index.html";

  li.innerHTML = `
    <a href="${target}" aria-label="Cambiar idioma">
      ${isEnglish ? "🇦🇷 Español" : "🇬🇧 English"}
    </a>
  `;

  navList.appendChild(li);
});
