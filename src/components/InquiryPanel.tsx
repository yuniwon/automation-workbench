import { useState } from "react";
import type { AppLocale } from "../app/App";
import {
  buildContactHref,
  buildInquiryText,
  contactConfig,
  getSourceFromSearch,
  getToolFromSearch,
  inquiryChecklist,
  privacyUrl,
  serviceInquiryUrl,
  toolUrl,
} from "../config/contact";

interface InquiryPanelProps {
  locale?: AppLocale;
}

const copy = {
  ko: {
    kicker: "무료 도구 + 맞춤 제작",
    title: "이 도구를 내 파일 구조에 맞게 바꾸고 싶다면",
    body: "샘플 파일과 반복 규칙을 보내주시면 정리, 집계, 리포트, 알림 발송까지 업무 흐름에 맞춰 제작할 수 있습니다.",
    privacyPrefix: "파일은 브라우저 안에서 처리됩니다.",
    privacyLink: "개인정보 안내",
    steps: ["파일 구조 확인", "반복 작업 분해", "자동화 제작", "사용법 전달"],
    checklistTitle: "문의서에 포함될 항목",
    checklist: inquiryChecklist,
    scope: "제작 범위 보기",
    copyInquiry: "문의서 복사",
    copiedInquiry: "문의서 복사됨",
    copyLink: "도구 링크 복사",
    copiedLink: "도구 링크 복사됨",
    contactLabel: contactConfig.label,
  },
  en: {
    kicker: "Free tool + custom automation",
    title: "Need this adapted to your own file structure?",
    body: "Send a sample file and the rules you repeat manually. I can turn the workflow into cleanup, summaries, reports, and follow-up automation.",
    privacyPrefix: "Files are processed in your browser.",
    privacyLink: "Privacy note",
    steps: ["Review file structure", "Break down repeat work", "Build automation", "Share setup notes"],
    checklistTitle: "What to include in your request",
    checklist: ["Workflow to automate", "Current file format", "Repeated manual steps", "Time spent manually", "Needed output", "Deadline and sample file"],
    scope: "View service scope",
    copyInquiry: "Copy request draft",
    copiedInquiry: "Request draft copied",
    copyLink: "Copy tool link",
    copiedLink: "Tool link copied",
    contactLabel: "Ask about custom automation",
  },
};

export function InquiryPanel({ locale = "ko" }: InquiryPanelProps) {
  const text = copy[locale];
  const [copied, setCopied] = useState<"inquiry" | "link" | null>(null);
  const inboundSource = typeof window === "undefined" ? "" : getSourceFromSearch(window.location.search);
  const inboundTool = typeof window === "undefined" ? "" : getToolFromSearch(window.location.search);
  const contactHref = buildContactHref(inboundSource, inboundTool, locale);
  const inquiryText = buildInquiryText(inboundSource, inboundTool, locale);

  async function copyText(value: string, type: "inquiry" | "link") {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
    }
    setCopied(type);
    window.setTimeout(() => setCopied(null), 1800);
  }

  return (
    <section className="inquiry-panel">
      <div>
        <p className="panel-kicker">{text.kicker}</p>
        <h2>{text.title}</h2>
        <p>{text.body}</p>
        <a className="tool-url" href={toolUrl} target="_blank" rel="noreferrer">
          {toolUrl}
        </a>
        <p className="privacy-note">
          {text.privacyPrefix}{" "}
          <a href={privacyUrl} target="_blank" rel="noreferrer">
            {text.privacyLink}
          </a>
        </p>
      </div>
      <div className="inquiry-steps">
        {text.steps.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
      <div className="inquiry-request">
        <strong>{text.checklistTitle}</strong>
        <div>
          {text.checklist.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <div className="inquiry-actions">
        <a className="ghost-link" href={serviceInquiryUrl} target="_blank" rel="noreferrer">
          {text.scope}
        </a>
        {contactHref && (
          <a className="primary-link" href={contactHref} target="_blank" rel="noreferrer">
            {text.contactLabel}
          </a>
        )}
        <button className="ghost-button" type="button" onClick={() => copyText(inquiryText, "inquiry")}>
          {copied === "inquiry" ? text.copiedInquiry : text.copyInquiry}
        </button>
        <button className="ghost-button" type="button" onClick={() => copyText(contactConfig.shareText, "link")}>
          {copied === "link" ? text.copiedLink : text.copyLink}
        </button>
      </div>
    </section>
  );
}
