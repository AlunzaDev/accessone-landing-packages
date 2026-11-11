import { cp, mkdir } from 'node:fs/promises';

await mkdir(new URL('../dist/styles/', import.meta.url), { recursive: true });
await cp(
  new URL('../src/styles/tokens.css', import.meta.url),
  new URL('../dist/styles/tokens.css', import.meta.url),
);
await cp(
  new URL('../src/styles/service-card.css', import.meta.url),
  new URL('../dist/styles/service-card.css', import.meta.url),
);
await cp(
  new URL('../src/styles/identity-tabs.css', import.meta.url),
  new URL('../dist/styles/identity-tabs.css', import.meta.url),
);
await cp(
  new URL('../src/styles/service-catalog-card.css', import.meta.url),
  new URL('../dist/styles/service-catalog-card.css', import.meta.url),
);

await cp(
  new URL('../src/styles/service-catalog.css', import.meta.url),
  new URL('../dist/styles/service-catalog.css', import.meta.url),
);

await cp(
  new URL('../src/styles/glass.css', import.meta.url),
  new URL('../dist/styles/glass.css', import.meta.url),
);
