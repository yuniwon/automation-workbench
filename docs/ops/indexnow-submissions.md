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

## 주의

- HTTP 200은 URL 묶음을 받았다는 뜻이지 색인 완료를 뜻하지 않는다.
- HTTP 202는 키 검증 대기 상태일 수 있다.
- 새 페이지를 추가하면 `scripts/indexnow-config.mjs`와 `public/sitemap.xml`을 같이 갱신한다.
