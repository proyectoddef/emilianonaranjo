document.addEventListener("DOMContentLoaded", () => {
  const header = `
    <header>
      <div class="container">
        <div class="logo">
          <img src="../images/logos/en-logo.svg" alt="Logo Emiliano Naranjo">
        </div>
        <nav>
          <ul>
            <li><a href="../index.html"><img src="../images/icons/ar-flag.png" alt="Versión en español" style="width:22px; vertical-align:middle;"></a></li>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="publications.html">Publications</a></li>
            <li><a href="workshops.html">Workshops</a></li>
            <li><a href="interviews.html">Interviews</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;
  document.body.insertAdjacentHTML("afterbegin", header);
});
