"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSort = mergeSort;
function merge(leftArr, rightArr) {
    let resultArr = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
        // comparação das strings
        const compareNomes = leftArr[leftIndex].nome.localeCompare(rightArr[rightIndex].nome, 'pt-BR');
        //quando dá -1, é pq a string q comparamos é a menor
        if (compareNomes < 0 ||
            (compareNomes === 0 && leftArr[leftIndex].quantidade < rightArr[rightIndex].quantidade)) {
            resultArr.push(leftArr[leftIndex]);
            leftIndex += 1;
        }
        else {
            resultArr.push(rightArr[rightIndex]);
            rightIndex += 1;
        }
    }
    return resultArr.concat(leftArr.slice(leftIndex)).concat(rightArr.slice(rightIndex));
}
function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    const middleIndex = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, middleIndex);
    const rightArr = arr.slice(middleIndex, arr.length);
    return merge(mergeSort(leftArr), mergeSort(rightArr));
}
//# sourceMappingURL=mergesort.js.map