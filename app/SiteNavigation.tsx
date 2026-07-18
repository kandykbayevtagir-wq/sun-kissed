"use client";

import { useEffect, useRef, useState } from "react";

export function SiteNavigation({ inviteUrl }: { inviteUrl: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menuOpen) return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };

    const closeOutside = (event: PointerEvent) => {
      if (menuOpen && !navRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOutside);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="floating-nav" aria-label="Primary navigation" ref={navRef}>
        <a className="brand-link" href="#top" aria-label="Sun Kissed home" onClick={closeMenu}>
          <span className="sun-mark" aria-hidden="true">
            <i />
          </span>
          <span>The Union</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="navigation-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
          ref={toggleRef}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <div
          className={`nav-panel${menuOpen ? " is-open" : ""}`}
          id="navigation-menu"
        >
          <div className="nav-links">
            <a href="#ascensions" onClick={closeMenu}>Ascensions</a>
            <a href="#lore" onClick={closeMenu}>Lore</a>
            <a href="#rules" onClick={closeMenu}>Rules</a>
          </div>
          <a
            className="nav-invite"
            href={inviteUrl}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            <span>Enter the Sanctuary</span>
            <b aria-hidden="true">↗</b>
          </a>
        </div>
      </nav>
    </header>
  );
}
