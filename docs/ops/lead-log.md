# Lead Log

수익화 목표: 무료 엑셀/CSV 정리·비교 도구 사용자가 Gmail로 실제 맞춤 자동화 의뢰를 보내게 만든다.

## 2026-05-14 Gmail Scan

검색 범위:

```text
in:anywhere newer_than:30d (엑셀 OR CSV OR XLSX OR 자동화 OR 정리 OR 비교 OR automation-workbench OR 견적 OR 제작)
```

결과:

- 후보 2건 발견
- 실제 의뢰 0건
- 제외 사유:
  - YouTube Premium 알림
  - 인프런 교육 프로모션

판단:

- Gmail 문의 수신 루프는 동작한다.
- 현재는 유입 자체가 부족하다.
- 다음 병목은 도구 기능이 아니라 무료 노출 경로 확보다.

다음 액션:

1. 무료 도구 소개글을 게시 가능한 짧은 버전으로 분리한다.
2. GitHub repo와 Pages 링크를 공유 가능한 형태로 정리한다.
3. Gmail 검색을 주기적으로 반복하고 실제 문의가 오면 `gmail-intake-playbook.md` 기준으로 분류한다.

## 2026-05-14 Gmail Scan After Source Tracking

검색 범위:

```text
in:anywhere newer_than:7d ("엑셀/CSV 자동화" OR "맞춤 제작 문의" OR "무료 엑셀" OR "CSV/XLSX" OR "샘플 파일" OR "반복 작업" OR "automation-workbench")
```

결과:

- 후보 0건
- 실제 의뢰 0건

판단:

- 문의 메일 템플릿과 채널별 추적 링크는 준비됐다.
- 아직 외부 채널 게시가 되지 않아 실제 유입이 없다.

다음 액션:

1. `docs/marketing/free-distribution-plan.md` 기준으로 GeekNews 또는 OKKY에 게시한다.
2. 게시 URL을 이 로그의 Exposure 형식으로 기록한다.
3. 게시 후 24시간 뒤 같은 검색어로 Gmail을 다시 확인한다.

## 2026-05-14 Posting Access Check

확인 범위:

- GeekNews Show GN
- OKKY 커뮤니티

결과:

- GeekNews: 비로그인 상태에서 `글등록` 접근 시 로그인 페이지로 이동
- OKKY: 비로그인 상태 확인, 자동 브라우저에서 커뮤니티 작성 화면 렌더링 확인 실패
- 실제 게시 0건
- Gmail 실제 문의 0건

판단:

- GeekNews는 사용자 로그인과 글 등록 가능 상태 확인이 필요하다.
- OKKY는 사용자 브라우저에서 로그인 후 직접 확인하는 편이 안전하다.
- 현재 수익화 병목은 도구 완성도가 아니라 외부 채널 로그인/게시 승인이다.

다음 액션:

1. 사용자가 GeekNews 또는 OKKY에 로그인한다.
2. 게시 전 원고는 `docs/marketing/posts/`에서 복사한다.
3. 게시 버튼 클릭 전 최종 문구와 링크를 확인한다.

## 2026-05-14 Gmail Scan After Privacy Update

검색 범위:

```text
to:dnjsdndus@gmail.com newer_than:7d -from:dnjsdndus@gmail.com ("엑셀/CSV 자동화" OR "맞춤 제작 문의" OR "Automation Workbench" OR "automation-workbench" OR "무료 엑셀" OR "CSV/XLSX" OR "반복 작업" OR "샘플 파일")
```

추가 검색:

```text
to:dnjsdndus@gmail.com newer_than:30d -from:dnjsdndus@gmail.com subject:"엑셀/CSV 자동화 맞춤 제작 문의"
```

결과:

- 후보 0건
- 실제 문의 0건

판단:

- 문의 수신 루프는 여전히 빈 상태다.
- 외부 게시 전에는 자연 유입이 거의 없다고 보는 것이 맞다.
- 개인정보 안내와 브라우저 내 처리 문구는 전환 신뢰 보강 작업이며, 유입 자체를 대체하지 못한다.

다음 액션:

1. GeekNews 또는 OKKY 로그인 세션에서 게시를 실행한다.
2. 게시 URL을 Exposure 형식으로 기록한다.
3. 게시 후 24시간 뒤 같은 검색어로 Gmail을 다시 확인한다.

## 2026-05-14 SEO Exposure Assets

생성한 공개 페이지:

- `https://yuniwon.github.io/automation-workbench/use-cases/excel-duplicate-cleanup.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/csv-xlsx-file-compare.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/order-settlement-automation.html`

검색엔진 제출:

- 방식: IndexNow
- 제출 URL 수: 4
- 응답 상태: HTTP 202

판단:

- 로그인 없이 가능한 무료 노출 자산은 추가됐다.
- HTTP 202는 제출 접수 또는 키 검증 대기이며, 색인 완료나 유입 발생을 보장하지 않는다.
- 실제 Gmail 문의는 아직 0건이다.

다음 액션:

1. 외부 커뮤니티 게시를 실행해 초기 트래픽을 만든다.
2. 24시간 뒤 Gmail 검색을 반복한다.
3. 유입이 있으면 `source=seo-*` 또는 게시 채널 기준으로 구분한다.

## 2026-05-14 Lead Tracker Created

Google Sheets:

```text
https://docs.google.com/spreadsheets/d/1E6vhznY3NRIhTnOX9as7Q2XRJoENRJcFIVtkCxdvUbg/edit
```

초기 기록:

- Gmail scan: 후보 0건, 실제 문의 0건
- SEO use case page 3개
- IndexNow 제출: URL 4개, HTTP 202

판단:

- 운영 상태를 문서와 Google Sheets 양쪽에서 추적할 수 있게 됐다.
- 실제 Gmail 문의는 아직 0건이다.

## 2026-05-14 Gmail Scan After Generated Landing Pages

검색 범위:

```text
to:dnjsdndus@gmail.com newer_than:7d -from:dnjsdndus@gmail.com ("엑셀/CSV 자동화" OR "맞춤 제작 문의" OR "Automation Workbench" OR "automation-workbench" OR "무료 엑셀" OR "CSV/XLSX" OR "반복 작업" OR "샘플 파일")
```

추가 검색:

```text
to:dnjsdndus@gmail.com newer_than:30d -from:dnjsdndus@gmail.com subject:"엑셀/CSV 자동화 맞춤 제작 문의"
```

결과:

- 후보 0건
- 실제 문의 0건
- Google Sheets 기록: `시트1!A7:L7`

판단:

- 공개 랜딩 페이지의 문의 링크는 정상 동작하지만 아직 실제 유입은 없다.
- 다음 병목은 외부 무료 채널 게시 또는 검색용 페이지 확장이다.

