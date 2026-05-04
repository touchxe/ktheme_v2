/**
 * vendor/pretext.js
 *
 * 이 파일은 gstack `/design-html`이 PNG 목업을 semantic HTML로 변환할 때
 * computed text layout 계산에 사용하는 "Pretext" 라이브러리의 자리표시자입니다.
 *
 * 실제 사용 시:
 * 1. 원본 gstack 저장소에서 pretext.js (약 30KB)를 다운로드
 *    https://github.com/garrytan/gstack/blob/main/vendor/pretext.js
 * 2. 또는 Garry Tan의 gstack 문서 링크에서 얻기
 * 3. 이 파일을 덮어쓰기
 *
 * Pretext는 canvas + offscreen rendering을 이용해:
 * - 주어진 폰트/사이즈/line-height에서 텍스트가 실제로 차지할 픽셀 크기 계산
 * - 목업 PNG와 HTML 간 텍스트 레이아웃 정합성 검증
 * - Responsive breakpoint에서의 텍스트 reflow 시뮬레이션
 *
 * 실제 파일이 필요한 시점까지는 이 자리표시자로도 동작 (design-html 스킬은
 * pretext 부재 시 폴백으로 단순 DOM parsing 사용).
 */

console.warn(
  '[pretext.js] 자리표시자 파일입니다. 정확한 레이아웃 계산을 위해 ' +
  '원본 pretext.js로 교체하세요. 부재 시 gstack /design-html은 단순 ' +
  'DOM parsing으로 폴백합니다.'
);

// 최소 인터페이스 (폴백 구현)
export const pretext = {
  measure(text, { fontFamily, fontSize, lineHeight }) {
    // 간단한 근사치: 평균 문자 너비 * 길이
    const avgCharWidth = fontSize * 0.55;
    return {
      width: text.length * avgCharWidth,
      height: fontSize * parseFloat(lineHeight || 1.5),
    };
  },
  reflow(text, { maxWidth, ...style }) {
    // 단순 word-break 시뮬레이션
    const words = text.split(/\s+/);
    const { width: avgWordWidth } = this.measure(words[0] || '', style);
    const wordsPerLine = Math.floor(maxWidth / (avgWordWidth + 8));
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(' '));
    }
    return lines;
  },
};

export default pretext;
