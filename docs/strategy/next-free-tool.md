# Next Free Tool

## 선택: 엑셀/CSV 파일 비교 도구

다음 무료 도구는 `엑셀/CSV 파일 비교 도구`가 가장 좋습니다.

한 줄 설명:

> 두 개의 CSV/XLSX 파일을 올리면 같은 키 기준으로 누락, 추가, 변경된 값을 찾아주는 무료 비교 도구.

## 왜 이 도구인가

- 주문 파일과 정산 파일 비교는 실제 업무 고통이 큽니다.
- 현재 앱의 CSV/XLSX 업로드, 테이블 타입, 정리 로직을 재사용할 수 있습니다.
- 고객 맞춤 제작으로 이어지기 쉽습니다.
- "내 파일 기준으로 비교 규칙을 바꿔주세요"라는 유료 문의가 자연스럽습니다.

## MVP 기능

- 기준 파일 A 업로드
- 비교 파일 B 업로드
- 매칭 기준 열 선택
- A에만 있는 행, B에만 있는 행, 값이 다른 행 요약
- 변경된 셀 하이라이트
- 차이 결과 CSV 다운로드
- 하단 CTA: "내 정산/주문 파일 기준으로 비교 자동화 문의"

## 재사용할 수 있는 모듈

- `src/core/input/csvInputAdapter.ts`
- `src/core/input/excelInputAdapter.ts`
- `src/core/table/types.ts`
- `src/core/output/csvOutputAdapter.ts`
- `src/core/table/tableUtils.ts`

## 새로 만들 모듈 후보

```text
src/core/compare/compareTables.ts
src/core/compare/compareTypes.ts
src/core/recipes/fileComparisonRecipe.ts
src/components/FileComparisonPanel.tsx
```

## 판매로 이어지는 문장

> 무료 도구는 기본적인 파일 비교 흐름을 보여줍니다. 실제 정산, 주문, 재고 파일은 매칭 기준과 예외 규칙이 다르기 때문에 업무 파일에 맞춘 비교 자동화로 제작할 수 있습니다.

## 이후 확장

- 금액 차이 허용 오차 설정
- SKU/주문번호 등 복합 키 매칭
- 날짜 범위 필터
- 구글시트 두 탭 비교
- 차이 결과를 이메일 또는 슬랙으로 발송
