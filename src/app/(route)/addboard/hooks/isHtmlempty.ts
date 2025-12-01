export default function isHtmlEmpty(html: string) {
  // html 내용이 비었음을 확인
  if (!html) return true;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const textContent = doc.body.textContent || '';

  return textContent.trim().length === 0;
}
