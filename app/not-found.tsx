import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lost Beyond the Light",
  description: "This path has drifted beyond the Sun Kissed archive.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-stars" aria-hidden="true" />
      <div className="not-found-sun" aria-hidden="true" />
      <div className="not-found-copy">
        <p className="section-index">Archive signal · 404</p>
        <h1>Lost Beyond the Light</h1>
        <p>
          This path has drifted out of orbit. Return to the Sanctuary and begin
          the pilgrimage again.
        </p>
        {/* The GitHub Pages exporter rewrites this plain link to the project base. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="button button-primary" href="/">
          Return to Sun Kissed
          <span aria-hidden="true">←</span>
        </a>
      </div>
    </main>
  );
}
