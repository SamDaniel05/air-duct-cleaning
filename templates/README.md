# Airduct landing-page concepts

Each concept is now a separate, standalone React + Vite + TypeScript project:

- [Architectural](./architectural)
- [Airflow Lab](./airflow-lab)
- [Clear Living](./clear-living)
- [Field Notes](./field-notes)

## Run one concept

Open a terminal in the chosen folder, then run:

```bash
npm install
npm run dev
```

Build it for review or handoff with:

```bash
npm run build
```

Each folder has its own `package.json`, `src/App.tsx`, `src/styles.css`, entry point, and Vite/TypeScript configuration. You can zip and send a single concept folder to your TL without including the other concepts. The root project remains an Architectural preview.
