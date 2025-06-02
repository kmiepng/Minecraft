import * as fs from 'fs';
import { Itens } from './typescript/itens'
import { Inventario } from './typescript/inventario'

let inventario = new Inventario();
const iron_pickaxe = new Itens('Picareta de Ferro', 1, 'Ferramenta');
inventario.addItem(iron_pickaxe, iron_pickaxe.quantidade)

const jsonData = JSON.stringify(inventario, null, 2);

// Write JSON to a file
fs.writeFile('itens.json', jsonData, (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File saved successfully as itens.json");
  }
});