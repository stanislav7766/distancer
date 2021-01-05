export const getClose = ({
  width,
  height,
  fillAccent,
}) => `<svg width="${width}" height="${height}" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 7L12 2M7 7L2 12M7 7L2 2L12 12" stroke="${fillAccent}" stroke-width="3" stroke-linecap="round"/>
  <path d="M3.5 3.5L2.5 2.5L2 2" stroke="${fillAccent}" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
