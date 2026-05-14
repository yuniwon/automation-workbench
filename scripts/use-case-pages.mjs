import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = "https://yuniwon.github.io/automation-workbench";
const appPath = "/automation-workbench/";
const email = "dnjsdndus@gmail.com";
const mailSubject = "엑셀/CSV 자동화 맞춤 제작 문의";
const lastmod = "2026-05-14";
const ogImageUrl = `${baseUrl}/og-image.png`;

export const useCases = [
  {
    slug: "excel-duplicate-cleanup",
    title: "엑셀 중복 제거 무료 도구 | Automation Workbench",
    description: "엑셀 중복 제거와 빈 값 검사를 브라우저에서 무료로 실행하고, 반복 정리 업무를 맞춤 자동화로 확장할 수 있습니다.",
    eyebrow: "무료 엑셀/CSV 정리",
    heading: "엑셀 중복 제거를 브라우저에서 먼저 확인하세요",
    lede: [
      "주문, 재고, 정산 파일에서 같은 행이 반복되거나 숫자 형식이 섞여 있을 때",
      "파일을 업로드해 중복 행, 빈 값, 헤더 문제를 빠르게 확인할 수 있습니다.",
    ],
    ctaTitle: "바로 실행",
    ctaBody: "샘플 CSV로 먼저 테스트한 뒤, 실제 CSV/XLSX 파일을 업로드해 확인할 수 있습니다.",
    source: "seo-excel-duplicate-cleanup",
    mailLabel: "맞춤 제작 문의",
    mailTask: "엑셀 중복 제거",
    cards: [
      {
        title: "확인할 수 있는 문제",
        items: ["완전히 같은 중복 행", "빈 값이 있는 셀", "앞뒤 공백이 섞인 텍스트", "쉼표, 원, 공백이 섞인 숫자"],
      },
      {
        title: "정리 결과",
        items: ["중복 행 제거", "텍스트 공백 정리", "숫자 형식 정규화", "정리된 CSV 다운로드"],
      },
      {
        title: "맞춤 자동화 예시",
        body: [
          "쇼핑몰 주문 파일을 택배 업로드 양식으로 바꾸거나, 매주 반복되는 정산 파일",
          "정리를 버튼 한 번으로 끝내는 도구로 확장할 수 있습니다.",
        ],
      },
    ],
  },
  {
    slug: "csv-xlsx-file-compare",
    title: "CSV/XLSX 파일 비교 무료 도구 | Automation Workbench",
    description: "CSV/XLSX 파일 비교로 추가, 삭제, 변경, 동일 행을 키 기준으로 확인하고 결과 CSV를 내려받을 수 있습니다.",
    eyebrow: "무료 파일 비교",
    heading: "CSV/XLSX 파일 비교로 누락과 변경을 빠르게 찾으세요",
    lede: [
      "주문번호, 상품코드, ID처럼 공통 키가 있는 두 파일을 비교해 A에만 있는 행,",
      "B에만 있는 행, 변경된 행, 동일한 행을 브라우저에서 확인할 수 있습니다.",
    ],
    ctaTitle: "비교 도구 실행",
    ctaBody: "샘플 파일 A/B를 내려받아 비교 흐름을 확인한 뒤 실제 업무 파일에 적용할 수 있습니다.",
    source: "seo-csv-xlsx-file-compare",
    mailLabel: "비교 자동화 문의",
    mailTask: "CSV/XLSX 파일 비교",
    cards: [
      {
        title: "비교 상태",
        items: ["A 파일에만 있는 행", "B 파일에만 있는 행", "같은 키지만 값이 바뀐 행", "두 파일에서 동일한 행"],
      },
      {
        title: "업무 사용처",
        items: ["주문 파일과 정산 파일 비교", "재고 파일 변경 내역 확인", "월별 고객 목록 차이 확인", "누락/추가 리포트 생성"],
      },
      {
        title: "맞춤 자동화 예시",
        body: [
          "고객 파일의 키 선택 규칙, 예외 처리, 결과 컬럼 순서, 리포트 형식을 고정해",
          "매번 같은 방식으로 비교 결과를 만들 수 있습니다.",
        ],
      },
    ],
  },
  {
    slug: "order-settlement-automation",
    title: "주문·정산 파일 자동화 | Automation Workbench",
    description: "주문·정산 파일 자동화가 필요한지 무료 CSV/XLSX 정리·비교 도구로 먼저 확인하고 맞춤 제작을 문의할 수 있습니다.",
    eyebrow: "맞춤 업무 자동화 샘플",
    heading: "주문·정산 파일 자동화가 필요한지 먼저 검증하세요",
    lede: [
      "매주 반복되는 주문 정리, 정산 비교, 누락 확인 업무가 있다면 무료 도구로",
      "현재 파일의 문제를 먼저 확인하고, 필요한 규칙만 맞춤 제작 범위로 분리할 수 있습니다.",
    ],
    ctaTitle: "자동화 가능성 확인",
    ctaBody: "현재 파일 구조와 반복 작업을 정리해 보내주시면 제작 범위와 견적을 확인할 수 있습니다.",
    source: "seo-order-settlement-automation",
    mailLabel: "자동화 제작 문의",
    mailTask: "주문·정산 파일 자동화",
    cards: [
      {
        title: "반복 업무",
        items: ["쇼핑몰 주문 파일 정리", "정산 파일 누락 비교", "매장별 매출 요약", "고객사 양식으로 변환"],
      },
      {
        title: "필요한 입력",
        items: ["현재 파일 형식", "반복해서 하는 작업", "원하는 결과 파일 예시", "수작업 소요시간과 마감일"],
      },
      {
        title: "제작 방향",
        body: [
          "공통 정리·비교 기능은 재사용하고, 고객별 열 이름, 예외 규칙, 결과 양식만",
          "레시피로 분리해 유지보수 가능한 자동화로 만듭니다.",
        ],
      },
    ],
  },
  {
    slug: "excel-blank-cell-checker",
    title: "엑셀 빈 값 검사 무료 도구 | Automation Workbench",
    description: "엑셀 빈 값 검사를 브라우저에서 무료로 실행하고, 누락 확인과 보완 리포트를 맞춤 자동화로 확장할 수 있습니다.",
    eyebrow: "무료 엑셀 품질 검사",
    heading: "엑셀 빈 값 검사를 업로드만으로 확인하세요",
    lede: [
      "주문, 재고, 고객 목록에서 빠진 값이 있는지 일일이 눈으로 찾고 있다면",
      "파일을 업로드해 빈 셀 위치와 정리 필요 지점을 먼저 확인할 수 있습니다.",
    ],
    ctaTitle: "빈 값 검사 실행",
    ctaBody: "샘플 파일로 빈 값 탐지 흐름을 확인한 뒤 실제 CSV/XLSX 파일을 업로드할 수 있습니다.",
    source: "seo-excel-blank-cell-checker",
    mailLabel: "누락 검사 자동화 문의",
    mailTask: "엑셀 빈 값 검사",
    cards: [
      {
        title: "확인할 수 있는 문제",
        items: ["비어 있는 필수 셀", "헤더 이름 누락", "정리 전후 행 수 변화", "다운로드 전 데이터 품질 이슈"],
      },
      {
        title: "업무 사용처",
        items: ["고객 연락처 누락 확인", "주문 옵션 누락 확인", "재고 수량 누락 확인", "정산 필수 항목 검수"],
      },
      {
        title: "맞춤 자동화 예시",
        body: [
          "고객 파일에서 반드시 채워야 하는 열을 지정하고, 누락 행만 따로 모아",
          "확인용 리포트나 보완 요청 파일로 만들 수 있습니다.",
        ],
      },
    ],
  },
  {
    slug: "excel-number-format-cleanup",
    title: "엑셀 숫자 형식 정리 무료 도구 | Automation Workbench",
    description: "쉼표, 원, 공백이 섞인 엑셀 숫자 형식을 브라우저에서 정리하고 반복 정산 업무 자동화 가능성을 확인할 수 있습니다.",
    eyebrow: "무료 숫자 형식 정리",
    heading: "엑셀 숫자 형식이 섞인 파일을 먼저 정리해보세요",
    lede: [
      "금액, 수량, 단가 열에 쉼표, 원 표시, 공백이 섞이면 집계와 비교가 자주 깨집니다.",
      "파일을 업로드해 숫자처럼 보이는 값을 정규화하고 결과 CSV를 내려받을 수 있습니다.",
    ],
    ctaTitle: "숫자 정리 실행",
    ctaBody: "샘플 데이터로 숫자 정규화 결과를 확인한 뒤 실제 CSV/XLSX 파일에 적용할 수 있습니다.",
    source: "seo-excel-number-format-cleanup",
    mailLabel: "정산 정리 자동화 문의",
    mailTask: "엑셀 숫자 형식 정리",
    cards: [
      {
        title: "정리할 수 있는 값",
        items: ["1,200 같은 쉼표 숫자", "12,000원 같은 금액", "앞뒤 공백이 섞인 수량", "문자열로 들어온 숫자"],
      },
      {
        title: "업무 사용처",
        items: ["정산 금액 정리", "상품 단가 정리", "수량 집계 전 전처리", "외부 양식 업로드 전 검수"],
      },
      {
        title: "맞춤 자동화 예시",
        body: [
          "고객별 금액 열과 예외 규칙을 레시피로 분리해 매번 같은 기준으로",
          "정산 파일을 정리하고 요약표까지 만들 수 있습니다.",
        ],
      },
    ],
  },
  {
    slug: "excel-file-compare",
    title: "엑셀 파일 비교 무료 도구 | Automation Workbench",
    description: "두 엑셀 파일을 키 기준으로 비교해 추가, 삭제, 변경, 동일 행을 확인하고 결과 CSV로 내려받을 수 있습니다.",
    eyebrow: "무료 엑셀 파일 비교",
    heading: "두 엑셀 파일의 추가·삭제·변경을 키 기준으로 비교하세요",
    lede: [
      "주문번호, 상품코드, 고객 ID처럼 공통 기준 열이 있는 두 파일을 올리면",
      "어떤 행이 추가, 삭제, 변경, 동일 상태인지 브라우저에서 바로 확인할 수 있습니다.",
    ],
    ctaTitle: "엑셀 비교 실행",
    ctaBody: "샘플 비교 파일로 흐름을 확인하고 실제 CSV/XLSX 파일 두 개를 업로드할 수 있습니다.",
    source: "seo-excel-file-compare",
    mailLabel: "엑셀 비교 자동화 문의",
    mailTask: "엑셀 파일 비교",
    cards: [
      {
        title: "비교 결과",
        items: ["기준 파일에만 있는 행", "비교 파일에만 있는 행", "같은 키지만 값이 바뀐 행", "두 파일에서 동일한 행"],
      },
      {
        title: "업무 사용처",
        items: ["전월/당월 파일 비교", "주문 파일과 정산 파일 비교", "재고 변경 내역 확인", "고객 목록 누락 확인"],
      },
      {
        title: "맞춤 자동화 예시",
        body: [
          "비교 기준 열, 무시할 컬럼, 결과 리포트 형식을 고정해 사람이 매번",
          "필터링하지 않아도 같은 방식으로 차이 목록을 만들 수 있습니다.",
        ],
      },
    ],
  },
  {
    slug: "excel-csv-file-merge",
    title: "엑셀/CSV 파일 병합 무료 도구 | Automation Workbench",
    description: "여러 엑셀/CSV 파일을 브라우저에서 세로로 병합하고 원본 파일명이 포함된 결과 CSV를 내려받을 수 있습니다.",
    eyebrow: "무료 파일 병합",
    heading: "여러 엑셀/CSV 파일을 한 번에 병합하세요",
    lede: [
      "매장별, 월별, 거래처별로 나뉜 파일을 하나로 합칠 때 열 구조가 조금씩 달라도",
      "브라우저에서 파일을 올려 원본 파일명과 함께 병합 결과를 확인할 수 있습니다.",
    ],
    ctaTitle: "병합 도구 실행",
    ctaBody: "샘플 파일 두 개로 병합 결과를 확인한 뒤 실제 CSV/XLSX 파일 여러 개를 선택할 수 있습니다.",
    source: "seo-excel-csv-file-merge",
    mailLabel: "파일 병합 자동화 문의",
    mailTask: "엑셀/CSV 파일 병합",
    cards: [
      {
        title: "병합 방식",
        items: ["여러 파일 세로 병합", "원본 파일명 열 추가", "파일별 다른 열은 빈 값으로 맞춤", "결과 CSV 다운로드"],
      },
      {
        title: "업무 사용처",
        items: ["매장별 매출 파일 합치기", "월별 주문 파일 합치기", "거래처별 정산 파일 합치기", "여러 재고 파일 통합"],
      },
      {
        title: "맞춤 자동화 예시",
        body: [
          "파일명에서 날짜나 매장명을 추출하고, 병합 후 정리·비교·요약까지 이어지는",
          "반복 업무용 자동화 도구로 확장할 수 있습니다.",
        ],
      },
    ],
  },
];

