# Hacker News Show HN Post

게시 위치: Hacker News Show HN

추적 링크:

```text
https://yuniwon.github.io/automation-workbench/?source=hacker-news
```

## Title

```text
Show HN: I built a browser-based CSV/XLSX cleanup and diff tool
```

## Text Or First Comment

```text
I built a small browser-based tool for cleaning and comparing CSV/XLSX files:

https://yuniwon.github.io/automation-workbench/?source=hacker-news

Sample files:
https://yuniwon.github.io/automation-workbench/samples/sample-orders-dirty.csv
https://yuniwon.github.io/automation-workbench/samples/sample-orders-compare.csv

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

## After Posting Log

```text
## 2026-05-14 Exposure

채널: Hacker News Show HN
게시 URL:
게시 제목: Show HN: I built a browser-based CSV/XLSX cleanup and diff tool
핵심 반응:
Gmail 실제 문의:
다음 액션:
```
