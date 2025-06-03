"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const itens_1 = require("./itens");
// Carrega o JSON existente
const configPath = "./jogadores.json";
const dados = JSON.parse(fs_1.default.readFileSync(configPath, "utf-8"));
const iron = new itens_1.Itens('Barra de Ferro', 64);
const diamant = new itens_1.Itens('Diamante', 64);
const gold = new itens_1.Itens('Barra de Ouro', 64);
const copper = new itens_1.Itens('Cobre', 64);
const coal = new itens_1.Itens('Minério de Carvão', 64);
const cobblestone = new itens_1.Itens('Pedregulho', 64);
// Função para gerar recursos aleatórios
function gerarRecursosAleatorios() {
    const recursos = [iron, diamant, gold, copper, coal, cobblestone];
    for (const jogador of dados) {
        let aleatorios = [];
        for (let i = 0; i < 4; i++) {
            const r = recursos[Math.floor(Math.random() * recursos.length)];
            aleatorios.push(r);
        }
        jogador.inventario = [...aleatorios];
    }
}
// Atualiza recursos minerados
gerarRecursosAleatorios();
// Salva o JSON atualizado
fs_1.default.writeFileSync(configPath, JSON.stringify(dados, null, 2));
//# sourceMappingURL=loadJSON.js.map