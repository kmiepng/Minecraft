"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bubblesort_1 = require("./bubblesort");
const mergesort_1 = require("./mergesort");
const gerar_listas_1 = require("./gerar_listas");
const testeSort_1 = require("./testeSort");
const search_1 = require("./search");
const fs_1 = __importDefault(require("fs"));
//Criando o inventário e arrays para armazenar dados
const tamArray = [100, 500, 1000, 5000, 10000];
let Inventario = [];
const bubbleTimes = [];
const mergeTimes = [];
const binaryTimes = [];
const linearTimes = [];
//Gerar inventário
for (const tam of tamArray) {
    (0, gerar_listas_1.gerarRecursosAleatorios)(Inventario, tam);
    bubbleTimes.push((0, testeSort_1.testSort)("BubbleSort", bubblesort_1.bubblesort, Inventario));
    mergeTimes.push((0, testeSort_1.testSort)("Mergesort", mergesort_1.mergeSort, Inventario));
    binaryTimes.push((0, testeSort_1.testSearch)("Binary Search", search_1.binarySearch, Inventario, "Carvão"));
    linearTimes.push((0, testeSort_1.testSearch)("Linear Search", search_1.linearSearch, Inventario, "Carvão"));
}
//Salvar dados
const output = {
    tamArray,
    bubble: bubbleTimes,
    merge: mergeTimes,
    binary: binaryTimes,
    linear: search_1.linearSearch
};
fs_1.default.writeFileSync("dados.json", JSON.stringify(output, null, 2));
console.log("Dados salvos em dados.json");
//# sourceMappingURL=main.js.map