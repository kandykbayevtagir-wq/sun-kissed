# Sun Kissed

A cinematic one-page website for the Sun Kissed Discord community and its
fictional worldbuilding, The Union of the Sun Kissed.

## Requirements

- Node.js 22.13 or newer

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by the development server.

## Validate a production build

```bash
npm test
```

The test command creates the production build and verifies the rendered page.

## Deploy later

The project is configured for OpenAI Sites and Cloudflare-compatible hosting.
Build the current source, then publish a new version through Sites.

## Update the Discord invitation

Change `discordInviteUrl` in `app/site-config.ts`. Every invitation button reads
from that single value.
