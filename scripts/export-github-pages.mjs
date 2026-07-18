import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const outputDirectory = new URL("../github-pages/", import.meta.url);
const clientDirectory = new URL("../dist/client/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);

// This is the public URL GitHub Pages assigns to the project repository.
const publicSiteUrl = "https://xenonraze.github.io/sun-kissed/";

workerUrl.searchParams.set("static-export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Could not render the homepage for GitHub Pages (${response.status}).`);
}

const renderedHtml = await response.text();
const staticHtml = renderedHtml
  .replaceAll("http://localhost:3000", publicSiteUrl.slice(0, -1))
  .replaceAll('href="/assets/', 'href="assets/')
  .replaceAll('src="/assets/', 'src="assets/')
  .replaceAll('data-rsc-css-href="/assets/', 'data-rsc-css-href="assets/');

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });
await writeFile(new URL("index.html", outputDirectory), staticHtml);
await writeFile(new URL("404.html", outputDirectory), staticHtml);

console.log("GitHub Pages bundle written to github-pages/.");
