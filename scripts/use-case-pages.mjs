import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = "https://yuniwon.github.io/automation-workbench";
const appPath = "/automation-workbench/";
const email = "dnjsdndus@gmail.com";
const mailSubject = "엑셀/CSV 자동화 맞춤 제작 문의";
const lastmod = "2026-05-14";
const ogImageUrl = `${baseUrl}/og-image.png`;
const inquiryChecklist = [
  "현재 쓰는 파일 형식과 입력 파일 개수",
  "반복해서 하는 작업과 예외 규칙",
  "원하는 결과 파일 또는 화면 예시",
  "현재 수작업 소요시간과 희망 마감일",
];
const pricingFactors = [
  "입력 파일 개수와 파일 구조 안정성",
  "비교, 병합, 집계, 문서 생성 단계 수",
  "예외 규칙과 검수 리포트 필요 여부",
  "구글시트, Gmail, Notion 같은 외부 서비스 연동 여부",
];
const commonFaqs = [
  {
    question: "샘플 파일 없이 문의할 수 있나요?",
    answer: "가능합니다. 다만 파일 형식, 열 이름, 반복 작업, 필요한 결과물을 글로라도 적어주시면 범위를 더 빨리 좁힐 수 있습니다.",
  },
  {
    question: "개인정보가 있는 파일도 보낼 수 있나요?",
    answer: "이름, 전화번호, 주소, 계좌번호 같은 민감정보는 먼저 가린 샘플을 권장합니다. 실제 제작에는 구조와 규칙 확인이 더 중요합니다.",
  },
  {
    question: "가격은 어떻게 정해지나요?",
    answer: "파일 개수, 단계 수, 예외 규칙, 결과물 형식, 외부 서비스 연동 여부에 따라 달라집니다. 단일 정리는 5만 원부터, 비교나 병합은 15만 원부터 검토합니다.",
  },
];

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
    tool: "cleanup",
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
    tool: "compare",
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
    tool: "cleanup",
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
    tool: "cleanup",
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
    tool: "cleanup",
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
    tool: "compare",
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
    tool: "merge",
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
  {
    slug: "estimate-settlement-generator",
    title: "견적서/정산서 자동 생성 무료 도구 | Automation Workbench",
    description: "주문 CSV/XLSX 파일에서 고객, 품목, 금액 열을 골라 견적서나 정산서 형태의 요약 리포트를 만들 수 있습니다.",
    eyebrow: "무료 문서 생성 샘플",
    heading: "견적서/정산서 자동 생성을 샘플 파일로 확인하세요",
    lede: [
      "반복해서 주문 파일을 정리한 뒤 고객별 금액 합계나 품목 요약을 문서로 만들고 있다면",
      "파일을 올려 그룹 기준, 품목, 금액 열을 선택하고 정산 CSV/HTML을 내려받을 수 있습니다.",
    ],
    ctaTitle: "정산서 생성 실행",
    ctaBody: "샘플 주문 데이터로 고객별 정산서를 확인한 뒤 실제 CSV/XLSX 파일에 적용할 수 있습니다.",
    source: "seo-estimate-settlement-generator",
    tool: "report",
    mailLabel: "문서 자동화 문의",
    mailTask: "견적서/정산서 자동 생성",
    cards: [
      {
        title: "생성할 수 있는 결과",
        items: ["고객별 금액 합계", "품목별 건수 요약", "금액 오류 행 수", "정산 CSV와 HTML 문서 다운로드"],
      },
      {
        title: "업무 사용처",
        items: ["견적서 초안 만들기", "거래처별 정산서 만들기", "주문 파일에서 청구 요약 만들기", "보고용 HTML 리포트 생성"],
      },
      {
        title: "맞춤 자동화 예시",
        body: [
          "고객사 양식, 로고, 문구, 세금 계산 규칙, 예외 처리까지 고정해",
          "반복 문서 생성 업무를 버튼 한 번으로 끝나는 자동화로 확장할 수 있습니다.",
        ],
      },
    ],
  },
  {
    slug: "excel-column-mapping-template",
    title: "엑셀 열 매핑 양식 변환 무료 도구 | Automation Workbench",
    description: "엑셀 열 매핑으로 제각각인 주문 파일을 표준 양식으로 변환하고 결과 CSV를 내려받을 수 있습니다.",
    eyebrow: "무료 양식 변환",
    heading: "엑셀 열 매핑으로 고객사 양식에 맞춰 변환하세요",
    lede: [
      "주문번호, 고객명, 상품명, 금액처럼 필요한 열은 같지만 파일마다 열 이름이 다를 때",
      "원본 열을 표준 양식 열에 연결하고 변환된 CSV를 브라우저에서 바로 내려받을 수 있습니다.",
    ],
    ctaTitle: "양식 변환 실행",
    ctaBody: "샘플 주문 파일로 열 매핑 흐름을 확인한 뒤 실제 CSV/XLSX 파일에 적용할 수 있습니다.",
    source: "seo-excel-column-mapping-template",
    tool: "map",
    mailLabel: "양식 변환 자동화 문의",
    mailTask: "엑셀 열 매핑 양식 변환",
    cards: [
      {
        title: "변환 방식",
        items: ["원본 열을 표준 열에 매핑", "없는 열은 빈 값 또는 기본값으로 채움", "정해진 열 순서 유지", "결과 CSV 다운로드"],
      },
      {
        title: "업무 사용처",
        items: ["쇼핑몰 주문 업로드 양식 변환", "거래처별 파일 양식 통일", "택배사 업로드 파일 만들기", "월별 보고 양식 맞추기"],
      },
      {
        title: "맞춤 자동화 예시",
        body: [
          "고객사별 열 이름, 기본값, 필수 열 검수 규칙을 설정으로 분리해",
          "파일이 바뀌어도 같은 표준 양식으로 변환되는 도구로 확장할 수 있습니다.",
        ],
      },
    ],
  },
];

