class Search {
  constructor(numberArray) {
    this.numberArray = numberArray;
  }

  linearSearch(key) {
    for (let i = 0; i < this.numberArray.length; i++) {
      if (this.numberArray[i] === key) {
        return i;
      }
    }
    return -1;
  }

  binarySearch(key) {
    let lowerLimit = 0;
    let upperLimit = this.numberArray.length - 1;
    while (lowerLimit <= upperLimit) {
      const mid = Math.floor((upperLimit + lowerLimit) / 2);
      if (this.numberArray[mid] === key) {
        return mid;
      }
      if (this.numberArray[mid] < key) {
        lowerLimit = mid + 1;
      } else {
        upperLimit = mid - 1;
      }
    }
    return -1;
  }

  recursiveBinarySearch(
    key,
    lowerLimit = 0,
    upperLimit = this.numberArray.length - 1
  ) {
    if (lowerLimit > upperLimit) {
      return -1;
    }
    const mid = Math.floor((upperLimit + lowerLimit) / 2);
    if (this.numberArray[mid] === key) {
      return mid;
    }
    if (this.numberArray[mid] < key) {
      return this.recursiveBinarySearch(key, mid + 1, upperLimit);
    } else {
      return this.recursiveBinarySearch(key, lowerLimit, mid - 1);
    }
  }
}

(function driver() {
  const search = new Search([1, 2, 5, 6, 9, 11, 19, 20, 27]);
  let tik;
  const key1 = 9,
    key2 = 0;
  tik = performance.now();
  console.log(
    `LinearSearch: Index-${search.linearSearch(key1)} Time-${(
      performance.now() - tik
    ).toFixed(4)}`
  );
  tik = performance.now();
  console.log(
    `LinearSearch: Index-${search.linearSearch(key2)} Time-${(
      performance.now() - tik
    ).toFixed(4)}`
  );
  tik = performance.now();
  console.log(
    `BinarySearch: Index-${search.binarySearch(key1)} Time-${(
      performance.now() - tik
    ).toFixed(4)}`
  );
  tik = performance.now();
  console.log(
    `BinarySearch: Index-${search.binarySearch(key2)} Time-${(
      performance.now() - tik
    ).toFixed(4)}`
  );
  tik = performance.now();
  console.log(
    `RecursiveBinarySearch: Index-${search.recursiveBinarySearch(key1)} Time-${(
      performance.now() - tik
    ).toFixed(4)}`
  );
  tik = performance.now();
  console.log(
    `RecursiveBinarySearch: Index-${search.recursiveBinarySearch(key2)} Time-${(
      performance.now() - tik
    ).toFixed(4)}`
  );
})();
