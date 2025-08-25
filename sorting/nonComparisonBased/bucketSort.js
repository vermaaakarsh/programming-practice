class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertElementUsingInsertionSort(data) {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
      return;
    }
    let currentNode = this.head;
    let previousNode = null;

    while (currentNode.next !== null && currentNode.data <= data) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    if (currentNode.data <= data) {
      currentNode.next = newNode;
    } else if (previousNode === null) {
      this.head = newNode;
      newNode.next = currentNode;
    } else {
      previousNode.next = newNode;
      newNode.next = currentNode;
    }
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
}

function bucketSort(numberArray, len) {
  let max = numberArray[0];
  let min = numberArray[0];
  for (let i = 0; i < len; i++) {
    if (numberArray[i] > max) {
      max = numberArray[i];
    }
    if (numberArray[i] < min) {
      min = numberArray[i];
    }
  }
  const range = (max - min) / len;
  const bucketSize = Math.floor(max / range) + 1;

  let buckets = new Array(bucketSize);

  for (let i = 0; i < bucketSize; i++) {
    buckets[i] = new LinkedList();
  }
  for (let i = 0; i < len; i++) {
    const bucketIndex = Math.floor((numberArray[i] - min) / range);
    buckets[bucketIndex].insertElementUsingInsertionSort(numberArray[i]);
  }

  for (const bucket of buckets) {
    bucket.display();
  }

  let k = 0;
  for (const bucket of buckets) {
    while (bucket.head !== null) {
      numberArray[k++] = bucket.head.data;
      bucket.head = bucket.head.next;
    }
  }

  return numberArray;
}

(function driver() {
  const numberArray = [
    0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68,
  ];
  console.log(numberArray);
  const sortedArray = bucketSort(numberArray, numberArray.length);
  console.log(sortedArray);
})();
