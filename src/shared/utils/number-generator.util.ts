export const generateRandomNumber = (numberOfDigits: number): number => {
  if(numberOfDigits < 1) {
    return 0;
  }

  const numberLength = 10 ** (numberOfDigits - 1);
  return Math.floor(Math.random() * (9 * numberLength) + 1 * numberLength);
}