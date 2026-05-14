import { useMemo, useState } from "react";
import type { AppLocale } from "../app/App";
import { sampleFiles } from "../config/sampleFiles";

interface VendorCheckInPanelProps {
  locale?: AppLocale;
}

interface PropertySite {
  id: string;
  name: string;
  shortName: string;
  address: string;
}

interface CheckInRow {
  id: string;
  timestamp: string;
  propertyName: string;
  serviceType: string;
  companyName: string;
  notes: string;
}

const propertySites: PropertySite[] = [
  { id: "oak-park", name: "Oak Park Apartments", shortName: "Oak Park", address: "1821 Oak Park Dr" },
  { id: "river-house", name: "River House", shortName: "River", address: "44 Riverbend Ave" },
  { id: "maple-court", name: "Maple Court", shortName: "Maple", address: "9 Maple Court" },
  { id: "cedar-lofts", name: "Cedar Lofts", shortName: "Cedar", address: "710 Cedar Street" },
];

const serviceTypes = ["Window Cleaning", "Exterminator", "Cleaning", "Fertilizing", "Snow Removal", "Other"];

const seededRows: CheckInRow[] = [
  {
    id: "sample-1",
    timestamp: "2026-05-14 09:18",
    propertyName: "Oak Park Apartments",
    serviceType: "Cleaning",
    companyName: "Bright Crew",
    notes: "Lobby and stairwell completed.",
  },
  {
    id: "sample-2",
    timestamp: "2026-05-14 10:06",
    propertyName: "River House",
    serviceType: "Exterminator",
    companyName: "Safe Pest Co",
    notes: "Quarterly service visit.",
  },
  {
    id: "sample-3",
    timestamp: "2026-05-14 11:42",
    propertyName: "Maple Court",
    serviceType: "Window Cleaning",
    companyName: "Clear View",
    notes: "Exterior windows only.",
  },
];

const copy = {
  ko: {
    heading: "QR 벤더 체크인 시스템",
    lead: "현장 QR 코드를 스캔하면 부동산명이 자동 지정되고, 벤더가 서비스 유형과 회사명만 입력해 Google Sheets에 저장되는 흐름입니다.",
    workflow: "Workflow",
    preview: "모바일 체크인 미리보기",
    signs: "4개 부동산 QR 링크",
    sheet: "Google Sheet 로그",
    implementation: "실제 제작 방식",
    property: "부동산",
    service: "방문 목적",
    company: "회사명",
    notes: "메모",
    submit: "체크인 제출",
    reset: "샘플 로그 되돌리기",
    companyPlaceholder: "예: Bright Crew",
    notesPlaceholder: "선택 입력",
    sheetColumns: ["timestamp", "property", "service", "company", "notes"],
    notification: "이메일 알림 미리보기",
    script: "Apps Script 샘플 받기",
    steps: [
      "Google Sheet에 Check-ins, Properties, Settings 탭 생성",
      "Apps Script Web App에서 property 파라미터를 읽어 모바일 폼 렌더링",
      "제출 시 Check-ins 탭에 행 추가 후 관리자에게 이메일 알림",
      "4개 property별 링크를 QR 코드로 출력하고 현장에 부착",
    ],
    linksHelp: "각 링크가 실제 QR 코드에 들어갈 주소입니다. 스캔한 위치는 사용자가 고르지 않아도 자동으로 기록됩니다.",
    submitted: (property: string) => `${property} 체크인을 샘플 로그에 추가했습니다.`,
  },
  en: {
    heading: "QR vendor check-in system",
    lead: "A portfolio demo for property-specific QR links. Vendors scan the posted code, the property is selected automatically, and each submission is logged to Google Sheets with an email notification.",
    workflow: "Workflow",
    preview: "Mobile check-in preview",
    signs: "4 property QR links",
    sheet: "Google Sheet log",
    implementation: "How it would be built",
    property: "Property",
    service: "Service type",
    company: "Company name",
    notes: "Optional notes",
    submit: "Submit check-in",
    reset: "Reset sample log",
    companyPlaceholder: "Example: Bright Crew",
    notesPlaceholder: "Optional",
    sheetColumns: ["timestamp", "property", "service", "company", "notes"],
    notification: "Email notification preview",
    script: "Download Apps Script sample",
    steps: [
      "Create Check-ins, Properties, and Settings tabs in one Google Sheet",
      "Deploy an Apps Script Web App that reads the property parameter and renders a mobile form",
      "Append each submission to the Check-ins sheet and send a manager email notification",
      "Print one QR sign per property using the generated property-specific links",
    ],
    linksHelp: "Each link is what goes inside the printed QR code. The vendor never has to choose the property manually.",
    submitted: (property: string) => `Added a sample check-in for ${property}.`,
  },
};

