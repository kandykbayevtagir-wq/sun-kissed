import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const outputDirectory = new URL("../docs/", import.meta.url);
const clientDirectory = new URL("../dist/client/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);

// This is the public URL GitHub Pages assigns to the project repository.
const publicSiteUrl = "https://kandykbayevtagir-wq.github.io/sun-kissed/";

workerUrl.searchParams.set("static-export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const assetBasePath = `${new URL(publicSiteUrl).pathname}assets/`;
const projectBasePath = new URL(publicSiteUrl).pathname;

async function renderPage(pathname, expectedStatus) {
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (response.status !== expectedStatus) {
    throw new Error(
      `Could not render ${pathname} for GitHub Pages (expected ${expectedStatus}, received ${response.status}).`,
    );
  }

  return response.text();
}

function prepareHtml(renderedHtml, { isNotFound = false } = {}) {
  let staticHtml = renderedHtml
    .replaceAll("http://localhost:3000", publicSiteUrl.slice(0, -1))
    .replaceAll("/assets/", assetBasePath)
    .replaceAll('href="/favicon.svg"', `href="${projectBasePath}favicon.svg"`);

  if (isNotFound) {
    staticHtml = staticHtml
      .replaceAll('href="/"', `href="${projectBasePath}"`)
      .replace(
        /<title>[^<]*<\/title>/i,
        "<title>Lost Beyond the Light — Sun Kissed</title>",
      )
      .replace(
        /<meta name="description" content="[^"]*"\/>/i,
        '<meta name="description" content="This path has drifted beyond the Sun Kissed archive."/>',
      )
      .replace(/<link rel="modulepreload"[^>]*>/gi, "")
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  }

  if (staticHtml.includes('"/assets/')) {
    throw new Error("GitHub Pages export still contains root-relative assets.");
  }

  return staticHtml;
}

const [renderedHome, renderedNotFound] = await Promise.all([
  renderPage("/", 200),
  renderPage("/missing", 404),
]);
const staticHtml = prepareHtml(renderedHome);
const staticNotFoundHtml = prepareHtml(renderedNotFound, { isNotFound: true });

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });
await writeFile(new URL("index.html", outputDirectory), staticHtml);
await writeFile(new URL("404.html", outputDirectory), staticNotFoundHtml);

console.log("GitHub Pages bundle written to docs/.");
