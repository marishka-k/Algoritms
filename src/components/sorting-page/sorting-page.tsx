import React, { ChangeEvent, useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TSortingPageItem } from "../../types/sorting-page";
import { delayN } from "../../utils/delays";
import { getRandomNumber } from "../../utils/get-random-number";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./sorting-page.module.css";

export const descending: string = Direction.Descending;  // убывание
export const ascending: string = Direction.Ascending;    // возрастание

export const SortingPage: React.FC = () => {
  const [numbersArray, setNumbersArray] = useState<Array<TSortingPageItem>>([]);
  const [loadTarget, setLoadTarget] = useState<string>("");
  const [sortingSystem, setSortingSystem] = useState<string>("selection");

  const changeSortingSystem = (evt: ChangeEvent<HTMLInputElement>): void => {
    setSortingSystem(evt.target.value);
  };

  const getNumbersArray = (): Array<TSortingPageItem> => {
    const arr: Array<TSortingPageItem> = [];
    for (let i = 0; i < getRandomNumber(3, 17); i++) {
      arr.push({
        number: getRandomNumber(0, 100),
        state: ElementStates.Default,
      });
    }
    return arr;
  };

  useEffect(() => {
    setNumbersArray(getNumbersArray());
  }, []);

  const getNewArr = () => {
    setNumbersArray(getNumbersArray());
  };

  const bubbleSort = async (
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
        setNumbersArray([...arr]);
        await delayN();
        if (direction ? leftNumber > rightNumber : leftNumber < rightNumber) {
          arr[j].number = rightNumber;
          arr[j + 1].number = leftNumber;
          swapped = true;
        }
        arr[j].state = ElementStates.Default;
        if (arr[j + 1]) {
          arr[j + 1].state = ElementStates.Default;
        }
        setNumbersArray([...arr]);
      }

      arr[len - i - 1].state = ElementStates.Modified;

      if (!swapped) {
        arr[len - i - 1].state = ElementStates.Modified;
      }

      setNumbersArray([...arr]);
    }

    setLoadTarget("");
    return arr;
  };

  const selectionSort = async (
    arr: Array<TSortingPageItem>,
    direction: boolean
  ) => {
    let len = arr.length;

    for (let i = 0; i < len; i++) {
      // Находим наименьшее число в правой части массива
      let min = i;
      arr[min].state = ElementStates.Changing;
      for (let j = i + 1; j < len; j++) {
        arr[j].state = ElementStates.Changing;
        setNumbersArray([...arr]);
        await delayN();
        if (
          direction
            ? arr[j].number < arr[min].number
            : arr[j].number > arr[min].number
        ) {
          min = j;
          arr[j].state = ElementStates.Changing;
          arr[min].state =
            i === min ? ElementStates.Changing : ElementStates.Default;
        }
        if (j !== min) {
          arr[j].state = ElementStates.Default;
        }
        setNumbersArray([...arr]);
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
      setNumbersArray([...arr]);
    }
    setLoadTarget("");
    return arr;
  };

  const runSort = async (direction: string): Promise<void> => {
    setLoadTarget(direction);
    const compare = direction === Direction.Ascending;
    sortingSystem === "bubble"
      ? bubbleSort(numbersArray, compare)
      : selectionSort(numbersArray, compare);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.form}>
        <div className={styles.group}>
          <RadioInput
            disabled={loadTarget === ascending || loadTarget === descending}
            label="Выбор"
            name={"selection"}
            value={"selection"}
            checked={sortingSystem === "selection"}
            onChange={changeSortingSystem}
          />
          <RadioInput
            disabled={loadTarget === ascending || loadTarget === descending}
            extraClass="ml-20"
            label="Пузырек"
            name={"bubble"}
            value={"bubble"}
            checked={sortingSystem === "bubble"}
            onChange={changeSortingSystem}
          />
        </div>
        <div className={styles.group}>
          <Button
            isLoader={loadTarget === ascending}
            disabled={loadTarget === descending}
            text="По возрастанию"
            onClick={() => runSort(ascending)}
            sorting={Direction.Ascending}
            extraClass="mr-6"
          />
          <Button
            isLoader={loadTarget === descending}
            disabled={loadTarget === ascending}
            text="По убыванию"
            onClick={() => runSort(descending)}
            sorting={Direction.Descending}
            extraClass="mr-40"
          />
          <Button
            disabled={loadTarget === ascending || loadTarget === descending}
            text="Новый массив"
            onClick={getNewArr}
          />
        </div>
      </div>
      <ul className={styles.list}>
        {numbersArray.map((element: TSortingPageItem, index: number) => {
          return (
            <Column key={index} index={element.number} state={element.state} />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
