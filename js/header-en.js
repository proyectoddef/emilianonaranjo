// Header helper for English pages – keeps active link state without breaking static markup.
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("header nav");
  if (!nav) return;

  const currentPath = window.location.pathname.split("/").filter(Boolean);
  const currentFile = currentPath.pop() || "index.html";
  const normalized = currentFile.includes(".") ? currentFile : "index.html";

  nav.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href") || "";
    if (!href || href.startsWith("http") || href.startsWith("mailto:")) return;

    const cleanHref = href.replace(/^\.\//, "").replace(/^\.\.\//, "");
    if (cleanHref === normalized) {
      link.classList.add("active");
    }
  });
});
