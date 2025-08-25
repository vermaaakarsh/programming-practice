function swap(arr, ind1, ind2) {
  const temp = arr[ind1];
  arr[ind1] = arr[ind2];
  arr[ind2] = temp;
}

class MaxHeap {
  constructor(arr) {
    this.heap = [...arr];
    this.n = this.heap.length - 1;
    this.buildHeap();
  }

  heapify(n, i) {
    let c1 = i * 2 + 1;
    let c2 = i * 2 + 2;
    let maximum = i;

    if (c1 < n && this.heap[c1] > this.heap[maximum]) {
      maximum = c1;
    }
    if (c2 < n && this.heap[c2] > this.heap[maximum]) {
      maximum = c2;
    }

    if (maximum !== i) {
      swap(this.heap, i, maximum);
      this.heapify(n, maximum);
    }
  }
  buildHeap() {
    for (let i = Math.floor(this.n / 2); i >= 0; i--) {
      this.heapify(this.n, i);
    }
  }
  extractTop(num) {
    swap(this.heap, 0, num);
    this.heapify(num, 0);
  }

  heapSort() {
    let num = this.n;
    while (num >= 0) {
      this.extractTop(num);
      num--;
    }
  }
}

(function driver() {
  const arr = [5, 2, 3, -1, 7, -11, 9, 2, 8, 6];
  console.log("Initial", arr);
  const maxHeap = new MaxHeap(arr);
  maxHeap.heapSort();
  console.log("Final", maxHeap.heap);
})();
