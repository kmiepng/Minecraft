"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bubblesort_1 = require("./bubblesort");
const mergesort_1 = require("./mergesort");
const gerar_listas_1 = require("./gerar_listas");
const testeSort_1 = require("./testeSort");
const search_1 = require("./search");
//Criando o inventário com distribuição aleatória de itens
const tamArray = 10;
let Inventario = [];
(0, gerar_listas_1.gerarRecursosAleatorios)(Inventario, tamArray);
//Saída no terminal
console.log(`Tamanho do array: ${tamArray}`);
(0, testeSort_1.testSort)("BubbleSort", bubblesort_1.bubblesort, Inventario);
(0, testeSort_1.testSort)("Mergesort", mergesort_1.mergeSort, Inventario);
(0, testeSort_1.testSearch)("Binary Search", search_1.binarySearch, Inventario, "Carvão");
(0, testeSort_1.testSearch)("Linear Search", search_1.linearSearch, Inventario, "Carvão");
//# sourceMappingURL=main.js.map