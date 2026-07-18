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
    const solarRigs = Array.from(
      document.querySelectorAll<HTMLElement>(".solar-rig"),
    );
    const timeline = document.querySelector<HTMLElement>(".pilgrimage");
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    let pointerFrame = 0;

    root.classList.add("motion-ready");
    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${(index % 3) * 70}ms`);
    });

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

    const solarVisibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("solar-paused", !entry.isIntersecting);
        });
      },
      { rootMargin: "20% 0px", threshold: 0.01 },
    );
    solarRigs.forEach((rig) => solarVisibilityObserver.observe(rig));

    const timelineObserver = timeline
      ? new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            timeline.classList.add("is-drawn");
            timelineObserver?.disconnect();
          },
          { rootMargin: "0px 0px -20%", threshold: 0.08 },
        )
      : null;
    if (timeline) timelineObserver?.observe(timeline);

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

      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
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
      cancelAnimationFrame(pointerFrame);
      revealObserver.disconnect();
      solarVisibilityObserver.disconnect();
      timelineObserver?.disconnect();
      hero?.removeEventListener("pointermove", moveSun);
      hero?.removeEventListener("pointerleave", resetSun);
      reducedMotion.removeEventListener("change", handlePreferenceChange);
      precisePointer.removeEventListener("change", resetSun);
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
