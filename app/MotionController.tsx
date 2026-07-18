"use client";

import { useEffect } from "react";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const precisePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
    );
    const hero = document.querySelector<HTMLElement>("[data-parallax-root]");
    const sun = document.querySelector<HTMLElement>("[data-parallax-sun]");
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    let frame = 0;

    root.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    if (reducedMotion.matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
      revealItems.forEach((item) => revealObserver.observe(item));
    }

    const visibilityObserver = hero
      ? new IntersectionObserver(
          ([entry]) => hero.classList.toggle("sun-paused", !entry.isIntersecting),
          { threshold: 0.02 },
        )
      : null;

    if (hero) visibilityObserver?.observe(hero);

    const resetSun = () => {
      if (!sun) return;
      sun.style.setProperty("--sun-x", "0px");
      sun.style.setProperty("--sun-y", "0px");
    };

    const moveSun = (event: PointerEvent) => {
      if (!hero || !sun || reducedMotion.matches || !precisePointer.matches) {
        resetSun();
        return;
      }

      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        sun.style.setProperty("--sun-x", `${(x * 18).toFixed(2)}px`);
        sun.style.setProperty("--sun-y", `${(y * 12).toFixed(2)}px`);
      });
    };

    const handlePreferenceChange = () => {
      resetSun();
      if (reducedMotion.matches) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
      }
    };

    hero?.addEventListener("pointermove", moveSun, { passive: true });
    hero?.addEventListener("pointerleave", resetSun);
    reducedMotion.addEventListener("change", handlePreferenceChange);
    precisePointer.addEventListener("change", resetSun);

    return () => {
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
      visibilityObserver?.disconnect();
      hero?.removeEventListener("pointermove", moveSun);
      hero?.removeEventListener("pointerleave", resetSun);
      reducedMotion.removeEventListener("change", handlePreferenceChange);
      precisePointer.removeEventListener("change", resetSun);
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
