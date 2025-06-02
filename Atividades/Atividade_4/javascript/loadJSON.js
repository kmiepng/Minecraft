"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const itens_1 = require("./typescript/itens");
const htmlReport_1 = require("./htmlReport");
// Carrega o JSON existente
const configPath = "./jogadores.json";
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
let inventario = config.inventario;
const iron = new itens_1.Itens('Barra de Ferro', 64, 'Minerio');
const diamant = new itens_1.Itens('Diamante', 64, 'Minerio');
const gold = new itens_1.Itens('Barra de Ouro', 64, 'Minerio');
const lapis = new itens_1.Itens('Lapis Lazuli', 64, 'Minerio');
const coal = new itens_1.Itens('Minério de Carvão', 64, 'Minerio');
// Função para gerar recursos aleatórios
function gerarRecursosAleatorios() {
    const recursos = [iron, diamant, gold, lapis, coal];
    for (let i = 0; i < 4; i++) {
        const r = recursos[Math.floor(Math.random() * recursos.length)];
        inventario.addItem(r, r.quantidade);
    }
}
// Atualiza recursos minerados
gerarRecursosAleatorios();
// Salva o JSON atualizado
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
// Mostra inventário no terminal
inventario.mostrarInventario();
// Gera o relatório HTML
(0, htmlReport_1.escreverArrayHtml)(config);
//# sourceMappingURL=loadJSON.js.map