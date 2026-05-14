# Automation Workbench

무료 엑셀/CSV 정리·비교·병합·정산서 생성 도구입니다. CSV 또는 XLSX 파일을 브라우저에서 열어
중복, 빈 값, 숫자 형식 문제를 정리하거나 두 파일의 추가, 삭제, 변경 행을
비교하고 여러 파일을 병합한 뒤 고객별 정산 요약까지 내려받을 수 있습니다.

Live demo: https://yuniwon.github.io/automation-workbench/

Tool index: https://yuniwon.github.io/automation-workbench/use-cases/

Workflow examples: https://yuniwon.github.io/automation-workbench/workflows/

Excel automation service: https://yuniwon.github.io/automation-workbench/services/excel-automation-service.html

Excel automation quote: https://yuniwon.github.io/automation-workbench/services/excel-automation-cost.html

Custom automation inquiry: https://yuniwon.github.io/automation-workbench/services/excel-automation-inquiry.html

맞춤 자동화 문의: [dnjsdndus@gmail.com](mailto:dnjsdndus@gmail.com?subject=%EC%97%91%EC%85%80%2FCSV%20%EC%9E%90%EB%8F%99%ED%99%94%20%EB%A7%9E%EC%B6%A4%20%EC%A0%9C%EC%9E%91%20%EB%AC%B8%EC%9D%98)

Sample files:

- Cleanup sample: https://yuniwon.github.io/automation-workbench/samples/sample-orders-dirty.csv
- Comparison sample: https://yuniwon.github.io/automation-workbench/samples/sample-orders-compare.csv

Privacy notes: [PRIVACY.md](PRIVACY.md)

## 바로 써보기

| 필요한 작업 | 무료 도구 |
| --- | --- |
| 엑셀 중복 제거 | https://yuniwon.github.io/automation-workbench/use-cases/excel-duplicate-cleanup.html |
| 엑셀 빈 값 검사 | https://yuniwon.github.io/automation-workbench/use-cases/excel-blank-cell-checker.html |
| 엑셀 숫자 형식 정리 | https://yuniwon.github.io/automation-workbench/use-cases/excel-number-format-cleanup.html |
| CSV/XLSX 파일 비교 | https://yuniwon.github.io/automation-workbench/use-cases/csv-xlsx-file-compare.html |
| 엑셀 파일 비교 | https://yuniwon.github.io/automation-workbench/use-cases/excel-file-compare.html |
| 엑셀/CSV 파일 병합 | https://yuniwon.github.io/automation-workbench/use-cases/excel-csv-file-merge.html |
| 견적서/정산서 자동 생성 | https://yuniwon.github.io/automation-workbench/use-cases/estimate-settlement-generator.html |
| 주문·정산 파일 자동화 검토 | https://yuniwon.github.io/automation-workbench/use-cases/order-settlement-automation.html |
| 엑셀 자동화 제작 서비스 | https://yuniwon.github.io/automation-workbench/services/excel-automation-service.html |
| 엑셀 자동화 견적과 비용 기준 | https://yuniwon.github.io/automation-workbench/services/excel-automation-cost.html |
| 내 파일 맞춤 자동화 제작 범위 확인 | https://yuniwon.github.io/automation-workbench/services/excel-automation-inquiry.html |
| 업무별 자동화 예시 보기 | https://yuniwon.github.io/automation-workbench/workflows/ |

## 이런 분에게 맞습니다

- 주문, 정산, 재고 파일을 매번 수작업으로 정리하거나 비교하는 분
- 중복 행, 빈 값, 숫자 형식 오류를 빠르게 확인하고 싶은 분
- 주문 파일과 정산 파일의 누락, 추가, 변경 내역을 확인하고 싶은 분
- 매장별, 월별, 거래처별 파일을 하나로 합치고 싶은 분
- 주문 파일에서 고객별 정산서나 견적서 초안을 만들고 싶은 분
- 내 업무 파일에 맞춘 자동화 제작이 가능한지 먼저 보고 싶은 분

## 기능

- CSV 또는 XLSX 파일 업로드
- 중복 행, 빈 값, 헤더 공백, 숫자 형식, 날짜 형식 문제 검사
- 공백 정리, 열 이름 표준화, 숫자 정리, 중복 제거 실행
- 선택한 열 기준 요약표 생성
- 두 파일을 같은 키 기준으로 비교
- A에만 있는 행, B에만 있는 행, 변경된 행, 동일한 행 요약
- 여러 CSV/XLSX 파일을 원본 파일명과 함께 병합
- 고객/품목/금액 열 기준 정산서 요약 생성
- 정리된 결과 CSV와 정산 HTML 다운로드

## 맞춤 제작 문의

무료 도구를 써본 뒤 현재 쓰는 파일 구조에 맞춘 자동화가 필요하면
`dnjsdndus@gmail.com`으로 문의할 수 있습니다.

공개 도구는 파일을 브라우저 안에서 처리하도록 설계되어 있습니다. 샘플 파일을
메일로 보낼 때는 이름, 전화번호, 주소, 계좌번호 같은 민감정보를 먼저 가려주세요.

예를 들면 이런 작업으로 확장할 수 있습니다.

- 쇼핑몰 주문 파일 정리 후 발송/정산용 파일 생성
- 매장별 매출 파일 병합과 월간 요약표 생성
- 주문 파일과 정산 파일 비교 후 누락/차액 리포트 생성
- 고객별 견적서 또는 거래처별 정산서 자동 생성
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
