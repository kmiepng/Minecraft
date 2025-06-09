"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarRecursosAleatorios = gerarRecursosAleatorios;
const itens_1 = require("./itens");
//Gerando quantidade de itens aleatória
function getRandomQtd(min = 1, max = 64) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Deixei a mesma variável pros itens por preguiça
let qtd_item = getRandomQtd();
const cobblestone = new itens_1.Itens('Pedregulho', qtd_item);
const diamant = new itens_1.Itens('Diamante', qtd_item);
const gold = new itens_1.Itens('Ouro', qtd_item);
const sword_d = new itens_1.Itens('Espada de Diamante', 1);
const coal = new itens_1.Itens('Carvão', qtd_item);
//Gerar recursos aleatórios
function gerarRecursosAleatorios(Inventario, tamArray) {
    const recursos = [diamant, gold, cobblestone, sword_d, coal];
    for (let i = 0; i < tamArray; i++) {
        const r = recursos[Math.floor(Math.random() * recursos.length)];
        Inventario.push(r);
    }
    return Inventario;
}
//# sourceMappingURL=gerar_listas.js.map