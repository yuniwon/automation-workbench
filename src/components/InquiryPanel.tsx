import { useState } from "react";
import { buildContactHref, contactConfig, getSourceFromSearch, toolUrl } from "../config/contact";

export function InquiryPanel() {
  const [copied, setCopied] = useState<"inquiry" | "link" | null>(null);
  const inboundSource = typeof window === "undefined" ? "" : getSourceFromSearch(window.location.search);
  const contactHref = buildContactHref(inboundSource);

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
        <p className="panel-kicker">무료 도구 + 맞춤 제작</p>
        <h2>이 도구를 내 파일 구조에 맞게 바꾸고 싶다면</h2>
        <p>
          샘플 파일과 반복 규칙을 보내주시면 정리, 집계, 리포트, 알림 발송까지
          업무 흐름에 맞춰 제작할 수 있습니다.
        </p>
        <a className="tool-url" href={toolUrl} target="_blank" rel="noreferrer">
          {toolUrl}
        </a>
      </div>
      <div className="inquiry-steps">
        <span>파일 구조 확인</span>
        <span>반복 작업 분해</span>
        <span>자동화 제작</span>
        <span>사용법 전달</span>
      </div>
      <div className="inquiry-actions">
        {contactHref && (
          <a className="primary-link" href={contactHref} target="_blank" rel="noreferrer">
            {contactConfig.label}
          </a>
        )}
        <button className="ghost-button" type="button" onClick={() => copyText(contactConfig.inquiryText, "inquiry")}>
          {copied === "inquiry" ? "문의 문구 복사됨" : "문의 문구 복사"}
        </button>
        <button className="ghost-button" type="button" onClick={() => copyText(contactConfig.shareText, "link")}>
          {copied === "link" ? "도구 링크 복사됨" : "도구 링크 복사"}
        </button>
      </div>
    </section>
  );
}
