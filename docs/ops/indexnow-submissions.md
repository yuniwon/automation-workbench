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
- `https://yuniwon.github.io/automation-workbench/use-cases/excel-duplicate-cleanup.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/csv-xlsx-file-compare.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/order-settlement-automation.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/excel-blank-cell-checker.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/excel-number-format-cleanup.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/excel-file-compare.html`
- `https://yuniwon.github.io/automation-workbench/use-cases/excel-csv-file-merge.html`

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
