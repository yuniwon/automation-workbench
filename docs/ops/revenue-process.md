# Revenue Process

목표: 무료 도구를 공개하고, 사용자가 직접 기능을 확인한 뒤, Gmail로 맞춤 자동화 의뢰를 보내게 만든다.

## 현재 자산

- 공개 도구: https://yuniwon.github.io/automation-workbench/
- 엑셀 자동화 제작 서비스: https://yuniwon.github.io/automation-workbench/services/excel-automation-service.html
- 엑셀 자동화 견적과 비용 기준: https://yuniwon.github.io/automation-workbench/services/excel-automation-cost.html
- 맞춤 제작 문의 페이지: https://yuniwon.github.io/automation-workbench/services/excel-automation-inquiry.html
- 업무별 자동화 예시: https://yuniwon.github.io/automation-workbench/workflows/
- GitHub repo: https://github.com/yuniwon/automation-workbench
- 문의 메일: `dnjsdndus@gmail.com`
- 무료 도구 1: 엑셀/CSV 자동 정리 도구
- 무료 도구 2: 엑셀/CSV 파일 비교 도구
- 무료 도구 3: 엑셀/CSV 파일 병합 도구
- 무료 도구 4: 견적서/정산서 자동 생성 도구
- 무료 도구 5: 엑셀 열 매핑 양식 변환 도구
- 소개글: `docs/marketing/free-excel-csv-cleanup-tool-post.md`
- 무료 노출 계획: `docs/marketing/free-distribution-plan.md`
- 수동 게시 체크리스트: `docs/marketing/manual-posting-checklist.md`
- Gmail 처리 기준: `docs/ops/gmail-intake-playbook.md`
- Gmail 답장 템플릿: `docs/ops/gmail-reply-templates.md`
- Gmail 검색 로그: `docs/ops/lead-log.md`
- Google Sheets 리드 트래커: `docs/ops/lead-tracker.md`
- Gmail 반복 점검 절차: `docs/ops/gmail-monitor-runbook.md`
- 견적 기준: `docs/ops/pricing-guide.md`
- Upwork 운영 보조 기준: `docs/ops/upwork-sales-assistant.md`
- Upwork 공고 검토 템플릿: `docs/ops/upwork-job-review-template.md`
- 검색엔진 URL 제출: `docs/ops/indexnow-submissions.md`
- 검색용 랜딩 페이지: `public/use-cases/*.html` (`pnpm generate:use-cases`로 갱신)
- 제작 문의 랜딩 페이지: `public/services/*.html` (`pnpm generate:use-cases`로 갱신)
- 업무별 자동화 예시 페이지: `public/workflows/*.html` (`pnpm generate:use-cases`로 갱신)
- GitHub 방문자용 진입점: `README.md`의 "바로 써보기" 링크 표

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

## 협업 원칙

이 프로젝트의 기본 역할 분담:

```text
Codex가 만든다.
사용자가 승인하고 세상에 낸다.
반응이 오면 Codex가 다시 개선한다.
```

Codex는 제품 제작, 기술 구현, 문서화, 영어 제안서, 포트폴리오 샘플, 테스트와
개선을 담당한다. 사용자는 계정 인증, 최종 승인, 게시, 계약, 결제, 고객 신뢰처럼
현실세계 권한이 필요한 접점을 담당한다.

목표는 Codex가 만든 작업물을 사용자가 현실세계로 끌어내고, 그 반응을 다시
제품과 운영 시스템에 쌓아 더 좋은 자동화 자산으로 만드는 것이다.

## Upwork 보조 퍼널

Upwork는 유료 플랫폼 의존 수익원이 아니라 시장조사와 포트폴리오 요구사항 발굴
채널로 사용한다.

```text
Upwork 공고 발견
→ 공고 적합도와 리스크 점수화
→ 비슷한 샘플이 없으면 포트폴리오 데모 제작
→ 영어 제안서 초안 작성
→ 사용자가 Connects 사용 여부와 제출을 최종 승인
→ 결과와 배운 점을 운영 로그에 기록
```

금지:

- 자동 대량 지원
- 사용자 승인 없는 제출
- 로그인 우회, 무단 수집, 스팸성 브라우저 자동화

추천:

- 공고를 무료 도구/포트폴리오 샘플의 요구사항으로 재사용
- 영어 데모 링크와 짧은 제안서를 함께 사용
- fixed-price는 범위, 수정 횟수, 납품물을 먼저 고정

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
6. Upwork에서 좋은 공고를 발견하면 `upwork-job-review-template.md`로 기록하고, 지원 전 포트폴리오 샘플로 재사용할 수 있는지 판단한다.

## 현재 검증 상태

- 2026-05-14: Gmail 최근 30일 키워드 검색 완료
- 실제 의뢰: 0건
- 다음 병목: 무료 도구 노출 경로 확보

## 성공 기준

- 공개 도구 URL이 항상 정상 동작한다.
- 사용자가 비용 없이 도구를 써볼 수 있다.
- 문의 이메일에는 샘플 파일 또는 반복 작업 설명이 포함된다.
- 첫 유료 의뢰가 Gmail로 들어와 작업 범위와 견적을 안내한다.
