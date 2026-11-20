// make.fun news-image-20261120 entry: a Node 22 program (standard library only) that writes the
// day's front page to /output/entry.png. The artwork is rendered ahead of time by art/build.mjs from
// art/news.html; this program copies those exact bytes, so both grader runs write identical output.
//
// Local run, outside the grader's container:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(fileURLToPath(new URL('./entry.png', import.meta.url)), join(outDir, 'entry.png'));
