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
    let activeSectionId = "";
    const visibleSectionIds = new Set<string>();

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

    const setActiveSection = (id: string) => {
      if (id === activeSectionId) return;
      activeSectionId = id;
      navigationLinks.forEach((link) => {
        if (link.hash === `#${id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          if (entry.isIntersecting) visibleSectionIds.add(id);
          else visibleSectionIds.delete(id);
        });

        const activeSection = trackedSections.find((section) =>
          visibleSectionIds.has(section.id),
        );
        setActiveSection(activeSection?.id ?? "");
      },
      { rootMargin: "-18% 0px -72%", threshold: 0 },
    );
    trackedSections.forEach((section) => sectionObserver.observe(section));

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
      sectionObserver.disconnect();
      hero?.removeEventListener("pointermove", moveSun);
      hero?.removeEventListener("pointerleave", resetSun);
      reducedMotion.removeEventListener("change", handlePreferenceChange);
      precisePointer.removeEventListener("change", resetSun);
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
