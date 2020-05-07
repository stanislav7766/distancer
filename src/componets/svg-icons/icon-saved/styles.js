export const getXml = ({
  fill,
  width,
  height,
}) => `<svg width="${width}" height="${height}" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 20V1.875C0 0.839453 0.839453 0 1.875 0H13.125C14.1605 0 15 0.839453 15 1.875V20L7.5 15.625L0 20Z" fill="${fill}"/>
</svg>`;
