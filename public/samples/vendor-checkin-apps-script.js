/**
 * QR Vendor Check-In sample for Google Apps Script.
 *
 * Deployment model:
 * 1. Create a Google Sheet.
 * 2. Extensions -> Apps Script -> paste this file.
 * 3. Run setupWorkbook once.
 * 4. Deploy -> New deployment -> Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Create one QR code per property using:
 *    WEB_APP_URL?property=oak-park
 *
 * Sheet tabs:
 * - Check-ins: timestamp, property, service, company, notes, userAgent
 * - Properties: propertyId, propertyName, address, managerEmail, active
 * - Settings: key, value
 */

const CHECKIN_SHEET = "Check-ins";
const PROPERTY_SHEET = "Properties";
const SETTINGS_SHEET = "Settings";

const DEFAULT_SERVICES = [
  "Window Cleaning",
  "Exterminator",
  "Cleaning",
  "Fertilizing",
  "Snow Removal",
  "Other",
];

function setupWorkbook() {
  const spreadsheet = SpreadsheetApp.getActive();
  const checkins = getOrCreateSheet_(spreadsheet, CHECKIN_SHEET);
  const properties = getOrCreateSheet_(spreadsheet, PROPERTY_SHEET);
  const settings = getOrCreateSheet_(spreadsheet, SETTINGS_SHEET);

  checkins.clear();
  checkins.appendRow(["timestamp", "property", "service", "company", "notes", "userAgent"]);
  checkins.setFrozenRows(1);

  properties.clear();
  properties.appendRow(["propertyId", "propertyName", "address", "managerEmail", "active"]);
  properties.appendRow(["oak-park", "Oak Park Apartments", "1821 Oak Park Dr", Session.getActiveUser().getEmail(), true]);
  properties.appendRow(["river-house", "River House", "44 Riverbend Ave", Session.getActiveUser().getEmail(), true]);
  properties.appendRow(["maple-court", "Maple Court", "9 Maple Court", Session.getActiveUser().getEmail(), true]);
  properties.appendRow(["cedar-lofts", "Cedar Lofts", "710 Cedar Street", Session.getActiveUser().getEmail(), true]);
  properties.setFrozenRows(1);

  settings.clear();
  settings.appendRow(["key", "value"]);
  settings.appendRow(["notificationEmail", Session.getActiveUser().getEmail()]);
  settings.appendRow(["services", DEFAULT_SERVICES.join("|")]);
  settings.setFrozenRows(1);
}

function doGet(event) {
  const propertyId = String(event.parameter.property || "").trim();
  const property = findProperty_(propertyId);

  if (!property) {
    return HtmlService.createHtmlOutput(renderError_("Unknown or inactive property link."));
  }

  return HtmlService.createHtmlOutput(renderForm_(property, getServices_()))
    .setTitle(`Vendor Check-In - ${property.propertyName}`)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(event) {
  const payload = parsePayload_(event);
  const property = findProperty_(payload.propertyId);

  if (!property) {
    return json_({ ok: false, error: "Unknown or inactive property." });
  }

  const service = sanitize_(payload.service);
  const company = sanitize_(payload.company);
  const notes = sanitize_(payload.notes);
  const userAgent = sanitize_(payload.userAgent);

  if (!service || !company) {
    return json_({ ok: false, error: "Service and company are required." });
  }

  const timestamp = new Date();
  SpreadsheetApp.getActive().getSheetByName(CHECKIN_SHEET).appendRow([
    timestamp,
    property.propertyName,
    service,
    company,
    notes,
    userAgent,
  ]);

  sendNotification_(property, {
    timestamp,
    service,
    company,
    notes,
  });

  return json_({ ok: true, property: property.propertyName });
}

function getOrCreateSheet_(spreadsheet, name) {
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

function findProperty_(propertyId) {
  return getProperties_().find((property) => property.propertyId === propertyId && property.active);
}

function getProperties_() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(PROPERTY_SHEET);
  if (!sheet) {
    throw new Error(`Missing ${PROPERTY_SHEET} sheet. Run setupWorkbook first.`);
  }

  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  return rows.map((row) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = row[index];
    });
    return {
      propertyId: String(record.propertyId || "").trim(),
      propertyName: String(record.propertyName || "").trim(),
      address: String(record.address || "").trim(),
      managerEmail: String(record.managerEmail || "").trim(),
      active: record.active === true || String(record.active).toLowerCase() === "true",
    };
  });
}