export const servicePages = [
  {
    slug: "excel-automation-inquiry",
    title: "맞춤 엑셀/CSV 자동화 제작 문의 | Automation Workbench",
    description:
      "CSV/XLSX 정리, 비교, 병합, 정산서 생성 업무를 실제 파일 구조에 맞춰 제작 문의하기 전에 범위와 준비 자료를 확인할 수 있습니다.",
    eyebrow: "맞춤 자동화 제작",
    heading: "내 업무 파일에 맞춘 엑셀/CSV 자동화 제작 범위를 확인하세요",
    lede: [
      "무료 도구로 정리, 비교, 병합, 정산서 생성 흐름을 먼저 확인한 뒤",
      "실제 파일 구조와 반복 규칙에 맞춘 제작 범위와 견적을 문의할 수 있습니다.",
    ],
    source: "service-excel-automation-inquiry",
    ctaTitle: "문의 전 준비",
    ctaBody: "파일 형식, 반복 작업, 현재 수작업 시간, 원하는 결과물을 적어 보내주시면 범위와 견적을 안내합니다.",
    cards: [
      {
        title: "제작 범위",
        items: [
          "단일 파일 정리/변환: 5만 원부터",
          "두 파일 비교/병합/요약: 15만 원부터",
          "여러 파일과 예외 규칙이 있는 반복 도구: 30만 원부터",
          "구글시트, Gmail, Notion 같은 외부 서비스 연동: 별도 산정",
        ],
      },
      {
        title: "보내주면 좋은 정보",
        items: [
          "현재 파일 형식과 입력 파일 개수",
          "반복해서 하는 작업",
          "필요한 결과물 예시",
          "현재 수작업 소요시간",
          "샘플 파일 공유 가능 여부",
        ],
      },
      {
        title: "제작 흐름",
        items: [
          "샘플 파일 구조 확인",
          "반복 규칙과 예외 규칙 분리",
          "작업 범위와 고정 견적 안내",
          "도구 제작과 검수",
          "사용법 전달",
        ],
      },
      {
        title: "먼저 써볼 무료 도구",
        body: [
          "정리, 비교, 병합, 정산서 생성 도구를 먼저 실행해보고",
          "어떤 단계가 실제 업무에 맞춤 제작되어야 하는지 확인할 수 있습니다.",
        ],
      },
    ],
  },
  {
    slug: "excel-automation-service",
    title: "엑셀 자동화 제작 서비스 | Automation Workbench",
    description:
      "엑셀 자동화 외주가 필요한 반복 정리, 비교, 병합, 정산서 생성 업무를 무료 진단 후 실제 파일 구조에 맞춰 제작합니다.",
    eyebrow: "엑셀 자동화 외주",
    heading: "반복 엑셀 업무를 실제 파일 양식에 맞춰 자동화합니다",
    lede: [
      "주문, 정산, 재고, 보고 파일을 매번 같은 방식으로 손보고 있다면",
      "무료 도구로 자동화 가능성을 먼저 확인하고 필요한 범위만 제작할 수 있습니다.",
    ],
    source: "service-excel-automation-service",
    ctaTitle: "무료 진단",
    ctaBody: "현재 파일 구조와 반복 작업을 적어 보내주시면 제작 가능 범위와 견적 기준을 먼저 정리해드립니다.",
    cards: [
      {
        title: "엑셀 자동화 외주 대상",
        items: [
          "주문 파일 정리와 업로드 양식 변환",
          "정산 파일 대조와 차액 리포트",
          "여러 엑셀/CSV 파일 병합",
          "고객별 견적서/정산서 자동 생성",
        ],
      },
      {
        title: "견적 기준",
        items: [
          "단일 파일 정리/변환: 5만 원부터",
          "두 파일 비교/병합/요약: 15만 원부터",
          "여러 파일과 예외 규칙이 있는 반복 도구: 30만 원부터",
          "Gmail, Google Sheets, Notion 연동: 별도 산정",
        ],
      },
      {
        title: "제작 방식",
        items: [
          "파일 구조와 반복 규칙 확인",
          "공통 정리·비교·병합 모듈 재사용",
          "고객별 열 이름과 예외 규칙 분리",
          "검수 가능한 결과 파일과 사용법 전달",
        ],
      },
      {
        title: "먼저 확인할 것",
        body: [
          "샘플 파일의 개인정보를 가린 뒤 반복 작업과 원하는 결과물을 함께 보내면",
          "불필요한 기능을 줄이고 실제 업무에 필요한 제작 범위만 잡을 수 있습니다.",
        ],
      },
    ],
  },
  {
    slug: "excel-automation-cost",
    title: "엑셀 자동화 견적과 비용 기준 | Automation Workbench",
    description:
      "엑셀 자동화 비용이 달라지는 기준을 확인하고 단일 파일 정리, 비교·병합, 반복 도구 제작 견적 요청 템플릿으로 문의할 수 있습니다.",
    eyebrow: "엑셀 자동화 견적",
    heading: "엑셀 자동화 비용을 결정하는 기준을 먼저 확인하세요",
    lede: [
      "엑셀 자동화 외주를 맡기기 전에 어떤 정보가 있어야 견적을 낼 수 있는지 정리했습니다.",
      "파일 개수, 작업 단계, 예외 규칙, 결과물 형식을 기준으로 제작 범위를 나눕니다.",
    ],
    source: "service-excel-automation-cost",
    ctaTitle: "견적 요청 템플릿",
    ctaBody: "현재 파일 개수, 반복 작업, 원하는 결과물, 수작업 시간을 적어 보내주시면 범위를 좁혀 답장합니다.",
    cards: [
      {
        title: "엑셀 자동화 비용 기준",
        items: [
          "단일 파일 정리/변환: 5만 원부터",
          "두 파일 비교/병합/요약: 15만 원부터",
          "여러 파일과 예외 규칙이 있는 반복 도구: 30만 원부터",
          "외부 서비스 연동과 배포 방식은 별도 산정",
        ],
      },
      {
        title: "견적이 빨라지는 정보",
        items: [
          "입력 파일 샘플 또는 열 이름 목록",
          "반복해서 하는 작업 순서",
          "원하는 결과 파일 예시",
          "현재 수작업 소요시간",
        ],
      },
      {
        title: "비용이 커지는 경우",
        items: [
          "파일마다 열 구조가 자주 바뀜",
          "예외 규칙이 많고 사람이 판단해야 함",
          "결과물이 여러 문서나 시스템으로 나뉨",
          "Gmail, Google Sheets, Notion 같은 연동이 필요함",
        ],
      },
      {
        title: "먼저 줄일 수 있는 범위",
        body: [
          "무료 도구로 정리, 비교, 병합, 정산서 생성 흐름을 먼저 확인하면",
          "꼭 필요한 자동화 단계와 나중에 해도 되는 단계를 분리할 수 있습니다.",
        ],
      },
    ],
  },
];

