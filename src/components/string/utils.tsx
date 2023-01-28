export const swap = (arr: Array<string>, left: number, right: number): void => {
  [arr[left], arr[right - left]] = [arr[right - left], arr[left]];
};

export const revers = (string: string) => {
  const arrayOfLetters = string.split("");
  let arrayLength = arrayOfLetters.length;

  for (let i = 0; i < Math.floor(arrayLength / 2); i++) {
    swap(arrayOfLetters, i, arrayLength - 1);
  }

  return arrayOfLetters;
};
