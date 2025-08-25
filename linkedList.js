class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor(data) {
    if (data) {
      this.head = new Node(data);
    } else {
      this.head = null;
    }
  }

  insertElementAtStart(data) {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
      return;
    }
    newNode.next = this.head;
    this.head = newNode;
  }
  removeElementFromStart(data) {
    if (this.head === null) {
      return "Empty List!";
    }
    this.head = this.head.next;
  }
  insertElementAtEnd(data) {
    const newNode = new Node(data);
    let currentNode = this.head;
    if (currentNode === null) {
      this.head = newNode;
      return;
    }
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    currentNode.next = newNode;
  }
  removeElementFromEnd() {
    let currentNode = this.head;
    let previousNode = null;
    if (currentNode === null) {
      return "Empty List!";
    }
    while (currentNode.next !== null) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    previousNode.next = null;
    return currentNode.data;
  }
  insertElementInMiddle(key, data) {
    const newNode = new Node(data);
    let currentNode = this.head;
    while (currentNode !== null && currentNode.data !== key) {
      currentNode = currentNode.next;
    }
    if (currentNode === null) {
      return "Node not found!";
    }
    newNode.next = currentNode.next;
    currentNode.next = newNode;
  }
  removeElementFromMiddle(key) {
    let currentNode = this.head;
    let previousNode = null;

    while (currentNode !== null && currentNode.data !== key) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    if (currentNode === null) {
      return "Node not found!";
    }
    previousNode.next = currentNode.next;
  }

  display() {
    let currentNode = this.head;
    if (currentNode === null) {
      process.stdout.write("Empty List!");
    }
    while (currentNode !== null) {
      process.stdout.write(`${currentNode.data}`);
      currentNode = currentNode.next;
      if (currentNode !== null) {
        process.stdout.write("->");
      }
    }
    console.log();
  }

  size() {
    let currentNode = this.head;
    let size = 0;
    while (currentNode !== null) {
      size++;
      currentNode = currentNode.next;
    }
    return size;
  }
  reverse() {
    let currentNode = this.head;
    let previousNode = null;
    while (currentNode.next !== null) {
      this.head = this.head.next;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = this.head;
    }
    this.head.next = previousNode;
  }
}

(function driver() {
  const linkedList = new LinkedList();
  linkedList.insertElementAtEnd(4);
  linkedList.insertElementAtEnd(5);
  linkedList.insertElementAtEnd(2);
  linkedList.insertElementAtEnd(7);
  linkedList.insertElementAtEnd(5);
  linkedList.display();

  linkedList.insertElementInMiddle(5, 8);
  linkedList.display();

  linkedList.removeElementFromMiddle(5);
  linkedList.display();

  linkedList.insertElementAtStart(0);
  linkedList.display();

  linkedList.reverse();
  linkedList.display();

  console.log(linkedList.size());
})();
