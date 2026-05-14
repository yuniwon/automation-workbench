import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("IndexNow configuration", () => {
  it("hosts a valid key file and submits sitemap URLs under the same path", async () => {
    const { indexNow } = await import(pathToFileURL(join(root, "scripts/indexnow-config.mjs")).href);

    expect(indexNow.key).toMatch(/^[A-Za-z0-9-]{8,128}$/);
    expect(indexNow.keyLocation).toBe(`https://yuniwon.github.io/automation-workbench/${indexNow.key}.txt`);

    const keyFile = join(root, "public", `${indexNow.key}.txt`);
    expect(existsSync(keyFile), `${indexNow.key}.txt`).toBe(true);
    expect(readFileSync(keyFile, "utf8").trim()).toBe(indexNow.key);

    const sitemap = readFileSync(join(root, "public/sitemap.xml"), "utf8");
    for (const url of indexNow.urlList) {
      expect(url).toMatch(/^https:\/\/yuniwon\.github\.io\/automation-workbench\//);
      expect(sitemap).toContain(url);
    }
  });
});
