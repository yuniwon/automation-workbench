# Automation Workbench

Reusable automation workbench for small business spreadsheet cleanup and future workflow
automation jobs.

## MVP

The first app is an Excel/CSV cleanup workbench:

- load built-in sample order data
- upload CSV or XLSX files
- scan for duplicate rows, blank cells, header whitespace, number format issues, and
  mixed date formats
- run selected cleanup steps
- group rows by a selected column
- download cleaned CSV

## Scripts

```powershell
npm install
npm run dev
npm test
npm run build
```

## Structure

```text
src/core/input      CSV and XLSX input adapters
src/core/scan       data quality scanners
src/core/transform  reusable cleanup steps and recipe engine
src/core/output     export adapters
src/components      UI panels
```

Customer-specific behavior should become a recipe or adapter, not a hardcoded branch in
the UI.
