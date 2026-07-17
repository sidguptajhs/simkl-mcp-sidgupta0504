import { existsSync, mkdirSync, writeFileSync } from 'fs';

// fallback for environments that don't check out the specs submodule (e.g. cloudflare workers builds);
// pinned to the same commit as the submodule
const SPEC_PATH = 'specs/apiary.apib';
const SPEC_URL = 'https://raw.githubusercontent.com/SIMKL/API/fdb64611ac109f23cd58c01533ca5220ac51354e/apiary.apib';

if (!existsSync(SPEC_PATH)) {
  console.log(`${SPEC_PATH} missing, fetching from ${SPEC_URL}`);
  const res = await fetch(SPEC_URL);
  if (!res.ok) throw new Error(`failed to fetch spec: ${res.status} ${res.statusText}`);
  mkdirSync('specs', { recursive: true });
  writeFileSync(SPEC_PATH, await res.text());
  console.log(`wrote ${SPEC_PATH}`);
}
