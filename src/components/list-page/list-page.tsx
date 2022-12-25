import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { ElementStates } from "../../types/element-states";
import { IListItem } from "../../types/listpage";
import { delayS } from "../../utils/delays";
import { getRandomNumber } from "../../utils/get-random-number";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ILinkedList, LinkedList } from "./utils";

import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const LIMIT_SIZE_MAX = 10;
  const LIMIT_SIZE_MIN = 6;
  const [value, setValue] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>();
  const [arrayOfCircles, setArrayCircles] = useState<Array<IListItem>>([]);
  const [linkedList, setLinkedList] = useState<ILinkedList<string>>();
  const [activeLoadButton, setActiveLoadButton] = useState<string>("");
  const [disabledAddToHeadBtn, setDisabledAddToHeadBtn] = useState<boolean>(false);
  const [disabledAddToTailBtn, setDisabledAddToTailBtn] = useState<boolean>(false);
  const [disabledAddToIndexBtn, setDisabledAddToIndexBtn] = useState<boolean>(false);
  const [disabledRemoveToIndexBtn, setDisabledRemoveToIndexBtn] = useState<boolean>(false);

  useEffect(() => {
    if (!value || arrayOfCircles.length > LIMIT_SIZE_MAX || (isLoad && activeLoadButton !== "" && activeLoadButton !== "addToHead")) {
      setDisabledAddToHeadBtn(true);
    } else {
      setDisabledAddToHeadBtn(false);
    }
  }, [value, arrayOfCircles, isLoad, activeLoadButton]);

  useEffect(() => {
    if (!value || arrayOfCircles.length > LIMIT_SIZE_MAX || (isLoad && activeLoadButton !== "" && activeLoadButton !== "addToTail")) {
      setDisabledAddToTailBtn(true);
    } else {
      setDisabledAddToTailBtn(false);
    }
  }, [value, arrayOfCircles, isLoad, activeLoadButton]);

  useEffect(() => {
    if (
      !value ||
      !idx ||
      (isLoad && activeLoadButton !== "" && activeLoadButton !== "addToIndex") ||
      idx > arrayOfCircles.length - 1 ||
      arrayOfCircles.length > LIMIT_SIZE_MAX
    ) {
      setDisabledAddToIndexBtn(true);
    } else {
      setDisabledAddToIndexBtn(false);
    }
  }, [value, idx, arrayOfCircles, isLoad, activeLoadButton]);
 
  useEffect(() => {
    if (
      !idx ||
      activeLoadButton !== "" ||
      idx > arrayOfCircles.length - 1 ||
      (isLoad && activeLoadButton !== "" && activeLoadButton !== "removeToIndex")
    ) {
      setDisabledRemoveToIndexBtn(true);
    } else {
      setDisabledRemoveToIndexBtn(false);
    }
  }, [value, idx, arrayOfCircles, isLoad, activeLoadButton]);

  const copyArr = [...arrayOfCircles];

  useEffect(() => {
    const randomArrForList = Array.from(
      { length: LIMIT_SIZE_MIN },
      () => `${getRandomNumber(0, 100)}`
    );

    const initRenderCircle: Array<IListItem> = randomArrForList.map(
      (element) => {
        return { name: element, state: ElementStates.Default };
      }
    );

    const newLinkedList = new LinkedList<string>(randomArrForList);

    setLinkedList(newLinkedList);
    setArrayCircles(initRenderCircle.reverse());
  }, []);

  const addUpperCircleAddind = (
    arr: any,
    index: number,
    value: string | null
  ) => {
    const firstElement = arr[index];
    arr[index] = {
      ...firstElement,
      adding: true,
      actionCircle: {
        name: value ? value : "",
      },
    };
  };

  const removeUpperCircleAddind = (arr: any, index: number) => {
    const firstElement = arr[index];
    arr[index] = {
      ...firstElement,
      adding: false,
      actionCircle: {
        name: value ? value : "",
      },
    };
  };

  const addLowerCircleRemoval = (
    arr: any,
    index: number,
    value?: string | null
  ) => {
    const firstElement = arr[index];
    arr[index] = {
      ...firstElement,
      deleting: true,
      actionCircle: {
        name: value ? value : "",
      },
    };
  };

  const addToHead = async () => {
    setIsLoad(true);
    setActiveLoadButton("addToHead");
    linkedList!.addToHead(value);
    const currentHeadValue = linkedList!.getNodeByIndex(0);
    addUpperCircleAddind(copyArr, 0, currentHeadValue);
    setArrayCircles([...copyArr]);
    await delayS();
    removeUpperCircleAddind(copyArr, 0);
    copyArr.unshift({
      name: currentHeadValue ? currentHeadValue : "",
      state: ElementStates.Modified,
    });
    setArrayCircles([...copyArr]);
    await delayS();
    copyArr[0].state = ElementStates.Default;
    setArrayCircles([...copyArr]);
    await delayS();
    setValue("");
    setActiveLoadButton("");
    setIsLoad(false);
  };

  const removeFromHead = async () => {
    setIsLoad(true);
    setActiveLoadButton("removeFromHead");
    copyArr[0].name = "";
    const deletedElement = linkedList!.deleteHead();
    addLowerCircleRemoval(copyArr, 0, deletedElement);
    setArrayCircles([...copyArr]);
    await delayS();
    copyArr.shift();
    copyArr[0].state = ElementStates.Default;
    setArrayCircles([...copyArr]);
    await delayS();
    setActiveLoadButton("");
    setIsLoad(false);
  };

  const addToTail = async () => {
    setIsLoad(true);
    setActiveLoadButton("addToTail");
    linkedList!.addToTail(value);
    const tailIdx = linkedList!.getSize() - 1;
    const TailValue = linkedList!.getNodeByIndex(tailIdx);
    addUpperCircleAddind(copyArr, tailIdx - 1, TailValue);
    setArrayCircles([...copyArr]);
    await delayS();
    removeUpperCircleAddind(copyArr, tailIdx - 1);
    copyArr[copyArr.length] = {
      ...copyArr[copyArr.length],
      name: TailValue ? TailValue : "",
      state: ElementStates.Modified,
      adding: false,
      actionCircle: undefined,
    };
    setArrayCircles([...copyArr]);
    await delayS();
    copyArr.forEach((el) => (el.state = ElementStates.Default));
    setArrayCircles([...copyArr]);
    await delayS();
    setValue("");
    setActiveLoadButton("");
    setIsLoad(false);
  };

  const removeFromTail = async () => {
    setIsLoad(true);
    setActiveLoadButton("removeFromTail");
    const length = copyArr.length;
    copyArr[length - 1].name = "";
    const removeElement = linkedList!.deleteTail();
    addLowerCircleRemoval(copyArr, length - 1, removeElement);
    setArrayCircles([...copyArr]);
    await delayS();
    copyArr.pop();
    copyArr[length - 2].state = ElementStates.Default;
    setArrayCircles([...copyArr]);
    await delayS();
    setActiveLoadButton("");
    setIsLoad(false);
  };

  const addToIndex = async (idx: number) => {
    setIsLoad(true);
    setActiveLoadButton("addToIndex");
    const copyArr = [...arrayOfCircles];
    linkedList!.insertByIndex(value, idx);
    const newValue = linkedList!.getNodeByIndex(idx);
    for (let i = 0; i <= idx!; i++) {
      copyArr[i] = {
        ...copyArr[i],
        adding: true,
        actionCircle: {
          name: newValue ? newValue : "",
        },
      };
      if (i > 0)
        copyArr[i - 1] = {
          ...copyArr[i - 1],
          adding: false,
          actionCircle: undefined,
          state: ElementStates.Changing,
        };
      setArrayCircles([...copyArr]);
      await delayS();
    }
    copyArr[idx!] = {
      ...copyArr[idx!],
      adding: false,
      actionCircle: undefined,
    };
    copyArr.splice(idx!, 0, {
      name: newValue ? newValue : "",
      state: ElementStates.Modified,
    });
    setArrayCircles([...copyArr]);
    await delayS();
    copyArr.forEach((el) => (el.state = ElementStates.Default));
    setValue("");
    setIdx(undefined);
    setActiveLoadButton("");
    setIsLoad(false);
  };

  const removeToIndex = async (idx: number) => {
    setIsLoad(true);
    setActiveLoadButton("removeToIndex");
    const deletedElement = linkedList!.removeNodeByIndex(idx);
    for (let i = 0; i <= idx!; i++) {
      copyArr[i].state = ElementStates.Changing;
      if (i === idx) copyArr[i].noArrow = true;
      setArrayCircles([...copyArr]);
      await delayS();
    }
    addLowerCircleRemoval(copyArr, idx!, deletedElement);
    copyArr[idx].name = "";
    setArrayCircles([...copyArr]);
    await delayS();
    copyArr.splice(idx!, 1);
    copyArr.forEach((element) => (element.state = ElementStates.Default));
    setIdx(undefined);
    setArrayCircles([...copyArr]);
    await delayS();
    setActiveLoadButton("");
    setIsLoad(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.input_container}>
          <Input
            extraClass={styles.input}
            disabled={isLoad && activeLoadButton !== ""}
            placeholder="Введите значение"
            min={1}
            value={value || ""}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setValue(e.currentTarget.value)
            }
            isLimitText={true}
            maxLength={4}
          />
          <Button
            isLoader={activeLoadButton === "addToHead"}
            disabled={disabledAddToHeadBtn}
            text="Добавить в head"
            type="button"
            onClick={() => addToHead()}
          />
          <Button
            isLoader={activeLoadButton === "addToTail"}
            disabled={disabledAddToTailBtn}
            text="Добавить в tail"
            type="button"
            onClick={() => addToTail()}
          />
          <Button
            disabled={arrayOfCircles.length <= 1 || (isLoad && activeLoadButton !== "" && activeLoadButton !== "removeFromHead")}
            isLoader={activeLoadButton === "removeFromHead"}
            text="Удалить из head"
            type="button"
            onClick={() => removeFromHead()}
          />
          <Button
            disabled={arrayOfCircles.length <= 1 || (isLoad && activeLoadButton !== "" && activeLoadButton !== "removeFromTail")}
            isLoader={activeLoadButton === "removeFromTail"}
            text="Удалить из tail"
            type="button"
            onClick={() => removeFromTail()}
          />
        </div>

        <div className={styles.index_container}>
          <Input
            type="text"
            width={"100%"}
            extraClass={styles.input}
            disabled={isLoad && activeLoadButton !== ""}
            placeholder="Введите индекс"
            isLimitText={true}
            maxLength={1}
            max={10}
            value={idx || ""}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setIdx(Number(e.currentTarget.value.replace(/[^0-9]/g, "")))
            }
          />
          <Button
            disabled={disabledAddToIndexBtn}
            isLoader={activeLoadButton === "addToIndex"}
            text="Добавить по индексу"
            type="button"
            onClick={() => idx && addToIndex(idx)}
          />
          <Button
            disabled={disabledRemoveToIndexBtn}
            isLoader={activeLoadButton === "removeToIndex"}
            text="Удалить по индексу"
            type="button"
            onClick={() => idx && removeToIndex(idx)}
          />
        </div>
      </div>
      <ul className={styles.circle_block}>
        {arrayOfCircles.map((item, index) => {
          return (
            <li className={styles.circle_list} key={nanoid()}>
              <Circle
                state={item.state}
                letter={item.name}
                index={index}
                head={index === 0 && !item.adding && !item.deleting ? "head" : ""}
                tail={
                  index === arrayOfCircles.length - 1 &&
                  !item.adding &&
                  !item.deleting ? "tail" : ""
                }
              />
              {idx !== arrayOfCircles.length - 1 && (
                <ArrowIcon
                  fill={
                    item.state === ElementStates.Changing && !item.noArrow
                      ? "#d252e1"
                      : "#0032FF"
                  }
                />
              )}
              {item.adding && (
                <Circle
                  extraClass={styles.upperCircle}
                  state={ElementStates.Changing}
                  letter={item.actionCircle?.name}
                  isSmall={true}
                />
              )}
              {item.deleting && (
                <Circle
                  extraClass={styles.lowerCircle}
                  state={ElementStates.Changing}
                  letter={item.actionCircle?.name}
                  isSmall={true}
                />
              )}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
