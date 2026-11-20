// Renders art/news.html to entry.png with headless Chromium, at exactly 1024 x 1024.
//
//   node art/build.mjs
//
// Chromium (or Chrome) must be on PATH or named by $CHROME. Only needed to change the artwork: the
// grader runs main.ts, which copies the committed entry.png.

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const page = join(here, 'news.html');
const out = resolve(here, '..', 'entry.png');

const candidates = [process.env.CHROME, 'chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable'].filter(Boolean);
const chrome = candidates.find((name) => {
  try {
    execFileSync(name, ['--version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
});
if (!chrome) throw new Error(`no Chromium found (tried ${candidates.join(', ')}); set $CHROME`);

if (!existsSync(page)) throw new Error(`missing ${page}`);

execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1024,1024',
  `--screenshot=${out}`,
  `file://${page}`,
], { stdio: 'inherit' });

console.log(`wrote ${out}`);
