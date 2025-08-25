function countingSort(numberArray, len, exp) {
  const freqArray = new Array(10).fill(0);
  const finalArray = new Array(len);
  for (let i = 0; i < len; i++) {
    const digit = Math.floor(numberArray[i] / exp) % 10;
    freqArray[digit]++;
  }
  for (let i = 1; i < 10; i++) {
    freqArray[i] = freqArray[i] + freqArray[i - 1];
  }
  for (let i = len - 1; i >= 0; i--) {
    const digit = Math.floor(numberArray[i] / exp) % 10;
    freqArray[digit]--;
    finalArray[freqArray[digit]] = numberArray[i];
  }
  return finalArray;
}

function radixSort(numberArray, len) {
  let sortedArray = [...numberArray];
  let max = sortedArray[0];
  for (let i = 1; i < len; i++) {
    if (max < sortedArray[i]) {
      max = sortedArray[i];
    }
  }

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    sortedArray = countingSort(sortedArray, len, exp);
  }
  return sortedArray;
}

(function driver() {
  const numberArray = [170, 45, 75, 90, 802, 24, 2, 66];
  console.log(numberArray);
  const sortedArray = radixSort(numberArray, numberArray.length);
  console.log(sortedArray);
})();
