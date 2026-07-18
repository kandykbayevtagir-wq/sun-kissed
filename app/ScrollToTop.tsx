"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > window.innerHeight * 0.55);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button
      className={`scroll-top${isVisible ? " is-visible" : ""}`}
      type="button"
      aria-label="Return to the top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      data-scroll-top
      onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
