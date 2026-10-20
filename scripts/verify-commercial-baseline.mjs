import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const baseUrl = process.env.BASELINE_URL ?? "http://127.0.0.1:8080";
const manifest = JSON.parse(await readFile(resolve(root, "qa/commercial-baseline.json"), "utf8"));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
let failed = false;

for (const fixture of manifest.fixtures) {
  if (fixture.sourcePath) {
    const actual = sha256(await readFile(resolve(root, fixture.sourcePath)));
    if (actual !== fixture.sha256) {
      console.error(`FAIL source fixture: ${fixture.sourcePath}`);
      failed = true;
    }
    continue;
  }

  const response = await fetch(new URL(fixture.url, baseUrl));
  const html = await response.text();
  const match = html.match(/<section[^>]*id="pricing"[\s\S]*?<\/section>/);
  const actual = sha256(match?.[0] ?? "");
  if (!response.ok || actual !== fixture.sha256) {
    console.error(`FAIL rendered fixture: ${fixture.url}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("Commercial baseline verified.");
