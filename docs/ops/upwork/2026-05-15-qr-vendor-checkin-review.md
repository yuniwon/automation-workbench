# Upwork Job Review: QR Vendor Check-In

Snapshot date: 2026-05-15 KST

Important: this review is based on the previously opened Upwork job page and
should be refreshed before spending Connects. Proposal count, interviews,
Connects required, and client availability can change.

## Job Snapshot

```text
Date: 2026-05-15
Job title: Create Simple QR Code Vendor Check-In System for 4 Properties Using Google Sheets + Apps Script
URL: https://www.upwork.com/jobs/Create-Simple-Code-Vendor-Check-System-for-Properties-Using-span-class-highlight-Google-span-span-class-highlight-Sheets-span-Apps-Script_~022054881532910841235/
Budget: not confirmed in current snapshot
Contract type: likely fixed-price
Connects required: 14 in the previously viewed snapshot
Client location: United States
Payment verified: yes in the previously viewed snapshot
Client rating: 5.0 in the previously viewed snapshot
Hire rate: 100% in the previously viewed snapshot
Amount spent: about $7.6K in the previously viewed snapshot
Proposals: 20-50 in the previously viewed snapshot
Interviewing: 6 in the previously viewed snapshot
```

## Requirement Summary

```text
What the client wants:
Create a simple vendor check-in workflow for four properties. Vendors scan a QR
code at the property, fill out a mobile-friendly form, and the submission is
saved to a Google Sheet with an email notification.

Inputs:
- Four property names/locations
- Vendor service type
- Company name
- Optional notes
- Notification email address

Outputs:
- One Google Sheet log
- Four property-specific QR links
- A no-login mobile check-in page
- Real-time email notification
- Simple setup/use instructions
- Printable QR signs if included in scope

Must-have features:
- No vendor login
- No app install
- Google Sheets as the backend/log
- Google Apps Script Web App form
- Property auto-selected from QR link
- Date/time, property, service, company, notes saved per submission

Nice-to-have features:
- Printable QR signs
- Basic property/settings tab
- Service type dropdown configurable from the sheet
- Short handoff guide with screenshots

Unknowns / questions:
- Should notifications go to one email or different property managers per property?
- Do they want printable QR signs included, or only the QR links?
- What exact service type options should be shown?
- Should the Google Sheet live in the client's account from the start?
```

## Fit Score

```text
Technical fit:        25/25
Scope clarity:        18/20
Portfolio match:      20/20
Client quality:       14/15
Budget fit:            8/10
Account risk:          9/10
Total:                94/100
```

Decision:

```text
[x] Apply now, if Connects are available and the job is still open
[ ] Ask a clarification question first
[ ] Build portfolio sample first
[ ] Save as market research only
[ ] Pass
```

Current practical decision:

```text
Do not spend money just to apply yet. Use this job as the first Upwork-style
portfolio proof. If free Connects become available or a similar job appears,
apply with the prepared proposal and demo link.
```

## Risk Check

```text
Platform policy risk:
Low. This is a normal client workflow automation job. Avoid any claim that the
system manipulates Upwork or performs platform automation.

Data/privacy risk:
Low to medium. Vendor company names and property visits are operational data.
Keep the system in the client's Google account and avoid storing data elsewhere.

Scope creep risk:
Medium. QR signs, mobile testing, property-specific notification emails, and
setup support should be named explicitly in the fixed-price scope.

Unclear acceptance criteria:
Moderate. The client should confirm whether a successful delivery means tested
Web App URL + four QR links, or also printable signage.

Reason to avoid:
Only avoid if the client expects a full dashboard, login system, or ongoing
support inside the same small fixed price.
```

## Portfolio Match

Existing assets:

- QR vendor check-in demo:
  `https://yuniwon.github.io/automation-workbench/?lang=en&tool=checkin&source=upwork-portfolio`
- Production notes:
  `docs/portfolio/qr-vendor-checkin.md`
- Apps Script sample:
  `public/samples/vendor-checkin-apps-script.js`

Needed sample:

```text
Sample name: QR Vendor Check-In System
Demo URL: https://yuniwon.github.io/automation-workbench/?lang=en&tool=checkin&source=upwork-portfolio
Files to create: already created
Acceptance proof:
- English demo page loads
- Four property QR links shown
- Mobile check-in form preview shown
- Google Sheet log preview shown
- Apps Script sample downloadable
```

## Recommended Price

Primary proposal:

```text
$300 fixed price, 3 days
```

Scope included:

- Google Sheet setup
- Apps Script Web App
- Four property-specific check-in links
- Mobile form
- Google Sheet logging
- Email notification
- Short setup/use instructions

Optional stronger quote:

```text
$400 fixed price, 4 days
```

Use this if including printable QR signs, property-specific manager emails,
mobile testing, and one revision round.

First-review discount floor:

```text
$220-$250 fixed price
```

Only use this if the goal is winning the first Upwork review and the scope stays
tightly limited to Web App + Sheet + four links.

## Follow-up Notes

```text
Submitted: no
Client replied: no
Interview scheduled: no
Won/lost: not applicable
Reason: Connects unavailable / using as portfolio sample first
Reusable lesson:
Small Google Sheets + Apps Script workflows are a strong niche because they are
concrete, quick to demo, and easy to explain with a fixed-price scope.
```
