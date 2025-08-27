import { Itens } from './itens.js'
import { bubblesort } from './bubblesort.js';
import { mergeSort } from './mergesort.js';
import { gerarRecursosAleatorios } from './gerar_listas.js';
import { testSearch, testSort } from './testeSort.js';
import { binarySearch, linearSearch } from './search.js';
import fs from 'fs'

//Criando o inventário e arrays para armazenar dados
const tamArray = [100, 500, 1000, 5000, 7500, 10000, 25000, 50000];
let Inventario : Itens[] = []
const bubbleTimes: number[] = [];
const mergeTimes: number[] = [];
const binaryTimes: number[] = [];
const linearTimes: number[] = [];

//Gerar inventário
for (const tam of tamArray){
  gerarRecursosAleatorios(Inventario, tam);
    
  console.log(`Tamanho do array: ${tam}`);
  bubbleTimes.push(testSort("BubbleSort", bubblesort, Inventario));
  mergeTimes.push(testSort("Mergesort", mergeSort, Inventario));
  linearTimes.push(testSearch("Linear Search", linearSearch, Inventario, "Carvão"));
  //Testando o binary com inventário ordenado
  const sortInventario = mergeSort(Inventario);
  binaryTimes.push(testSearch("Binary Search", binarySearch, sortInventario, "Carvão"));
}

//Salvar dados
const output = {
  tamArray,
  bubble: bubbleTimes,
  merge: mergeTimes,
  binary: binaryTimes,
  linear: linearTimes
};

fs.writeFileSync("dados.json", JSON.stringify(output, null, 2));
console.log("Dados salvos em dados.json");