# Upwork Sales Assistant Runbook

목표: Upwork를 직접 자동 지원하는 봇으로 쓰지 않고, 좋은 공고를 선별하고
제안서와 포트폴리오 샘플을 빠르게 만드는 영업 보조 시스템으로 운영한다.

## 운영 원칙

- 자동 제출, 대량 지원, 무단 브라우저 자동화는 하지 않는다.
- 공고 검토, 적합도 점수화, 제안서 초안 작성, 포트폴리오 링크 매칭까지만 자동화한다.
- 최종 지원 버튼 클릭, 계약 수락, 결제, 신원 확인, 플랫폼 약관 동의는 사용자가 직접 한다.
- Connects를 쓰기 전에 같은 유형의 포트폴리오 샘플을 만들 수 있는지 먼저 판단한다.
- 계정 정지 리스크가 있는 스크래핑, 우회, 자동 반복 지원은 하지 않는다.

## 현재 포지셔닝

주력 문구:

```text
Excel, CSV & Google Sheets Automation Developer
```

팔아야 하는 결과:

- messy spreadsheets를 업무자가 다시 쓸 수 있는 구조로 정리
- CSV/XLSX 비교, 병합, 중복 제거, 열 매핑, 정산 리포트 자동화
- Google Sheets + Apps Script 기반의 작은 업무 시스템
- QR 체크인, 이메일 알림, Google Sheet 로그처럼 로그인 없는 경량 워크플로
- 코드뿐 아니라 테스트 파일, 설치 안내, 사용 설명서까지 포함한 납품

피해야 하는 포지셔닝:

- 모든 자동화, 모든 AI, 모든 웹앱을 다 한다는 식의 넓은 주장
- 경험 없는 대형 SaaS, 결제/로그인/보안/대규모 백엔드 프로젝트
- 플랫폼 정책상 문제가 될 수 있는 Upwork 자동 지원 봇 제작

## 좋은 공고 조건

우선순위가 높은 공고:

- Google Sheets, Apps Script, Excel, CSV, XLSX, Gmail notification, lightweight web app
- 입력/출력과 완료 기준이 명확함
- 1~5일 안에 만들 수 있는 작은 업무 자동화
- 클라이언트 payment verified, hire rate 높음, 과거 지출 있음
- fixed price로 범위를 합의하기 쉬움
- 비슷한 포트폴리오 샘플을 빠르게 만들 수 있음

보류하거나 피할 공고:

- 요구사항이 너무 넓고 완료 기준이 없음
- 예산이 지나치게 낮은데 범위가 큼
- 민감한 개인정보, 금융, 의료 데이터 처리인데 보안 기준이 불명확함
- 로그인 우회, 스팸, 무단 수집, 플랫폼 자동 조작을 요구함
- 클라이언트가 샘플 파일이나 정확한 결과 예시를 줄 수 없음

## 공고 검토 절차

1. 공고 링크와 원문을 확보한다.
2. `docs/ops/upwork-job-review-template.md` 형식으로 기록한다.
3. 100점 만점으로 적합도를 계산한다.
4. 70점 이상이면 제안서 초안을 작성한다.
5. 80점 이상이고 비슷한 샘플이 없으면 포트폴리오 샘플을 먼저 만든다.
6. 사용자가 최종 확인한 뒤 Upwork에서 직접 제출한다.

## 점수 기준

```text
Technical fit:        0-25
Scope clarity:        0-20
Portfolio match:      0-20
Client quality:       0-15
Budget fit:           0-10
Account risk:         0-10
```

판단:

- 80점 이상: 강력 후보. 포트폴리오 링크와 함께 지원 고려.
- 70~79점: 후보. 질문을 넣어 범위를 좁힌 뒤 지원.
- 50~69점: 포트폴리오 아이디어로만 사용.
- 49점 이하: 보류.

## 제안서 구조

짧고 구체적으로 쓴다. 목표 길이는 150~250 words.

```text
Hi [Client Name],

I can build this as a lightweight Google Sheets + Apps Script workflow.
For your project, I would set up [specific workflow from the job post],
store clean rows in Google Sheets, and include [notification/report/export].

I recently built a similar demo:
[portfolio link]

For this job I would deliver:
- [deliverable 1]
- [deliverable 2]
- [deliverable 3]
- simple setup and usage instructions

Estimated fixed price: $[amount]
Estimated delivery: [days]

One quick question: [specific question that proves the brief was read]

Best,
Yuni
```

## 가격 기준

초기 Upwork 실적 확보 전 기준:

- Small script or cleanup task: $80~$180
- Clear Google Sheets + Apps Script workflow: $220~$400
- Multi-step spreadsheet workflow with docs and testing: $400~$800
- Ongoing or unclear scope: hourly or paid discovery first

QR vendor check-in 같은 공고는 보통 $250~$400 범위가 자연스럽다. 첫 리뷰를
목표로 할 때는 $250~$300, 안내문/QR signs/배포 지원까지 포함하면 $350~$450도
가능하다.

## 현재 포트폴리오 자산

- Main demo: `https://yuniwon.github.io/automation-workbench/`
- English demo: `https://yuniwon.github.io/automation-workbench/?lang=en`
- QR check-in demo: `https://yuniwon.github.io/automation-workbench/?lang=en&tool=checkin&source=upwork-portfolio`
- QR check-in production notes: `docs/portfolio/qr-vendor-checkin.md`
- Apps Script sample: `public/samples/vendor-checkin-apps-script.js`
- Contact email: `dnjsdndus@gmail.com`

## 운영 로그

Upwork에서 본 좋은 공고는 실제 지원 여부와 상관없이 남긴다. 좋은 공고는
무료 도구나 포트폴리오 샘플의 요구사항 역할을 한다.

기록할 항목:

- date
- job title
- url
- required skills
- budget or hourly range
- connects required
- client quality
- score
- decision
- portfolio sample needed
- proposal draft path or note

## 현재 제약

- Upwork Connects가 없으면 실제 지원은 불가능하다.
- 신원 확인, 결제, 계약 수락은 사용자가 직접 해야 한다.
- 영어 제안서 작성과 공고 분석은 Codex가 담당할 수 있지만, 최종 제출은 사용자 승인 후 진행한다.
- 브라우저 자동화는 로그인 세션 확인과 수동 보조에만 사용한다.
