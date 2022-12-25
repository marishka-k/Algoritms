import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { delayS } from "../../utils/delays";
import { QueueObject } from "../../types/queue-page";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./utils";

import styles from "./queue-page.module.css";


export const QueuePage: React.FC = () => {
  const MAX_SIZE = 7;
  const queue = useMemo(() => new Queue<string>(MAX_SIZE), []);

  const itemDefault: Array<QueueObject> = Array.from(
    { length: MAX_SIZE },
    () => ({
      name: "",
      state: ElementStates.Default,
    })
  );

  const [elements, setElements] = useState<Array<QueueObject>>(itemDefault);
  const [inputValue, setInputValue] = useState<string>("");
  const [disabledAddButton, setDisabledAddButton] = useState<boolean>(false);
  const [disabledDelButton, setDisabledDelButton] = useState<boolean>(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onChange = (evt: FormEvent<HTMLInputElement>): void => {
    const string = evt.currentTarget.value.trim();
    setInputValue(string);
  };

  useEffect(() => {
    if (!inputValue || isDeleting) {
      setDisabledAddButton(true);
    } else {
      setDisabledAddButton(false);
    }
  }, [inputValue, isDeleting, elements]);

  useEffect(() => {
    if (queue.isEmpty() || isAdding) {
      setDisabledDelButton(true);
    } else {
      setDisabledDelButton(false);
    }
  }, [queue, isAdding, elements]);
  
  const enqueue = async () => {
    const arr = [...elements];
    if (arr[MAX_SIZE-1].tail === "tail") {
      console.log("Maximum length exceeded");
    } else {
      setIsAdding(true);
      queue.enqueue(inputValue);

      const head = queue.getHead();
      const tail = queue.getTail();

      arr[head.index].name = head.item;
      arr[head.index].head = "head";

      if (tail.index > 0) arr[tail.index - 1].tail = "";
      arr[tail.index].state = ElementStates.Changing;
      await delayS();
      arr[tail.index].name = tail.item;
      arr[tail.index].tail = "tail";
      setElements([...arr]);   
      arr[tail.index].state = ElementStates.Default;
      await delayS();
      
      setElements([...arr]);      
      resetInput();
      setIsAdding(false);
    }
  };

  const dequeue = async () => {
    const arr = [...elements]
    setIsDeleting(true);
  
  const head = queue.getHead();
  const tail = queue.getTail();
  if (head.index === tail.index) {
    clear();
  } else {
    queue.dequeue();   
    const head = queue.getHead();
    arr[head.index - 1].state = ElementStates.Changing;
    setElements([...arr]);
    await delayS();
    arr[head.index - 1].state = ElementStates.Default;
    setElements([...arr]);
    if (head.index > 0) {
      arr[head.index - 1].head = "";
      arr[head.index - 1].name = "";
    }
    arr[head.index].head = "head";
    arr[head.index].name = head.item;
  }
    setIsDeleting(false);
  };

  const clear = () => {
    queue.clear();
    setElements([...itemDefault]);
  };

  const resetInput = () => {
    setInputValue("");
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.content}>
        <div className={styles.input_group}>
          <Input
            onChange={onChange}
            disabled={isAdding || isDeleting }
            isLimitText={true}
            maxLength={4}
            value={inputValue}
          />
          <Button
            disabled={disabledAddButton}
            text="Добавить"
            onClick={enqueue}
            isLoader={isAdding}
          />
          <Button
            text="Удалить"
            onClick={dequeue}
            disabled={disabledDelButton}
            isLoader={isDeleting}
          />
        </div>
        <Button
          text="Очистить"
          onClick={clear}
          disabled={disabledDelButton}
        />
      </div>
      <ul className={styles.list}>
        {elements.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item.name as string}
              index={index}
              state={item.state}
              head={item.head}
              tail={item.tail}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
