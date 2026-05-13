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
