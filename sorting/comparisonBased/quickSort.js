function swap(arr, ind1, ind2) {
  const temp = arr[ind1];
  arr[ind1] = arr[ind2];
  arr[ind2] = temp;
}

function partition(numberArray, low, high) {
  //  For Randomized Quick Sort
  const random = Math.floor(Math.random() * (high + 1));
  swap(numberArray, random, high);

  let pivot = numberArray[high];
  let pivotIndex = low - 1;

  for (let j = low; j < high; j++) {
    if (numberArray[j] <= pivot) {
      pivotIndex++;
      swap(numberArray, pivotIndex, j);
    }
  }
  swap(numberArray, pivotIndex + 1, high);
  return pivotIndex + 1;
}

function quickSort(numberArray, low, high) {
  if (low < high) {
    const pivotIndex = partition(numberArray, low, high);
    quickSort(numberArray, low, pivotIndex - 1);
    quickSort(numberArray, pivotIndex + 1, high);
  }
}

(function driver() {
  const numberArray = [5, 2, 3, -1, 7, -11, 9, 2, 8, 6];
  console.log(numberArray);
  quickSort(numberArray, 0, numberArray.length - 1);
  console.log(numberArray);
})();