다음 액션:

1. GeekNews 또는 OKKY에 수동 게시한다.
2. 게시 전 계정 제한이 있으면 검색 유입용 페이지를 추가로 만든다.
3. 게시 또는 색인 후 24시간 뒤 Gmail을 다시 확인한다.

## 2026-05-14 SEO Exposure Assets Expanded

추가한 공개 페이지:

- `https://yuniwon.github.io/automation-workbench/use-cases/excel-blank-cell-checker.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/excel-number-format-cleanup.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/excel-file-compare.html`

검증:

- GitHub Pages 배포 성공
- 공개 URL 6개 모두 HTTP 200 확인
- sitemap에 공개 URL 7개 포함 확인
- 각 페이지의 `mailto:` CTA에 `source=seo-*`와 문의 본문 포함 확인

검색엔진 제출:

- 방식: IndexNow
- 제출 URL 수: 7
- 응답 상태: HTTP 200

판단:

- 로그인 없이 가능한 검색 유입 자산은 3개에서 6개로 늘었다.
- 실제 Gmail 문의는 아직 0건이다.
- 단기 유입은 여전히 외부 커뮤니티 게시가 가장 빠르다.

다음 액션:

1. GeekNews 또는 OKKY 게시를 실행한다.
2. 게시가 지연되면 검색용 페이지를 주기적으로 추가하되, 실제 도구 기능과 맞는 주제만 사용한다.
3. 24시간 뒤 Gmail과 Google Sheets 리드 트래커를 다시 확인한다.

## 2026-05-14 GitHub Exposure Update

작업:

- README에 "바로 써보기" 링크 표 추가
- README 상단에 맞춤 자동화 문의 mailto 링크 추가
- GitHub repository topic 5개 추가
  - `browser-based`
  - `csv-diff`
  - `data-quality`
  - `excel-automation`
  - `xlsx-cleaner`
- GitHub Release `v0.1.2` 공개

공개 릴리스:

```text
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.2
```

검증:

- `pnpm test`: 15 files, 32 tests passed
- `pnpm build`: 성공
- GitHub Pages 배포 성공
- GitHub Release `v0.1.2`: latest 확인

판단:

- GitHub 방문자가 README에서 바로 무료 도구와 문의 링크를 찾을 수 있게 됐다.
- 실제 Gmail 문의는 아직 0건이다.

다음 액션:

1. GeekNews 또는 OKKY 게시를 실행한다.
2. 게시가 지연되면 추가 무료 도구 후보 중 실제 구현 가능한 기능부터 만든다.
3. 24시간 뒤 Gmail 검색을 반복한다.

## 2026-05-14 File Merge Tool Released

작업:

- 새 무료 도구 추가: 엑셀/CSV 파일 병합
- 여러 파일 선택 후 세로 병합
- 원본 파일명 열 유지
- 파일마다 다른 열은 전체 열 합집합으로 맞춤
- 병합 결과 CSV 다운로드
- 검색용 랜딩 페이지 추가

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/use-cases/excel-csv-file-merge.html
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.3
```

검증:

- `pnpm test`: 16 files, 35 tests passed
- `pnpm build`: 성공
- 로컬 병합 탭 Playwright 확인
- GitHub Pages 배포 성공
- 공개 병합 앱/랜딩 페이지/sitemap 확인
- IndexNow 제출: URL 8개, HTTP 200
- GitHub Release `v0.1.3`: latest 확인

판단:

- 무료 도구는 정리, 비교, 병합 3종으로 확장됐다.
- 실제 Gmail 문의는 아직 0건이다.
- 다음 병목은 외부 커뮤니티 게시와 24시간 후 문의 확인이다.

다음 액션:

1. GeekNews 또는 OKKY 게시를 실행한다.
2. 게시 URL을 Exposure 형식으로 기록한다.
3. 게시 후 Gmail과 Google Sheets 리드 트래커를 다시 확인한다.

## 2026-05-14 Gmail Scan After File Merge Release

검색 범위:

```text
to:dnjsdndus@gmail.com newer_than:7d -from:dnjsdndus@gmail.com ("엑셀/CSV 자동화" OR "맞춤 제작 문의" OR "Automation Workbench" OR "automation-workbench" OR "무료 엑셀" OR "CSV/XLSX" OR "반복 작업" OR "샘플 파일" OR "병합")
```

추가 검색:

```text
to:dnjsdndus@gmail.com newer_than:30d -from:dnjsdndus@gmail.com subject:"엑셀/CSV 자동화 맞춤 제작 문의"
```

결과:

- 후보 0건
- 실제 문의 0건

판단:

- 정리, 비교, 병합 기능과 공개 유입 자산은 준비됐지만 아직 실제 이메일 문의는 없다.
- 다음 액션은 기능 추가보다 외부 게시 실행이다.

다음 액션:

1. GeekNews 또는 OKKY 로그인 세션에서 게시한다.
2. 게시 후 URL을 기록한다.
3. 24시간 뒤 Gmail 검색을 반복한다.

## 2026-05-14 Landing Metadata Update

작업:

- use case 페이지 7개에 OpenGraph 메타데이터 추가
- use case 페이지 7개에 Twitter Card 메타데이터 추가
- use case 페이지 7개에 `SoftwareApplication` JSON-LD 구조화 데이터 추가
- 공유 이미지 `og-image.png` 연결
- GitHub Release `v0.1.4` 공개

공개 릴리스:

```text
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.4
```

검증:

- `pnpm test`: 16 files, 35 tests passed
- `pnpm build`: 성공
- GitHub Pages 배포 성공
- 공개 use case 페이지 7개에서 OG/Twitter/JSON-LD 확인
- IndexNow 제출: URL 8개, HTTP 200
- GitHub Release `v0.1.4`: latest 확인

판단:

- 외부 게시 전 링크 미리보기와 검색엔진 이해도를 보강했다.
- 실제 Gmail 문의는 아직 0건이다.

다음 액션:

1. GeekNews 또는 OKKY에 준비된 원고를 게시한다.
2. 게시 URL을 기록한다.
3. 게시 후 24시간 뒤 Gmail 검색을 반복한다.

## 2026-05-14 Use Case Hub Released

작업:

- 무료 엑셀/CSV 도구 전체를 모아 보여주는 use case 허브 페이지 추가
- 허브 페이지에 전체 공개 도구 7개 링크 연결
- 허브 페이지에 OpenGraph, Twitter Card, `CollectionPage` JSON-LD 추가
- sitemap에 `https://yuniwon.github.io/automation-workbench/use-cases/` 등록
- GitHub Release `v0.1.5` 공개
- Google Sheets 리드 트래커 `시트1!A20:L21`에 기록 추가

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/use-cases/
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.5
```

검증:

- `pnpm test`: 16 files, 37 tests passed
- `pnpm build`: 성공
- GitHub Pages 배포 성공
- 공개 use case 허브 페이지 HTTP 200 확인
- 허브 페이지의 OG/Twitter/JSON-LD, 개별 도구 링크, `mailto:` CTA 확인
- sitemap에 `/use-cases/` 포함 확인
- IndexNow 제출: URL 9개, HTTP 200
- GitHub Release `v0.1.5`: latest 확인

판단:

- 외부 게시글에서 개별 도구 링크 대신 대표 도구 모음 링크 하나를 사용할 수 있게 됐다.
- 검색 유입용 페이지 구조는 root, hub, 개별 use case 페이지로 정리됐다.
- 실제 Gmail 문의는 아직 0건이다.

다음 액션:

1. GeekNews 또는 OKKY에 준비된 원고를 게시한다.
2. 게시 URL을 기록한다.
3. 게시 후 24시간 뒤 Gmail 검색을 반복한다.

## 2026-05-14 Settlement Report Tool Released

작업:

- 새 무료 도구 추가: 견적서/정산서 자동 생성
- 주문 CSV/XLSX에서 그룹 기준 열, 품목 열, 금액 열 선택
- 고객별/거래처별 행 수, 총 금액, 품목 요약 생성
- 정산 결과 CSV 다운로드
- 정산 결과 HTML 다운로드
- `tool=report` 쿼리 파라미터로 정산서 도구 직접 열기 지원
- 검색용 랜딩 페이지 추가
- GitHub Release `v0.1.6` 공개
- Google Sheets 리드 트래커 `시트1!A22:L26`에 기록 추가

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/?tool=report
https://yuniwon.github.io/automation-workbench/use-cases/estimate-settlement-generator.html
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.6
```

