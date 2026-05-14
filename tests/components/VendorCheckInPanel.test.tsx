import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { VendorCheckInPanel } from "../../src/components/VendorCheckInPanel";

describe("VendorCheckInPanel", () => {
  it("renders the English QR check-in portfolio workflow", () => {
    const html = renderToStaticMarkup(<VendorCheckInPanel locale="en" />);

    expect(html).toContain("Mobile check-in preview");
    expect(html).toContain("Oak Park Apartments");
    expect(html).toContain("Google Sheet log");
    expect(html).toContain("Download Apps Script sample");
    expect(html).toContain("samples/vendor-checkin-apps-script.js");
  });

  it("renders the Korean QR check-in workflow by default", () => {
    const html = renderToStaticMarkup(<VendorCheckInPanel />);

    expect(html).toContain("모바일 체크인 미리보기");
    expect(html).toContain("Google Sheet 로그");
    expect(html).toContain("Apps Script 샘플 받기");
  });
});
