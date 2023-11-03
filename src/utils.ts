export const isiOS =
  /iPad|iPhone|iPod/i.test(navigator.userAgent) && !(window as any).MSStream;

export const isAndroid = /android/i.test(navigator.userAgent);