검증:

- `pnpm test`: 19 files, 42 tests passed
- `pnpm build`: 성공
- 로컬 Playwright: `?tool=report` 정산서 탭 직접 진입 확인
- 로컬 모바일 Playwright: 390px viewport 가로 overflow 없음
- GitHub Pages 배포 성공
- 공개 정산서 앱 직접 링크 Playwright 확인
- 공개 정산서 랜딩 페이지 HTTP 200 확인
- 공개 랜딩 페이지의 CTA, OG metadata, JSON-LD, sitemap 포함 확인
- IndexNow 제출: URL 10개, HTTP 200
- GitHub Release `v0.1.6`: latest 확인
- Gmail 검색: 후보 0건, 실제 문의 0건

판단:

- 무료 도구는 정리, 비교, 병합, 문서/정산서 생성 4종으로 확장됐다.
- 유료 전환 문장은 "우리 양식으로 정산서/견적서를 만들어주세요"로 더 명확해졌다.
- 실제 Gmail 문의는 아직 0건이다.

다음 액션:

1. GeekNews 또는 OKKY에 준비된 원고를 게시한다.
2. 게시 URL을 기록한다.
3. 게시 후 24시간 뒤 Gmail 검색을 반복한다.

## 2026-05-14 Inquiry Tracking Updated

작업:

- 문의 메일 본문에 유입 경로 `source`와 선택 도구 `tool`을 함께 기록
- 문의 메일 본문에 추적 파라미터가 포함된 도구 링크 추가
- GeekNews, OKKY, Hacker News, Product Hunt 게시 원고를 정산서 생성 도구 포함 상태로 갱신
- 게시 후 Gmail 검색식에 `견적서`, `정산서` 키워드 추가
- GitHub Release `v0.1.7` 공개
- Google Sheets 리드 트래커 `시트1!A27:L30`에 기록 추가

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/?source=geeknews&tool=report
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.7
```

검증:

- `pnpm test`: 19 files, 43 tests passed
- `pnpm build`: 성공
- 로컬 Playwright: mailto 본문에 `source=geeknews`, `tool=report`, tracked URL 포함 확인
- GitHub Pages 배포 성공
- 공개 Playwright: mailto 본문에 `source=geeknews`, `tool=report`, tracked URL 포함 확인
- IndexNow 제출: URL 10개, HTTP 200
- GitHub Release `v0.1.7`: latest 확인
- Gmail 검색: 후보 0건, 실제 문의 0건

판단:

- 게시 후 실제 문의가 들어오면 채널과 관심 도구를 더 정확히 분류할 수 있게 됐다.
- 외부 게시 원고는 현재 공개 기능과 일치한다.
- 실제 Gmail 문의는 아직 0건이다.

다음 액션:

1. GeekNews 또는 OKKY에 준비된 원고를 게시한다.
2. 게시 URL을 기록한다.
3. 게시 후 24시간 뒤 Gmail 검색을 반복한다.

## 2026-05-14 Custom Automation Inquiry Page Released

작업:

- 새 서비스 페이지 추가: 맞춤 엑셀/CSV 자동화 제작 문의
- 제작 범위를 `5만 원부터`, `15만 원부터`, `30만 원부터` 단계로 안내
- 문의 메일 본문에 파일 형식, 입력 파일 개수, 반복 작업, 수작업 소요시간, 필요한 결과물 질문 포함
- README, share-kit, revenue-process 문서에 제작 문의 페이지 링크 추가
- GitHub Release `v0.1.8` 공개
- Google Sheets 리드 트래커 `시트1!A31:L34`에 기록 추가

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/services/excel-automation-inquiry.html
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.8
```

검증:

- `pnpm test`: 20 files, 46 tests passed
- `pnpm build`: 성공
- `git diff --check`: trailing whitespace 없음
- 로컬 공개 경로: 서비스 페이지와 sitemap HTTP 200 확인
- 빌드 산출물: 서비스 페이지, mailto CTA, `OfferCatalog` JSON-LD, sitemap 포함 확인
- GitHub Pages 배포 성공
- 공개 서비스 페이지 HTTP 200 확인
- 공개 서비스 페이지의 가격, mailto CTA, `OfferCatalog` JSON-LD 확인
- 공개 sitemap에 서비스 페이지 포함 확인
- IndexNow 제출: URL 11개, HTTP 200
- GitHub Release `v0.1.8`: latest 확인
- Gmail 검색: 후보 0건, 실제 문의 0건

판단:

- 무료 도구를 써본 사용자가 바로 제작 범위와 준비 정보를 확인할 수 있는 전환 페이지가 생겼다.
- 문의 메일 템플릿이 견적 산정에 필요한 질문을 포함한다.
- 실제 Gmail 문의는 아직 0건이다.

다음 액션:

