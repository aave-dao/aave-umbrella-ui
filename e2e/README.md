# End-to-End Tests with Playwright

## Requirements

- Node.js >= 18
- Playwright installed: `npm run playwright:install`
- App running: you can chose running it in dev mode (`npm run dev`) or building it first (and running `npm run start`) like it is done in Github actions.

## Run tests in CI mode

```bash
nr run test:e2e
```

## Run tests in UI mode (recommended for development env)

```bash
nr run test:e2e:ui
```
