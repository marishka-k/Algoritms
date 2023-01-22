class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedList<T> {
  getSize: () => number;
  addToHead: (element: T) => void;
  addToTail: (element: T) => void;
  deleteHead: () => T | null;
  deleteTail: () => T | null;
  insertByIndex: (element: T, index: number) => void;
  getNodeByIndex: (index: number) => T | null;
  removeNodeByIndex: (index: number) => T | null;
}

export class LinkedList<T> implements ILinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  size: number;
  constructor(initialState?: T[]) {
    this.head = null;
    this.size = 0;
    initialState?.forEach((element) => this.insertByIndex(element, 0));
  }

  getSize() {
    return this.size;
  }

  addToHead = (element: T) => {
    let node = new Node<T>(element);
    if (!this.head) {
      this.head = node;
      return this;
    }
    node.next = this.head;
    this.head = node;
    this.size++;
    return this;
  };

  addToTail(element: T) {
    let node = new Node(element);

    if (this.size === 0) {
      this.head = node;
    }

    let currentNode = this.head;

    while (currentNode && currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    if (currentNode) currentNode.next = node;
    this.size++;
  }

  deleteHead() {
    if (!this.head) return null;
    let headToDelete = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.size--;
    return headToDelete ? headToDelete.value : null;
  }

  deleteTail() {
    if (this.size === 0) {
      return null;
    }

    let currentNode = this.head;
    let prev = null;
    let currentIndex = 0;
    while (currentIndex < this.size - 1 && currentNode) {
      prev = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }
    if (prev && currentNode) prev.next = currentNode.next;
    this.size--;
    return currentNode ? currentNode.value : null;
  }

  insertByIndex(element: T, idx: number) {
    if (idx < 0 || idx > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

      if (idx === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let currentHead = this.head;
        let currentIndex = 0;
        let prev = null;

        while (currentIndex < idx && currentHead) {
          prev = currentHead;
          currentHead = currentHead.next;
          currentIndex++;
        }

        if (prev) prev.next = node;
        node.next = currentHead;
      }

      this.size++;
    }
  }

  getNodeByIndex(idx: number) {
    if (idx < 0 || idx > this.size) {
      return null;
    }

    let currentHead = this.head;
    let currentIndex = 0;

    while (currentIndex < idx && currentHead) {
      currentHead = currentHead.next;
      currentIndex++;
    }

    return currentHead ? currentHead.value : null;
  }

  removeNodeByIndex(idx: number) {
    if (idx < 0 || idx > this.size) {
      return null;
    }

    let currentHead = this.head;

    if (idx === 0 && currentHead) {
      this.head = currentHead.next;
    } else {
      let prev = null;
      let currentIdx = 0;

      while (currentIdx < idx && currentHead) {
        prev = currentHead;
        currentHead = currentHead.next;
        currentIdx++;
      }

      if (prev && currentHead) prev.next = currentHead.next;
    }

    this.size--;
    return currentHead ? currentHead.value : null;
  }
}
