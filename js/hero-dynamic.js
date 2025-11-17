(() => {
  const heroes = document.querySelectorAll(
    ".hero-dynamic, #hero.hero-dynamic, #hero-sobre.hero-dynamic, #hero-publicaciones.hero-dynamic, #hero-talleres.hero-dynamic, #hero-entrevistas.hero-dynamic, #hero-interviews.hero-dynamic, .hero-contacto.hero-dynamic"
  );

  if (!heroes.length || typeof ResizeObserver === "undefined") return;

  const calcAlign = ({ focus = 50, orientation }) => {
    if (orientation === "portrait") return "center";
    return focus < 50 ? "flex-end" : "flex-start";
  };

  const calcMax = (vw) => {
    if (vw < 540) return "92vw";
    if (vw < 900) return "78vw";
    if (vw < 1280) return "64vw";
    return "58vw";
  };

  const updateHero = (hero, viewport) => {
    const focus = Number(hero.dataset.heroFocus || 50);
    const anchor = hero.dataset.heroAnchor || "auto";
    const box = hero.querySelector(".hero-container, .hero-content, .hero-text");
    const { vw, vh } = viewport;
    const orientation = vw > vh ? "landscape" : "portrait";
    const justify = anchor === "center" ? "center" : calcAlign({ focus, orientation });
    const align = orientation === "portrait" ? "flex-end" : "center";

    hero.style.setProperty("--hero-dynamic-justify", justify);
    hero.style.setProperty("--hero-dynamic-align", align);
    hero.style.setProperty("--hero-dynamic-padding", orientation === "portrait" ? "var(--hero-padding-portrait)" : "var(--hero-padding)");
    hero.style.setProperty("--hero-offset-x", orientation === "landscape" ? `${focus < 50 ? "-" : ""}1vw` : "0px");
    hero.style.setProperty("--hero-offset-y", orientation === "portrait" ? "2vh" : "0px");
    hero.style.setProperty("--hero-dynamic-max", calcMax(vw));

    if (box) {
      const boxWidth = box.getBoundingClientRect().width || 1;
      const scale = Math.max(0.86, Math.min(1, vw / (boxWidth * 2.2)));
      hero.style.setProperty("--hero-dynamic-scale", scale.toFixed(2));
    }
  };

  const recalc = () => {
    const viewport = { vw: window.innerWidth, vh: window.innerHeight };
    heroes.forEach((hero) => updateHero(hero, viewport));
  };

  const observer = new ResizeObserver(recalc);
  observer.observe(document.documentElement);
  window.addEventListener("resize", recalc, { passive: true });
  window.addEventListener("orientationchange", recalc, { passive: true });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateHero(entry.target, { vw: window.innerWidth, vh: window.innerHeight });
        }
      });
    });
    heroes.forEach((hero) => io.observe(hero));
  }

  recalc();
})();
