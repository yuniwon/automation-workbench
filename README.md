# Automation Workbench

Free Excel/CSV cleanup tool for small business workflow automation demos.

Live demo: https://yuniwon.github.io/automation-workbench/

## What It Does

- uploads CSV or XLSX files
- scans duplicate rows, blank cells, header whitespace, number format issues, and mixed date formats
- runs selected cleanup steps
- groups rows by a selected column
- downloads the cleaned result as CSV

## Why This Exists

This project is a free public tool and a lead-generation sample for custom automation work.
The app lets a visitor try a useful spreadsheet cleanup flow first, then request a version
adapted to their own files, rules, reports, or Google Sheets workflow.

Customer-specific behavior should become a reusable recipe, adapter, or scanner instead of
a hardcoded UI branch.

## Scripts

```powershell
pnpm install --frozen-lockfile --ignore-scripts
pnpm dev
pnpm test
pnpm build
```

## Structure

```text
src/core/input      CSV and XLSX input adapters
src/core/scan       data quality scanners
src/core/transform  reusable cleanup steps and recipe engine
src/core/output     export adapters
src/components      UI panels
```

## Deployment

The app is deployed to GitHub Pages through `.github/workflows/deploy-pages.yml`.
Pushes to `main` run tests, build the Vite app, and publish `dist`.
