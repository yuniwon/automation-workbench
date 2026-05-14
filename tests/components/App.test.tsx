import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { App } from "../../src/app/App";

describe("App", () => {
  it("renders Korean cleanup labels by default", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("열");
    expect(html).toContain("정보");
    expect(html).toContain("경고");
    expect(html).toContain("오류");
    expect(html).toContain("작업 흐름");
    expect(html).not.toContain(">Columns<");
    expect(html).not.toContain(">Workflow<");
  });
});
