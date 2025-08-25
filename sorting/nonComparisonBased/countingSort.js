function countingSort(numberArray, len) {
  let min = numberArray[0];
  let max = numberArray[0];
  for (let i = 0; i < len; i++) {
    if (numberArray[i] < min) {
      min = numberArray[i];
    }
    if (numberArray[i] > max) {
      max = numberArray[i];
    }
  }
  for (let i = 0; i < len; i++) {
    numberArray[i] = numberArray[i] + Math.abs(min);
  }
  max = max + Math.abs(min);

  const freqArray = new Array(max + 1).fill(0);
  const finalArray = new Array(len);
  for (let i = 0; i < len; i++) {
    freqArray[numberArray[i]]++;
  }
  for (let i = 1; i <= max; i++) {
    freqArray[i] = freqArray[i] + freqArray[i - 1];
  }
  for (let i = len - 1; i >= 0; i--) {
    freqArray[numberArray[i]]--;
    finalArray[freqArray[numberArray[i]]] = numberArray[i];
  }

  for (let i = 0; i < len; i++) {
    finalArray[i] = finalArray[i] - Math.abs(min);
  }
  return finalArray;
}

(function driver() {
  const numberArray = [5, 2, 3, -1, 7, -11, 9, 2, 8, 6];
  console.log(numberArray);
  const sortedArray = countingSort(numberArray, numberArray.length - 1);
  console.log(sortedArray);
})();
