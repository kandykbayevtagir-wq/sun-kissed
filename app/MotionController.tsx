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
    const header = document.querySelector<HTMLElement>(".site-header");
    const progressBar = document.querySelector<HTMLElement>(".nav-progress i");
    const navigationLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]'),
    );
    const trackedSections = navigationLinks
      .map((link) => document.querySelector<HTMLElement>(link.hash))
      .filter((section): section is HTMLElement => Boolean(section));
    const solarRigs = Array.from(
      document.querySelectorAll<HTMLElement>(".solar-rig"),
    );
    const timeline = document.querySelector<HTMLElement>(".pilgrimage");
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    let pointerFrame = 0;
    let scrollFrame = 0;

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

    const updateScrollState = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const scrollRange = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight,
        );
        const progress = Math.min(1, Math.max(0, window.scrollY / scrollRange));
        progressBar?.style.setProperty("transform", `scaleX(${progress.toFixed(4)})`);
        header?.classList.toggle("is-scrolled", window.scrollY > 32);

        let activeId = "";
        trackedSections.forEach((section) => {
          if (section.getBoundingClientRect().top <= window.innerHeight * 0.48) {
            activeId = section.id;
          }
        });

        navigationLinks.forEach((link) => {
          if (link.hash === `#${activeId}`) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
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
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });
    reducedMotion.addEventListener("change", handlePreferenceChange);
    precisePointer.addEventListener("change", resetSun);
    updateScrollState();

    return () => {
      cancelAnimationFrame(pointerFrame);
      cancelAnimationFrame(scrollFrame);
      revealObserver.disconnect();
      solarVisibilityObserver.disconnect();
      timelineObserver?.disconnect();
      hero?.removeEventListener("pointermove", moveSun);
      hero?.removeEventListener("pointerleave", resetSun);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      reducedMotion.removeEventListener("change", handlePreferenceChange);
      precisePointer.removeEventListener("change", resetSun);
      root.classList.remove("motion-ready");
      progressBar?.style.removeProperty("transform");
    };
  }, []);

  return null;
}
