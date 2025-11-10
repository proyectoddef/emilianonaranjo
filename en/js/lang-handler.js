document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const isEnglish = currentPath.includes("/en/");
  const preferredLang = localStorage.getItem("preferredLanguage");

  // Guardar preferencia actual
  if (isEnglish) localStorage.setItem("preferredLanguage", "en");
  else localStorage.setItem("preferredLanguage", "es");

  // Asegurar que los enlaces mantengan idioma
  document.querySelectorAll("nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http")) return;

    // Normalizar enlaces internos
    if (isEnglish && !href.startsWith("/en/")) {
      const cleanHref = href.replace("../", "").replace("./", "").replace(/^\/+/, "");
      link.setAttribute("href", `/en/${cleanHref}`);
    } else if (!isEnglish && href.includes("/en/")) {
      link.setAttribute("href", href.replace("/en/", "/"));
    }
  });

  // Si la preferencia guardada es inglés pero estás fuera de /en/, redirigir solo desde index
  if (preferredLang === "en" && !isEnglish && currentPath.endsWith("/index.html")) {
    window.location.href = "/en/index.html";
  }
});
