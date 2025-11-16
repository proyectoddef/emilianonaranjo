/* ===== CARGA AUTOMÁTICA DEL SISTEMA DE IDIOMAS ===== */

(function () {
  const version = "20251115"; // Cambiás este número solo cuando quieras forzar actualización

  const script = document.createElement("script");
  script.src = `js/lang-handler.js?v=${version}`;
  document.head.appendChild(script);
})();
