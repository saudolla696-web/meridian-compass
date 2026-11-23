import { readdir, readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

const root = process.cwd();
const manifest = JSON.parse(await readFile(resolve(root, "qa/commercial-baseline.json"), "utf8"));
const banned = manifest.banned.map((entry) => ({
  ...entry,
  regex: new RegExp(entry.pattern, "i"),
}));
const extensions = new Set(manifest.extensions);
let failed = false;
let scanned = 0;

async function walk(dir) {
  const entries = await readdir(resolve(root, dir), { withFileTypes: true });
  for (const entry of entries) {
    const relative = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".output") continue;
      await walk(relative);
      continue;
    }
    if (!extensions.has(extname(entry.name))) continue;
    scanned += 1;
    const lines = (await readFile(resolve(root, relative), "utf8")).split(/\r?\n/);
    for (const entryRule of banned) {
      lines.forEach((line, index) => {
        if (entryRule.regex.test(line)) {
          console.error(`FAIL [${entryRule.name}] ${relative}:${index + 1}: ${line.trim()}`);
          failed = true;
        }
      });
    }
  }
}

for (const dir of manifest.scan) await walk(dir);

if (failed) process.exit(1);
console.log(`Commercial baseline verified: no pricing in ${scanned} scanned files.`);
