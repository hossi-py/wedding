// userAgent 확인
export const isiOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

export const isAndroid = /Android/.test(navigator.userAgent);
