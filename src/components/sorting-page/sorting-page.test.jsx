import { ElementStates } from "../../types/element-states";
import { bubbleSortTest, selectionSortTest } from "./utils";

const testArr = [
  { number: 4, state: ElementStates.Default },
  { number: 3, state: ElementStates.Default },
  { number: 1, state: ElementStates.Default },
  { number: 5, state: ElementStates.Default },
  { number: 2, state: ElementStates.Default },
];

const resArrAscending = [
  { number: 1, state: ElementStates.Modified },
  { number: 2, state: ElementStates.Modified },
  { number: 3, state: ElementStates.Modified },
  { number: 4, state: ElementStates.Modified },
  { number: 5, state: ElementStates.Modified },
];

const resArrDescending = [
  { number: 5, state: ElementStates.Modified },
  { number: 4, state: ElementStates.Modified },
  { number: 3, state: ElementStates.Modified },
  { number: 2, state: ElementStates.Modified },
  { number: 1, state: ElementStates.Modified },
];

describe("Тестирование компонента SortingPage", () => {
  it("Корректно сортирует пустой массив выбором", () => {
    expect(selectionSortTest([])).toEqual([]);
  });

  it("Корректно сортирует массив из одного элемента выбором", () => {
    expect(
      selectionSortTest([{ number: 3, state: ElementStates.Default }])
    ).toStrictEqual([{ number: 3, state: ElementStates.Modified }]);
  });

  it("Корректно сортирует массив из нескольких элементов по возрастанию выбором", () => {
    expect(selectionSortTest(testArr, true)).toStrictEqual(resArrAscending);
  });

  it("Корректно сортирует массив из нескольких элементов по убыванию выбором", () => {
    expect(selectionSortTest(testArr, false)).toStrictEqual(resArrDescending);
  });

  it("Корректно сортирует пустой массив пузырьком", () => {
    expect(bubbleSortTest([])).toEqual([]);
  });

  it("Корректно сортирует массив из одного элемента пузырьком", () => {
    expect(
      bubbleSortTest([{ number: 3, state: ElementStates.Default }])
    ).toStrictEqual([{ number: 3, state: ElementStates.Modified }]);
  });

  it("Корректно сортирует массив из нескольких элементов по возрастанию пузырьком", () => {
    expect(bubbleSortTest(testArr, true)).toStrictEqual(resArrAscending);
  });

  it("Корректно сортирует массив из нескольких элементов по убыванию пузырьком", () => {
    expect(bubbleSortTest(testArr, false)).toStrictEqual(resArrDescending);
  });
});
