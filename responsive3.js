/* ======= RESPONSIVE.JS — versión estable 2025-11-10 ======= */
document.addEventListener("DOMContentLoaded", () => {
  // Forzamos recarga de CSS (evita caché de GitHub Pages)
  const version = "v20251110";
  ["style.css", "responsive.css"].forEach(file => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${file}?${version}`;
    document.head.appendChild(link);
  });
});
