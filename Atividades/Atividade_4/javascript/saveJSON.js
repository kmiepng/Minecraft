"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const itens_1 = require("./itens");
let inventario = new Array();
const iron_pickaxe = new itens_1.Itens('Picareta de Ferro', 1);
inventario.push(iron_pickaxe);
const data = [
    { nome: "Kamila", dificuldade: "Normal", inventario: inventario },
    { nome: "Emanoel", dificuldade: "Dificil", inventario: inventario },
    { nome: "Taygo", dificuldade: "Hardcore", inventario: inventario },
];
const jsonData = JSON.stringify(data, null, 2);
// Write JSON to a file
fs_1.default.writeFile('jogadores.json', jsonData, (err) => {
    if (err) {
        console.error("Error writing file:", err);
    }
    else {
        console.log("File saved successfully as itens.json");
    }
});
//# sourceMappingURL=saveJSON.js.map