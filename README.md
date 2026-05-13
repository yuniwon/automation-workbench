# Automation Workbench

무료 엑셀/CSV 정리·비교 도구입니다. CSV 또는 XLSX 파일을 브라우저에서 열어
중복, 빈 값, 숫자 형식 문제를 정리하거나 두 파일의 추가, 삭제, 변경 행을
비교한 뒤 결과 CSV로 내려받을 수 있습니다.

Live demo: https://yuniwon.github.io/automation-workbench/

Sample files:

- Cleanup sample: https://yuniwon.github.io/automation-workbench/samples/sample-orders-dirty.csv
- Comparison sample: https://yuniwon.github.io/automation-workbench/samples/sample-orders-compare.csv

## 이런 분에게 맞습니다

- 주문, 정산, 재고 파일을 매번 수작업으로 정리하거나 비교하는 분
- 중복 행, 빈 값, 숫자 형식 오류를 빠르게 확인하고 싶은 분
- 주문 파일과 정산 파일의 누락, 추가, 변경 내역을 확인하고 싶은 분
- 내 업무 파일에 맞춘 자동화 제작이 가능한지 먼저 보고 싶은 분

## 기능

- CSV 또는 XLSX 파일 업로드
- 중복 행, 빈 값, 헤더 공백, 숫자 형식, 날짜 형식 문제 검사
- 공백 정리, 열 이름 표준화, 숫자 정리, 중복 제거 실행
- 선택한 열 기준 요약표 생성
- 두 파일을 같은 키 기준으로 비교
- A에만 있는 행, B에만 있는 행, 변경된 행, 동일한 행 요약
- 정리된 결과 CSV 다운로드

## 맞춤 제작 문의

무료 도구를 써본 뒤 현재 쓰는 파일 구조에 맞춘 자동화가 필요하면
`dnjsdndus@gmail.com`으로 문의할 수 있습니다.

예를 들면 이런 작업으로 확장할 수 있습니다.

- 쇼핑몰 주문 파일 정리 후 발송/정산용 파일 생성
- 매장별 매출 파일 병합과 월간 요약표 생성
- 주문 파일과 정산 파일 비교 후 누락/차액 리포트 생성
- 구글시트에 새 행이 들어오면 자동 검수 후 알림 발송
- 고객사 양식에 맞춘 엑셀 리포트 자동 생성

## 개발 방향

Customer-specific behavior should become a reusable recipe, adapter, or scanner instead of
a hardcoded UI branch.

## Scripts

```powershell
pnpm install --frozen-lockfile --ignore-scripts
pnpm dev
pnpm test
pnpm build
```

## Structure

```text
src/core/input      CSV and XLSX input adapters
src/core/scan       data quality scanners
src/core/transform  reusable cleanup steps and recipe engine
src/core/output     export adapters
src/components      UI panels
```

## Deployment

The app is deployed to GitHub Pages through `.github/workflows/deploy-pages.yml`.
Pushes to `main` run tests, build the Vite app, and publish `dist`.