export const publicUrls = [
  `${baseUrl}/`,
  ...useCases.map((useCase) => `${baseUrl}/use-cases/${useCase.slug}.html`),
];

function inquiryBody(useCase) {
  return `안녕하세요.
무료 도구를 보고 문의드립니다.
유입 경로:
- ${useCase.source}
도구 링크:
- ${baseUrl}/?source=${useCase.source}
자동화하고 싶은 업무:
- ${useCase.mailTask}
현재 파일 형식:
- CSV / XLSX / 구글시트 / 기타:
현재 수작업 소요시간:
- 
필요한 결과물:
- 
샘플 파일 공유 가능 여부:
- 가능 / 일부 값 가림 가능 / 어려움
`;
}

function mailtoHref(useCase) {
  return `mailto:${email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(inquiryBody(useCase))}`;
}

function pageUrl(useCase) {
  return `${baseUrl}/use-cases/${useCase.slug}.html`;
}

function htmlAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;");
}

function renderJsonLd(useCase) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: useCase.title.replace(" | Automation Workbench", ""),
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: pageUrl(useCase),
      description: useCase.description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      creator: {
        "@type": "Organization",
        name: "Automation Workbench",
        url: baseUrl,
      },
    },
    null,
    2,
  )
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");
}

function renderCard(card) {
  if (card.items) {
    const items = card.items.map((item) => `            <li>${item}</li>`).join("\n");
    return `        <article class="panel card">
          <h2>${card.title}</h2>
          <ul>
${items}
          </ul>
        </article>`;
  }

  return `        <article class="panel card">
          <h2>${card.title}</h2>
          <p>
            ${card.body[0]}
            ${card.body[1]}
          </p>
        </article>`;
}

