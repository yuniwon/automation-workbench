import { normalizeNumberLike } from "../format/numberFormat";
import { isBlank } from "../table/tableUtils";
import type { CellValue, DataTable } from "../table/types";

export interface SettlementReportOptions {
  groupColumnKey: string;
  itemColumnKey: string;
  amountColumnKey: string;
}

export interface SettlementReportSummary {
  groupCount: number;
  rowCount: number;
  totalAmount: number;
  invalidAmountRows: number;
}

export interface SettlementReport {
  table: DataTable;
  summary: SettlementReportSummary;
}

interface GroupDraft {
  label: string;
  rowCount: number;
  totalAmount: number;
  itemCounts: Map<string, number>;
}

export function createSettlementReport(table: DataTable, options: SettlementReportOptions): SettlementReport {
  const groups = new Map<string, GroupDraft>();
  let totalAmount = 0;
  let invalidAmountRows = 0;

  for (const row of table.rows) {
    const groupLabel = labelForValue(row.cells[options.groupColumnKey]);
    const itemLabel = labelForValue(row.cells[options.itemColumnKey]);
    const group = groups.get(groupLabel) ?? {
      label: groupLabel,
      rowCount: 0,
      totalAmount: 0,
      itemCounts: new Map<string, number>(),
    };

    group.rowCount += 1;
    group.itemCounts.set(itemLabel, (group.itemCounts.get(itemLabel) ?? 0) + 1);

    const amount = parseAmount(row.cells[options.amountColumnKey]);
    if (amount === null) {
      if (!isBlank(row.cells[options.amountColumnKey])) {
        invalidAmountRows += 1;
      }
    } else {
      group.totalAmount += amount;
      totalAmount += amount;
    }

    groups.set(groupLabel, group);
  }

  const rows = Array.from(groups.values()).map((group, index) => ({
    id: `settlement_${index + 1}`,
    cells: {
      group: group.label,
      row_count: group.rowCount,
      total_amount: group.totalAmount,
      items: formatItemCounts(group.itemCounts),
    },
  }));

  return {
    summary: {
      groupCount: groups.size,
      rowCount: table.rows.length,
      totalAmount,
      invalidAmountRows,
    },
    table: {
      columns: [
        { key: "group", label: "구분", sourceLabel: "구분" },
        { key: "row_count", label: "행 수", sourceLabel: "행 수" },
        { key: "total_amount", label: "총 금액", sourceLabel: "총 금액" },
        { key: "items", label: "품목 요약", sourceLabel: "품목 요약" },
      ],
      rows,
    },
  };
}

export function settlementReportToHtml(report: SettlementReport, title: string): string {
  const rows = report.table.rows
    .map(
      (row) => `        <tr>
          <td>${escapeHtml(row.cells.group)}</td>
          <td>${escapeHtml(row.cells.row_count)}</td>
          <td>${formatCurrency(Number(row.cells.total_amount ?? 0))}</td>
          <td>${escapeHtml(row.cells.items)}</td>
        </tr>`,
    )
    .join("\n");

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <style>
      body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 32px; color: #111827; }
      h1 { margin: 0 0 16px; font-size: 28px; }
      .summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-bottom: 20px; }
      .summary div { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
      .summary span { display: block; color: #6b7280; font-size: 12px; }
      .summary strong { display: block; margin-top: 6px; font-size: 20px; }
      table { width: 100%; border-collapse: collapse; font-size: 14px; }
      th, td { border-bottom: 1px solid #e5e7eb; padding: 10px 12px; text-align: left; }
      th { background: #f9fafb; color: #4b5563; }
    </style>
  </head>
  <body>
    <h1>${escapeHtml(title)}</h1>
    <section class="summary">
      <div><span>그룹</span><strong>${report.summary.groupCount}</strong></div>
      <div><span>행 수</span><strong>${report.summary.rowCount}</strong></div>
      <div><span>총 금액</span><strong>${formatCurrency(report.summary.totalAmount)}</strong></div>
      <div><span>금액 오류</span><strong>${report.summary.invalidAmountRows}</strong></div>
    </section>
    <table>
      <thead>
        <tr>
          <th>구분</th>
          <th>행 수</th>
          <th>총 금액</th>
          <th>품목 요약</th>
        </tr>
      </thead>
      <tbody>
${rows}
      </tbody>
    </table>
  </body>
</html>
`;
}

function labelForValue(value: CellValue): string {
  return isBlank(value) ? "(비어 있음)" : String(value).trim();
}

function parseAmount(value: CellValue): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value !== "string") {
    return null;
  }

  const normalized = normalizeNumberLike(value) ?? value.trim().replace(/[₩$,\s]/g, "");
  if (normalized === "") {
    return null;
  }

  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : null;
}

function formatItemCounts(itemCounts: Map<string, number>): string {
  return Array.from(itemCounts.entries())
    .map(([label, count]) => `${label} x${count}`)
    .join(", ");
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 }).format(value);
}

function escapeHtml(value: CellValue | undefined): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}
