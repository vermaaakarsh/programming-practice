function selectionSort(numberArray, arrayLength) {
  for (let i = 0; i < arrayLength - 1; i++) {
    let minInd = i;
    for (let j = i + 1; j < arrayLength; j++) {
      if (numberArray[minInd] > numberArray[j]) {
        minInd = j;
      }
    }
    if (minInd !== i) {
      const temp = numberArray[i];
      numberArray[i] = numberArray[minInd];
      numberArray[minInd] = temp;
    }
  }
}

(function driver() {
  const numberArray = [5, 2, 3, -1, 7, -11, 9, 2, 8];
  console.log(numberArray);
  selectionSort(numberArray, numberArray.length);
  console.log(numberArray);
})();
