import { useState } from "react";
import { contactConfig } from "../config/contact";

export function InquiryPanel() {
  const [copied, setCopied] = useState(false);

  async function copyInquiryText() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(contactConfig.inquiryText);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="inquiry-panel">
      <div>
        <h2>업무 파일에 맞춘 자동화가 필요하신가요?</h2>
        <p>
          현재 쓰는 엑셀, CSV, 구글시트 구조에 맞춰 반복 정리, 집계, 리포트,
          알림 발송까지 단계별로 자동화할 수 있습니다.
        </p>
      </div>
      <div className="inquiry-steps">
        <span>파일 구조 확인</span>
        <span>반복 작업 분해</span>
        <span>자동화 제작</span>
        <span>사용법 전달</span>
      </div>
      <div className="inquiry-actions">
        <button className="primary-button" type="button" onClick={copyInquiryText}>
          {copied ? "문의 문구 복사됨" : "문의 문구 복사"}
        </button>
        {contactConfig.href && (
          <a className="ghost-link" href={contactConfig.href} target="_blank" rel="noreferrer">
            {contactConfig.label}
          </a>
        )}
      </div>
    </section>
  );
}