1. 외부 게시 원고에 제작 문의 페이지 링크를 함께 넣는다.
2. GeekNews 또는 OKKY에 준비된 원고를 게시한다.
3. 게시 후 24시간 뒤 Gmail과 Google Sheets 리드 트래커를 다시 확인한다.

## 2026-05-14 App Inquiry CTA Updated

작업:

- 메인 앱 하단 문의 패널에 `제작 범위 보기` 링크 추가
- 제작 문의 페이지 URL을 `contact.ts` 설정으로 분리
- 외부 게시 원고 4종에 제작 문의 페이지 링크 추가
- GitHub Release `v0.1.9` 공개
- Google Sheets 리드 트래커 `시트1!A35:L36`에 기록 추가

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/
https://yuniwon.github.io/automation-workbench/services/excel-automation-inquiry.html
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.9
```

검증:

- `pnpm test`: 20 files, 47 tests passed
- `pnpm build`: 성공
- `git diff --check`: trailing whitespace 없음
- GitHub Pages 배포 성공
- 공개 앱 번들에 `제작 범위 보기`와 서비스 페이지 URL 포함 확인
- GitHub Release `v0.1.9`: latest 확인
- IndexNow 제출: URL 11개, HTTP 200
- Gmail 검색: 후보 0건, 실제 문의 0건

판단:

- 제작 문의 페이지가 실제 앱 사용 흐름에 들어갔다.
- 게시 원고에서도 무료 도구 링크와 제작 문의 링크를 함께 제공할 수 있다.
- 실제 Gmail 문의는 아직 0건이다.

다음 액션:

1. 사용자 로그인 세션이 필요한 GeekNews 또는 OKKY 게시를 실행한다.
2. 로그인 없이 가능한 개선으로는 검색 유입용 실제 업무 템플릿 페이지를 추가한다.
3. 다음 Gmail 점검 때 `v0.1.9` 이후 유입 여부를 확인한다.

## 2026-05-14 Workflow Landing Pages Released

작업:

- 업무별 자동화 예시 허브 추가: `/workflows/`
- 쇼핑몰 주문 엑셀 정리 자동화 페이지 추가
- 정산 파일 대조 자동화 페이지 추가
- 월간 매출 파일 병합 리포트 자동화 페이지 추가
- workflow 페이지를 sitemap과 IndexNow 제출 대상에 포함
- README, share-kit, revenue-process 문서에 workflow 링크 추가
- GitHub Release `v0.1.10` 공개
- Google Sheets 리드 트래커 `시트1!A37:L40`에 기록 추가

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/workflows/
https://yuniwon.github.io/automation-workbench/workflows/shopping-mall-order-cleanup.html
https://yuniwon.github.io/automation-workbench/workflows/settlement-file-reconciliation.html
https://yuniwon.github.io/automation-workbench/workflows/monthly-report-file-merge.html
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.10
```

검증:

- TDD RED: workflow 페이지 파일과 `workflowPages` export가 없어서 테스트 실패 확인
- `pnpm test`: 21 files, 50 tests passed
- `pnpm build`: 성공
- `git diff --check`: trailing whitespace 없음
- 빌드 산출물에 workflow index/page/sitemap 포함 확인
- GitHub Pages 배포 성공
- 공개 workflow 허브와 개별 페이지 3개 HTTP 200 확인
- 공개 개별 페이지의 서비스 CTA와 `BreadcrumbList` JSON-LD 확인
- 공개 sitemap에 workflow URL 포함 확인
- GitHub Release `v0.1.10`: latest 확인
- IndexNow 제출: URL 15개, HTTP 200
- Gmail 검색: 후보 0건, 실제 문의 0건

판단:

- 로그인 없이 가능한 검색 유입 자산이 root, use-cases, service, workflows 구조로 확장됐다.
- 무료 도구 기능을 실제 업무 언어로 설명하는 전환 페이지가 생겼다.
- 실제 Gmail 문의는 아직 0건이다.

다음 액션:

1. workflow 페이지를 외부 게시 원고에 포함한다.
2. 사용자 로그인 세션에서 GeekNews 또는 OKKY 게시를 실행한다.
3. 게시 후 24시간 뒤 Gmail과 Google Sheets 리드 트래커를 다시 확인한다.

## 2026-05-14 FAQ And Inquiry Checklist Added

작업:

- 제작 문의 페이지에 `문의 전 체크리스트` 카드 추가
- 제작 문의 페이지에 `가격이 달라지는 기준` 카드 추가
- workflow 개별 페이지 3개에 같은 체크리스트와 가격 기준 추가
- 서비스 페이지와 workflow 개별 페이지에 `FAQPage` JSON-LD 추가
- 샘플 파일, 개인정보, 가격 산정 관련 FAQ를 정적 페이지에 표시
- GitHub Release `v0.1.11` 공개
- Google Sheets 리드 트래커 `시트1!A41:L44`에 기록 추가

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/services/excel-automation-inquiry.html
https://yuniwon.github.io/automation-workbench/workflows/shopping-mall-order-cleanup.html
https://yuniwon.github.io/automation-workbench/workflows/settlement-file-reconciliation.html
https://yuniwon.github.io/automation-workbench/workflows/monthly-report-file-merge.html
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.11
```

검증:

- TDD RED: 체크리스트, 가격 기준, `FAQPage`가 없어서 테스트 실패 확인
- `pnpm test`: 21 files, 50 tests passed
- `pnpm build`: 성공
- `git diff --check`: trailing whitespace 없음
- GitHub Pages 배포 성공
- 공개 서비스 페이지와 workflow 개별 페이지 3개 HTTP 200 확인
- 공개 페이지에서 `문의 전 체크리스트`, `가격이 달라지는 기준`, `FAQPage`, `샘플 파일 없이 문의할 수 있나요?` 확인
- GitHub Release `v0.1.11`: latest 확인
- IndexNow 제출: URL 15개, HTTP 200
- Gmail 검색: 후보 0건, 실제 문의 0건

판단:

- 문의 전에 사용자가 준비할 정보와 가격이 달라지는 이유가 더 명확해졌다.
- 검색엔진이 FAQ 구조화 데이터를 읽을 수 있는 형태가 됐다.
- 실제 Gmail 문의는 아직 0건이다.

다음 액션:

1. 외부 게시 실행이 가능하면 GeekNews 또는 OKKY에 게시한다.
2. 코드 쪽 다음 개선은 `/workflows/` 허브에서 개별 workflow CTA 클릭 추적을 더 세분화하는 것이다.
3. 게시 또는 색인 후 Gmail과 Google Sheets 리드 트래커를 다시 확인한다.

## 2026-05-14 Workflow CTA Intent Tracking Added

작업:

- workflow 개별 페이지 CTA에 `workflow`와 `intent` 추적 파라미터 추가
- `무료 도구 열기`, `제작 범위 보기`, `맞춤 제작 문의` CTA 의도 구분
- workflow 직접 문의 메일 본문에 업무 예시 상세와 CTA 상세 추가
- 제작 문의 페이지가 URL 파라미터를 읽어 문의 메일 본문에 유입 경로 상세를 추가
- GitHub Release `v0.1.12` 공개

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/workflows/shopping-mall-order-cleanup.html
https://yuniwon.github.io/automation-workbench/services/excel-automation-inquiry.html?source=workflow-shopping-mall-order-cleanup&tool=cleanup&workflow=shopping-mall-order-cleanup&intent=scope
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.12
```

