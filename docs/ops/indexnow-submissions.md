# IndexNow Submissions

목표: 새 공개 페이지가 생겼을 때 비용 없이 검색엔진에 URL 변경을 알린다.

## 설정

- 엔드포인트: `https://api.indexnow.org/indexnow`
- 호스트: `yuniwon.github.io`
- 키 파일: `https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt`
- 제출 스크립트: `scripts/submit-indexnow.mjs`

## 실행

```powershell
pnpm submit:indexnow
```

## 현재 제출 대상

- `https://yuniwon.github.io/automation-workbench/`
- `https://yuniwon.github.io/automation-workbench/use-cases/`
- `https://yuniwon.github.io/automation-workbench/use-cases/excel-duplicate-cleanup.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/csv-xlsx-file-compare.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/order-settlement-automation.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/excel-blank-cell-checker.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/excel-number-format-cleanup.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/excel-file-compare.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/excel-csv-file-merge.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/estimate-settlement-generator.html`
- `https://yuniwon.github.io/automation-workbench/services/excel-automation-inquiry.html`
- `https://yuniwon.github.io/automation-workbench/workflows/`
- `https://yuniwon.github.io/automation-workbench/workflows/shopping-mall-order-cleanup.html`
- `https://yuniwon.github.io/automation-workbench/workflows/settlement-file-reconciliation.html`
- `https://yuniwon.github.io/automation-workbench/workflows/monthly-report-file-merge.html`

## 주의

- HTTP 200은 URL 묶음을 받았다는 뜻이지 색인 완료를 뜻하지 않는다.
- HTTP 202는 키 검증 대기 상태일 수 있다.
- 새 페이지를 추가하면 `scripts/use-case-pages.mjs`를 수정하고 `pnpm generate:use-cases`를 실행한다.

## 제출 로그

### 2026-05-14

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 202,
  "submittedUrls": 4,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 4개 제출은 접수됐다.
- 키 검증 또는 처리 대기 상태일 수 있다.
- 색인 완료를 의미하지는 않는다.

### 2026-05-14 추가 랜딩 페이지 제출

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 200,
  "submittedUrls": 7,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 7개 제출이 성공했다.
- 새 검색용 페이지 3개가 sitemap과 IndexNow 제출 대상에 포함됐다.

### 2026-05-14 파일 병합 페이지 제출

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 200,
  "submittedUrls": 8,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 8개 제출이 성공했다.
- 새 파일 병합 랜딩 페이지가 sitemap과 IndexNow 제출 대상에 포함됐다.

### 2026-05-14 랜딩 페이지 메타데이터 갱신 제출

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 200,
  "submittedUrls": 8,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 8개 제출이 성공했다.
- OpenGraph, Twitter Card, JSON-LD가 추가된 랜딩 페이지 변경을 검색엔진에 다시 알렸다.

### 2026-05-14 use case 허브 페이지 제출

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 200,
  "submittedUrls": 9,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 9개 제출이 성공했다.
- 새 use case 허브 페이지가 sitemap과 IndexNow 제출 대상에 포함됐다.

### 2026-05-14 정산서 생성 페이지 제출

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 200,
  "submittedUrls": 10,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 10개 제출이 성공했다.
- 새 견적서/정산서 자동 생성 랜딩 페이지가 sitemap과 IndexNow 제출 대상에 포함됐다.

### 2026-05-14 문의 전환 추적 갱신 제출

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 200,
  "submittedUrls": 10,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 10개 제출이 성공했다.
- 문의 메일 본문에 유입 경로와 선택 도구가 포함되는 공개 앱 변경을 검색엔진에 다시 알렸다.

### 2026-05-14 맞춤 제작 문의 페이지 제출

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 200,
  "submittedUrls": 11,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 11개 제출이 성공했다.
- 새 맞춤 엑셀/CSV 자동화 제작 문의 페이지가 sitemap과 IndexNow 제출 대상에 포함됐다.

### 2026-05-14 앱 문의 패널 CTA 갱신 제출

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 200,
  "submittedUrls": 11,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 11개 제출이 성공했다.
- 메인 앱 문의 패널에 제작 범위 페이지 링크가 추가된 변경을 검색엔진에 다시 알렸다.

### 2026-05-14 업무별 자동화 예시 페이지 제출

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 200,
  "submittedUrls": 15,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 15개 제출이 성공했다.
- workflow 허브와 업무별 자동화 예시 페이지 3개가 sitemap과 IndexNow 제출 대상에 포함됐다.

### 2026-05-14 FAQ와 문의 체크리스트 갱신 제출

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 200,
  "submittedUrls": 15,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 15개 제출이 성공했다.
- 서비스 페이지와 workflow 개별 페이지의 FAQPage 구조화 데이터, 문의 전 체크리스트, 가격 기준 변경을 검색엔진에 다시 알렸다.

### 2026-05-14 Workflow CTA 추적 갱신 제출

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 200,
  "submittedUrls": 15,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 15개 제출이 성공했다.
- workflow CTA의 `workflow`와 `intent` 추적 파라미터 변경을 검색엔진에 다시 알렸다.

### 2026-05-14 엑셀 자동화 제작 서비스 페이지 제출

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 200,
  "submittedUrls": 16,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 16개 제출이 성공했다.
- 새 서비스 페이지 `services/excel-automation-service.html`이 sitemap과 IndexNow 제출 대상에 포함됐다.

### 2026-05-14 엑셀 자동화 견적 페이지 제출

명령:

```powershell
pnpm submit:indexnow
```

결과:

```json
{
  "endpoint": "https://api.indexnow.org/indexnow",
  "status": 200,
  "submittedUrls": 17,
  "keyLocation": "https://yuniwon.github.io/automation-workbench/9827b85325f552230a4c601daebc79ba.txt",
  "response": ""
}
```

해석:

- URL 17개 제출이 성공했다.
- 새 견적 페이지 `services/excel-automation-cost.html`이 sitemap과 IndexNow 제출 대상에 포함됐다.
