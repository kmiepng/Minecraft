import { Itens } from './itens'
import { bubblesort } from './bubblesort';
import { mergeSort } from './mergesort';
import { gerarRecursosAleatorios } from './gerar_listas';
import { testSearch, testSort } from './testeSort';
import { binarySearch, linearSearch } from './search';

//Criando o inventário
const tamArray = [100, 500, 1000, 5000, 10000];
let Inventario : Itens[] = []

//Saída no terminal
for (const tam of tamArray){
    gerarRecursosAleatorios(Inventario, tam);
    
    console.log(`Tamanho do array: ${tam}`);
    testSort("BubbleSort", bubblesort, Inventario);
    testSort("Mergesort", mergeSort, Inventario);
    testSearch("Binary Search", binarySearch, Inventario, "Carvão")
    testSearch("Linear Search", linearSearch, Inventario, "Carvão")
}