검증:

- TDD RED: workflow/service 페이지 추적 문자열이 없어 테스트 실패 확인
- `pnpm generate:use-cases`: 성공
- `pnpm test tests/core/servicePages.test.ts tests/core/workflowPages.test.ts tests/core/useCasePageGenerator.test.ts`: 3 files, 10 tests passed
- `pnpm test`: 21 files, 50 tests passed
- `pnpm build`: 성공
- `git diff --check`: trailing whitespace 오류 없음
- GitHub Pages 배포 성공: run `25840968915`
- 공개 workflow 페이지에서 `workflow=shopping-mall-order-cleanup`, `intent=try-tool`, `intent=scope`, `intent=direct-inquiry` 확인
- 공개 서비스 페이지에서 `data-service-inquiry="true"`, `유입 경로 상세`, `업무 예시 상세`, `CTA 상세` 확인
- GitHub Release `v0.1.12`: latest 확인
- IndexNow 제출: URL 15개, HTTP 200
- Gmail 검색: 후보 0건, 실제 문의 0건

Google Sheets:

- 읽기 확인: `Automation Workbench Lead Tracker`, `시트1`, `sheetId=0`
- 쓰기 시도: `appendCells`로 4행 추가 시도
- 결과: `FORBIDDEN`
- 해석: 현재 Google Drive 커넥터는 읽기 권한은 있으나 Sheets `batchUpdate` 쓰기 권한이 막혀 있다. 재인증 후 `conversion_tracking`, `indexnow_submission`, `github_release`, `gmail_scan` 4행을 추가해야 한다.

판단:

- Gmail 문의가 들어왔을 때 어떤 업무 예시와 CTA 의도에서 전환됐는지 추적할 준비가 됐다.
- 실제 Gmail 문의는 아직 0건이다.
- 원격 Google Sheets 동기화는 쓰기 권한 재인증이 필요하다.

다음 액션:

1. Google Drive/Sheets 커넥터를 쓰기 권한으로 재인증한다.
2. 리드 트래커에 `v0.1.12` 관련 4행을 추가한다.
3. 외부 무료 채널 게시 후 Gmail 검색을 반복한다.

## 2026-05-14 External Posting Gate Checked

작업:

- GeekNews `https://news.hada.io/` 접속 확인
- 헤더의 `글등록` 링크 확인
- `글등록` 클릭 시 `https://news.hada.io/login?code=101&return=/write`로 이동하는 것 확인
- 로그인, 계정 생성, 게시, 제출은 수행하지 않음
- 게시 원고의 제작 문의 링크와 업무 예시 링크에 채널별 추적 파라미터 추가

검증:

- TDD RED: `tests/core/marketingPosts.test.ts`에서 service/workflow 채널 추적 링크 누락으로 실패 확인
- `pnpm test tests/core/marketingPosts.test.ts`: 1 file, 1 test passed
- `pnpm test`: 22 files, 51 tests passed
- `git diff --check`: trailing whitespace 오류 없음
- GitHub Pages 배포 성공: run `25841214751`

판단:

- GeekNews 게시는 로그인 이후에만 가능하다.
- 게시 원고는 공개 전 복사 가능한 상태이고, 링크별 유입 추적은 보강됐다.
- 실제 Gmail 문의는 아직 0건이다.

다음 액션:

1. 사용자가 GeekNews 로그인을 완료하면 `docs/marketing/posts/geeknews-show-gn.md` 원고를 붙여넣는다.
2. 게시 전 제목, 본문 링크, 첫 댓글을 최종 확인한다.
3. 게시 URL을 기록하고 Gmail 검색을 반복한다.

## 2026-05-14 Excel Automation Service Page Added

작업:

- 검색 방문자용 `엑셀 자동화 제작 서비스` 페이지 추가
- `엑셀 자동화 외주`, `무료 진단`, `견적 기준` 문구를 서비스 페이지에 반영
- 새 페이지를 sitemap과 IndexNow 제출 대상에 포함
- README, share-kit, revenue-process에 서비스 진입점 추가
- GitHub Release `v0.1.13` 공개

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/services/excel-automation-service.html
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.13
```

검증:

- TDD RED: `public/services/excel-automation-service.html`과 sitemap 항목이 없어 테스트 실패 확인
- `pnpm generate:use-cases`: 성공
- `pnpm test tests/core/servicePages.test.ts`: 1 file, 3 tests passed
- `pnpm test tests/core/servicePages.test.ts tests/core/useCasePageGenerator.test.ts tests/core/indexNow.test.ts`: 3 files, 10 tests passed
- `pnpm test`: 22 files, 52 tests passed
- `pnpm build`: 성공
- `git diff --check`: trailing whitespace 오류 없음
- GitHub Pages 배포 성공: run `25841425842`
- 공개 페이지에서 `엑셀 자동화 제작 서비스`, `엑셀 자동화 외주`, `무료 진단`, `견적 기준`, `source=service-excel-automation-service`, `data-service-inquiry="true"` 확인
- 공개 sitemap에서 `/automation-workbench/services/excel-automation-service.html` 확인
- GitHub Release `v0.1.13`: 생성 완료
- IndexNow 제출: URL 16개, HTTP 200
- Gmail 검색: 후보 0건, 실제 문의 0건

Google Sheets:

- `googlesheets` 연결은 활성 상태로 확인됨
- append 도구는 중복 위험 때문에 명시 확인 후 쓰기 권장
- 이번 릴리스 행은 아직 원격 시트에 추가하지 않음

판단:

- 검색 유입용 제작 서비스 진입점이 하나 늘었다.
- 실제 Gmail 문의는 아직 0건이다.
- 다음 원격 시트 기록은 사용자 확인 후 `GOOGLESHEETS_SPREADSHEETS_VALUES_APPEND`로 처리한다.

다음 액션:

1. Google Sheets에 `v0.1.13` 관련 release/indexnow/gmail_scan 행을 추가할지 확인한다.
2. GeekNews 로그인 후 게시 원고를 실제 게시한다.
3. 게시 후 Gmail 검색을 반복한다.

## 2026-05-14 Excel Automation Cost Page Added

작업:

- `엑셀 자동화 견적과 비용 기준` 페이지 추가
- `엑셀 자동화 견적`, `엑셀 자동화 비용`, `견적 요청 템플릿` 문구를 서비스 페이지에 반영
- 단일 파일, 비교·병합, 반복 도구 제작의 시작 금액 기준 노출
- 새 페이지를 sitemap과 IndexNow 제출 대상에 포함
- README, share-kit, revenue-process에 견적 페이지 진입점 추가
- GitHub Release `v0.1.14` 공개

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/services/excel-automation-cost.html
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.14
```

