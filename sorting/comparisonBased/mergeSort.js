function merge(numberArray, left, mid, right) {
  const len1 = mid - left + 1;
  const len2 = right - mid;
  const leftArray = numberArray.slice(left, left + len1);
  const rightArray = numberArray.slice(mid + 1, mid + 1 + len2);

  let i = 0;
  let j = 0;
  let k = left;

  while (i < len1 && j < len2) {
    if (leftArray[i] <= rightArray[j]) {
      numberArray[k++] = leftArray[i++];
    } else {
      numberArray[k++] = rightArray[j++];
    }
  }
  while (i < len1) {
    numberArray[k++] = leftArray[i++];
  }
  while (j < len2) {
    numberArray[k++] = rightArray[j++];
  }
}

function mergeSort(numberArray, left, right) {
  if (left >= right) {
    return;
  }
  let mid = left + Math.floor((right - left) / 2);
  mergeSort(numberArray, 0, mid);
  mergeSort(numberArray, mid + 1, right);
  merge(numberArray, left, mid, right);
}

(function driver() {
  const numberArray = [5, 2, 3, -1, 7, -11, 9, 2, 8];
  console.log(numberArray);
  mergeSort(numberArray, 0, numberArray.length - 1);
  console.log(numberArray);
})();
