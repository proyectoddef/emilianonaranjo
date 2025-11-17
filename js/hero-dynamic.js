(() => {
  const heroes = document.querySelectorAll(
    ".hero-dynamic, #hero.hero-dynamic, #hero-sobre.hero-dynamic, #hero-publicaciones.hero-dynamic, #hero-talleres.hero-dynamic, #hero-entrevistas.hero-dynamic, #hero-interviews.hero-dynamic, .hero-contacto.hero-dynamic"
  );

  if (!heroes.length || typeof ResizeObserver === "undefined") return;

  const calcFaceSide = (hero, focus = 50) => {
    const hint = hero.dataset.heroFace;
    if (hint === "left" || hint === "right" || hint === "center") return hint;
    if (focus < 36) return "left";
    if (focus > 64) return "right";
    return "center";
  };

  const calcMax = (vw, orientation) => {
    if (orientation === "portrait") {
      if (vw < 480) return "94vw";
      if (vw < 760) return "88vw";
      return "80vw";
    }

    if (vw < 720) return "78vw";
    if (vw < 1024) return "68vw";
    if (vw < 1440) return "60vw";
    return "56vw";
  };

  const calcScale = ({ vw, vh, boxWidth, orientation }) => {
    const base = Math.max(0.82, Math.min(1, vw / (Math.max(boxWidth, 1) * 2.2)));
    const modifiers = [];

    if (vw < 1220) modifiers.push(0.96);
    if (vw < 900) modifiers.push(0.92);
    if (vw < 720) modifiers.push(0.9);
    if (vw < 540) modifiers.push(0.86);
    if (orientation === "portrait") modifiers.push(0.94);
    if (orientation === "landscape" && vh < 760) modifiers.push(0.92);

    const scale = modifiers.reduce((acc, factor) => acc * factor, base);
    return Math.max(0.74, Math.min(scale, 1)).toFixed(2);
  };

  const calcPlacement = ({
    hero,
    focus,
    orientation,
    anchor,
    boxRect,
    vw,
    vh,
  }) => {
    const faceSide = calcFaceSide(hero, focus);
    const isDesktop = vw >= 1024;
    const reserveWidth = Math.min(vw * 0.44, (boxRect?.width || vw * 0.34) + vw * 0.08);
    const overlapLeft = focus < (reserveWidth / vw) * 100;
    const overlapRight = focus > 100 - (reserveWidth / vw) * 100;

    const desktopDefault = "flex-start";
    const mobileDefault = faceSide === "left" ? "flex-end" : faceSide === "right" ? "flex-start" : orientation === "landscape" ? "flex-start" : "center";

    let justify = anchor === "center" ? "center" : isDesktop ? desktopDefault : mobileDefault;
    let align = orientation === "portrait" ? "flex-end" : "center";

    if (anchor !== "center") {
      if (justify === "flex-start" && overlapLeft) justify = "flex-end";
      else if (justify === "flex-end" && overlapRight) justify = "flex-start";
      else if (faceSide === "center" && orientation === "landscape") justify = "center";
    }

    if (orientation === "landscape" && (overlapLeft || overlapRight || vh < 760)) {
      align = "flex-start";
    } else if (orientation === "portrait" && vh < 720) {
      align = "center";
    }

    const shiftY = orientation === "landscape" ? "-3vh" : "-1.6vh";
    const shiftX = justify === "center" ? "0px" : orientation === "landscape" ? justify === "flex-start" ? "1.2vw" : "-1.2vw" : "0px";

    const paddingExtra = orientation === "portrait" ? "6px" : "10px";

    return { justify, align, shiftX, shiftY, paddingExtra };
  };

  const updateHero = (hero, viewport) => {
    const focus = Number(hero.dataset.heroFocus || 50);
    const anchor = hero.dataset.heroAnchor || "auto";
    const box = hero.querySelector(".hero-container, .hero-content, .hero-text");
    const { vw, vh } = viewport;
    const orientation = vw > vh ? "landscape" : "portrait";
    const boxRect = box?.getBoundingClientRect();

    const { justify, align, shiftX, shiftY, paddingExtra } = calcPlacement({
      hero,
      focus,
      orientation,
      anchor,
      boxRect,
      vw,
      vh,
    });

    hero.style.setProperty("--hero-dynamic-justify", justify);
    hero.style.setProperty("--hero-dynamic-align", align);
    hero.style.setProperty("--hero-dynamic-padding", orientation === "portrait" ? "var(--hero-padding-portrait)" : "var(--hero-padding)");
    hero.style.setProperty("--hero-offset-x", "0px");
    hero.style.setProperty("--hero-offset-y", "0px");
    hero.style.setProperty("--hero-dynamic-max", calcMax(vw, orientation));
    hero.style.setProperty("--hero-shift-x", shiftX);
    hero.style.setProperty("--hero-shift-y", shiftY);
    hero.style.setProperty("--hero-padding-extra", paddingExtra);

    if (box) {
      const scale = calcScale({ vw, vh, boxWidth: boxRect?.width || 1, orientation });
      hero.style.setProperty("--hero-dynamic-scale", scale);
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
