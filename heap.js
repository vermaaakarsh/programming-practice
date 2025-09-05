function swap(arr, ind1, ind2) {
  const temp = arr[ind1];
  arr[ind1] = arr[ind2];
  arr[ind2] = temp;
}

class Heap {
  constructor(arr) {
    this.heap = [...arr];
    this.n = this.heap.length - 1;
    this.buildHeap();
  }

  heapify(n, i) {}
  percolateUp(n, i) {}
  buildHeap() {
    for (let i = Math.floor(this.n / 2); i >= 0; i--) {
      this.heapify(this.n, i);
    }
  }
  insert(element) {
    this.n = this.n + 1;
    this.heap.push(element);
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

    if (leftChild <= n && this.heap[leftChild] < this.heap[minimum]) {
      minimum = leftChild;
    }
    if (rightChild <= n && this.heap[rightChild] < this.heap[minimum]) {
      minimum = rightChild;
    }

    if (minimum !== i) {
      swap(this.heap, i, minimum);
      this.heapify(n, minimum);
    }
  }
  percolateUp(n, i) {
    let parent = Math.floor((i - 1) / 2);

    if (parent >= 0 && this.heap[parent] > this.heap[i]) {
      swap(this.heap, i, parent);
      this.percolateUp(n, parent);
    }
  }
  extractMin() {
    return this.extractTop();
  }
}

class MaxHeap extends Heap {
  heapify(n, i) {
    let leftChild = i * 2 + 1;
    let rightChild = i * 2 + 2;
    let maximum = i;

    if (leftChild < n && this.heap[leftChild] > this.heap[maximum]) {
      maximum = leftChild;
    }
    if (rightChild < n && this.heap[rightChild] > this.heap[maximum]) {
      maximum = rightChild;
    }

    if (maximum !== i) {
      swap(this.heap, i, maximum);
      this.heapify(n, maximum);
    }
  }
  percolateUp(n, i) {
    let parent = Math.floor((i - 1) / 2);

    if (parent >= 0 && this.heap[parent] < this.heap[i]) {
      swap(this.heap, i, p);
      this.percolateUp(n, p);
    }
  }
  extractMax() {
    return this.extractTop();
  }
}

(function driver() {
  const minHeap = new MinHeap([5, 2, 3, -1, 7, -11, 9, 2, 8, 6]);
  const maxHeap = new MaxHeap([5, 2, 3, -1, 7, -11, 9, 2, 8, 6]);

  console.log("Min Heap", minHeap.heap);
  console.log("Max heap", maxHeap.heap);

  minHeap.insert(-20);
  minHeap.insert(10);
  maxHeap.insert(-20);
  maxHeap.insert(10);

  console.log("Min Heap", minHeap.heap);
  console.log("Max heap", maxHeap.heap);

  console.log("Extract Min", minHeap.extractMin(), minHeap.heap);
  console.log("Extract Max", maxHeap.extractMax(), maxHeap.heap);
})();
