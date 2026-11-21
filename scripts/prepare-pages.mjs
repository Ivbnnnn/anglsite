import { mkdir, readdir, copyFile, writeFile } from 'node:fs/promises';
import { extname } from 'node:path';

const root = new URL('../', import.meta.url);
const output = new URL('../dist/', import.meta.url);
await mkdir(output, { recursive: true });
const runtime = (await readdir(root)).filter((name) =>
  ['.html', '.css', '.js'].includes(extname(name)) && !name.startsWith('verify-') && name !== 'verify.js'
);
for (const file of runtime) await copyFile(new URL(file, root), new URL(file, output));
await writeFile(new URL('.nojekyll', output), '');
console.log(`Prepared ${runtime.length} static files for GitHub Pages.`);
