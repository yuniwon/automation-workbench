# Manual Posting Checklist

목표: 외부 계정 로그인 이후 게시 실수 없이 무료 노출을 실행한다.

## 현재 차단점

- 외부 커뮤니티 게시에는 사용자 계정 로그인이 필요하다.
- Codex가 임의로 계정을 만들거나 인증을 완료할 수 없다.
- 게시 전 최종 확인 없이 홍보 글을 공개하지 않는다.

## 1순위: GeekNews Show GN

사전 조건:

- GeekNews 로그인 완료
- 가입 후 일주일 제한이 지나 글 등록 가능

열 주소:

```text
https://news.hada.io/
```

복사할 원고:

```text
docs/marketing/posts/geeknews-show-gn.md
```

확인:

- 타입이 Show인지 확인
- 링크가 `?source=geeknews`인지 확인
- 게시 후 URL을 `docs/ops/lead-log.md`에 기록

## 2순위: OKKY 피드백

사전 조건:

- OKKY 로그인 완료
- 피드백 카테고리 선택 가능

열 주소:

```text
https://okky.kr/
```

복사할 원고:

```text
docs/marketing/posts/okky-feedback.md
```

확인:

- 제목이 과장 광고처럼 보이지 않는지 확인
- 링크가 `?source=okky`인지 확인
- 게시 후 URL을 `docs/ops/lead-log.md`에 기록

## 게시 후 24시간 체크

Gmail 검색:

```text
in:anywhere newer_than:7d ("엑셀/CSV 자동화" OR "맞춤 제작 문의" OR "무료 엑셀" OR "CSV/XLSX" OR "샘플 파일" OR "반복 작업" OR "automation-workbench" OR "견적서" OR "정산서")
```

기록:

```text
## YYYY-MM-DD Exposure Follow-up

채널:
게시 URL:
조회/댓글/반응:
Gmail 후보:
실제 문의:
다음 액션:
```
