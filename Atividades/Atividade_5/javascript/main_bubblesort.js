"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const itens_1 = require("./itens");
const bubblesort_1 = require("./bubblesort");
function getRandomQtd(min = 1, max = 64) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let qtd_item = getRandomQtd();
const cobblestone = new itens_1.Itens('Pedregulho', qtd_item);
const diamant = new itens_1.Itens('Diamante', qtd_item);
const gold = new itens_1.Itens('Ouro', qtd_item);
const tamArray = 10;
let Inventario = [];
function gerarRecursosAleatorios() {
    const recursos = [diamant, gold, cobblestone];
    let aleatorios = [];
    for (let i = 0; i < tamArray; i++) {
        const r = recursos[Math.floor(Math.random() * recursos.length)];
        aleatorios.push(r);
    }
    Inventario = [...aleatorios];
}
gerarRecursosAleatorios();
console.log('Inventário antes de ordenar:');
for (let i = 0; i < tamArray; i++) {
    console.log(`${Inventario[i].nome}, x${Inventario[i].quantidade}`);
}
(0, bubblesort_1.bubblesort)(Inventario);
console.log('Inventário após ordenar:');
for (let i = 0; i < tamArray; i++) {
    console.log(`${Inventario[i].nome}, x${Inventario[i].quantidade}`);
}
//# sourceMappingURL=main_bubblesort.js.map