import { ElementStates } from "./element-states";

export interface IStackObject {
  item?: string | undefined;
  state: ElementStates;
  head?: "top";
}
