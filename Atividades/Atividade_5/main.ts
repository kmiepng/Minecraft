import { Itens } from './itens'
import { bubblesort } from './bubblesort';
import { mergeSort } from './mergesort';
import { gerarRecursosAleatorios } from './gerar_listas';
import { testSearch, testSort } from './testeSort';
import { binarySearch, linearSearch } from './search';

//Criando o inventário com distribuição aleatória de itens
const tamArray = 10;
let Inventario : Itens[] = []
gerarRecursosAleatorios(Inventario, tamArray);
//Saída no terminal
console.log(`Tamanho do array: ${tamArray}`);
testSort("BubbleSort", bubblesort, Inventario);
testSort("Mergesort", mergeSort, Inventario);
testSearch("Binary Search", binarySearch, Inventario, "Carvão")
testSearch("Linear Search", linearSearch, Inventario, "Carvão")