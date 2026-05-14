import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

const uiFiles = [
  "src/app/App.tsx",
  "src/components/ColumnMapperPanel.tsx",
  "src/components/FileComparisonPanel.tsx",
  "src/components/FileMergePanel.tsx",
  "src/components/ReportGeneratorPanel.tsx",
];

function readProjectFile(relativePath: string) {
  return readFileSync(join(root, relativePath), "utf8");
}

describe("download blob utility usage", () => {
  it("keeps Blob download creation in one shared utility", () => {
    expect(readProjectFile("src/utils/downloadBlob.ts")).toContain("export function downloadBlob");

    for (const file of uiFiles) {
      expect(readProjectFile(file), file).not.toContain("new Blob(");
      expect(readProjectFile(file), file).toContain("downloadBlob");
    }
  });
});
