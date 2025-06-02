"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloco_terra = exports.espada_de_ferro = exports.peitoral_diamante = void 0;
const itens_1 = require("./itens");
const inventario_1 = require("./inventario");
exports.peitoral_diamante = new itens_1.Itens('Peitoral de Diamante', 1, 'Armadura', undefined, 'Peitoral');
exports.espada_de_ferro = new itens_1.Itens('Espada de Ferro', 1, 'Ferramenta');
const picareta_de_ferro = new itens_1.Itens('Picareta de Ferro', 1, 'Ferramenta', 'Fortuna III');
exports.bloco_terra = new itens_1.Itens('Bloco de Terra', 64, 'Bloco');
let diamante = new itens_1.Itens('Diamante', 16, 'Minerio');
let pedrgulho = new itens_1.Itens('Bloco de Pedrgulho', 64, 'Bloco');
let inventario = new inventario_1.Inventario();
inventario.addItem(exports.espada_de_ferro, exports.espada_de_ferro.quantidade);
inventario.mostrarInventario();
//# sourceMappingURL=main.js.map