function getSettings_() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SETTINGS_SHEET);
  if (!sheet) {
    return {};
  }
  const rows = sheet.getDataRange().getValues();
  rows.shift();
  return rows.reduce((settings, row) => {
    settings[String(row[0] || "").trim()] = String(row[1] || "").trim();
    return settings;
  }, {});
}

function getServices_() {
  const settings = getSettings_();
  return (settings.services || DEFAULT_SERVICES.join("|"))
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parsePayload_(event) {
  if (event.postData && event.postData.type === "application/json") {
    return JSON.parse(event.postData.contents);
  }
  return event.parameter || {};
}

function sanitize_(value) {
  return String(value || "").replace(/[<>]/g, "").trim().slice(0, 500);
}

function sendNotification_(property, checkin) {
  const settings = getSettings_();
  const recipient = property.managerEmail || settings.notificationEmail;
  if (!recipient) {
    return;
  }

  MailApp.sendEmail({
    to: recipient,
    subject: `Vendor check-in - ${property.propertyName}`,
    body: [
      `Property: ${property.propertyName}`,
      `Address: ${property.address}`,
      `Service: ${checkin.service}`,
      `Company: ${checkin.company}`,
      `Notes: ${checkin.notes || "-"}`,
      `Timestamp: ${checkin.timestamp}`,
    ].join("\n"),
  });
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function renderForm_(property, services) {
  const serviceOptions = services.map((service) => `<option value="${escapeHtml_(service)}">${escapeHtml_(service)}</option>`).join("");
  return `<!doctype html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { margin: 0; font-family: Arial, sans-serif; background: #f6f7f9; color: #17211d; }
    main { max-width: 480px; margin: 0 auto; padding: 24px; }
    .card { background: #fff; border: 1px solid #e4e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,.06); }
    h1 { margin: 0 0 8px; font-size: 28px; }
    p { color: #66736d; line-height: 1.5; }
    label { display: grid; gap: 8px; margin-top: 16px; font-size: 14px; font-weight: 700; }
    input, select, textarea { width: 100%; box-sizing: border-box; border: 1px solid #ccd3d0; border-radius: 8px; padding: 12px; font: inherit; }
    button { width: 100%; margin-top: 18px; border: 0; border-radius: 8px; padding: 14px; background: #176f52; color: #fff; font: inherit; font-weight: 700; }
    .status { min-height: 22px; margin-top: 14px; color: #176f52; font-weight: 700; }
  </style>
</head>
<body>
  <main>
    <section class="card">
      <h1>Vendor Check-In</h1>
      <p><strong>${escapeHtml_(property.propertyName)}</strong><br>${escapeHtml_(property.address)}</p>
      <form id="checkin-form">
        <input type="hidden" name="propertyId" value="${escapeHtml_(property.propertyId)}" />
        <label>What service are you here for?
          <select name="service">${serviceOptions}</select>
        </label>
        <label>Company Name
          <input name="company" autocomplete="organization" required />
        </label>
        <label>Optional Notes
          <textarea name="notes" rows="3"></textarea>
        </label>
        <button type="submit">Submit Check-In</button>
        <div class="status" id="status"></div>
      </form>
    </section>
  </main>
  <script>
    const form = document.getElementById("checkin-form");
    const status = document.getElementById("status");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      status.textContent = "Submitting...";
      const payload = Object.fromEntries(new FormData(form).entries());
      payload.userAgent = navigator.userAgent;
      const response = await fetch(location.href, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      status.textContent = result.ok ? "Check-in submitted. Thank you." : result.error;
      if (result.ok) form.reset();
    });
  </script>
</body>
</html>`;
}

function renderError_(message) {
  return `<!doctype html><html><body><h1>Vendor Check-In</h1><p>${escapeHtml_(message)}</p></body></html>`;
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
