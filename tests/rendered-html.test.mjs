import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete Sun Kissed page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Sun Kissed — The Union of the Sun Kissed<\/title>/i);
  assert.match(html, />SUN KISSED</i);
  assert.match(html, /The Three Ascensions/);
  assert.match(html, /Fragments from the Light/);
  assert.match(html, /Rules of the Sun/);
  assert.match(html, /Reach Far Into the Skies/);
  assert.match(html, /https:\/\/discord\.gg\/ZqMgTGxKX/);
  assert.match(html, /fictional community lore/i);
  assert.match(html, /<details class="navigation-menu"/i);
  assert.match(html, /aria-controls="navigation-menu"/i);
  assert.match(html, /data-parallax-sun="true"/i);
  assert.match(html, />Enter the Sanctuary</i);
  assert.doesNotMatch(html, /class="section-index">The Sanctuary remains open/i);
  assert.doesNotMatch(html, /Fictional community worldbuilding/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|lorem ipsum/i);
});

test("server-renders a dedicated, non-indexable not-found page", async () => {
  const response = await render("/missing");
  assert.equal(response.status, 404);

  const html = await response.text();
  assert.match(html, /Lost Beyond the Light/);
  assert.match(html, /<meta[^>]+content="noindex"[^>]+name="robots"/i);
  assert.doesNotMatch(html, />SUN KISSED<\/h1>/i);
});

test("removes the disposable starter and keeps production metadata", async () => {
  const [page, layout, css, navigation, packageJson, viteConfig] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/SiteNavigation.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /SITE_CONFIG\.discordInviteUrl/);
  assert.match(page, /id="ascensions"/);
  assert.match(page, /id="lore"/);
  assert.match(page, /id="rules"/);
  assert.match(layout, /Sun Kissed — The Union of the Sun Kissed/);
  assert.match(layout, /summary_large_image/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(navigation, /<details className="navigation-menu"/);
  assert.doesNotMatch(navigation, /inviteUrl|nav-invite|brand-link/);
  assert.equal(page.match(/Enter the Sanctuary/g)?.length, 1);
  assert.doesNotMatch(page + css, /hero-light/);
  assert.doesNotMatch(page + css, /cosmic-field|solar-corona|solar-haze|solar-flare|solar-particles/);
  assert.doesNotMatch(css, /content-visibility:\s*auto|contain-intrinsic-size|menu-open/);
  assert.equal(page.match(/href=\{inviteUrl\}/g)?.length, 1);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(viteConfig, /sourcemap:\s*false/);
  assert.doesNotMatch(page + layout, /codex-preview|SkeletonPreview/);

  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
  await access(new URL("public/favicon.svg", projectRoot));
  await access(new URL("public/og.jpg", projectRoot));
  await access(new URL("app/not-found.tsx", projectRoot));
});
