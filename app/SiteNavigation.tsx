"use client";

import { type MouseEvent, useEffect, useRef } from "react";

export function SiteNavigation({ inviteUrl }: { inviteUrl: string }) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const toggleRef = useRef<HTMLElement>(null);

  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
    document.documentElement.classList.remove("menu-open");
  };

  const closeMenuAndFocusTarget = (event: MouseEvent<HTMLAnchorElement>) => {
    const targetId = event.currentTarget.hash.slice(1);
    closeMenu();
    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.focus({ preventScroll: true });
    });
  };

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const handleToggle = () => {
      document.documentElement.classList.toggle("menu-open", menu.open);
    };

    const closeOutside = (event: PointerEvent) => {
      if (menu.open && !menu.contains(event.target as Node)) closeMenu();
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menu.open) return;
      closeMenu();
      toggleRef.current?.focus();
    };

    menu.addEventListener("toggle", handleToggle);
    window.addEventListener("pointerdown", closeOutside);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      menu.removeEventListener("toggle", handleToggle);
      window.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("keydown", closeOnEscape);
      document.documentElement.classList.remove("menu-open");
    };
  }, []);

  return (
    <header className="site-header">
      <nav className="floating-nav" aria-label="Primary navigation">
        <a
          className="brand-link"
          href="#top"
          aria-label="Sun Kissed home"
          onClick={closeMenuAndFocusTarget}
        >
          <span className="sun-mark" aria-hidden="true">
            <i />
          </span>
          <span>Sun Kissed</span>
        </a>

        <details className="navigation-menu" ref={menuRef}>
          <summary
            className="menu-toggle"
            aria-controls="navigation-menu"
            aria-label="Toggle navigation menu"
            role="button"
            ref={toggleRef}
          >
            <span className="menu-label" aria-hidden="true">Menu</span>
            <span className="menu-icon" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </summary>

          <div className="nav-panel" id="navigation-menu">
            <p className="nav-panel-kicker">Navigate the Sanctuary</p>
            <div className="nav-links">
              <a href="#ascensions" data-index="01" onClick={closeMenuAndFocusTarget}>Ascensions</a>
              <a href="#lore" data-index="02" onClick={closeMenuAndFocusTarget}>Lore</a>
              <a href="#rules" data-index="03" onClick={closeMenuAndFocusTarget}>Rules</a>
              <a href="#final-invitation" data-index="04" onClick={closeMenuAndFocusTarget}>The Sanctuary</a>
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
        </details>

        <span className="nav-progress" aria-hidden="true"><i /></span>
      </nav>
    </header>
  );
}
