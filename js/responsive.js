/* ======= RESPONSIVE.JS — English-safe version ======= */
document.addEventListener("DOMContentLoaded", () => {
  const version = "v20251110";
  const isEnglish = window.location.pathname.includes("/en/");
  const prefix = isEnglish ? ".." : ".";

  ["style.css", "responsive.css"].forEach(file => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${prefix}/${file}?${version}`;
    document.head.appendChild(link);
  });
});
