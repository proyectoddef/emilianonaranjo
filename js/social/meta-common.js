document.addEventListener("DOMContentLoaded", function() {
  const head = document.querySelector("head");

  head.insertAdjacentHTML("beforeend", `
    <!-- ====== FAVICON ====== -->
    <link rel="icon" type="image/png" sizes="32x32" href="images/icons/favicon.png">
    <link rel="icon" type="image/svg+xml" href="images/icons/favicon.svg">
    <link rel="shortcut icon" href="images/icons/favicon.png" type="image/png">

    <!-- ====== METADATOS GENERALES ====== -->
    <meta property="og:site_name" content="Emiliano Naranjo">
    <meta name="author" content="Emiliano Naranjo">
    <meta name="theme-color" content="#0C2D57">
    <!-- ====== UNIVERSAL META TAGS FOR ALL NETWORKS ====== -->
<meta property="og:title" content="Emiliano Naranjo – Educador">
<meta property="og:description" content="Sitio oficial de Emiliano Naranjo, docente e investigador comprometido con la educación inclusiva y los derechos humanos.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://emilianonaranjo3.netlify.app/">
<meta property="og:locale" content="es_AR">

<!-- Open Graph para imagen (Facebook, LinkedIn, WhatsApp) -->
<meta property="og:image" content="https://raw.githubusercontent.com/emilianonaranjo/website/main/images/social/preview.jpg">
<meta property="og:image:secure_url" content="https://raw.githubusercontent.com/emilianonaranjo/website/main/images/social/preview.jpg">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Emiliano Naranjo – Educador">
<meta name="twitter:description" content="Sitio oficial de Emiliano Naranjo, docente e investigador comprometido con la educación inclusiva y los derechos humanos.">
<meta name="twitter:image" content="https://emilianonaranjo3.netlify.app/images/social/preview.jpg">
<meta name="twitter:image:type" content="image/jpeg">

<!-- LinkedIn -->
<meta name="linkedin:owner" content="Emiliano Naranjo">

  `);
});
