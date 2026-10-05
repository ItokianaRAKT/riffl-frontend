# Riffl (Frontend)

Web UI for **Riffl**, an app for reviewing a music folder track by track and sorting it into three decisions: **keep**, **skip**, or **delete**. Track metadata (title and artist) can also be edited before a decision is made.

This repository contains the client only. It is not deployed anywhere: you run it locally, alongside the backend, which lives in a separate repository (`riffl-backend`).

## Features

- Browse folders with the built-in picker (or type the absolute path) and load every audio file they contain (recursively).
- Play the current track (streamed, with seeking) while reviewing the queue.
- Sort each track with **Keep**, **Skip**, or **Delete**; files are moved by the backend.
- Undo the last decision.
- Edit the current track's title and artist; tags are written and the file is renamed on save.
- Review progress, session statistics, and a summary screen when the queue is done.

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite 7](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com)

## Prerequisites

- [Git](https://git-scm.com) — to clone the repository
- [Node.js](https://nodejs.org) 20.19+ or newer — installing it also gives you `npm`

## Getting started

You need **two terminals**: one for the backend, one for the frontend. The backend must be started first.

**1. Clone the two repositories** (skip the ones you already have):

```bash
git clone https://github.com/ItokianaRAKT/riffl-frontend.git
git clone https://github.com/ItokianaRAKT/riffl-backend.git
```

**2. Start the backend** — in your first terminal:

```bash
cd riffl-backend   # enter the backend folder
npm install        # download the dependencies (only the first time)
npm run dev        # start the server
```

Keep this terminal open: the API is now running at `http://localhost:3000`.

**3. Start the frontend** — in a second terminal:

```bash
cd riffl-frontend  # enter the frontend folder
npm install        # download the dependencies (only the first time)
npm run dev        # start the dev server
```

**4. Open the app** — go to the URL printed in the terminal (by default `http://localhost:5173`), then pick your music folder: click **Select** to open the folder explorer overlaid on the page, or type the absolute path yourself (for example `/home/you/Music` or `C:\Users\you\Music`). Press **Choose folder** to start reviewing.

## Configuration

The dev server proxies API and streaming requests to the backend. The backend URL is set in `vite.config.ts`:

```ts
const backendUrl = "http://localhost:3000";

server: {
  proxy: {
    "/files": backendUrl,
    "/stream": backendUrl,
    "/action": backendUrl,
  },
},
```

Change `backendUrl` if the backend runs elsewhere. There is no other runtime configuration.

## Keyboard shortcuts

Shortcuts are active while a track is being reviewed and are ignored while typing in an input.

| Key | Action |
| --- | --- |
| `→` | Keep |
| `↓` | Skip |
| `←` | Delete |
| `Enter` | Play / pause |
| `Space` | Seek forward 15 seconds |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and build the production bundle into `dist/` |
| `npm run preview` | Serve the production build locally |

## Project structure

```
src/
├── api/           # Backend client and error handling
├── components/    # UI components (player, controls, track info, stats…)
├── hooks/         # Review session, playback, shortcuts, track edits
├── utils/         # Formatting helpers
├── App.tsx        # Screens and orchestration
├── types.ts       # Shared domain types
└── index.css      # Global styles
```
