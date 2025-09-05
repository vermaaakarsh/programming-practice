function swap(arr, ind1, ind2) {
  const temp = arr[ind1];
  arr[ind1] = arr[ind2];
  arr[ind2] = temp;
}
class TreeNode {
  constructor(char, freq) {
    this.char = char;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}
class Heap {
  constructor() {
    this.heap = [];
    this.n = -1;
  }

  heapify(n, i) {}
  percolateUp(n, i) {}
  buildHeap() {
    for (let i = Math.floor(this.n / 2); i >= 0; i--) {
      this.heapify(this.n, i);
    }
  }
  insert(char, freq) {
    this.n = this.n + 1;
    let newNode = new TreeNode(char, freq);
    this.heap.push(newNode);
    this.percolateUp(this.n, this.n);
  }
  insertNode(newNode) {
    this.n = this.n + 1;
    this.heap.push(newNode);
    this.percolateUp(this.n, this.n);
  }
  extractTop() {
    swap(this.heap, 0, this.n);
    this.n = this.n - 1;
    this.heapify(this.n, 0);
    return this.heap.pop();
  }
}

class MinHeap extends Heap {
  heapify(n, i) {
    let leftChild = i * 2 + 1;
    let rightChild = i * 2 + 2;
    let minimum = i;

    if (leftChild <= n && this.heap[leftChild].freq < this.heap[minimum].freq) {
      minimum = leftChild;
    }
    if (
      rightChild <= n &&
      this.heap[rightChild].freq < this.heap[minimum].freq
    ) {
      minimum = rightChild;
    }
    // console.log(
    //   "Current:",
    //   this.heap[i].freq,
    //   "LeftChild:",
    //   this.heap[leftChild].freq,
    //   "rightChild:",
    //   rightChild.freq
    // );
    if (minimum !== i) {
      swap(this.heap, i, minimum);
      this.heapify(n, minimum);
    }
  }
  percolateUp(n, i) {
    let parent = Math.floor((i - 1) / 2);

    if (parent >= 0 && this.heap[parent].freq > this.heap[i].freq) {
      swap(this.heap, i, parent);
      this.percolateUp(n, parent);
    }
  }
  extractMin() {
    return this.extractTop();
  }
  mergeNode(node1, node2) {
    let mergedNode = new TreeNode("Parent", node1.freq + node2.freq);
    mergedNode.left = node1;
    mergedNode.right = node2;
    return mergedNode;
  }
}

class HuffMan {
  generateHuffmanEncodingObject(root, huffmanEncodingObject, curr) {
    if (root === null) {
      return;
    }
    if (root.left === null && root.right === null) {
      huffmanEncodingObject[root.char] = curr;
      return;
    }
    this.generateHuffmanEncodingObject(
      root.left,
      huffmanEncodingObject,
      curr + "0"
    );
    this.generateHuffmanEncodingObject(
      root.right,
      huffmanEncodingObject,
      curr + "1"
    );
  }

  countFreq(message) {
    let freqObj = {};
    for (const char of message) {
      freqObj[char] ? freqObj[char]++ : (freqObj[char] = 1);
    }
    return freqObj;
  }
  generateEncodedMessage(message, huffmanEncodingObject) {
    let encodedMessage = "";
    for (const char of message) {
      encodedMessage += huffmanEncodingObject[char];
    }
    return encodedMessage;
  }
  encode(message) {
    const freqObj = this.countFreq(message);
    const heap = new MinHeap();
    const uniqueChars = Object.keys(freqObj);
    for (const char of uniqueChars) {
      heap.insert(char, freqObj[char]);
    }
    let graphHead = null;

    while (heap.n > 0) {
      const node1 = heap.extractMin();
      const node2 = heap.extractMin();
      graphHead = heap.mergeNode(node1, node2);
      heap.insertNode(graphHead);
    }
    let huffmanEncodingObject = {};
    this.generateHuffmanEncodingObject(graphHead, huffmanEncodingObject, "");
    let encodedMessage = this.generateEncodedMessage(
      message,
      huffmanEncodingObject
    );
    return { encodedMessage, huffmanEncodingObject };
  }
  decode(encodedMessage, huffmanEncodingObject) {
    const originalChars = Object.keys(huffmanEncodingObject);
    const encodedValues = Object.values(huffmanEncodingObject);
    let decodedMessage = "";
    let lastChar = 0;
    let currentChar = 1;
    while (currentChar <= encodedMessage.length) {
      let substr = encodedMessage.slice(lastChar, currentChar);
      let index = encodedValues.indexOf(substr);
      if (index >= 0) {
        decodedMessage += originalChars[index];
        lastChar = currentChar;
      }
      currentChar++;
    }
    return decodedMessage;
  }
}

const huffman = new HuffMan();

const message = "aabbbbabbbcccdddeeeccceeeddeee";
const {
  encodedMessage,
  huffmanEncodingObject: huffmanEncodingObjectForMessage,
} = huffman.encode(message);
console.log("Original Message: ", message);
console.log("Huffman Encoding Object: ", huffmanEncodingObjectForMessage);
console.log("Encoded Message: ", encodedMessage);
const decodedMessage = huffman.decode(
  encodedMessage,
  huffmanEncodingObjectForMessage
);
console.log("Decoded Message: ", decodedMessage);
