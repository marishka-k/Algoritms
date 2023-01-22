import { ElementStates } from "./element-states";

export interface IListItem {
  name?: string;
  head?: string;
  tail?: string;
  state?: ElementStates;
  adding?: boolean;
  deleting?: boolean;
  noArrow?: boolean;
  actionCircle?: {
    name: string;
  }
}
