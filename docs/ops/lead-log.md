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
