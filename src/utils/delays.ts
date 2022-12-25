import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../constants/delays";

export const delayN = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, DELAY_IN_MS);
    });
  };

  export const delayS = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, SHORT_DELAY_IN_MS);
    });
  };