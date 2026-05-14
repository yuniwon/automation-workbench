import { normalizeNumberLike } from "../format/numberFormat";
import { isBlank } from "../table/tableUtils";
import type { CellValue, DataTable } from "../table/types";

export type SettlementReportLocale = "ko" | "en";

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

const reportCopy = {
  ko: {
    blank: "(비어 있음)",
    columns: {
      group: "구분",
      rowCount: "행 수",
      totalAmount: "총 금액",
      items: "품목 요약",
    },
    summary: {
      groups: "그룹",
      rows: "행 수",
      totalAmount: "총 금액",
      amountErrors: "금액 오류",
    },
    htmlLang: "ko",
    currencyLocale: "ko-KR",
  },
  en: {
    blank: "(blank)",
    columns: {
      group: "Group",
      rowCount: "Rows",
      totalAmount: "Total amount",
      items: "Item summary",
    },
    summary: {
      groups: "Groups",
      rows: "Rows",
      totalAmount: "Total amount",
      amountErrors: "Amount errors",
    },
    htmlLang: "en",
    currencyLocale: "en-US",
  },
} satisfies Record<SettlementReportLocale, {
  blank: string;
  columns: Record<"group" | "rowCount" | "totalAmount" | "items", string>;
  summary: Record<"groups" | "rows" | "totalAmount" | "amountErrors", string>;
  htmlLang: string;
  currencyLocale: string;
}>;

interface GroupDraft {
  label: string;
  rowCount: number;
  totalAmount: number;
  itemCounts: Map<string, number>;
}

export function createSettlementReport(
  table: DataTable,
  options: SettlementReportOptions,
  locale: SettlementReportLocale = "ko",
): SettlementReport {
  const text = reportCopy[locale];
  const groups = new Map<string, GroupDraft>();
  let totalAmount = 0;
  let invalidAmountRows = 0;

  for (const row of table.rows) {
    const groupLabel = labelForValue(row.cells[options.groupColumnKey], locale);
    const itemLabel = labelForValue(row.cells[options.itemColumnKey], locale);
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
        { key: "group", label: text.columns.group, sourceLabel: text.columns.group },
        { key: "row_count", label: text.columns.rowCount, sourceLabel: text.columns.rowCount },
        { key: "total_amount", label: text.columns.totalAmount, sourceLabel: text.columns.totalAmount },
        { key: "items", label: text.columns.items, sourceLabel: text.columns.items },
      ],
      rows,
    },
  };
}

export function settlementReportToHtml(
  report: SettlementReport,
  title: string,
  locale: SettlementReportLocale = "ko",
): string {
  const text = reportCopy[locale];
  const rows = report.table.rows
    .map(
      (row) => `        <tr>
          <td>${escapeHtml(row.cells.group)}</td>
          <td>${escapeHtml(row.cells.row_count)}</td>
          <td>${formatCurrency(Number(row.cells.total_amount ?? 0), locale)}</td>
          <td>${escapeHtml(row.cells.items)}</td>
        </tr>`,
    )
    .join("\n");

  return `<!doctype html>
<html lang="${text.htmlLang}">
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
      <div><span>${text.summary.groups}</span><strong>${report.summary.groupCount}</strong></div>
      <div><span>${text.summary.rows}</span><strong>${report.summary.rowCount}</strong></div>
      <div><span>${text.summary.totalAmount}</span><strong>${formatCurrency(report.summary.totalAmount, locale)}</strong></div>
      <div><span>${text.summary.amountErrors}</span><strong>${report.summary.invalidAmountRows}</strong></div>
    </section>
    <table>
      <thead>
        <tr>
          <th>${text.columns.group}</th>
          <th>${text.columns.rowCount}</th>
          <th>${text.columns.totalAmount}</th>
          <th>${text.columns.items}</th>
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

function labelForValue(value: CellValue, locale: SettlementReportLocale): string {
  return isBlank(value) ? reportCopy[locale].blank : String(value).trim();
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

function formatCurrency(value: number, locale: SettlementReportLocale): string {
  return new Intl.NumberFormat(reportCopy[locale].currencyLocale, { maximumFractionDigits: 0 }).format(value);
}

function escapeHtml(value: CellValue | undefined): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}