export function renderUseCasePage(useCase) {
  const canonicalUrl = pageUrl(useCase);
  const escapedTitle = htmlAttribute(useCase.title);
  const escapedDescription = htmlAttribute(useCase.description);

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="${escapedDescription}"
    />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapedTitle}" />
    <meta property="og:description" content="${escapedDescription}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${ogImageUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapedTitle}" />
    <meta name="twitter:description" content="${escapedDescription}" />
    <meta name="twitter:image" content="${ogImageUrl}" />
    <script type="application/ld+json">
${renderJsonLd(useCase)}
    </script>
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="stylesheet" href="${appPath}use-cases/use-case.css" />
    <title>${useCase.title}</title>
  </head>
  <body>
    <main class="page">
      <nav class="nav">
        <a href="${appPath}">Automation Workbench</a>
        <a href="https://github.com/yuniwon/automation-workbench">GitHub</a>
      </nav>

      <section class="hero">
        <div>
          <p class="eyebrow">${useCase.eyebrow}</p>
          <h1>${useCase.heading}</h1>
          <p class="lede">
            ${useCase.lede[0]}
            ${useCase.lede[1]}
          </p>
        </div>
        <aside class="panel cta-panel">
          <strong>${useCase.ctaTitle}</strong>
          <p>${useCase.ctaBody}</p>
          <a class="button" href="${appPath}?source=${useCase.source}">무료 도구 열기</a>
          <a class="button ghost" href="${mailtoHref(useCase)}">${useCase.mailLabel}</a>
          <p class="trust">
            파일은 브라우저 안에서 처리됩니다.
            <a href="https://github.com/yuniwon/automation-workbench/blob/main/PRIVACY.md">개인정보 안내</a>
          </p>
        </aside>
      </section>

      <section class="grid">
${useCase.cards.map(renderCard).join("\n")}
      </section>

      <p class="footer">문의: ${email}</p>
    </main>
  </body>
</html>
`;
}

export function renderSitemap() {
  const entries = publicUrls
    .map((url, index) => {
      const isRoot = index === 0;

      return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${isRoot ? "weekly" : "monthly"}</changefreq>
    <priority>${isRoot ? "1.0" : "0.8"}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

export async function generateUseCasePages() {
  await Promise.all(
    [
      ...useCases.map((useCase) =>
        writeFile(join(root, "public", "use-cases", `${useCase.slug}.html`), renderUseCasePage(useCase)),
      ),
      writeFile(join(root, "public", "sitemap.xml"), renderSitemap()),
    ],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await generateUseCasePages();
}
