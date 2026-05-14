import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("IssuePanel issue rendering", () => {
  it("does not hard-limit detailed issues to 16 rows", () => {
    const source = readFileSync(join(root, "src/components/IssuePanel.tsx"), "utf8");

    expect(source).not.toContain(".slice(0, 16)");
    expect(source).toContain("<details");
    expect(source).toContain("issues.map((issue)");
  });
});
