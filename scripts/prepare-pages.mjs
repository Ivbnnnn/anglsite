import { mkdir, readdir, copyFile, writeFile, rm } from 'node:fs/promises';
import { extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const output = new URL('../dist/', import.meta.url);
if (dirname(resolve(fileURLToPath(output))) !== resolve(fileURLToPath(root))) {
  throw new Error('Static output must be inside the project root.');
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const runtime = (await readdir(root)).filter((name) =>
  ['.html', '.css', '.js', '.svg'].includes(extname(name)) && !name.startsWith('verify-') && name !== 'verify.js'
);
for (const file of runtime) await copyFile(new URL(file, root), new URL(file, output));
await writeFile(new URL('.nojekyll', output), '');
console.log(`Prepared ${runtime.length} static files for GitHub Pages.`);