export const workflowPages = [
  {
    slug: "shopping-mall-order-cleanup",
    title: "쇼핑몰 주문 엑셀 정리 자동화 | Automation Workbench",
    description:
      "쇼핑몰 주문 엑셀 파일을 발송, 정산, 고객 응대용으로 반복 정리하는 업무를 무료 도구로 먼저 확인하고 맞춤 자동화 범위를 검토할 수 있습니다.",
    eyebrow: "업무별 자동화 예시",
    heading: "쇼핑몰 주문 엑셀 정리 자동화를 먼저 검토하세요",
    lede: [
      "스마트스토어, 쿠팡, 자사몰 주문 파일을 매번 같은 방식으로 정리하고 있다면",
      "무료 정리·병합 도구로 흐름을 확인한 뒤 실제 주문 양식에 맞춘 자동화를 만들 수 있습니다.",
    ],
    source: "workflow-shopping-mall-order-cleanup",
    tool: "cleanup",
    mailTask: "쇼핑몰 주문 엑셀 정리 자동화",
    primaryUseCaseSlug: "excel-duplicate-cleanup",
    cards: [
      {
        title: "반복되는 수작업",
        items: ["주문번호 중복 제거", "수령인/주소/옵션 누락 확인", "금액·수량 형식 정리", "택배 업로드 양식으로 열 순서 변경"],
      },
      {
        title: "자동화 결과물",
        items: ["발송용 CSV", "누락 확인 리포트", "정산용 요약표", "문제 행만 모은 검수 파일"],
      },
      {
        title: "문의할 때 준비할 것",
        items: ["현재 주문 파일 예시", "최종 업로드 양식 예시", "반복 예외 규칙", "하루 또는 주간 처리 건수"],
      },
      {
        title: "제작 방향",
        body: [
          "공통 정리 기능은 재사용하고 쇼핑몰별 열 이름, 옵션 파싱, 결과 양식만",
          "레시피로 분리해 유지보수 가능한 주문 정리 도구로 만듭니다.",
        ],
      },
    ],
  },
  {
    slug: "settlement-file-reconciliation",
    title: "정산 파일 대조 자동화 | Automation Workbench",
    description:
      "주문 파일과 정산 파일을 주문번호, 상품코드, 금액 기준으로 대조해 누락, 차액, 변경 내역을 찾는 자동화 제작 범위를 확인할 수 있습니다.",
    eyebrow: "업무별 자동화 예시",
    heading: "정산 파일 대조 자동화로 누락과 차액을 줄이세요",
    lede: [
      "주문 파일과 정산 파일을 눈으로 비교하면서 빠진 주문이나 금액 차이를 찾고 있다면",
      "무료 파일 비교 도구로 먼저 패턴을 확인하고 실제 정산 규칙을 자동화할 수 있습니다.",
    ],
    source: "workflow-settlement-file-reconciliation",
    tool: "compare",
    mailTask: "정산 파일 대조 자동화",
    primaryUseCaseSlug: "csv-xlsx-file-compare",
    cards: [
      {
        title: "비교 기준",
        items: ["주문번호 또는 거래번호", "상품코드와 옵션", "결제 금액과 수수료", "정산 상태와 지급일"],
      },
      {
        title: "자동화 결과물",
        items: ["주문 파일에만 있는 행", "정산 파일에만 있는 행", "금액 차이 목록", "차액 합계와 검수 리포트"],
      },
      {
        title: "문의할 때 준비할 것",
        items: ["주문 파일 샘플", "정산 파일 샘플", "비교 기준 열", "차액 허용 규칙"],
      },
      {
        title: "제작 방향",
        body: [
          "비교 엔진은 재사용하고 고객별 키 선택, 금액 계산식, 무시할 컬럼,",
          "결과 리포트 양식만 설정으로 분리합니다.",
        ],
      },
    ],
  },
  {
    slug: "monthly-report-file-merge",
    title: "월간 매출 파일 병합 리포트 자동화 | Automation Workbench",
    description:
      "매장별, 월별, 거래처별 엑셀/CSV 파일을 병합하고 월간 매출 리포트나 정산 요약으로 만드는 자동화 범위를 확인할 수 있습니다.",
    eyebrow: "업무별 자동화 예시",
    heading: "월간 매출 파일 병합과 리포트를 한 흐름으로 묶으세요",
    lede: [
      "여러 매장이나 거래처에서 받은 파일을 하나로 합치고 월간 요약표를 만들고 있다면",
      "무료 병합·정산서 도구로 먼저 흐름을 확인한 뒤 반복 리포트 자동화로 확장할 수 있습니다.",
    ],
    source: "workflow-monthly-report-file-merge",
    tool: "merge",
    mailTask: "월간 매출 파일 병합 리포트 자동화",
    primaryUseCaseSlug: "excel-csv-file-merge",
    cards: [
      {
        title: "반복되는 수작업",
        items: ["파일 여러 개 열기", "열 이름 맞추기", "원본 매장명 표시", "월간 합계와 거래처별 요약 만들기"],
      },
      {
        title: "자동화 결과물",
        items: ["병합 CSV", "매장별 매출 요약", "거래처별 정산 요약", "HTML 리포트 또는 공유용 표"],
      },
      {
        title: "문의할 때 준비할 것",
        items: ["파일명 규칙", "입력 파일 개수", "그룹 기준 열", "월간 리포트 예시"],
      },
      {
        title: "제작 방향",
        body: [
          "병합, 정리, 집계, 리포트 생성을 각각 모듈로 두고 파일명 파싱과",
          "고객별 요약 규칙만 별도 설정으로 관리합니다.",
        ],
      },
    ],
  },
];

