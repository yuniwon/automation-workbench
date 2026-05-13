# Revenue Process

목표: 무료 도구를 공개하고, 사용자가 직접 기능을 확인한 뒤, Gmail로 맞춤 자동화 의뢰를 보내게 만든다.

## 현재 자산

- 공개 도구: https://yuniwon.github.io/automation-workbench/
- GitHub repo: https://github.com/yuniwon/automation-workbench
- 문의 메일: `dnjsdndus@gmail.com`
- 무료 도구 1: 엑셀/CSV 자동 정리 도구
- 무료 도구 2: 엑셀/CSV 파일 비교 도구
- 소개글: `docs/marketing/free-excel-csv-cleanup-tool-post.md`
- 무료 노출 계획: `docs/marketing/free-distribution-plan.md`
- 수동 게시 체크리스트: `docs/marketing/manual-posting-checklist.md`
- Gmail 처리 기준: `docs/ops/gmail-intake-playbook.md`
- Gmail 검색 로그: `docs/ops/lead-log.md`
- Gmail 반복 점검 절차: `docs/ops/gmail-monitor-runbook.md`
- 견적 기준: `docs/ops/pricing-guide.md`

## 퍼널

```text
무료 도구 발견
→ 직접 파일 또는 샘플 데이터로 기능 확인
→ 도구 링크 또는 이메일 CTA 클릭
→ Gmail 문의 수신
→ 샘플 파일 확인
→ 견적/범위 안내
→ 제작 확정
→ 납품 및 후기 요청
```

## 무료 도구 개발 기준

- 계정 없이 바로 사용 가능해야 한다.
- GitHub Pages에서 무료로 배포 가능해야 한다.
- 업로드한 파일은 브라우저 안에서 처리하는 것을 우선한다.
- 결과물을 CSV/XLSX처럼 업무자가 바로 확인할 수 있는 형태로 제공한다.
- 하단 CTA는 항상 "내 업무 파일 기준 맞춤 제작 문의"로 이어져야 한다.

## 다음 개선 우선순위

1. 비교 결과 화면에서 변경된 셀을 하이라이트한다.
2. 소개글을 외부에 게시할 수 있도록 짧은 버전과 긴 버전으로 나눈다.
3. Gmail 문의가 오면 `NEW`, `NEEDS_SAMPLE`, `QUALIFIED`, `QUOTED`, `WON`, `LOST` 상태로 관리한다.
4. 실제 문의 1건이 오면 그 업무를 세 번째 무료 도구 후보 또는 유료 템플릿 후보로 재사용한다.
5. 문의가 없으면 `gmail-monitor-runbook.md` 기준으로 검색을 반복하고, `free-distribution-plan.md`와 `share-kit.md`를 사용해 무료 노출을 늘린다.

## 현재 검증 상태

- 2026-05-14: Gmail 최근 30일 키워드 검색 완료
- 실제 의뢰: 0건
- 다음 병목: 무료 도구 노출 경로 확보

## 성공 기준

- 공개 도구 URL이 항상 정상 동작한다.
- 사용자가 비용 없이 도구를 써볼 수 있다.
- 문의 이메일에는 샘플 파일 또는 반복 작업 설명이 포함된다.
- 첫 유료 의뢰가 Gmail로 들어와 작업 범위와 견적을 안내한다.
