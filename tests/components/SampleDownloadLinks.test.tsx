import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FileComparisonPanel } from "../../src/components/FileComparisonPanel";
import { FileMergePanel } from "../../src/components/FileMergePanel";
import { WorkflowControls } from "../../src/components/WorkflowControls";
import { defaultCleanupOptions } from "../../src/core/recipes/cleanupOptions";
import type { TableParseResult } from "../../src/core/table/types";

describe("sample download links", () => {
  it("shows the cleanup sample CSV link in workflow controls", () => {
    const html = renderToStaticMarkup(
      <WorkflowControls
        columns={[{ key: "product", label: "product", sourceLabel: "product" }]}
        options={defaultCleanupOptions}
        groupColumnKey="product"
        onFileUpload={() => undefined}
        onDownload={() => undefined}
        onGroupColumnChange={() => undefined}
        onOptionsChange={() => undefined}
        onResetSample={() => undefined}
        onRunCleanup={() => undefined}
      />,
    );

    expect(html).toContain("정리 샘플 CSV");
    expect(html).toContain("samples/sample-orders-dirty.csv");
  });

  it("shows both comparison sample CSV links in comparison controls", () => {
    const parseFile = async (): Promise<TableParseResult> => ({
      table: { columns: [], rows: [] },
      issues: [],
    });

    const html = renderToStaticMarkup(<FileComparisonPanel parseFile={parseFile} />);

    expect(html).toContain("파일 A 샘플");
    expect(html).toContain("파일 B 샘플");
    expect(html).toContain("samples/sample-orders-dirty.csv");
    expect(html).toContain("samples/sample-orders-compare.csv");
  });

  it("shows both merge sample CSV links in merge controls", () => {
    const parseFile = async (): Promise<TableParseResult> => ({
      table: { columns: [], rows: [] },
      issues: [],
    });

    const html = renderToStaticMarkup(<FileMergePanel parseFile={parseFile} />);

    expect(html).toContain("병합 샘플 A");
    expect(html).toContain("병합 샘플 B");
    expect(html).toContain("samples/sample-orders-dirty.csv");
    expect(html).toContain("samples/sample-orders-compare.csv");
  });
});