export const sharePage = {
  slug: "free-excel-automation",
  title: "무료 엑셀/CSV 자동화 도구 공유용 소개 | Automation Workbench",
  description:
    "무료 엑셀/CSV 정리, 비교, 병합, 정산서 생성, 양식 변환 도구를 커뮤니티나 지인에게 바로 공유할 수 있는 소개 페이지입니다.",
  source: "share-free-excel-automation",
};

export const publicUrls = [
  `${baseUrl}/`,
  `${baseUrl}/share/${sharePage.slug}.html`,
  `${baseUrl}/use-cases/`,
  ...useCases.map((useCase) => `${baseUrl}/use-cases/${useCase.slug}.html`),
  ...servicePages.map((page) => `${baseUrl}/services/${page.slug}.html`),
  `${baseUrl}/workflows/`,
  ...workflowPages.map((page) => `${baseUrl}/workflows/${page.slug}.html`),
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

function servicePageUrl(page) {
  return `${baseUrl}/services/${page.slug}.html`;
}

function workflowPageUrl(page) {
  return `${baseUrl}/workflows/${page.slug}.html`;
}

function serviceInquiryBody(page) {
  return `안녕하세요.
맞춤 엑셀/CSV 자동화 제작 문의드립니다.
유입 경로:
- ${page.source}
문의 페이지:
- ${servicePageUrl(page)}
도구 링크:
- ${baseUrl}/?source=${page.source}

현재 파일 형식:
- CSV / XLSX / 구글시트 / 기타:

입력 파일 개수:
-

반복해서 하는 작업:
-

현재 수작업 소요시간:
-

필요한 결과물:
-

샘플 파일 공유 가능 여부:
- 가능 / 일부 값 가림 가능 / 어려움

개인정보나 민감정보 포함 여부:
- 없음 / 일부 있음 / 있음:

희망 마감일:
-
`;
}

function serviceMailtoHref(page) {
  return `mailto:${email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(serviceInquiryBody(page))}`;
}

function workflowTrackingQuery(page, intent) {
  const params = new URLSearchParams();
  params.set("source", page.source);
  params.set("tool", page.tool);
  params.set("workflow", page.slug);
  params.set("intent", intent);
  return params.toString();
}

function workflowInquiryBody(page) {
  return `안녕하세요.
${page.mailTask} 문의드립니다.
유입 경로:
- ${page.source}
업무 예시 상세:
- ${page.slug}
CTA 상세:
- direct-inquiry
업무 예시 페이지:
- ${workflowPageUrl(page)}
제작 범위 안내:
- ${baseUrl}/services/excel-automation-inquiry.html?${workflowTrackingQuery(page, "scope")}
도구 링크:
- ${baseUrl}/?${workflowTrackingQuery(page, "direct-inquiry")}

현재 파일 형식:
- CSV / XLSX / 구글시트 / 기타:

입력 파일 개수:
-

반복해서 하는 작업:
-

현재 수작업 소요시간:
-

필요한 결과물:
-

샘플 파일 공유 가능 여부:
- 가능 / 일부 값 가림 가능 / 어려움

희망 마감일:
-
`;
}

function workflowMailtoHref(page) {
  return `mailto:${email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(workflowInquiryBody(page))}`;
}

function sharePageUrl() {
  return `${baseUrl}/share/${sharePage.slug}.html`;
}

function shareTrackingQuery(intent) {
  const params = new URLSearchParams();
  params.set("source", sharePage.source);
  if (intent) {
    params.set("intent", intent);
  }
  return params.toString();
}

function shareInquiryBody() {
  return `안녕하세요.
무료 엑셀/CSV 자동화 도구를 보고 문의드립니다.
유입 경로:
- ${sharePage.source}
공유용 소개 페이지:
- ${sharePageUrl()}
도구 링크:
- ${baseUrl}/?source=${sharePage.source}
제작 범위 안내:
- ${baseUrl}/services/excel-automation-inquiry.html?${shareTrackingQuery("scope")}

현재 파일 형식:
- CSV / XLSX / 구글시트 / 기타:

입력 파일 개수:
-

반복해서 하는 작업:
-

현재 수작업 소요시간:
-

필요한 결과물:
-

샘플 파일 공유 가능 여부:
- 가능 / 일부 값 가림 가능 / 어려움

희망 마감일:
-
`;
}

function shareMailtoHref() {
  return `mailto:${email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(shareInquiryBody())}`;
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

function renderIndexJsonLd() {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "무료 엑셀/CSV 도구 모음",
      url: `${baseUrl}/use-cases/`,
      description: "CSV/XLSX 파일 정리, 비교, 병합, 정산서 생성을 브라우저에서 실행할 수 있는 무료 업무 자동화 도구 모음입니다.",
      hasPart: useCases.map((useCase) => ({
        "@type": "WebPage",
        name: useCase.title.replace(" | Automation Workbench", ""),
        url: pageUrl(useCase),
        description: useCase.description,
      })),
    },
    null,
    2,
  )
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");
}

