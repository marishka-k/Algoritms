import React, { FormEvent, useEffect, useState } from "react";
import { delayS } from "../../utils/delays";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<number | string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [fibArray, setFibArray] = useState<Array<number>>();

  const onChange = (evt: FormEvent<HTMLInputElement>): void => {
    const number = evt.currentTarget.value.trim();
    setInputValue(number);
  };

  useEffect(() => {
    if (inputValue >= 1 && inputValue <= 19) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [inputValue]);

  const getFibNumber = (number: number) => {
    const newList = [0, 1];
    for (let i = 2; i <= number; i++) {
      const prevNum1 = newList[i - 1];
      const prevNum2 = newList[i - 2];
      newList.push(prevNum1 + prevNum2);
    }
    return newList;
  };

  const getFibArray = async (inputValue: number) => {
    setIsLoad(true);
    const array = getFibNumber(inputValue);
    for (let i = 0; i <= array.length; i++) {
      await delayS();
      setFibArray(array.slice(0, i + 1));
    }
    setIsLoad(false);
  };

  const onClickForm = (
    evt: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ): void => {
    evt.preventDefault();
    getFibArray(Number(inputValue));
    setInputValue("");
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.content} data-cy="content">
        <Input
          data-cy="input"
          disabled={isLoad ? true : false}
          type="number"
          isLimitText={true}
          maxLength={2}
          max={19}          
          value={inputValue}
          onChange={onChange}          
        />
        <Button
          data-cy="calculate"
          text="Рассчитать"
          extraClass="ml-6"
          disabled={disabledButton}
          onClick={onClickForm}
          isLoader={isLoad}          
        />
      </div>
      <ul className={styles.list}>
        {fibArray &&
          fibArray.map((elem, index) => {
            return <Circle key={index} letter={`${elem}`} index={index} />;
          })}
      </ul>
    </SolutionLayout>
  );
};
