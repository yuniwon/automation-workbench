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