export function VendorCheckInPanel({ locale = "ko" }: VendorCheckInPanelProps) {
  const text = copy[locale];
  const [selectedPropertyId, setSelectedPropertyId] = useState(propertySites[0].id);
  const [serviceType, setServiceType] = useState(serviceTypes[0]);
  const [companyName, setCompanyName] = useState("Bright Crew");
  const [notes, setNotes] = useState("");
  const [rows, setRows] = useState(seededRows);
  const [message, setMessage] = useState("");

  const selectedProperty = propertySites.find((site) => site.id === selectedPropertyId) ?? propertySites[0];
  const propertyLinks = useMemo(
    () =>
      propertySites.map((site) => ({
        ...site,
        url: `https://script.google.com/macros/s/DEPLOYMENT_ID/exec?property=${site.id}`,
      })),
    [],
  );

  function submitCheckIn() {
    const nextRow = {
      id: `row-${Date.now()}`,
      timestamp: new Intl.DateTimeFormat(locale === "en" ? "en-US" : "ko-KR", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date()),
      propertyName: selectedProperty.name,
      serviceType,
      companyName: companyName.trim() || "Unknown vendor",
      notes: notes.trim(),
    };
    setRows((current) => [nextRow, ...current].slice(0, 8));
    setMessage(text.submitted(selectedProperty.name));
    setNotes("");
  }

  function resetRows() {
    setRows(seededRows);
    setMessage("");
  }

  return (
    <section className="vendor-checkin-grid">
      <aside className="panel controls-panel vendor-flow-panel">
        <div className="panel-heading">
          <span>{text.workflow}</span>
          <strong>04</strong>
        </div>
        <div className="vendor-step-list">
          {text.steps.map((step, index) => (
            <article key={step}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <span>{step}</span>
            </article>
          ))}
        </div>
        <a className="sample-link vendor-script-link" href={sampleFiles.vendorCheckInScript.href} download>
          {text.script}
        </a>
      </aside>

      <section className="panel vendor-phone-panel">
        <div className="panel-heading">
          <span>{text.preview}</span>
          <strong>{selectedProperty.shortName}</strong>
        </div>
        <div className="phone-shell">
          <div className="phone-topbar" />
          <div className="phone-property">
            <span>{text.property}</span>
            <strong>{selectedProperty.name}</strong>
            <small>{selectedProperty.address}</small>
          </div>
          <label>
            {text.service}
            <select value={serviceType} onChange={(event) => setServiceType(event.target.value)}>
              {serviceTypes.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </label>
          <label>
            {text.company}
            <input value={companyName} onChange={(event) => setCompanyName(event.target.value)} placeholder={text.companyPlaceholder} />
          </label>
          <label>
            {text.notes}
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder={text.notesPlaceholder} rows={3} />
          </label>
          <button className="primary-button" type="button" onClick={submitCheckIn}>
            {text.submit}
          </button>
          {message && <p>{message}</p>}
        </div>
      </section>

      <section className="panel vendor-links-panel">
        <div className="panel-heading">
          <span>{text.signs}</span>
          <strong>{propertyLinks.length}</strong>
        </div>
        <p className="control-note">{text.linksHelp}</p>
        <div className="qr-card-grid">
          {propertyLinks.map((site) => (
            <button
              className={site.id === selectedProperty.id ? "qr-card active" : "qr-card"}
              key={site.id}
              type="button"
              onClick={() => setSelectedPropertyId(site.id)}
            >
              <DemoQrMark seed={site.id} />
              <strong>{site.shortName}</strong>
              <span>{site.url}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel vendor-sheet-panel">
        <div className="panel-heading">
          <span>{text.sheet}</span>
          <strong>{rows.length}</strong>
        </div>
        <div className="table-wrap vendor-log-wrap">
          <table>
            <thead>
              <tr>
                {text.sheetColumns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.timestamp}</td>
                  <td>{row.propertyName}</td>
                  <td>{row.serviceType}</td>
                  <td>{row.companyName}</td>
                  <td>{row.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="text-button" type="button" onClick={resetRows}>
          {text.reset}
        </button>
      </section>

      <section className="panel vendor-notification-panel">
        <div className="panel-heading">
          <span>{text.notification}</span>
          <strong>email</strong>
        </div>
        <pre>{`Subject: Vendor check-in - ${rows[0]?.propertyName ?? selectedProperty.name}

Property: ${rows[0]?.propertyName ?? selectedProperty.name}
Service: ${rows[0]?.serviceType ?? serviceType}
Company: ${rows[0]?.companyName ?? companyName}
Notes: ${rows[0]?.notes || "-"}
Timestamp: ${rows[0]?.timestamp ?? "new submission"}`}</pre>
      </section>
    </section>
  );
}

function DemoQrMark({ seed }: { seed: string }) {
  const cells = Array.from({ length: 49 }, (_, index) => {
    const code = seed.charCodeAt(index % seed.length);
    return (code + index * 7) % 5 === 0 || index < 7 || index % 7 === 0 || index > 41;
  });

  return (
    <span className="demo-qr" aria-hidden="true">
      {cells.map((active, index) => (
        <i className={active ? "active" : ""} key={`${seed}-${index}`} />
      ))}
    </span>
  );
}
