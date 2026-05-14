import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

const posts = [
  {
    path: "docs/marketing/posts/geeknews-show-gn.md",
    source: "geeknews",
    type: "feedback",
  },
  {
    path: "docs/marketing/posts/okky-feedback.md",
    source: "okky",
    type: "conversion",
  },
  {
    path: "docs/marketing/posts/hacker-news-show-hn.md",
    source: "hacker-news",
    type: "conversion",
  },
  {
    path: "docs/marketing/posts/product-hunt-launch.md",
    source: "product-hunt",
    type: "conversion",
  },
];

function readProjectFile(relativePath: string) {
  return readFileSync(join(root, relativePath), "utf8");
}

describe("marketing posting packets", () => {
  it("uses channel-specific tracking links for each channel tone", () => {
    for (const post of posts) {
      const markdown = readProjectFile(post.path);

      expect(markdown).toContain(`https://yuniwon.github.io/automation-workbench/?source=${post.source}`);

      if (post.type === "feedback") {
        expect(markdown).toContain("Codex와 함께");
        expect(markdown).toContain("피드백 받고 싶은 부분");
        expect(markdown).toContain("https://github.com/yuniwon/automation-workbench");
        expect(markdown).not.toContain("intent=scope");
      } else {
        expect(markdown).toContain(
          `https://yuniwon.github.io/automation-workbench/share/free-excel-automation.html?source=${post.source}&intent=share`,
        );
        expect(markdown).toContain(
          `https://yuniwon.github.io/automation-workbench/services/excel-automation-inquiry.html?source=${post.source}&intent=scope`,
        );
        expect(markdown).toContain(
          `https://yuniwon.github.io/automation-workbench/workflows/?source=${post.source}&intent=workflow-index`,
        );
      }
    }
  });
});
