import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

const posts = [
  {
    path: "docs/marketing/posts/geeknews-show-gn.md",
    source: "geeknews",
  },
  {
    path: "docs/marketing/posts/okky-feedback.md",
    source: "okky",
  },
  {
    path: "docs/marketing/posts/hacker-news-show-hn.md",
    source: "hacker-news",
  },
  {
    path: "docs/marketing/posts/product-hunt-launch.md",
    source: "product-hunt",
  },
];

function readProjectFile(relativePath: string) {
  return readFileSync(join(root, relativePath), "utf8");
}

describe("marketing posting packets", () => {
  it("uses channel-specific tracking links for demo, service, and workflow CTAs", () => {
    for (const post of posts) {
      const markdown = readProjectFile(post.path);

      expect(markdown).toContain(
        `https://yuniwon.github.io/automation-workbench/share/free-excel-automation.html?source=${post.source}&intent=share`,
      );
      expect(markdown).toContain(`https://yuniwon.github.io/automation-workbench/?source=${post.source}`);
      expect(markdown).toContain(
        `https://yuniwon.github.io/automation-workbench/services/excel-automation-inquiry.html?source=${post.source}&intent=scope`,
      );
      expect(markdown).toContain(
        `https://yuniwon.github.io/automation-workbench/workflows/?source=${post.source}&intent=workflow-index`,
      );
    }
  });
});
