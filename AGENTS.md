# Automation Workbench Agent Notes

This file contains project-specific instructions for future agents. Global
machine rules still apply.

## Product Direction

- Treat this project as a free-tool funnel for paid spreadsheet and workflow automation work.
- The main business goal is not a generic demo app. It is to attract users with useful free tools, then convert real file/workflow problems into custom paid automation.
- Keep customer-specific behavior reusable as recipes, adapters, scanners, mapping targets, sample workflows, or documented production templates instead of hardcoded one-off UI branches.
- Upwork is used as a market research and proposal channel, not as an automated spam channel.

## Collaboration Model

- Codex builds, documents, tests, and improves the work.
- The user owns real-world accounts, approval, posting, contracts, payment, and trust.
- The user acts as the real-world supporter who helps Codex-created work reach people and platforms.
- Codex should prepare work so it can be safely published, demonstrated, sold, or handed off.
- When real-world authority is needed, stop at a clear handoff point and ask the user to approve or perform that step.

## Current Offer

- Core niche: Excel, CSV, XLSX, Google Sheets, and Google Apps Script automation.
- Contact email: `dnjsdndus@gmail.com`.
- Public app: `https://yuniwon.github.io/automation-workbench/`.
- English demo mode: `https://yuniwon.github.io/automation-workbench/?lang=en`.
- Upwork QR check-in sample: `https://yuniwon.github.io/automation-workbench/?lang=en&tool=checkin&source=upwork-portfolio`.

## Upwork Rules

- Do not auto-submit proposals, mass-apply, scrape aggressively, bypass platform controls, or click final submit buttons without explicit user approval.
- It is okay to help inspect a user-opened job page, summarize requirements, score fit, draft proposals, and create matching portfolio samples.
- Use `docs/ops/upwork-sales-assistant.md` and `docs/ops/upwork-job-review-template.md` for Upwork job evaluation.
- Prefer short, specific English proposals with a relevant demo link and one clarifying question.

## Development Rules

- Use `pnpm`; do not switch to npm.
- Do not use arbitrary `npx`. If a one-off package runner is unavoidable, inspect and pin the package first.
- Avoid adding dependencies unless the feature clearly needs one. Prefer browser-native APIs and existing dependencies.
- Before dependency changes, consider package age, maintainers, install scripts, advisory context, and lockfile impact.
- Use the existing React/Vite structure and keep core logic DOM-free where practical.

## Design Rules

- Read `DESIGN.md` before changing app UI, static landing pages, portfolio screenshots, or visual marketing assets.
- Treat the Automation Workbench design-system handoff as the primary visual authority for this repo.
- Keep the product Korean-first, dark, Inter-typed, and practical. Avoid emoji, exclamation marks, decorative logos, and broad "magic" claims.
- If adding a new public visual surface, verify it against the design kit's `ui_kits/automation-workbench/index.html` or the relevant `preview/*.html` reference.

## Verification

Run the smallest useful check first, then broaden when needed.

```powershell
pnpm test
pnpm test:artifacts
pnpm build
```

For UI changes, verify the local app in a browser at `http://127.0.0.1:5173/`
or the relevant query URL. Check both desktop and mobile when layout changes.

## Documentation Map

- Revenue process: `docs/ops/revenue-process.md`
- Pricing: `docs/ops/pricing-guide.md`
- Gmail lead handling: `docs/ops/gmail-intake-playbook.md`
- Gmail monitoring: `docs/ops/gmail-monitor-runbook.md`
- Upwork operations: `docs/ops/upwork-sales-assistant.md`
- Upwork review template: `docs/ops/upwork-job-review-template.md`
- Free tool roadmap: `docs/strategy/next-free-tool.md`
- QR vendor check-in portfolio sample: `docs/portfolio/qr-vendor-checkin.md`

## Release Notes

- GitHub Pages deploys from pushes to `main`.
- Keep release notes in `docs/releases/` when shipping meaningful app or public asset changes.
- Documentation-only operational changes do not always need a public release.
