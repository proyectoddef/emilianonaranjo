/* ======= RESPONSIVE.JS (versión final) ======= */
document.addEventListener("DOMContentLoaded", () => {
  const isEnglish = window.location.pathname.includes("/en/");
  const cssFile = isEnglish ? "../responsive.css?v=final" : "responsive.css?v=final";
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = cssFile;
  document.head.appendChild(link);

  // Mantiene coherencia de idioma
  const preferred = localStorage.getItem("preferredLanguage");
  if (isEnglish && preferred !== "en") localStorage.setItem("preferredLanguage", "en");
  if (!isEnglish && preferred !== "es") localStorage.setItem("preferredLanguage", "es");
});