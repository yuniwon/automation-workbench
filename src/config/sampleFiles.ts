const appBaseUrl = import.meta.env.BASE_URL || "/";

function publicPath(path: string) {
  return `${appBaseUrl}${path}`.replace(/\/{2,}/g, "/");
}

export const sampleFiles = {
  cleanup: {
    href: publicPath("samples/sample-orders-dirty.csv"),
    label: "정리 샘플 CSV",
  },
  comparisonBase: {
    href: publicPath("samples/sample-orders-dirty.csv"),
    label: "파일 A 샘플",
  },
  comparisonTarget: {
    href: publicPath("samples/sample-orders-compare.csv"),
    label: "파일 B 샘플",
  },
};
