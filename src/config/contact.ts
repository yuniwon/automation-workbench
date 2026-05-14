export const toolUrl = "https://yuniwon.github.io/automation-workbench/";
export const serviceInquiryUrl = "https://yuniwon.github.io/automation-workbench/services/excel-automation-inquiry.html";
export const privacyUrl = "https://github.com/yuniwon/automation-workbench/blob/main/PRIVACY.md";

const mailSubject = "엑셀/CSV 자동화 맞춤 제작 문의";
const englishMailSubject = "Custom Excel/CSV automation inquiry";

function cleanSource(source?: string) {
  return (source ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, 80);
}

function cleanTool(tool?: string) {
  const normalized = cleanSource(tool);
  return ["cleanup", "compare", "merge", "report", "map"].includes(normalized) ? normalized : "";
}

function buildTrackedToolUrl(source?: string, tool?: string) {
  const sourceLabel = cleanSource(source);
  const toolLabel = cleanTool(tool);
  const params = new URLSearchParams();
  if (sourceLabel) {
    params.set("source", sourceLabel);
  }
  if (toolLabel) {
    params.set("tool", toolLabel);
  }

  const query = params.toString();
  return query ? `${toolUrl}?${query}` : toolUrl;
}

function buildMailBody(source?: string, tool?: string, locale: "ko" | "en" = "ko") {
  const sourceLabel = cleanSource(source);
  const toolLabel = cleanTool(tool);
  if (locale === "en") {
    const sourceLine = sourceLabel ? `\nSource:\n- ${sourceLabel}\n` : "";
    const toolLine = toolLabel ? `\nSelected tool:\n- ${toolLabel}\n` : "";

    return `Hello.

I tried the free Excel/CSV cleanup, comparison, merge, report, and column-mapping tool and would like to ask about custom automation.
Tool link: ${buildTrackedToolUrl(sourceLabel, toolLabel)}
${sourceLine}
${toolLine}

Workflow I want to automate:
- Please describe it here

Current file format:
- CSV / XLSX / Google Sheets / Other:

Repeated manual steps:
- Please describe them here

Current time spent manually:
- Example: 2 hours per week / 30 minutes per day / 5 minutes per item

Needed output:
- Example: CSV download / Excel report / Google Sheets update / email notification

Target deadline:
- Please write it here

Can I share a sample file?
- Yes / Yes with sensitive values masked / Not easily
`;
  }
  const sourceLine = sourceLabel ? `\n유입 경로:\n- ${sourceLabel}\n` : "";
  const toolLine = toolLabel ? `\n선택 도구:\n- ${toolLabel}\n` : "";

  return `안녕하세요.

무료 엑셀/CSV 정리·비교·병합·정산서 생성·양식 변환 도구를 사용해보고 문의드립니다.
도구 링크: ${buildTrackedToolUrl(sourceLabel, toolLabel)}
${sourceLine}
${toolLine}

제가 자동화하고 싶은 업무:
- 여기에 적어주세요

현재 파일 형식:
- CSV / XLSX / 구글시트 / 기타:

반복해서 하는 작업:
- 여기에 적어주세요

현재 수작업 소요시간:
- 예: 매주 2시간 / 매일 30분 / 건당 5분

필요한 결과물:
- 예: CSV 다운로드 / 엑셀 리포트 / 구글시트 업데이트 / 이메일 알림

희망 마감일:
- 여기에 적어주세요

샘플 파일 공유 가능 여부:
- 가능 / 일부 값 가림 가능 / 어려움
`;
}

export const inquiryChecklist = [
  "자동화하고 싶은 업무",
  "현재 파일 형식",
  "반복 작업",
  "수작업 소요시간",
  "필요한 결과물",
  "마감일과 샘플 공유",
];

export function buildInquiryText(source?: string, tool?: string, locale: "ko" | "en" = "ko") {
  return buildMailBody(source, tool, locale);
}

export function getSourceFromSearch(search: string) {
  const params = new URLSearchParams(search);
  return cleanSource(params.get("source") ?? params.get("utm_source") ?? "");
}

export function getToolFromSearch(search: string) {
  const params = new URLSearchParams(search);
  return cleanTool(params.get("tool") ?? "");
}

export function buildContactHref(source?: string, tool?: string, locale: "ko" | "en" = "ko") {
  return `mailto:dnjsdndus@gmail.com?subject=${encodeURIComponent(locale === "en" ? englishMailSubject : mailSubject)}&body=${encodeURIComponent(
    buildMailBody(source, tool, locale),
  )}`;
}

export const contactConfig = {
  href: buildContactHref(),
  label: "이메일로 맞춤 제작 문의",
  inquiryText: buildInquiryText(),
  shareText: `무료 엑셀/CSV 정리·비교·병합·정산서 생성·양식 변환 도구: ${toolUrl}`,
};
