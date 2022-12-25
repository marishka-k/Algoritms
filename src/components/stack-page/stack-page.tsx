import { nanoid } from "nanoid";
import React, { FormEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { IStack, Stack } from "./utils";
import { IStackObject } from "../../types/stack-page";
import { delayS } from "../../utils/delays";

import styles from "./stack-page.module.css";


export const StackPage: React.FC = () => {
  const stackInstanse = new Stack<string>();

  const [arr, setArr] = useState<Array<IStackObject>>([]);
  const [stackValues, setStackValues] = useState<IStack<string>>(stackInstanse);
  const [inputValue, setInputValue] = useState<string>("");  
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [disabledAddButton, setDisabledAddButton] = useState<boolean>(false);
  const [disabledDelButton, setDisabledDelButton] = useState<boolean>(true);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [activeLoadButton, setActiveLoadButton] = useState<string>("");

  const onChange = (evt: FormEvent<HTMLInputElement>): void => {
    const string = evt.currentTarget.value.trim();
    setInputValue(string);
  };

  useEffect(() => {
    if (!inputValue || isLoad) {
      setDisabledAddButton(true);
    } else {
      setDisabledAddButton(false);
    }
  }, [inputValue, isLoad]);

  useEffect(() => {
    if (arr.length === 8 || isLoad) {
      setInputDisabled(true);
    } else {
      setInputDisabled(false);
    }
  }, [arr, isLoad]);

  useEffect(() => {
    if (arr.length < 1 || isLoad) {
      setDisabledDelButton(true);
    } else {
      setDisabledDelButton(false);
    }
  }, [arr, isLoad]);

  const push = async () => {
    setIsLoad(true);
    setActiveLoadButton("push")
    stackValues.push(inputValue);
    if (arr.length >= 1){
      arr[arr.length-1].head = undefined
    }
    setArr([...arr])
    arr.push({
      item: inputValue,
      state: ElementStates.Changing,
      head: "top",     
    });    
    setArr([...arr]);   
    await delayS();
    arr[arr.length - 1].state = ElementStates.Default;
    setArr([...arr]);
    setInputValue("");
    setActiveLoadButton("")
    setIsLoad(false);
  };

  const pop = async () => {
    setIsLoad(true);
    setActiveLoadButton("pop")
    stackValues!.pop();
    const size = stackValues.getSize();
    if (size !== 0) {
      arr[arr.length - 1].state = ElementStates.Changing;
      setArr([...arr]);
      arr.pop();
      
      await delayS();
      arr[arr.length - 1].head = "top";
      setArr([...arr]);
    } else {
      setArr([]);
    }
    setActiveLoadButton("")
    setIsLoad(false);
  };

  const cleen = () => {
    setArr([]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.content}>
        <div className={styles.input_group}>
          <Input
            disabled={inputDisabled}
            onChange={onChange}
            isLimitText={true}
            maxLength={4}
            value={inputValue}
          />
          <Button
            disabled={disabledAddButton}
            isLoader={activeLoadButton === "push"}
            text="Добавить"
            onClick={() => push()}
          />
          <Button
            disabled={disabledDelButton}
            isLoader={activeLoadButton === "pop"}
            text="Удалить"
            onClick={() => pop()}            
          />
        </div>
        <Button
          text="Очистить"
          onClick={() => cleen()}
          disabled={disabledDelButton}
        />
      </div>
      <ul className={styles.list}>
        {arr.map((item, index: number) => {
          return (
            <Circle
              key={nanoid()}
              letter={item.item}
              index={index}
              state={item.state}
              head={item.head}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
