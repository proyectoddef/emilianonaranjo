document.addEventListener("DOMContentLoaded", () => {
  const header = `
    <header>
      <div class="container">
        <div class="logo">
          <img src="images/logos/en-logo.svg" alt="Logo Emiliano Naranjo">
        </div>
        <nav>
          <ul>
            <li><a href="index.html">Inicio</a></li>
            <li><a href="sobre.html">Sobre mí</a></li>
            <li><a href="publicaciones.html">Publicaciones</a></li>
            <li><a href="talleres.html">Talleres y capacitaciones</a></li>
            <li><a href="entrevistas.html">Entrevistas</a></li>
            <li><a href="contacto.html">Contacto</a></li>
            <li><a href="en/index.html"><img src="images/icons/uk-flag.png" alt="English version" style="width:22px; vertical-align:middle;"></a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;
  document.body.insertAdjacentHTML("afterbegin", header);
});
