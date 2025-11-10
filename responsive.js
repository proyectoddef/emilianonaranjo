document.addEventListener("DOMContentLoaded", function() {
  const head = document.querySelector("head");

  // Asegura viewport responsivo
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement("meta");
    viewport.name = "viewport";
    viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0";
    head.appendChild(viewport);
  }

  // Carga un CSS responsive común si no está ya incluido
  if (!document.querySelector('link[href*="responsive.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "style/responsive.css";
    head.appendChild(link);
  }

  // Ajuste básico de clases para imágenes y contenedores
  document.querySelectorAll("img").forEach(img => {
    img.style.maxWidth = "100%";
    img.style.height = "auto";
  });

  // Asegura padding y margen razonables para móviles
  document.body.style.padding = "1rem";
});
