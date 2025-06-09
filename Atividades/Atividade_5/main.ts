import { Itens } from './itens'
import { bubblesort } from './bubblesort';
import { mergeSort } from './mergesort';
import { gerarRecursosAleatorios } from './gerar_listas';
import { testSearch, testSort } from './testeSort';
import { binarySearch, linearSearch } from './search';
import fs from 'fs'

//Criando o inventário e arrays para armazenar dados
const tamArray = [100, 500, 1000, 5000, 10000];
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
    binaryTimes.push(testSearch("Binary Search", binarySearch, Inventario, "Carvão"));
    linearTimes.push(testSearch("Linear Search", linearSearch, Inventario, "Carvão"));
}

//Salvar dados
const output = {
  tamArray,
  bubble: bubbleTimes,
  merge: mergeTimes,
  binary: binaryTimes,
  linear: linearSearch
};

fs.writeFileSync("dados.json", JSON.stringify(output, null, 2));
console.log("Dados salvos em dados.json");