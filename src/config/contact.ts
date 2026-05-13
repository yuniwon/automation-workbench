export const toolUrl = "https://yuniwon.github.io/automation-workbench/";

const mailSubject = encodeURIComponent("엑셀/CSV 자동화 맞춤 제작 문의");
const mailBody = encodeURIComponent(`안녕하세요.

무료 엑셀/CSV 정리·비교 도구를 사용해보고 문의드립니다.
도구 링크: ${toolUrl}

제가 자동화하고 싶은 업무:
- 여기에 적어주세요

현재 파일 형식:
- CSV / XLSX / 구글시트 / 기타:

반복해서 하는 작업:
- 여기에 적어주세요

샘플 파일 공유 가능 여부:
- 가능 / 어려움
`);

export const contactConfig = {
  href: `mailto:dnjsdndus@gmail.com?subject=${mailSubject}&body=${mailBody}`,
  label: "이메일로 맞춤 제작 문의",
  inquiryText:
    "안녕하세요. 무료 엑셀/CSV 정리·비교 도구를 사용해보고 문의드립니다. 현재 쓰는 파일 구조와 반복 작업에 맞춘 자동화 제작 가능 범위와 견적을 안내해주세요.",
  shareText: `무료 엑셀/CSV 정리·비교 도구: ${toolUrl}`,
};
