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

/**
 * Realiza uma busca binária em um array ORDENADO de strings.
 * @param arrayOrdenado O array de strings, que deve estar em ordem alfabética.
 * @param alvo A string que estamos procurando.
 * @returns O índice do alvo se encontrado, senão -1.
 */
export function binarySearch(arrayOrdenado: string[], alvo: string): number {
    let esquerda = 0;
    let direita = arrayOrdenado.length - 1;

    while (esquerda <= direita) {
        const meio = Math.floor((esquerda + direita) / 2);
        const comparacao = arrayOrdenado[meio].localeCompare(alvo);

        if (comparacao === 0) {
            return meio; // Alvo encontrado!
        }

        if (comparacao < 0) {
            // O item do meio vem antes do alvo, então procuramos na metade direita
            esquerda = meio + 1;
        } else {
            // O item do meio vem depois do alvo, então procuramos na metade esquerda
            direita = meio - 1;
        }
    }

    return -1; // Alvo não encontrado
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