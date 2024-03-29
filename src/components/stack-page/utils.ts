export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = async (item: T) => {
    this.container.push(item);
  };

  pop = async () => {
    this.container.push();
  };

  peak = () => {
    if (this.getSize() !== 0) {
      return this.container[this.getSize() - 1];
    } else return null;
  };

  getSize = () => this.container.length;
  clear = () => (this.container.length = 0);
}