검증:

- 디자인 기준: `Linear` reference
- TDD RED: `public/services/excel-automation-cost.html`과 sitemap 항목이 없어 테스트 실패 확인
- `pnpm generate:use-cases`: 성공
- `pnpm test tests/core/servicePages.test.ts tests/core/useCasePageGenerator.test.ts tests/core/indexNow.test.ts`: 3 files, 11 tests passed
- `pnpm test`: 22 files, 53 tests passed
- `pnpm build`: 성공
- `git diff --check`: trailing whitespace 오류 없음
- GitHub Pages 배포 성공: run `25841602839`
- 공개 페이지에서 `엑셀 자동화 견적`, `엑셀 자동화 비용`, `견적 요청 템플릿`, `5만 원부터`, `15만 원부터`, `30만 원부터`, `source=service-excel-automation-cost`, `data-service-inquiry="true"` 확인
- 공개 sitemap에서 `/automation-workbench/services/excel-automation-cost.html` 확인
- GitHub Release `v0.1.14`: 생성 완료
- IndexNow 제출: URL 17개, HTTP 200
- Gmail 검색: 후보 0건, 실제 문의 0건

판단:

- 비용을 먼저 확인하는 검색 유입을 받을 수 있는 페이지가 생겼다.
- 실제 Gmail 문의는 아직 0건이다.

다음 액션:

1. Google Sheets에 `v0.1.13`과 `v0.1.14` 미반영 행을 추가할지 확인한다.
2. GeekNews 로그인 후 게시 원고를 실제 게시한다.
3. 게시 후 Gmail 검색을 반복한다.

## 2026-05-14 Gmail Monitor Query Config Added

작업:

- Gmail 리드 검색어 생성 스크립트 추가
- `pnpm monitor:gmail:query` 명령 추가
- 7일/30일 Gmail 검색어와 운영 로그 템플릿을 같은 코드에서 출력하도록 정리
- `gmail-monitor-runbook.md`와 `gmail-intake-playbook.md`의 검색 기준을 새 스크립트 기준으로 갱신

커밋:

```text
70471b6 Add Gmail monitor query config
```

검증:

- TDD RED: `scripts/gmail-monitor-config.mjs`가 없어 `gmailMonitorConfig.test.ts` 3개 테스트 실패 확인
- `pnpm test tests/core/gmailMonitorConfig.test.ts`: 1 file, 3 tests passed
- `pnpm test`: 23 files, 56 tests passed
- `pnpm build`: 성공
- `git diff --check`: trailing whitespace 오류 없음
- GitHub Pages 배포 성공: run `25841799173`
- `pnpm monitor:gmail:query`: 7일/30일 표준 검색어와 로그 템플릿 출력 확인

Gmail 검색:

```text
to:dnjsdndus@gmail.com newer_than:7d -from:dnjsdndus@gmail.com ("엑셀 자동화 견적" OR "엑셀 자동화 비용" OR "견적 요청 템플릿" OR "service-excel-automation-cost" OR "엑셀 자동화 제작 서비스" OR "엑셀 자동화 외주" OR "service-excel-automation-service" OR "맞춤 제작 문의" OR "Automation Workbench" OR "automation-workbench" OR "엑셀/CSV 자동화" OR "CSV/XLSX" OR "workflow-settlement-reconciliation" OR "workflow-quote-to-invoice" OR "workflow-inventory-sync")
```

추가 검색:

```text
to:dnjsdndus@gmail.com newer_than:30d -from:dnjsdndus@gmail.com ("엑셀 자동화 견적" OR "엑셀 자동화 비용" OR "견적 요청 템플릿" OR "service-excel-automation-cost" OR "엑셀 자동화 제작 서비스" OR "엑셀 자동화 외주" OR "service-excel-automation-service" OR "맞춤 제작 문의" OR "Automation Workbench" OR "automation-workbench" OR "엑셀/CSV 자동화" OR "CSV/XLSX" OR "workflow-settlement-reconciliation" OR "workflow-quote-to-invoice" OR "workflow-inventory-sync")
```

결과:

- Gmail 후보 0건
- 실제 문의 0건
- Google Sheets 기록: 사용자 확인 전까지 append하지 않음

판단:

- Gmail 확인 절차는 이제 사람이 매번 검색식을 다시 만들지 않아도 된다.
- 실제 Gmail 문의는 아직 0건이다.
- 다음 병목은 외부 게시 실행 또는 검색 유입을 받을 신규 무료 도구/페이지 확장이다.

다음 액션:

1. GeekNews 로그인 후 게시 원고를 실제 게시한다.
2. 게시가 계속 막히면 로그인 없이 가능한 다음 무료 도구를 추가한다.
3. Gmail 검색은 `pnpm monitor:gmail:query` 결과 기준으로 반복한다.

## 2026-05-14 Excel Column Mapping Tool Released

작업:

- 새 무료 도구 추가: 엑셀 열 매핑 양식 변환
- 원본 열을 표준 주문 양식 열에 연결해 CSV로 내보내는 core 모듈 추가
- CSV/XLSX 업로드 후 자동 열 매핑 제안과 수동 수정 지원
- `tool=map` 직접 진입 지원
- 검색용 랜딩 페이지 추가
- README, share-kit, 외부 게시 원고, Gmail 모니터링 검색어 갱신
- GitHub Release `v0.1.15` 공개

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/?tool=map
https://yuniwon.github.io/automation-workbench/use-cases/excel-column-mapping-template.html
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.15
```

검증:

- 디자인 기준: `Linear` reference
- TDD RED: `mapTableColumns`, `ColumnMapperPanel`, `tool=map`, 신규 use case 페이지가 없어 테스트 실패 확인
- TDD RED: contact/Gmail monitor에서 `map` 추적과 열 매핑 검색어 누락 확인
- `pnpm generate:use-cases`: 성공
- `pnpm test`: 25 files, 60 tests passed
- `pnpm build`: 성공
- `git diff --check`: trailing whitespace 오류 없음
- 로컬 `http://127.0.0.1:5173/?tool=map`: HTTP 200
- GitHub Pages 배포 성공: run `25842134461`
- 공개 랜딩 페이지 HTTP 200 확인
- 공개 랜딩 페이지에서 `엑셀 열 매핑 양식 변환`, `tool=map`, `seo-excel-column-mapping-template` 확인
- 공개 sitemap에서 `/automation-workbench/use-cases/excel-column-mapping-template.html` 확인
- 공개 앱 번들에서 `엑셀 열 매핑 양식 변환`, `표준 양식 CSV 받기` 확인
- GitHub Release `v0.1.15`: latest 확인
- IndexNow 제출: URL 18개, HTTP 200

