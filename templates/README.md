# Airduct landing-page templates

Each template is now a separate, standalone React + Vite + TypeScript project:

- [Architectural](./architectural)
- [Airflow Lab](./airflow-lab)
- [Clear Living](./clear-living)
- [Field Notes](./field-notes)

## Run one template

Open a terminal in the chosen folder, then run:

```bash
npm install
npm run dev
```

Build it for review or handoff with:

```bash
npm run build
```

Each folder has its own `package.json`, `src/App.tsx`, `src/styles.css`, entry point, and Vite/TypeScript configuration. You can zip and send a single template folder to your TL without including the other templates. The root project remains an Architectural preview.
