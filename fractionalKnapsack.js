function swap(arr, ind1, ind2, profitList, weightList) {
  let temp = arr[ind1];
  arr[ind1] = arr[ind2];
  arr[ind2] = temp;

  temp = profitList[ind1];
  profitList[ind1] = profitList[ind2];
  profitList[ind2] = temp;

  temp = weightList[ind1];
  weightList[ind1] = weightList[ind2];
  weightList[ind2] = temp;
}

function partition(numberArray, low, high, profitList, weightList) {
  //  For Randomized Quick Sort
  const random = Math.floor(Math.random() * (high + 1));
  swap(numberArray, random, high, profitList, weightList);

  let pivot = numberArray[high];
  let pivotIndex = low - 1;

  for (let j = low; j < high; j++) {
    if (numberArray[j] > pivot) {
      pivotIndex++;
      swap(numberArray, pivotIndex, j, profitList, weightList);
    }
  }
  swap(numberArray, pivotIndex + 1, high, profitList, weightList);
  return pivotIndex + 1;
}

function quickSort(numberArray, low, high, profitList, weightList) {
  if (low < high) {
    const pivotIndex = partition(
      numberArray,
      low,
      high,
      profitList,
      weightList
    );
    quickSort(numberArray, low, pivotIndex - 1, profitList, weightList);
    quickSort(numberArray, pivotIndex + 1, high, profitList, weightList);
  }
}

function getBestProfits(profitList, weightList, knapsize) {
  let profitByWeight = new Array(profitList.length);
  for (let i = 0; i < profitList.length; i++) {
    profitByWeight[i] = profitList[i] / weightList[i];
  }
  quickSort(
    profitByWeight,
    0,
    profitByWeight.length - 1,
    profitList,
    weightList
  );

  let profit = 0;
  for (let i = 0; i < profitByWeight.length && knapsize > 0; i++) {
    if (weightList[i] <= knapsize) {
      profit += profitList[i];
      knapsize -= weightList[i];
    } else {
      profit += (knapsize / weightList[i]) * profitList[i];
      knapsize = 0;
    }
  }
  return profit;
}

(function driver() {
  const profitList = [25, 24, 15];
  const weightList = [18, 15, 10];
  console.log(getBestProfits(profitList, weightList, 20));
})();
