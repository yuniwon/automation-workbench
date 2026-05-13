# Free Distribution Plan

목표: 비용 없이 공개 도구를 노출하고, 실제 사용자가 `dnjsdndus@gmail.com`으로
맞춤 자동화 문의를 보내게 만든다.

## 우선순위

### 1. GeekNews Show GN

적합도: 높음

이유:

- 한국어 개발자/제품 사용자에게 바로 노출된다.
- Show GN은 직접 만든 서비스, 제품, 오픈소스를 사용자가 직접 써보고 피드백하는 공간이다.
- 현재 도구는 가입이나 이메일 입력 없이 바로 실행할 수 있어 Show GN 조건과 맞다.

주의:

- 글 등록은 회원 가입이 필요하다.
- 스팸 방지를 위해 가입 후 일주일이 지나야 뉴스 링크 등록이 가능하다.
- 특정 출처 링크를 지속적으로 올려 배포 채널처럼 쓰면 안 된다.

근거:

- https://news.hada.io/guidelines
- https://news.hada.io/about

추적 링크:

```text
https://yuniwon.github.io/automation-workbench/?source=geeknews
```

게시 제목:

```text
Show GN: 브라우저에서 CSV/XLSX 파일을 정리하고 비교하는 무료 도구를 만들었습니다
```

게시 본문:

```text
반복해서 만지는 주문, 정산, 재고 파일을 브라우저에서 바로 정리하고 비교할 수 있는 작은 도구를 만들었습니다.

할 수 있는 일:
- CSV/XLSX 업로드
- 중복 행, 빈 값, 숫자 형식 검사
- 공백 정리, 헤더 표준화, 중복 제거
- 두 파일을 같은 키 기준으로 비교
- 추가, 삭제, 변경, 동일 행 요약
- 결과 CSV 다운로드

계정이나 이메일 입력 없이 바로 써볼 수 있고, 업로드한 파일은 브라우저 안에서 처리하는 구조를 우선했습니다.

아직 초기 버전이라 실제 업무 파일에서 어떤 케이스가 먼저 막힐지 피드백을 받고 싶습니다.

Demo:
https://yuniwon.github.io/automation-workbench/?source=geeknews

GitHub:
https://github.com/yuniwon/automation-workbench
```

첫 댓글:

```text
만든 이유는 단순합니다. 작은 사업장이나 개인 업무에서는 매주 같은 엑셀 정리를 반복하는 경우가 많고, 외주 플랫폼에서 의뢰하기 전에는 "이런 것도 자동화가 되나?"를 직접 확인하기 어렵습니다.

그래서 먼저 무료로 써볼 수 있는 공통 정리/비교 도구를 만들고, 실제 업무 양식별 자동화는 문의를 받아 확장하는 구조로 테스트하고 있습니다.

기술적으로는 scanner, transform, recipe, adapter를 분리해서 고객별 규칙을 하드코딩하지 않는 방향으로 가고 있습니다.
```

### 2. OKKY 피드백

적합도: 중간

이유:

- OKKY에는 피드백 카테고리와 프로젝트 피드백 글이 실제로 올라온다.
- 한국어 사용자에게 노출된다.

주의:

- 직접적인 외주 홍보나 광고성 글로 보이면 리스크가 크다.
- "의뢰 받습니다"보다 "무료 도구를 만들었고 피드백을 받고 싶다"가 안전하다.

근거:

- https://okky.kr/

추적 링크:

```text
https://yuniwon.github.io/automation-workbench/?source=okky
```

게시 제목:

```text
CSV/XLSX 정리·비교 무료 도구를 만들었는데 피드백 부탁드립니다
```

게시 본문:

```text
안녕하세요.

주문, 정산, 재고 파일처럼 반복해서 손보는 CSV/XLSX 파일을 브라우저에서 정리하고 비교하는 무료 도구를 만들었습니다.

링크:
https://yuniwon.github.io/automation-workbench/?source=okky

현재 가능한 기능:
- CSV/XLSX 업로드
- 중복 행, 빈 값, 숫자 형식 검사
- 공백 정리, 헤더 표준화, 중복 제거
- 두 파일을 같은 키 기준으로 비교
- 추가, 삭제, 변경, 동일 행 확인
- 결과 CSV 다운로드

의도는 "엑셀 자동화가 필요한지 먼저 확인해보는 무료 샘플 도구"입니다.

피드백 받고 싶은 부분:
1. 실제 업무 파일 기준으로 먼저 필요한 기능이 무엇인지
2. 지금 화면에서 기능을 이해하기 쉬운지
3. CSV/XLSX 처리 흐름에서 불안해 보이는 부분이 있는지

GitHub:
https://github.com/yuniwon/automation-workbench

감사합니다.
```

