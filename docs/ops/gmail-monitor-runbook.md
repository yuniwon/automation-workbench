# Gmail Monitor Runbook

목표: 무료 엑셀/CSV 정리·비교 도구에서 발생한 실제 문의를 놓치지 않고,
`gmail-intake-playbook.md` 기준으로 빠르게 분류한다.

## 주기

- 매일 오전 9시 30분에 1회 확인한다.
- 새 홍보글을 게시한 날은 게시 후 24시간 뒤 한 번 더 확인한다.

## 검색어

검색어 원본은 `scripts/gmail-monitor-config.mjs`이다.
문서와 실제 검색어가 어긋나지 않도록 먼저 아래 명령으로 최신 검색어를 출력한다.

```powershell
pnpm monitor:gmail:query
```

Gmail에서 아래 7일 검색어를 우선 사용한다.

```text
to:dnjsdndus@gmail.com newer_than:7d -from:dnjsdndus@gmail.com ("엑셀 자동화 견적" OR "엑셀 자동화 비용" OR "견적 요청 템플릿" OR "service-excel-automation-cost" OR "엑셀 자동화 제작 서비스" OR "엑셀 자동화 외주" OR "service-excel-automation-service" OR "맞춤 제작 문의" OR "Automation Workbench" OR "automation-workbench" OR "엑셀/CSV 자동화" OR "CSV/XLSX" OR "workflow-settlement-reconciliation" OR "workflow-quote-to-invoice" OR "workflow-inventory-sync")
```

최근 반응이 없을 때는 범위를 30일로 넓힌다.

```text
to:dnjsdndus@gmail.com newer_than:30d -from:dnjsdndus@gmail.com ("엑셀 자동화 견적" OR "엑셀 자동화 비용" OR "견적 요청 템플릿" OR "service-excel-automation-cost" OR "엑셀 자동화 제작 서비스" OR "엑셀 자동화 외주" OR "service-excel-automation-service" OR "맞춤 제작 문의" OR "Automation Workbench" OR "automation-workbench" OR "엑셀/CSV 자동화" OR "CSV/XLSX" OR "workflow-settlement-reconciliation" OR "workflow-quote-to-invoice" OR "workflow-inventory-sync")
```

## 분류

후보 메일은 `docs/ops/gmail-intake-playbook.md`의 상태값으로 분류한다.

```text
NEW
NEEDS_SAMPLE
QUALIFIED
QUOTED
WON
LOST
```

## 기록

검색할 때마다 `docs/ops/lead-log.md`와 `docs/ops/lead-tracker.md`의 Google Sheets에
같은 내용을 남긴다.

```text
날짜:
검색 범위: newer_than:7d
Gmail 후보 수:
실제 문의 수:
제외한 메일:
다음 액션:
기록 위치: docs/ops/lead-log.md / docs/ops/lead-tracker.md
```

Google Sheets:

```text
https://docs.google.com/spreadsheets/d/1E6vhznY3NRIhTnOX9as7Q2XRJoENRJcFIVtkCxdvUbg/edit
```

## 금지

- 사용자 승인 없이 Gmail 답장을 보내지 않는다.
- 사용자 승인 없이 메일을 삭제, 보관, 라벨링하지 않는다.
- 프로모션, 뉴스레터, 시스템 알림은 실제 문의로 세지 않는다.

## 리드가 없을 때

실제 문의가 없으면 기능 추가보다 노출을 먼저 늘린다.

1. `docs/marketing/share-kit.md`의 짧은 소개글을 무료 채널에 게시한다.
2. 게시 URL과 날짜를 `docs/ops/lead-log.md`에 기록한다.
3. 다음날 Gmail 검색을 반복한다.

## 자동화 상태

2026-05-14에 Codex heartbeat 생성을 시도했지만 앱 도구에서 실패했다.
반복 확인이 필요하면 이 runbook 기준으로 수동 또는 별도 자동화를 다시 설정한다.