Gmail 검색:

```text
to:dnjsdndus@gmail.com newer_than:7d -from:dnjsdndus@gmail.com ("엑셀 자동화 견적" OR "엑셀 자동화 비용" OR "견적 요청 템플릿" OR "service-excel-automation-cost" OR "엑셀 자동화 제작 서비스" OR "엑셀 자동화 외주" OR "service-excel-automation-service" OR "맞춤 제작 문의" OR "Automation Workbench" OR "automation-workbench" OR "엑셀/CSV 자동화" OR "CSV/XLSX" OR "workflow-settlement-reconciliation" OR "workflow-quote-to-invoice" OR "workflow-inventory-sync" OR "엑셀 열 매핑 양식 변환" OR "열 매핑" OR "양식 변환" OR "seo-excel-column-mapping-template")
```

추가 검색:

```text
to:dnjsdndus@gmail.com newer_than:30d -from:dnjsdndus@gmail.com ("엑셀 자동화 견적" OR "엑셀 자동화 비용" OR "견적 요청 템플릿" OR "service-excel-automation-cost" OR "엑셀 자동화 제작 서비스" OR "엑셀 자동화 외주" OR "service-excel-automation-service" OR "맞춤 제작 문의" OR "Automation Workbench" OR "automation-workbench" OR "엑셀/CSV 자동화" OR "CSV/XLSX" OR "workflow-settlement-reconciliation" OR "workflow-quote-to-invoice" OR "workflow-inventory-sync" OR "엑셀 열 매핑 양식 변환" OR "열 매핑" OR "양식 변환" OR "seo-excel-column-mapping-template")
```

결과:

- Gmail 후보 0건
- 실제 문의 0건
- Google Sheets 기록: 사용자 확인 전까지 append하지 않음

판단:

- 무료 도구는 정리, 비교, 병합, 정산서 생성, 양식 변환 5종으로 확장됐다.
- 열 매핑은 고객사 양식 변환 의뢰로 이어질 가능성이 높다.
- 실제 Gmail 문의는 아직 0건이다.

다음 액션:

1. GeekNews 로그인 후 게시 원고를 실제 게시한다.
2. 게시가 지연되면 GitHub Actions Node 20 경고를 정리해 운영 리스크를 줄인다.
3. 게시 후 Gmail 검색을 반복한다.

## 2026-05-14 Root Metadata Updated For Current Tools

작업:

- 메인 `index.html`의 title, description, OpenGraph, Twitter Card 문구 갱신
- JSON-LD `WebApplication` 이름과 기능 목록을 무료 도구 5종 기준으로 확장
- 메인 페이지 메타데이터 회귀 테스트 추가
- GitHub Release `v0.1.16` 공개
- IndexNow 재제출

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.16
```

검증:

- TDD RED: 메인 title과 JSON-LD 기능 목록이 정리/비교까지만 설명해 `tests/core/rootMetadata.test.ts` 실패 확인
- TDD GREEN: `tests/core/rootMetadata.test.ts`: 3 tests passed
- `pnpm test`: 26 files, 63 tests passed
- `pnpm build`: 성공
- `git diff --check`: trailing whitespace 오류 없음
- GitHub Pages 배포 성공: run `25842430051`
- 공개 메인 페이지 HTTP 200 확인
- 공개 메인 페이지에서 새 title, 병합, 정산서, 양식 변환 JSON-LD 문구 확인
- 공개 메인 페이지 mojibake 없음 확인
- IndexNow 제출: URL 18개, HTTP 200

Gmail 검색:

- `pnpm monitor:gmail:query` 기준 7일 검색: 후보 0건
- `pnpm monitor:gmail:query` 기준 30일 검색: 후보 0건

결과:

- Gmail 후보 0건
- 실제 문의 0건
- Google Sheets 기록: 사용자 확인 전까지 append하지 않음

판단:

- 메인 링크를 공유했을 때 현재 도구 범위 5종이 빠짐없이 드러난다.
- 검색/공유 진입점의 기본 설명은 최신화됐지만, 실제 의뢰는 아직 발생하지 않았다.

다음 액션:

1. GeekNews 로그인 후 게시 원고를 실제 게시한다.
2. 게시가 계속 지연되면 로그인 없이 가능한 채널용 정적 홍보 페이지나 다음 무료 도구를 추가한다.
3. Gmail 검색은 `pnpm monitor:gmail:query` 결과 기준으로 반복한다.

## 2026-05-14 Inquiry Conversion Panel Improved

작업:

- 하단 문의 패널에 `문의서에 포함될 항목` 체크리스트 추가
- `문의서 복사` 버튼이 실제 이메일 본문과 같은 구조의 요청서를 복사하도록 변경
- 복사용 문의서에도 유입 경로와 선택 도구 추적 URL이 포함되도록 `buildInquiryText()` 공개
- 데스크톱/모바일 문의 패널 레이아웃 정리
- GitHub Release `v0.1.17` 공개
- IndexNow 재제출

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.17
```

검증:

- 디자인 기준: `Linear` reference
- TDD RED: `buildInquiryText()` 미구현으로 `tests/config/contact.test.ts` 실패 확인
- TDD RED: 문의 필수 항목 미표시로 `tests/components/InquiryPanel.test.tsx` 실패 확인
- TDD GREEN: `tests/config/contact.test.ts`: 6 tests passed
- TDD GREEN: `tests/components/InquiryPanel.test.tsx`: 3 tests passed
- `pnpm test`: 26 files, 65 tests passed
- `pnpm build`: 성공
- `git diff --check`: trailing whitespace 오류 없음
- Playwright desktop screenshot: `http://127.0.0.1:5173/?tool=map`에서 문의 패널 확인
- Playwright mobile screenshot: `http://127.0.0.1:5173/?tool=map`에서 문의 패널 확인
- GitHub Pages 배포 성공: run `25842645295`
- 공개 앱 번들에서 `문의서에 포함될 항목`, `문의서 복사`, `선택 도구:` 확인
- 공개 앱 번들 mojibake 없음 확인
- IndexNow 제출: URL 18개, HTTP 200

