function merge(numberArray, left, mid1, mid2, right) {
  const len1 = mid1 - left + 1;
  const len2 = mid2 - mid1;
  const len3 = right - mid2;

  const leftArray = numberArray.slice(left, left + len1);
  const midArray = numberArray.slice(mid1 + 1, mid1 + 1 + len2);
  const rightArray = numberArray.slice(mid2 + 1, mid2 + 1 + len3);

  let i = 0;
  let j = 0;
  let k = 0;
  let ind = left;

  while (i < len1 || j < len2 || k < len3) {
    let minimum = Infinity;
    let minIndex = -1;

    if (i < len1 && leftArray[i] < minimum) {
      minimum = leftArray[i];
      minIndex = 0;
    }
    if (j < len2 && midArray[j] < minimum) {
      minimum = midArray[j];
      minIndex = 1;
    }
    if (k < len3 && rightArray[k] < minimum) {
      minIndex = 2;
    }

    if (minIndex === 0) {
      numberArray[ind++] = leftArray[i++];
    } else if (minIndex === 1) {
      numberArray[ind++] = midArray[j++];
    } else if (minIndex === 2) {
      numberArray[ind++] = rightArray[k++];
    }
  }
}

function threeWayMergeSort(numberArray, left, right) {
  if (left >= right) {
    return;
  }
  let mid1 = left + Math.floor((right - left) / 3);
  let mid2 = left + 2 * Math.floor((right - left) / 3);
  threeWayMergeSort(numberArray, left, mid1);
  threeWayMergeSort(numberArray, mid1 + 1, mid2);
  threeWayMergeSort(numberArray, mid2 + 1, right);
  merge(numberArray, left, mid1, mid2, right);
}

(function driver() {
  const numberArray = [5, 2, 3, -1, 7, -11, 9, 2, 8];
  console.log(numberArray);
  threeWayMergeSort(numberArray, 0, numberArray.length - 1);
  console.log(numberArray);
})();
