function bubbleSort(numberArray, arrayLength) {
  for (let i = 0; i < arrayLength - 1; i++) {
    for (let j = 0; j < arrayLength - i; j++) {
      if (numberArray[j] > numberArray[j + 1]) {
        const temp = numberArray[j];
        numberArray[j] = numberArray[j + 1];
        numberArray[j + 1] = temp;
      }
    }
  }
}

(function driver() {
  const numberArray = [5, 2, 3, -1, 7, -11, 9, 2, 8];
  console.log(numberArray);
  bubbleSort(numberArray, numberArray.length);
  console.log(numberArray);
})();
