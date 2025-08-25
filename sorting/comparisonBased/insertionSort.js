function insertionSort(numberArray, arrayLength) {
  for (let i = 1; i < arrayLength; i++) {
    const key = numberArray[i];
    let j = i;
    while (j > 0 && key < numberArray[j - 1]) {
      numberArray[j] = numberArray[j - 1];
      j--;
    }
    if (j !== i) {
      numberArray[j] = key;
    }
  }
}

(function driver() {
  const numberArray = [5, 2, 3, -1, 7, -11, 9, 2, 8];
  console.log(numberArray);
  insertionSort(numberArray, numberArray.length);
  console.log(numberArray);
})();
