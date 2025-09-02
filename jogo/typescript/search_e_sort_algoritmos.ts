// Bubblesort

import { Itens } from "./itens";

export function bubblesort(arr : Itens[]) : Itens[]{
    let n = arr.length;
    // Outer loop: Iterate over the entire array
    for (let i = 0; i < n - 1; i++) {
    // Flag to detect if any swapping happened
        let swapped = false;

        // Inner loop: Traverse the array from 0 to n-i-1
        // After each pass, the largest element is placed at the end
        for (let j = 0; j < n - i - 1; j++) {
        // Compare adjacent elements and swap if they're in the wrong order
        const compareNomes = arr[j].nome.localeCompare(arr[j + 1].nome, 'pt-BR');
        if (
            compareNomes > 0 ||
            (compareNomes === 0 && arr[j].quantidade > arr[j + 1].quantidade)
          ) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }    
        // Mark that a swap occurred
        swapped = true;
      }

    // If no elements were swapped, the array is already sorted, so break early
    if (!swapped) {
      break;
    }
  }
  return arr;
}

//Mergesort

function merge(leftArr : Itens[], rightArr : Itens[]) : Itens[]{
    let resultArr = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < leftArr.length && rightIndex < rightArr.length){
        // comparação das strings
        const compareNomes = leftArr[leftIndex].nome.localeCompare(rightArr[rightIndex].nome, 'pt-BR');
        //quando dá -1, é pq a string q comparamos é a menor
        if (compareNomes < 0 ||
            (compareNomes === 0 && leftArr[leftIndex].quantidade < rightArr[rightIndex].quantidade)
        )  {
            resultArr.push(leftArr[leftIndex]);
            leftIndex += 1;
        } else {
            resultArr.push(rightArr[rightIndex]);
            rightIndex += 1;
        }
    }
    return resultArr.concat(leftArr.slice(leftIndex)).concat(rightArr.slice(rightIndex));
}

export function mergeSort(arr : Itens[]) : Itens[]{
    if (arr.length < 2){
        return arr;
    }

    const middleIndex = Math.floor(arr.length/2);
    const leftArr = arr.slice(0, middleIndex);
    const rightArr = arr.slice(middleIndex, arr.length);

    return merge(mergeSort(leftArr), mergeSort(rightArr));
}

//Binary Search

export function binarySearch(arr : any[], target : any) {
    let left = 0;
    let right = arr.length - 1;

    // Keep dividing the search space by half
    while (left <= right) {
        // Find the middle index
        let mid = Math.floor((left + right) / 2);

        // Check if the middle element is the target
        if (arr[mid].nome === target) {
        return mid; // Target found, return its index
        }

        // If target is smaller, ignore the right half
        if (arr[mid].nome > target) {
        right = mid - 1;
        } 
        // If target is larger, ignore the left half
        else {
        left = mid + 1;
        }
    }

    // Target not found
    return -1;
}

//Linear Search
export function linearSearch(arr : any[], target : any){
    const n = arr.length
        for (let i = 0; i < n; i++)
        if (arr[i].nome == target)
            return i;
    return -1;
}
//Função teste, com o tempo gasto para processar cada sort incluso
export function testSort(name: string, sortFunc: (arr: number[]) => number[], data: any[]) {
    const startTime = performance.now();
    const sorted = sortFunc(data);
    const endTime = performance.now();

    return endTime - startTime
}

export function testSearch(name: string, searchFunc: (arr: any[], target : any) => any, data: any[], target : any) {
    const startTime = performance.now();
    const search = searchFunc(data, target);
    const endTime = performance.now();

    return endTime - startTime
}