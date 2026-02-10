export const applyCzechTypography = (text: string) =>
  text.replace(/(^|[\s([{“"‘])([ksvzouiabKSVZOUIAB])\s+/g, `$1$2\u00A0`)
