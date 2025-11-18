// English header injector (safe for existing headers)
document.addEventListener("DOMContentLoaded", () => {
  // If a header already exists in the page, don't inject a new one.
  if (document.querySelector("header")) return;

  const isEnglish = window.location.pathname.includes("/en/");
  const prefix = isEnglish ? ".." : ".";
  const langTarget = isEnglish ? `${prefix}/index.html` : `${prefix}/en/index.html`;

  const header = `
    <header>
      <div class="container">
        <div class="logo">
          <img src="${prefix}/images/logos/en-logo.svg" alt="Emiliano Naranjo Logo">
        </div>
        <nav>
          <ul>
            <li><a href="${isEnglish ? "index.html" : "en/index.html"}">Home</a></li>
            <li><a href="${isEnglish ? "about.html" : "en/about.html"}">About</a></li>
            <li><a href="${isEnglish ? "publications.html" : "en/publications.html"}">Publications</a></li>
            <li><a href="${isEnglish ? "workshops.html" : "en/workshops.html"}">Workshops & Training</a></li>
            <li><a href="${isEnglish ? "interviews.html" : "en/interviews.html"}">Interviews</a></li>
            <li><a href="${isEnglish ? "contact.html" : "en/contact.html"}">Contact</a></li>
            <li class="lang-switch"><a href="${langTarget}">🇦🇷 Español</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML("afterbegin", header);
});
