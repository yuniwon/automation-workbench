# Lead Tracker

목표: Gmail 문의, 무료 노출, 검색엔진 제출, 후속 액션을 한 시트에서 추적한다.

Google Sheets:

```text
https://docs.google.com/spreadsheets/d/1E6vhznY3NRIhTnOX9as7Q2XRJoENRJcFIVtkCxdvUbg/edit
```

## 현재 구조

시트: `시트1`

컬럼:

- `Date`
- `Type`
- `Status`
- `Source`
- `Channel`
- `URL or Email`
- `Subject`
- `Candidate Count`
- `Real Lead Count`
- `Next Action`
- `Owner Note`
- `Evidence`

## 초기 기록

- Gmail scan: 후보 0건, 실제 문의 0건
- SEO use case page 3개
- IndexNow 제출: URL 4개, HTTP 202

## 상태 값

- `NO_LEADS`: 검색 결과 실제 문의 없음
- `PUBLISHED`: 공개 페이지 또는 게시물 노출 완료
- `RELEASED`: GitHub Release 공개 완료
- `ACCEPTED_200`: IndexNow 제출 성공
- `ACCEPTED_202`: IndexNow 제출 접수 또는 키 검증 대기
- `NEW`: 새 문의
- `NEEDS_SAMPLE`: 샘플 파일 요청 필요
- `QUALIFIED`: 견적 가능
- `QUOTED`: 견적 발송
- `WON`: 수주 확정
- `LOST`: 보류 또는 종료

## 운영 규칙

- Gmail 검색 결과는 `gmail_scan`으로 기록한다.
- 공개 페이지, 커뮤니티 게시, 릴리스는 `exposure_asset`으로 기록한다.
- 실제 문의가 들어오면 `docs/ops/gmail-intake-playbook.md` 기준으로 상태를 바꾼다.
- 금액 판단은 `docs/ops/pricing-guide.md`를 따른다.
- 답장 원문은 `docs/ops/gmail-reply-templates.md`를 사용한다.