function renderServiceJsonLd(page) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: page.title.replace(" | Automation Workbench", ""),
          serviceType: "Excel and CSV automation",
          url: servicePageUrl(page),
          description: page.description,
          provider: {
            "@type": "Organization",
            name: "Automation Workbench",
            url: baseUrl,
            email,
          },
          areaServed: {
            "@type": "Country",
            name: "KR",
          },
          offers: {
            "@type": "OfferCatalog",
            name: "엑셀/CSV 자동화 제작 패키지",
            itemListElement: [
              {
                "@type": "Offer",
                name: "Starter",
                price: "50000",
                priceCurrency: "KRW",
                description: "단일 파일 정리/변환",
              },
              {
                "@type": "Offer",
                name: "Standard",
                price: "150000",
                priceCurrency: "KRW",
                description: "두 파일 비교/병합/요약",
              },
              {
                "@type": "Offer",
                name: "Advanced",
                price: "300000",
                priceCurrency: "KRW",
                description: "여러 파일과 예외 규칙이 있는 반복 도구",
              },
            ],
          },
        },
        renderFaqJsonLdNode(),
      ],
    },
    null,
    2,
  )
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");
}

function renderWorkflowJsonLd(page) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          name: page.title.replace(" | Automation Workbench", ""),
          url: workflowPageUrl(page),
          description: page.description,
          isPartOf: {
            "@type": "WebSite",
            name: "Automation Workbench",
            url: baseUrl,
          },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Automation Workbench",
              item: baseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "업무별 자동화 예시",
              item: `${baseUrl}/workflows/`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: page.title.replace(" | Automation Workbench", ""),
              item: workflowPageUrl(page),
            },
          ],
        },
        renderFaqJsonLdNode(),
      ],
    },
    null,
    2,
  )
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");
}

function renderWorkflowIndexJsonLd() {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "업무별 엑셀/CSV 자동화 예시",
      url: `${baseUrl}/workflows/`,
      description: "쇼핑몰 주문 정리, 정산 파일 대조, 월간 매출 파일 병합처럼 실제 업무 상황별 자동화 범위를 확인할 수 있습니다.",
      hasPart: workflowPages.map((page) => ({
        "@type": "WebPage",
        name: page.title.replace(" | Automation Workbench", ""),
        url: workflowPageUrl(page),
        description: page.description,
      })),
    },
    null,
    2,
  )
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");
}

function renderShareJsonLd() {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          name: sharePage.title.replace(" | Automation Workbench", ""),
          url: sharePageUrl(),
          description: sharePage.description,
          isPartOf: {
            "@type": "WebSite",
            name: "Automation Workbench",
            url: baseUrl,
          },
        },
        renderFaqJsonLdNode(),
      ],
    },
    null,
    2,
  )
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");
}