### 3. Hacker News Show HN

적합도: 중간

이유:

- Show HN은 직접 만든 것을 사용자가 직접 써보고 피드백하는 공간이다.
- HN 가이드상 가입, 이메일 입력 같은 장벽 없이 시도할 수 있는 작업물이 유리하다.

주의:

- 한국 업무 파일 자동화라는 맥락은 HN에서 덜 직접적일 수 있다.
- 과장된 마케팅 문구보다 "I built..." 형식의 담백한 설명이 맞다.
- 친구에게 upvote나 comment를 요청하면 안 된다.

근거:

- https://news.ycombinator.com/showhn.html
- https://news.ycombinator.com/newsguidelines.html

추적 링크:

```text
https://yuniwon.github.io/automation-workbench/?source=hacker-news
```

게시 제목:

```text
Show HN: I built a browser-based CSV/XLSX cleanup and diff tool
```

게시 본문 또는 첫 댓글:

```text
I built a small browser-based tool for cleaning and comparing CSV/XLSX files:

https://yuniwon.github.io/automation-workbench/?source=hacker-news

It can:
- upload CSV/XLSX files
- scan blank cells, duplicate rows, number-like values, and header issues
- trim text, normalize headers, normalize numbers, and remove duplicates
- compare two files by a shared key
- export the result as CSV

The motivation is practical: many small business workflows still involve manually cleaning order, inventory, and settlement spreadsheets every week. I wanted a free, no-login demo that shows what can be automated before building custom workflows for a specific file format.

Implementation notes:
- React + TypeScript + Vite
- GitHub Pages hosting
- browser-side file handling first
- scanners/transforms/recipes/adapters are split so customer-specific rules can become reusable modules instead of hardcoded UI branches

Feedback on edge cases and UX would be useful.
```

### 4. Product Hunt

적합도: 낮음에서 중간

이유:

- Product Hunt는 무료로 런칭할 수 있고, maker가 직접 제출할 수 있다.
- 다만 현재 도구는 B2B 업무 자동화 샘플에 가깝기 때문에, 한국어 사용자 피드백을 먼저 받은 뒤 올리는 편이 낫다.

주의:

- Product Hunt는 준비물이 더 많다: 제품명, tagline, 썸네일, 스크린샷, maker comment.
- upvote 요청이 아니라 방문과 댓글을 요청해야 한다.

근거:

- https://www.producthunt.com/launch

추적 링크:

```text
https://yuniwon.github.io/automation-workbench/?source=product-hunt
```

제품명:

```text
Automation Workbench
```

Tagline:

```text
Clean and compare CSV/XLSX files in your browser
```

Maker comment:

```text
I built Automation Workbench as a free browser-based demo for spreadsheet cleanup and file comparison workflows.

It is meant for people who repeatedly clean order, inventory, settlement, or reporting files and want to see whether their workflow can be automated before commissioning a custom tool.

Current features:
- CSV/XLSX upload
- data quality scanning
- duplicate removal and number normalization
- two-file comparison by key
- CSV export

The project is open on GitHub and hosted on GitHub Pages.
```

## 실행 순서

1. GeekNews 계정이 없다면 먼저 가입한다.
2. GeekNews 가입 후 일주일 제한이 있으면 OKKY 피드백 글을 먼저 올린다.
3. 게시한 URL과 날짜를 `docs/ops/lead-log.md`에 기록한다.
4. 게시 후 24시간 뒤 Gmail을 검색한다.
5. 실제 문의가 없으면 댓글 피드백을 보고 도구 개선 또는 다음 채널 게시를 결정한다.

## 게시 후 기록 형식

`docs/ops/lead-log.md`에 아래 형식으로 추가한다.

```text
## YYYY-MM-DD Exposure

채널:
게시 URL:
게시 제목:
핵심 반응:
Gmail 실제 문의:
다음 액션:
```
