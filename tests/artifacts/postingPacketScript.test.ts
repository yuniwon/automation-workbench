import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

const root = process.cwd();

async function loadPostingPacketModule() {
  return import(pathToFileURL(join(root, "scripts/posting-packet.mjs")).href);
}

describe("posting packet script", () => {
  it("renders a copy-ready GeekNews posting packet", async () => {
    const { renderPostingPacket } = await loadPostingPacketModule();

    const packet = renderPostingPacket("geeknews");

    expect(packet).toContain("CHANNEL: GeekNews Show GN");
    expect(packet).toContain("SOURCE FILE: docs/marketing/posts/geeknews-show-gn.md");
    expect(packet).toContain("Show GN: Codex와 함께 만든 브라우저 기반 CSV/XLSX 정리 도구입니다");
    expect(packet).toContain("https://yuniwon.github.io/automation-workbench/?source=geeknews");
    expect(packet).toContain("피드백 받고 싶은 부분");
    expect(packet).toContain("FIRST COMMENT:");
    expect(packet).toContain("AFTER POSTING LOG:");
  });

  it("renders Product Hunt launch fields separately", async () => {
    const { renderPostingPacket } = await loadPostingPacketModule();

    const packet = renderPostingPacket("product-hunt");

    expect(packet).toContain("PRODUCT NAME:");
    expect(packet).toContain("Automation Workbench");
    expect(packet).toContain("TAGLINE:");
    expect(packet).toContain("Clean, compare, merge, map, and report on CSV/XLSX files in your browser");
    expect(packet).toContain("MAKER COMMENT:");
  });

  it("exposes the posting command in package scripts", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

    expect(pkg.scripts["marketing:post"]).toBe("node scripts/posting-packet.mjs");
  });
});
