/* ============================================================
   SISTEMA DE IDIOMA UNIFICADO – VERSION 2025
   Emiliano Naranjo – Funciona en ES ↔ EN ↔ PT sin romper rutas
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* === 1. Detectar idioma actual === */
  const path = window.location.pathname;
  const htmlLang = (document.documentElement.lang || "").toLowerCase();
  const isEnglish = path.includes("/en/") || htmlLang.startsWith("en");
  const isPortuguese = path.includes("/pt/") || htmlLang.startsWith("pt");
  const currentLang = isPortuguese ? "pt" : isEnglish ? "en" : "es";
  localStorage.setItem("preferredLanguage", currentLang);

  /* === 2. Calcular la base real del sitio (sirve para GitHub Pages o raíz) === */
  const computeBasePath = () => {
    const segments = path.split("/");

    if (!path.endsWith("/")) {
      segments.pop(); // quitamos archivo
    } else if (segments.length && segments[segments.length - 1] === "") {
      segments.pop(); // quitamos vacío extra
    }

    const langIndex = segments.findIndex(seg => seg === "en" || seg === "pt");
    let base = langIndex !== -1 ? segments.slice(0, langIndex).join("/") : segments.join("/");

    if (!base.startsWith("/")) base = "/" + base;
    if (!base.endsWith("/")) base += "/";

    return base === "//" ? "/" : base;
  };

  const basePath = computeBasePath();

  /* === 3. Normalizar menú === */
  const navList = document.querySelector("nav ul");
  if (!navList) return;

  navList.querySelectorAll(".lang-switch").forEach(n => n.remove());

  const fileKeys = {
    home: ["index.html", ""],
    about: ["sobre.html", "about.html"],
    publications: ["publicaciones.html", "publications.html"],
    workshops: ["talleres.html", "workshops.html"],
    interviews: ["entrevistas.html", "interviews.html"],
    contact: ["contacto.html", "contact.html"],
  };

  const routes = {
    es: {
      home: "index.html",
      about: "sobre.html",
      publications: "publicaciones.html",
      workshops: "talleres.html",
      interviews: "entrevistas.html",
      contact: "contacto.html",
    },
    en: {
      home: "en/index.html",
      about: "en/about.html",
      publications: "en/publications.html",
      workshops: "en/workshops.html",
      interviews: "en/interviews.html",
      contact: "en/contact.html",
    },
    pt: {
      home: "pt/index.html",
      about: "pt/about.html",
      publications: "pt/publications.html",
      workshops: "pt/workshops.html",
      interviews: "pt/interviews.html",
      contact: "pt/contact.html",
    },
  };

  const identifyKey = (fileName) => {
    const normalized = (fileName || "").toLowerCase();
    const match = Object.entries(fileKeys).find(([, names]) =>
      names.some(name => name === normalized)
    );
    return match ? match[0] : "home";
  };

  const currentSegments = path.split("/").filter(Boolean);
  const currentFile = currentSegments.pop() || "index.html";
  const normalizedFile = currentFile.includes(".") ? currentFile : "index.html";
  const currentKey = identifyKey(normalizedFile);

  const labels = {
    es: "🇦🇷 Español",
    en: "🇺🇸 English",
    pt: "🇧🇷 Português",
  };

  const languageOrder = {
    es: ["es", "en", "pt"],
    en: ["en", "es", "pt"],
    pt: ["pt", "es", "en"],
  };

  const buildHref = (lang, key) => `${basePath}${routes[lang][key] || routes[lang].home}`;

  languageOrder[currentLang].forEach(lang => {
    const li = document.createElement("li");
    li.classList.add("lang-switch");
    const link = document.createElement("a");
    link.href = buildHref(lang, currentKey);
    link.textContent = labels[lang];
    if (lang === currentLang) link.setAttribute("aria-current", "page");
    li.appendChild(link);
    navList.appendChild(li);
  });

  /* === 4. Corregir enlaces del menú automáticamente (mantiene idioma actual) === */
  navList.querySelectorAll("a").forEach(a => {
    if (a.closest(".lang-switch")) return;

    const href = a.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return;

    const clean = href
      .replace(/^\//, "")
      .replace(/^\.\.\//, "")
      .replace(/^\.\//, "");

    const targetKey = identifyKey(clean);
    const normalized = routes[currentLang][targetKey] || routes[currentLang].home;

    a.setAttribute("href", `${basePath}${normalized}`);
  });

});
