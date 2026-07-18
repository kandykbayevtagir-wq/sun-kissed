import { MotionController } from "./MotionController";
import {
  ASCENSIONS,
  LORE_FRAGMENTS,
  MODERATION_CLAUSE,
  RULES,
  SITE_CONFIG,
} from "./site-config";

function SolarVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`solar-rig ${className}`} aria-hidden="true">
      <div className="solar-corona" />
      <div className="solar-rays" />
      <div className="solar-flare solar-flare-one" />
      <div className="solar-flare solar-flare-two" />
      <div className="solar-disc">
        <div className="solar-surface" />
        <div className="solar-surface solar-surface-secondary" />
      </div>
      <div className="solar-haze" />
      <div className="solar-particles">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function SunMark() {
  return (
    <span className="sun-mark" aria-hidden="true">
      <i />
    </span>
  );
}

export default function Home() {
  const inviteUrl = SITE_CONFIG.discordInviteUrl;

  return (
    <div className="site-shell">
      <MotionController />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="cosmic-field" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <header className="site-header">
        <nav className="floating-nav" aria-label="Primary navigation">
          <a className="brand-link" href="#top" aria-label="Sun Kissed home">
            <SunMark />
            <span>The Union</span>
          </a>
          <div className="nav-links">
            <a href="#ascensions">Ascensions</a>
            <a href="#lore">Lore</a>
            <a href="#rules">Rules</a>
          </div>
          <a
            className="nav-invite"
            href={inviteUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>Enter the Sanctuary</span>
            <b aria-hidden="true">↗</b>
          </a>
        </nav>
      </header>

      <main id="main-content">
        <section
          className="hero"
          id="top"
          aria-labelledby="hero-title"
          data-parallax-root
        >
          <div className="hero-light" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <SolarVisual className="hero-sun" />

          <div className="page-width hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">
                <span />
                The Union of the Sun Kissed
              </p>
              <h1 id="hero-title">SUN KISSED</h1>
              <p className="hero-statement">
                “The Sun Kisses All Its Children.”
              </p>
              <p className="hero-support">
                A sanctuary suspended between darkness and light. Enter the
                Union, learn its doctrine, and walk among the Children of the
                Sun.
              </p>
              <div className="hero-actions">
                <a
                  className="button button-primary"
                  href={inviteUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Enter the Sanctuary
                  <span aria-hidden="true">↗</span>
                </a>
                <a className="text-link" href="#ascensions">
                  Discover the Ascensions
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="trinity" aria-label="Three Ascensions. One sanctuary. One light.">
                <span>Three Ascensions</span>
                <i />
                <span>One Sanctuary</span>
                <i />
                <span>One Light</span>
              </p>
            </div>
          </div>

          <div className="approach-marker" aria-hidden="true">
            <span />
            Approach the light · 01
          </div>
          <div className="hero-horizon" aria-hidden="true" />
        </section>

        <section
          className="section ascensions-section"
          id="ascensions"
          aria-labelledby="ascensions-title"
        >
          <div className="page-width">
            <header className="section-heading split-heading" data-reveal>
              <div>
                <p className="section-index">01 · An orbital doctrine</p>
                <h2 id="ascensions-title">The Three Ascensions</h2>
              </div>
              <p>
                Every journey begins in darkness. Each degree moves a soul
                closer to the light—not through status alone, but through
                presence, trust, and contribution.
              </p>
            </header>

            <ol className="pilgrimage" aria-label="The three Ascensions">
              {ASCENSIONS.map((ascension, index) => (
                <li
                  className={`ascension-stage ascension-stage-${index + 1}`}
                  key={ascension.title}
                  data-reveal
                >
                  <span className="orbit-node" aria-hidden="true">
                    {ascension.symbol}
                  </span>
                  <div className="stage-heading">
                    <span className="stage-numeral">{ascension.numeral}</span>
                    <div>
                      <p>{ascension.degree}</p>
                      <h3>{ascension.title}</h3>
                    </div>
                  </div>
                  <blockquote>“{ascension.lore}”</blockquote>
                  <dl className="stage-details">
                    {ascension.details.map((detail) => (
                      <div key={detail.label}>
                        <dt>{detail.label}</dt>
                        <dd>{detail.text}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="section lore-section"
          id="lore"
          aria-labelledby="lore-title"
        >
          <div className="lore-orbit" aria-hidden="true" />
          <div className="page-width lore-layout">
            <header className="lore-heading" data-reveal>
              <p className="section-index">02 · Solar archive</p>
              <h2 id="lore-title">Fragments from the Light</h2>
              <div className="fiction-notice">
                <SunMark />
                <p>
                  <strong>Fictional community lore</strong>
                  This archive is creative worldbuilding for Sun Kissed. It is
                  not a real religious organization.
                </p>
              </div>
            </header>

            <div className="lore-archive" data-reveal>
              <div className="archive-header">
                <span>Union archive / transmission recovered</span>
                <span>Signal · SK–001</span>
              </div>
              <blockquote>
                {LORE_FRAGMENTS.map((fragment) => (
                  <div className="lore-fragment" key={fragment.index}>
                    <div className="fragment-meta">
                      <span>{fragment.index}</span>
                      <span>{fragment.title}</span>
                    </div>
                    {fragment.text.split("\n\n").map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ))}
              </blockquote>
              <div className="archive-footer">
                <span aria-hidden="true">◌</span>
                End transmission
                <span aria-hidden="true">✦</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section rules-section"
          id="rules"
          aria-labelledby="rules-title"
        >
          <div className="page-width rules-layout">
            <header className="rules-heading" data-reveal>
              <p className="section-index">03 · Community covenant</p>
              <h2 id="rules-title">Rules of the Sun</h2>
              <p>
                The lore may be veiled. The rules are not. Enter with respect,
                protect the people around you, and help keep the Sanctuary
                safe.
              </p>
              <a className="text-link" href="#final-invitation">
                Continue to the Sanctuary
                <span aria-hidden="true">↓</span>
              </a>
            </header>

            <div className="rules-ledger">
              {RULES.map((rule) => (
                <article className="rule" key={rule.numeral} data-reveal>
                  <header>
                    <span>{rule.numeral}</span>
                    <h3>{rule.title}</h3>
                  </header>
                  <div className="rule-copy">
                    {rule.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}

              <aside className="moderation-clause" data-reveal>
                <p className="section-index">Final moderation clause</p>
                <h3>The light leaves no loopholes.</h3>
                {MODERATION_CLAUSE.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </aside>
            </div>
          </div>
        </section>

        <section
          className="final-invitation"
          id="final-invitation"
          aria-labelledby="final-title"
        >
          <SolarVisual className="final-sun" />
          <div className="final-orbit" aria-hidden="true" />
          <div className="page-width final-copy" data-reveal>
            <p className="section-index">The Sanctuary remains open</p>
            <h2 id="final-title">Reach Far Into the Skies</h2>
            <p>
              “The Sanctuary remains open to every soul willing to enter with
              respect.”
            </p>
            <a
              className="button button-primary"
              href={inviteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Join Sun Kissed
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="final-inscription">
            One is all, and all is not one. Kiss the Sun.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width">
          <a href="#top" aria-label="Return to the top">
            <SunMark />
            Sun Kissed
          </a>
          <p>Fictional community worldbuilding · Built for the light</p>
        </div>
      </footer>
    </div>
  );
}
