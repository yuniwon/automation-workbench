import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ResultSummary } from "../../src/components/ResultSummary";

describe("ResultSummary", () => {
  it("shows removed duplicate rows instead of total row delta", () => {
    const html = renderToStaticMarkup(
      <ResultSummary
        metrics={{
          rowsBefore: 10,
          rowsAfter: 5,
          trimmedCells: 3,
          normalizedNumberCells: 4,
          removedDuplicateRows: 2,
        }}
      />,
    );

    expect(html).toContain("<span>중복 제거</span><strong>2</strong>");
    expect(html).not.toContain("<span>중복 제거</span><strong>5</strong>");
  });
});
