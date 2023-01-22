export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getHead: () => { item: T | null; index: number };
  getTail: () => { item: T | null; index: number };
  isEmpty: () => boolean;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };

  getHead = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return { item: this.container[this.head], index: this.head };
  };

  getTail = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return { item: this.container[this.tail - 1], index: this.tail - 1 };
  };
  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  isEmpty = (): boolean => this.length === 0;
}