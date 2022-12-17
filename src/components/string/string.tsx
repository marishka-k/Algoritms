import { nanoid } from "nanoid";
import React, { FC, FormEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { delayN } from "../../utils/delays";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./string.module.css";

export const StringComponent: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [reversArray, setReversArray] = useState<Array<string>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (!inputValue) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [inputValue]);

  const onChange = (evt: FormEvent<HTMLInputElement>): void => {
    const string = evt.currentTarget.value.trim();
    setInputValue(string);
  };

  const stateCircle = (
    index: number,
    currentIndex: number,
    arr: Array<string | number>
  ) => {
    let arrLength = arr.length - 1;

    if (currentIndex < index || currentIndex > arrLength - index) {
      return ElementStates.Modified;
    }
    if (currentIndex === index || currentIndex === arrLength - index) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  };

  const swap = (arr: Array<string>, left: number, right: number): void => {
    [arr[left], arr[right - left]] = [arr[right - left], arr[left]];
  };

  const revers = async (string: string): Promise<Array<string>> => {
    const arrayOfLetters = string.split("");
    let arrayLength = arrayOfLetters.length;

    setCurrentIndex(0);
    setIsLoad(true);
    setReversArray([...arrayOfLetters]);
    await delayN();

    for (let i = 0; i < Math.floor(arrayLength / 2); i++) {
      swap(arrayOfLetters, i, arrayLength - 1);
      setCurrentIndex((i) => i + 1);
      setReversArray([...arrayOfLetters]);
      await delayN();
    }

    setCurrentIndex((i) => i + 1);
    setIsLoad(false);

    return arrayOfLetters;
  };

  const onClick = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    revers(inputValue);
    setInputValue("");
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.content}>
        <Input
          isLimitText={true}
          maxLength={11}
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text="Развернуть"
          extraClass="ml-6"
          disabled={disabledButton}
          onClick={onClick}
          isLoader={isLoad}
        />
      </div>
      <ul className={styles.list}>
        {reversArray.map((letter: string, index: number) => {
          return (
            <Circle
              key={nanoid()}
              index={index + 1}
              letter={letter}
              state={stateCircle(currentIndex, index, reversArray)}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
