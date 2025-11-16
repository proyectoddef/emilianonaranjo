document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     DETECTAR NAV REAL Y FUNCIONAL
     ================================ */
  let navList = document.querySelector("header nav ul");

  // Si el HTML está roto, hacemos un fallback
  if (!navList) {
    navList = document.querySelector("nav ul");
  }

  if (!navList) {
    console.warn("⚠ No se encontró <nav><ul>. La bandera no se puede insertar.");
    return;
  }

  /* ================================
     DETECTAR IDIOMA ACTUAL
     ================================ */
  const currentPath = window.location.pathname;
  const isEnglish = currentPath.includes("/en/");

  /* ================================
     ELIMINAR CUALQUIER RESTO ANTERIOR
     ================================ */
  navList.querySelectorAll(".lang-switch").forEach(e => e.remove());

  /* ================================
     CREAR EL BOTÓN
     ================================ */
  const li = document.createElement("li");
  li.classList.add("lang-switch");

  const target = isEnglish ? "../index.html" : "en/index.html";
  const flag = isEnglish ? "🇦🇷" : "🇬🇧";
  const label = isEnglish ? "Español" : "English";

  li.innerHTML = `
    <a href="${target}" class="lang-btn" aria-label="Cambiar idioma">
      ${flag} ${label}
    </a>
  `;

  /* ================================
     INSERTAR AL FINAL DEL MENÚ
     ================================ */
  navList.appendChild(li);
});