Gmail 검색:

- `pnpm monitor:gmail:query` 기준 7일 검색: 후보 0건
- `pnpm monitor:gmail:query` 기준 30일 검색: 후보 0건

결과:

- Gmail 후보 0건
- 실제 문의 0건
- Google Sheets 기록: 사용자 확인 전까지 append하지 않음

판단:

- 이메일 앱을 열지 않고 직접 Gmail에 붙여넣는 사용자의 문의 마찰이 줄었다.
- 실제 문의는 아직 발생하지 않았으므로 수익화 목표는 미완료다.

다음 액션:

1. 로그인 없이 배포 가능한 외부 공유용 정적 페이지를 추가한다.
2. GeekNews 로그인 가능 시 게시 원고를 실제 게시한다.
3. Gmail 검색은 `pnpm monitor:gmail:query` 결과 기준으로 반복한다.

## 2026-05-14 GitHub Repository Metadata Updated

작업:

- GitHub 저장소 설명을 현재 무료 도구 5종 기준으로 갱신
- GitHub topics 5개 추가: `file-merge`, `data-reconciliation`, `spreadsheet-automation`, `excel-report`, `korean-tools`

검증:

- `gh repo view yuniwon/automation-workbench --json description,homepageUrl,repositoryTopics,isPrivate,url`
- 저장소 공개 상태 확인: `isPrivate=false`
- homepage 확인: `https://yuniwon.github.io/automation-workbench/`
- description 확인: `무료 엑셀/CSV 정리·비교·병합·정산서 생성·양식 변환 도구와 맞춤 업무 자동화 샘플`
- topics 20개 확인

판단:

- GitHub 검색과 저장소 방문자의 첫인상에서 현재 기능 범위가 더 정확하게 보인다.
- 비용 없이 가능한 노출 개선이지만, 실제 Gmail 문의는 아직 별도 확인 필요하다.

## 2026-05-14 Shareable Automation Intro Page Released

작업:

- 새 정적 페이지 추가: `public/share/free-excel-automation.html`
- 공유 페이지를 생성 스크립트와 sitemap에 연결
- 커뮤니티 공유용 요약, 무료 도구 CTA, 제작 범위 CTA, 문의 mailto CTA 추가
- `docs/marketing/share-kit.md`에 공유용 소개 페이지 링크 추가
- Gmail monitor 검색어에 공유 페이지 추적어 추가: `share-free-excel-automation`, `공유용 소개 페이지`
- GitHub Release `v0.1.18`, `v0.1.19` 공개
- IndexNow 재제출

공개 URL:

```text
https://yuniwon.github.io/automation-workbench/share/free-excel-automation.html
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.18
https://github.com/yuniwon/automation-workbench/releases/tag/v0.1.19
```

검증:

- 디자인 기준: `Linear` reference
- TDD RED: 공유 페이지 파일, sitemap 항목, share-kit 링크 누락으로 `tests/core/sharePage.test.ts` 실패 확인
- TDD RED: 공유 페이지 생성 동기화 누락으로 `tests/core/useCasePageGenerator.test.ts` 실패 확인
- TDD RED: Gmail monitor 검색식에서 공유 페이지 추적어 누락으로 `tests/core/gmailMonitorConfig.test.ts` 실패 확인
- `pnpm generate:use-cases`: 성공
- `pnpm test`: 27 files, 68 tests passed
- `pnpm build`: 성공
- `git diff --check`: trailing whitespace 오류 없음
- Playwright desktop screenshot: `http://127.0.0.1:5173/automation-workbench/share/free-excel-automation.html` 확인
- Playwright mobile screenshot: `http://127.0.0.1:5173/automation-workbench/share/free-excel-automation.html` 확인
- GitHub Pages 배포 성공: run `25842936049`
- 공개 공유 페이지 HTTP 200 확인
- 공개 공유 페이지에서 title, 커뮤니티 공유용 요약, tracking, JSON-LD, mojibake 없음 확인
- 공개 sitemap에서 공유 페이지 포함 확인: URL 19개
- IndexNow 제출: URL 19개, HTTP 200
- `pnpm monitor:gmail:query`에서 공유 페이지 추적어 포함 확인

Gmail 검색:

- 공유 페이지 추적어 포함 7일 검색: 후보 0건
- 공유 페이지 추적어 포함 30일 검색: 후보 0건

결과:

- Gmail 후보 0건
- 실제 문의 0건
- Google Sheets 기록: 사용자 확인 전까지 append하지 않음

판단:

- 로그인 없이 공유 가능한 단일 소개 링크가 생겼다.
- 실제 문의는 아직 발생하지 않았으므로 수익화 목표는 미완료다.

다음 액션:

1. 공유용 소개 페이지 링크를 실제 외부 채널에 게시한다.
2. GeekNews 로그인 가능 시 게시 원고를 실제 게시한다.
3. Gmail 검색은 `pnpm monitor:gmail:query` 결과 기준으로 반복한다.

## 2026-05-14 Posting Packets Switched To Share Page

작업:

- GeekNews 원고에 채널별 공유용 소개 페이지 링크 추가
- OKKY 원고에 채널별 공유용 소개 페이지 링크 추가
- Hacker News 원고에 채널별 공유용 소개 페이지 링크 추가
- Product Hunt URL을 공유용 소개 페이지로 변경
- `docs/marketing/share-kit.md`에 채널별 공유용 소개 링크 추가
- GitHub Release `v0.1.20` 준비

검증:

- TDD RED: `tests/core/marketingPosts.test.ts`에서 채널별 공유 페이지 링크 누락 확인
- TDD RED: `tests/core/sharePage.test.ts`에서 share-kit 채널별 공유 링크 누락 확인
- TDD GREEN: `tests/core/marketingPosts.test.ts`: 1 test passed
- TDD GREEN: `tests/core/sharePage.test.ts`: 2 tests passed
- `pnpm test`: 27 files, 68 tests passed
- `pnpm build`: 성공
- `git diff --check`: trailing whitespace 오류 없음

판단:

- 외부 게시 원고의 첫 진입 링크가 공유용 소개 페이지로 정리됐다.
- 실제 게시는 아직 수행되지 않았고, 실제 Gmail 문의도 아직 발생하지 않았다.

다음 액션:

1. GeekNews 로그인 가능 시 `docs/marketing/posts/geeknews-show-gn.md`를 실제 게시한다.
2. 로그인 없는 채널이 확인되면 같은 공유 링크 기준으로 게시한다.
3. 게시 후 Gmail 검색을 `pnpm monitor:gmail:query` 기준으로 반복한다.