function renderFaqJsonLdNode() {
  return {
    "@type": "FAQPage",
    mainEntity: commonFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
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

function renderListCard(title, items) {
  const renderedItems = items.map((item) => `            <li>${item}</li>`).join("\n");
  return `        <article class="panel card">
          <h2>${title}</h2>
          <ul>
${renderedItems}
          </ul>
        </article>`;
}

function renderFaqCard() {
  const items = commonFaqs.map((faq) => `            <li><strong>${faq.question}</strong><br />${faq.answer}</li>`).join("\n");
  return `        <article class="panel card">
          <h2>자주 묻는 질문</h2>
          <ul>
${items}
          </ul>
        </article>`;
}

function renderConversionCards() {
  return [
    renderListCard("문의 전 체크리스트", inquiryChecklist),
    renderListCard("가격이 달라지는 기준", pricingFactors),
    renderFaqCard(),
  ].join("\n");
}

function renderServiceTrackingScript() {
  return `    <script>
      (() => {
        const link = document.querySelector("[data-service-inquiry]");
        if (!link || !window.URLSearchParams) {
          return;
        }

        const inbound = new URLSearchParams(window.location.search);
        const details = [
          ["source", "유입 경로 상세"],
          ["workflow", "업무 예시 상세"],
          ["intent", "CTA 상세"],
          ["tool", "선택 도구 상세"],
        ].map(([key, label]) => {
          const value = (inbound.get(key) || "").replace(/[\\r\\n\\t]+/g, " ").trim().slice(0, 80);
          return value ? \`\${label}:\\n- \${value}\` : "";
        }).filter(Boolean);

        if (!details.length) {
          return;
        }

        const [base, query = ""] = link.href.split("?");
        const mailParams = new URLSearchParams(query);
        const currentBody = mailParams.get("body") || "";
        mailParams.set("body", \`\${currentBody}\\n\\n\${details.join("\\n")}\\n\`);
        link.href = \`\${base}?\${mailParams.toString()}\`;
      })();
    </script>`;
}

export function renderServicePage(page) {
  const canonicalUrl = servicePageUrl(page);
  const escapedTitle = htmlAttribute(page.title);
  const escapedDescription = htmlAttribute(page.description);

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapedDescription}" />
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
${renderServiceJsonLd(page)}
    </script>
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="stylesheet" href="${appPath}use-cases/use-case.css" />
    <title>${page.title}</title>
  </head>
  <body>
    <main class="page">
      <nav class="nav">
        <a href="${appPath}">Automation Workbench</a>
        <a href="${appPath}use-cases/">무료 도구 모음</a>
        <a href="https://github.com/yuniwon/automation-workbench">GitHub</a>
      </nav>

      <section class="hero">
        <div>
          <p class="eyebrow">${page.eyebrow}</p>
          <h1>${page.heading}</h1>
          <p class="lede">
            ${page.lede[0]}
            ${page.lede[1]}
          </p>
        </div>
        <aside class="panel cta-panel">
          <strong>${page.ctaTitle}</strong>
          <p>${page.ctaBody}</p>
          <a class="button" data-service-inquiry="true" href="${serviceMailtoHref(page)}">문의 메일 작성</a>
          <a class="button ghost" href="${appPath}use-cases/?source=${page.source}">무료 도구 먼저 보기</a>
          <p class="trust">
            샘플 파일을 보낼 때는 이름, 전화번호, 주소, 계좌번호 같은 민감정보를 먼저 가려주세요.
          </p>
        </aside>
      </section>

      <section class="grid">
${page.cards.map(renderCard).join("\n")}
${renderConversionCards()}
      </section>

      <p class="footer">문의: ${email}</p>
    </main>
${renderServiceTrackingScript()}
  </body>
</html>
`;
}

export function renderWorkflowPage(page) {
  const canonicalUrl = workflowPageUrl(page);
  const escapedTitle = htmlAttribute(page.title);
  const escapedDescription = htmlAttribute(page.description);

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapedDescription}" />
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
${renderWorkflowJsonLd(page)}
    </script>
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="stylesheet" href="${appPath}use-cases/use-case.css" />
    <title>${page.title}</title>
  </head>
  <body>
    <main class="page">
      <nav class="nav">
        <a href="${appPath}">Automation Workbench</a>
        <a href="${appPath}use-cases/">무료 도구 모음</a>
        <a href="${appPath}services/excel-automation-inquiry.html">제작 문의</a>
        <a href="https://github.com/yuniwon/automation-workbench">GitHub</a>
      </nav>

      <section class="hero">
        <div>
          <p class="eyebrow">${page.eyebrow}</p>
          <h1>${page.heading}</h1>
          <p class="lede">
            ${page.lede[0]}
            ${page.lede[1]}
          </p>
        </div>
        <aside class="panel cta-panel">
          <strong>업무 흐름 확인</strong>
          <p>무료 도구로 먼저 확인하고, 실제 파일 양식에 맞춘 제작 범위는 별도 페이지에서 확인할 수 있습니다.</p>
          <a class="button" href="${appPath}?${workflowTrackingQuery(page, "try-tool")}">무료 도구 열기</a>
          <a class="button ghost" href="${appPath}services/excel-automation-inquiry.html?${workflowTrackingQuery(page, "scope")}">제작 범위 보기</a>
          <a class="button ghost" data-tracking-query="${workflowTrackingQuery(page, "direct-inquiry")}" href="${workflowMailtoHref(page)}">맞춤 제작 문의</a>
          <p class="trust">
            샘플 파일을 보낼 때는 이름, 전화번호, 주소, 계좌번호 같은 민감정보를 먼저 가려주세요.
          </p>
        </aside>
      </section>

      <section class="grid">
${page.cards.map(renderCard).join("\n")}
${renderConversionCards()}
      </section>

      <p class="footer">문의: ${email}</p>
    </main>
  </body>
</html>
`;
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
          <a class="button" href="${appPath}?source=${useCase.source}&tool=${useCase.tool}">무료 도구 열기</a>
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

export function renderWorkflowIndex() {
  const title = "업무별 엑셀/CSV 자동화 예시 | Automation Workbench";
  const description = "쇼핑몰 주문 정리, 정산 파일 대조, 월간 매출 파일 병합처럼 실제 업무 상황별 자동화 범위를 확인할 수 있습니다.";
  const canonicalUrl = `${baseUrl}/workflows/`;
  const escapedTitle = htmlAttribute(title);
  const escapedDescription = htmlAttribute(description);
  const cards = workflowPages
    .map(
      (page) => `        <article class="panel card">
          <h2>${page.title.replace(" | Automation Workbench", "")}</h2>
          <p>${page.description}</p>
          <a class="text-link" href="${appPath}workflows/${page.slug}.html">${page.mailTask} 보기</a>
        </article>`,
    )
    .join("\n");

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapedDescription}" />
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
${renderWorkflowIndexJsonLd()}
    </script>
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="stylesheet" href="${appPath}use-cases/use-case.css" />
    <title>${title}</title>
  </head>
  <body>
    <main class="page">
      <nav class="nav">
        <a href="${appPath}">Automation Workbench</a>
        <a href="${appPath}use-cases/">무료 도구 모음</a>
        <a href="${appPath}services/excel-automation-inquiry.html">제작 문의</a>
        <a href="https://github.com/yuniwon/automation-workbench">GitHub</a>
      </nav>

      <section class="hero">
        <div>
          <p class="eyebrow">업무별 자동화 예시</p>
          <h1>업무별 엑셀/CSV 자동화 예시</h1>
          <p class="lede">
            무료 도구가 어떤 실제 업무로 확장될 수 있는지 확인하고,
            현재 파일 양식에 맞춘 자동화 제작 범위를 판단할 수 있습니다.
          </p>
        </div>
        <aside class="panel cta-panel">
          <strong>맞춤 제작 범위</strong>
          <p>반복 업무, 파일 형식, 결과물 예시를 준비하면 제작 범위와 견적을 더 빠르게 확인할 수 있습니다.</p>
          <a class="button" href="${appPath}services/excel-automation-inquiry.html?source=workflow-index">제작 범위 보기</a>
          <a class="button ghost" href="${appPath}use-cases/?source=workflow-index">무료 도구 먼저 보기</a>
        </aside>
      </section>

      <section class="grid">
${cards}
      </section>

      <p class="footer">문의: ${email}</p>
    </main>
  </body>
</html>
`;
}

export function renderUseCaseIndex() {
  const title = "무료 엑셀/CSV 도구 모음 | Automation Workbench";
  const description = "CSV/XLSX 파일 정리, 비교, 병합, 정산서 생성을 브라우저에서 실행할 수 있는 무료 업무 자동화 도구 모음입니다.";
  const canonicalUrl = `${baseUrl}/use-cases/`;
  const escapedTitle = htmlAttribute(title);
  const escapedDescription = htmlAttribute(description);
  const cards = useCases
    .map(
      (useCase) => `        <article class="panel card">
          <h2>${useCase.title.replace(" | Automation Workbench", "")}</h2>
          <p>${useCase.description}</p>
          <a class="text-link" href="${appPath}use-cases/${useCase.slug}.html">${useCase.mailTask} 열기</a>
        </article>`,
    )
    .join("\n");

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapedDescription}" />
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
${renderIndexJsonLd()}
    </script>
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="stylesheet" href="${appPath}use-cases/use-case.css" />
    <title>${title}</title>
  </head>
  <body>
    <main class="page">
      <nav class="nav">
        <a href="${appPath}">Automation Workbench</a>
        <a href="https://github.com/yuniwon/automation-workbench">GitHub</a>
      </nav>

      <section class="hero">
        <div>
          <p class="eyebrow">무료 업무 자동화 도구</p>
          <h1>무료 엑셀/CSV 도구 모음</h1>
          <p class="lede">
            반복해서 정리, 비교, 병합, 정산서 생성을 하는 CSV/XLSX 파일을 브라우저에서 먼저 확인하고
            실제 업무 파일에 맞춘 자동화 제작 범위를 판단할 수 있습니다.
          </p>
        </div>
        <aside class="panel cta-panel">
          <strong>도구 모음</strong>
          <p>계정 없이 바로 실행하고, 필요한 경우 현재 파일 구조에 맞춘 자동화 제작을 문의할 수 있습니다.</p>
          <a class="button" href="${appPath}?source=seo-use-cases-index">무료 도구 열기</a>
          <a class="button ghost" href="mailto:${email}?subject=${encodeURIComponent(mailSubject)}">맞춤 제작 문의</a>
          <p class="trust">
            파일은 브라우저 안에서 처리됩니다.
            <a href="https://github.com/yuniwon/automation-workbench/blob/main/PRIVACY.md">개인정보 안내</a>
          </p>
        </aside>
      </section>

      <section class="grid">
${cards}
      </section>

      <p class="footer">문의: ${email}</p>
    </main>
  </body>
</html>
`;
}

export function renderSharePage() {
  const title = sharePage.title;
  const description = sharePage.description;
  const canonicalUrl = sharePageUrl();
  const escapedTitle = htmlAttribute(title);
  const escapedDescription = htmlAttribute(description);
  const toolQuery = shareTrackingQuery("try-tool");
  const scopeQuery = shareTrackingQuery("scope");
  const workflowQuery = shareTrackingQuery("workflow-index");
  const useCaseQuery = shareTrackingQuery("use-case-index");

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapedDescription}" />
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
${renderShareJsonLd()}
    </script>
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="stylesheet" href="${appPath}use-cases/use-case.css" />
    <title>${title}</title>
  </head>
  <body>
    <main class="page">
      <nav class="nav">
        <a href="${appPath}">Automation Workbench</a>
        <a href="${appPath}use-cases/">무료 도구 모음</a>
        <a href="${appPath}services/excel-automation-inquiry.html?${scopeQuery}">제작 문의</a>
        <a href="https://github.com/yuniwon/automation-workbench">GitHub</a>
      </nav>

      <section class="hero">
        <div>
          <p class="eyebrow">공유용 소개 페이지</p>
          <h1>무료 엑셀/CSV 자동화 도구 공유용 소개</h1>
          <p class="lede">
            커뮤니티, 블로그, 지인에게 보낼 때 이 한 페이지로 무료 도구와 맞춤 제작 문의 흐름을 설명할 수 있습니다.
            정리·비교·병합·정산서 생성·양식 변환을 계정 없이 먼저 실행해볼 수 있습니다.
          </p>
        </div>
        <aside class="panel cta-panel">
          <strong>바로 공유할 링크</strong>
          <p>무료 도구를 먼저 써보고, 실제 파일 양식에 맞춘 자동화가 필요하면 제작 범위를 확인할 수 있습니다.</p>
          <a class="button" href="${appPath}?${toolQuery}">무료 도구 열기</a>
          <a class="button ghost" href="${appPath}services/excel-automation-inquiry.html?${scopeQuery}">제작 범위 보기</a>
          <a class="button ghost" href="${shareMailtoHref()}">맞춤 제작 문의</a>
          <p class="trust">
            파일은 브라우저 안에서 처리됩니다.
            <a href="https://github.com/yuniwon/automation-workbench/blob/main/PRIVACY.md">개인정보 안내</a>
          </p>
        </aside>
      </section>

      <section class="grid">
        <article class="panel card">
          <h2>커뮤니티 공유용 요약</h2>
          <p>
            게시글에 바로 붙일 수 있는 짧은 소개입니다. 무료 사용과 맞춤 제작 문의가 한 번에 보이도록 정리했습니다.
          </p>
          <p class="share-copy">
            무료 엑셀/CSV 자동화 도구를 만들었습니다. CSV/XLSX 파일을 브라우저에서 정리·비교·병합하고,
            고객별 정산서 생성과 고객사 양식 변환까지 테스트할 수 있습니다.
          </p>
        </article>
        <article class="panel card">
          <h2>무료로 확인할 수 있는 작업</h2>
          <ul>
            <li>중복 행, 빈 값, 숫자 형식 정리</li>
            <li>두 파일의 추가, 삭제, 변경 행 비교</li>
            <li>여러 CSV/XLSX 파일 병합</li>
            <li>고객별 정산서 요약 생성</li>
            <li>엑셀 열 매핑과 표준 양식 변환</li>
          </ul>
        </article>
        <article class="panel card">
          <h2>맞춤 제작으로 이어지는 경우</h2>
          <ul>
            <li>고객사마다 열 이름이 다른 파일을 표준 양식으로 바꾸는 경우</li>
            <li>정산 파일과 주문 파일을 매주 같은 기준으로 대조하는 경우</li>
            <li>여러 매장 파일을 병합하고 월간 리포트를 만드는 경우</li>
            <li>구글시트, Gmail, Notion까지 이어지는 반복 작업이 있는 경우</li>
          </ul>
        </article>
        <article class="panel card">
          <h2>공유 링크</h2>
          <ul>
            <li><a href="${appPath}?${toolQuery}">무료 도구 열기</a></li>
            <li><a href="${appPath}use-cases/?${useCaseQuery}">도구 모음 보기</a></li>
            <li><a href="${appPath}workflows/?${workflowQuery}">업무별 자동화 예시 보기</a></li>
            <li><a href="${appPath}services/excel-automation-inquiry.html?${scopeQuery}">제작 범위 확인</a></li>
          </ul>
        </article>
        <article class="panel card">
          <h2>문의 전에 있으면 좋은 정보</h2>
          <ul>
            <li>현재 파일 형식과 입력 파일 개수</li>
            <li>반복해서 하는 작업과 예외 규칙</li>
            <li>원하는 결과 파일 또는 화면 예시</li>
            <li>현재 수작업 소요시간과 희망 마감일</li>
          </ul>
        </article>
        <article class="panel card">
          <h2>문의</h2>
          <p>
            내 파일 구조에 맞춘 자동화가 필요하면 샘플 파일의 민감정보를 가린 뒤 문의할 수 있습니다.
          </p>
          <a class="text-link" href="${shareMailtoHref()}">dnjsdndus@gmail.com으로 문의</a>
        </article>
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
  await mkdir(join(root, "public", "share"), { recursive: true });
  await mkdir(join(root, "public", "services"), { recursive: true });
  await mkdir(join(root, "public", "workflows"), { recursive: true });
  await Promise.all(
    [
      ...useCases.map((useCase) =>
        writeFile(join(root, "public", "use-cases", `${useCase.slug}.html`), renderUseCasePage(useCase)),
      ),
      ...servicePages.map((page) =>
        writeFile(join(root, "public", "services", `${page.slug}.html`), renderServicePage(page)),
      ),
      ...workflowPages.map((page) =>
        writeFile(join(root, "public", "workflows", `${page.slug}.html`), renderWorkflowPage(page)),
      ),
      writeFile(join(root, "public", "share", `${sharePage.slug}.html`), renderSharePage()),
      writeFile(join(root, "public", "workflows", "index.html"), renderWorkflowIndex()),
      writeFile(join(root, "public", "use-cases", "index.html"), renderUseCaseIndex()),
      writeFile(join(root, "public", "sitemap.xml"), renderSitemap()),
    ],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await generateUseCasePages();
}
