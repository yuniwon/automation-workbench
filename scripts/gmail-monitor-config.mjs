import { pathToFileURL } from "node:url";

export const gmailMonitor = {
  recipient: "dnjsdndus@gmail.com",
  excludedSender: "dnjsdndus@gmail.com",
  defaultWindow: "7d",
  leadTerms: [
    "엑셀 자동화 견적",
    "엑셀 자동화 비용",
    "견적 요청 템플릿",
    "service-excel-automation-cost",
    "엑셀 자동화 제작 서비스",
    "엑셀 자동화 외주",
    "service-excel-automation-service",
    "맞춤 제작 문의",
    "Automation Workbench",
    "automation-workbench",
    "엑셀/CSV 자동화",
    "CSV/XLSX",
    "workflow-settlement-reconciliation",
    "workflow-quote-to-invoice",
    "workflow-inventory-sync",
    "엑셀 열 매핑 양식 변환",
    "열 매핑",
    "양식 변환",
    "seo-excel-column-mapping-template",
    "share-free-excel-automation",
    "공유용 소개 페이지",
  ],
};

export function buildGmailLeadQuery(options = {}) {
  const window = options.window ?? gmailMonitor.defaultWindow;
  const terms = gmailMonitor.leadTerms.map((term) => `"${term}"`).join(" OR ");

  return [
    `to:${gmailMonitor.recipient}`,
    `newer_than:${window}`,
    `-from:${gmailMonitor.excludedSender}`,
    `(${terms})`,
  ].join(" ");
}

export function buildGmailScanLogTemplate(options = {}) {
  const window = options.window ?? gmailMonitor.defaultWindow;
  const candidateCount = options.candidateCount ?? "";
  const realLeadCount = options.realLeadCount ?? "";

  return [
    "날짜:",
    `검색 범위: newer_than:${window}`,
    `Gmail 후보 수: ${candidateCount}`,
    `실제 문의 수: ${realLeadCount}`,
    "제외한 메일:",
    "다음 액션:",
    "기록 위치: docs/ops/lead-log.md / docs/ops/lead-tracker.md",
  ].join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(
    JSON.stringify(
      {
        defaultQuery: buildGmailLeadQuery(),
        wideQuery: buildGmailLeadQuery({ window: "30d" }),
        logTemplate: buildGmailScanLogTemplate(),
      },
      null,
      2,
    ),
  );
}
