# Posting Packet

목표: 외부 채널에 바로 복사해 게시할 수 있는 원고를 한 곳에 둔다.

## 사용 순서

1. `geeknews-show-gn.md`
2. GeekNews 계정 제한이 있으면 `okky-feedback.md`
3. 한국어 피드백을 받은 뒤 `hacker-news-show-hn.md`
4. 충분한 스크린샷과 피드백이 쌓이면 `product-hunt-launch.md`

## 복사용 패킷 출력

```powershell
pnpm marketing:post --channel geeknews
pnpm marketing:post --channel okky
pnpm marketing:post --channel hacker-news
pnpm marketing:post --channel product-hunt
```

가능한 채널 목록은 아래 명령으로 확인한다.

```powershell
pnpm marketing:post --list
```

## 게시 후 할 일

1. 게시 URL을 `docs/ops/lead-log.md`에 기록한다.
2. 24시간 뒤 Gmail 검색을 실행한다.
3. 실제 문의가 있으면 `docs/ops/gmail-intake-playbook.md` 기준으로 분류한다.
4. 피드백이 기능 개선 요청이면 issue 또는 다음 작업 후보로 남긴다.

## 주의

- upvote, 추천, 댓글 요청을 직접 하지 않는다.
- 광고성 문구보다 "직접 만든 무료 도구, 피드백 요청"으로 쓴다.
- 같은 내용을 여러 채널에 동시에 반복 게시하지 않는다.
- 계정 로그인이나 게시 버튼 클릭은 사용자 승인 후 진행한다.
