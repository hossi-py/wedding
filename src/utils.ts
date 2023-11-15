export const isiOS =
  /iPad|iPhone|iPod/i.test(navigator.userAgent) && !(window as any).MSStream;

export const isAndroid = /android/i.test(navigator.userAgent);

// 휴대폰 번호 format (숫자만 입력하면 하이픈 자동 추가)
export const formatPhoneNumber = (phoneNumber: string): string => {
  const onlyNumbers = phoneNumber.replace(/\D/g, '');

  if (onlyNumbers.length <= 3) {
    return onlyNumbers;
  } else if (onlyNumbers.length <= 7) {
    return onlyNumbers.slice(0, 3) + '-' + onlyNumbers.slice(3);
  } else {
    return (
      onlyNumbers.slice(0, 3) +
      '-' +
      onlyNumbers.slice(3, 7) +
      '-' +
      onlyNumbers.slice(7, 11)
    );
  }
};
