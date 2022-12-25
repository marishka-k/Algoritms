import { ElementStates } from "./element-states";

export interface QueueObject {
  tail?: string;
  head?: string;
  name?: string | null;
  state: ElementStates;
}
