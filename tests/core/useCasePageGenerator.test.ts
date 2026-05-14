import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const expectedUseCaseSlugs = [
  "excel-duplicate-cleanup",
  "csv-xlsx-file-compare",
  "order-settlement-automation",
  "excel-blank-cell-checker",
  "excel-number-format-cleanup",
  "excel-file-compare",
  "excel-csv-file-merge",
  "estimate-settlement-generator",
  "excel-column-mapping-template",
];

describe("use case page generator", () => {
  it("defines the current search landing pages", async () => {
    const generator = await import(pathToFileURL(join(root, "scripts/use-case-pages.mjs")).href);

    expect(generator.useCases.map((useCase: { slug: string }) => useCase.slug)).toEqual(expectedUseCaseSlugs);
  });

  it("keeps generated use case pages in sync with checked-in HTML", async () => {
    const generator = await import(pathToFileURL(join(root, "scripts/use-case-pages.mjs")).href);

    for (const useCase of generator.useCases) {
      const htmlPath = join(root, "public", "use-cases", `${useCase.slug}.html`);
      const checkedInHtml = readFileSync(htmlPath, "utf8");

      expect(generator.renderUseCasePage(useCase)).toBe(checkedInHtml);
    }
  });

  it("keeps the use case index page in sync with generated HTML", async () => {
    const generator = await import(pathToFileURL(join(root, "scripts/use-case-pages.mjs")).href);
    const checkedInHtml = readFileSync(join(root, "public", "use-cases", "index.html"), "utf8");

    expect(generator.renderUseCaseIndex()).toBe(checkedInHtml);
  });

  it("keeps sitemap entries in sync with generated use case URLs", async () => {
    const generator = await import(pathToFileURL(join(root, "scripts/use-case-pages.mjs")).href);
    const sitemap = readFileSync(join(root, "public/sitemap.xml"), "utf8");

    expect(generator.renderSitemap()).toBe(sitemap);
  });

  it("keeps service pages in sync with generated HTML", async () => {
    const generator = await import(pathToFileURL(join(root, "scripts/use-case-pages.mjs")).href);

    expect(generator.servicePages.map((page: { slug: string }) => page.slug)).toEqual([
      "excel-automation-inquiry",
      "excel-automation-service",
      "excel-automation-cost",
    ]);

    for (const page of generator.servicePages) {
      const htmlPath = join(root, "public", "services", `${page.slug}.html`);
      const checkedInHtml = readFileSync(htmlPath, "utf8");

      expect(generator.renderServicePage(page)).toBe(checkedInHtml);
    }
  });

  it("keeps workflow pages in sync with generated HTML", async () => {
    const generator = await import(pathToFileURL(join(root, "scripts/use-case-pages.mjs")).href);

    expect(generator.workflowPages.map((page: { slug: string }) => page.slug)).toEqual([
      "shopping-mall-order-cleanup",
      "settlement-file-reconciliation",
      "monthly-report-file-merge",
    ]);

    for (const page of generator.workflowPages) {
      const htmlPath = join(root, "public", "workflows", `${page.slug}.html`);
      const checkedInHtml = readFileSync(htmlPath, "utf8");

      expect(generator.renderWorkflowPage(page)).toBe(checkedInHtml);
    }

    const checkedInIndex = readFileSync(join(root, "public", "workflows", "index.html"), "utf8");
    expect(generator.renderWorkflowIndex()).toBe(checkedInIndex);
  });
});
