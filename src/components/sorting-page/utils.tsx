import { ElementStates } from "../../types/element-states";
import { TSortingPageItem } from "../../types/sorting-page";

export const bubbleSortTest = (
  arr: Array<TSortingPageItem>,
  direction: boolean
) => {
  const len = arr.length;
  let swapped = false;

  for (let i = 0; i < len; i++) {
    swapped = false;
    for (let j = 0; j < len - i - 1; j++) {
      let leftNumber = arr[j].number;
      let rightNumber = arr[j + 1].number;
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;

      if (direction ? leftNumber > rightNumber : leftNumber < rightNumber) {
        arr[j].number = rightNumber;
        arr[j + 1].number = leftNumber;
        swapped = true;
      }
      arr[j].state = ElementStates.Default;
      if (arr[j + 1]) {
        arr[j + 1].state = ElementStates.Default;
      }
    }

    arr[len - i - 1].state = ElementStates.Modified;

    if (!swapped) {
      arr[len - i - 1].state = ElementStates.Modified;
    }
  }
  return arr;
};

export const selectionSortTest = (
  arr: Array<TSortingPageItem>,
  direction: boolean
) => {
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (
        direction
          ? arr[j].number < arr[min].number
          : arr[j].number > arr[min].number
      ) {
        min = j;
      }
      if (j !== min) {
        arr[j].state = ElementStates.Default;
      }
    }
    if (min !== i) {
      let tmp = arr[i];
      arr[i] = arr[min];
      arr[min] = tmp;
      arr[i].state = ElementStates.Modified;
      arr[min].state = ElementStates.Default;
    } else {
      arr[i].state = ElementStates.Default;
      arr[min].state = ElementStates.Modified;
    }
  }
  return arr;
};
