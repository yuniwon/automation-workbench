# QR Vendor Check-In Portfolio Sample

This portfolio sample is based on a real Upwork-style request:

- Four property-specific QR codes
- A mobile-friendly vendor check-in page
- Google Sheets as the log database
- Email notification on every submission
- No vendor login, app install, or paid dashboard

## Demo URL

Use this URL after deployment:

```text
https://yuniwon.github.io/automation-workbench/?lang=en&tool=checkin&source=upwork-portfolio
```

## Source Job Pattern

This sample was created from an Upwork-style request:

```text
Create Simple QR Code Vendor Check-In System for 4 Properties Using Google Sheets + Apps Script
```

The buyer wanted a no-login vendor check-in workflow for four properties, where
each property has its own QR code, vendors submit service/company/notes from a
mobile page, entries are stored in Google Sheets, and an email notification is
sent on every submission.

## Coverage Against The Job Post

Implemented as a portfolio demo:

- English demo page for Upwork proposals
- Four property-specific QR link cards
- Property auto-selection simulation
- Mobile vendor check-in form preview
- Service type, company, and notes fields
- Google Sheet-style check-in log preview
- Email notification preview
- Downloadable Apps Script sample
- Production build plan and delivery notes

Still required for a real client delivery:

- Create the actual Google Sheet in the client's Google account
- Paste and configure the Apps Script project
- Deploy the Apps Script Web App and confirm permissions
- Generate real QR code images from the deployed Web App URLs
- Create printable QR signs for each property
- Send a real test submission and confirm the email notification arrives
- Test the flow on a real mobile device
- Provide final handoff screenshots or a short setup guide

Positioning:

- This is not yet a fully deployed client system.
- It is a credible working sample showing the exact architecture and user flow.
- A production version should be quoted as a short fixed-price Apps Script job.

## Production Build Plan

1. Create one Google Sheet with three tabs:
   - `Check-ins`: timestamp, property, service, company, notes, userAgent
   - `Properties`: propertyId, propertyName, address, managerEmail, active
   - `Settings`: notificationEmail, services
2. Add the Apps Script sample from:

```text
public/samples/vendor-checkin-apps-script.js
```

3. Deploy the script as a Web App:
   - Execute as: owner
   - Access: anyone
4. Generate four property links:

```text
WEB_APP_URL?property=oak-park
WEB_APP_URL?property=river-house
WEB_APP_URL?property=maple-court
WEB_APP_URL?property=cedar-lofts
```

5. Turn each link into a QR code and print a sign for each property.

## Delivery Notes

The working production version should include:

- A short setup video or screenshots
- The Google Sheet
- The Apps Script project
- Four QR links
- Four printable QR signs
- A one-page instruction sheet explaining how to edit properties, service options, and notification email

## Why This Fits The Portfolio

The project is small enough to ship quickly, but it demonstrates the exact pattern clients ask for:

- turn a simple manual workflow into a reliable form
- store clean rows in a spreadsheet
- keep the interface simple for non-technical users
- leave the client with maintainable instructions
