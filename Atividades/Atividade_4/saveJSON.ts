import * as fs from 'fs';
import { Itens } from './typescript/itens'
import { Inventario } from './typescript/inventario'

type Jogador = {
  nome : string;
  dificuldade : string;
  inventario : Inventario;
}

let inventario = new Inventario();
const iron_pickaxe = new Itens('Picareta de Ferro', 1, 'Ferramenta');
inventario.addItem(iron_pickaxe, iron_pickaxe.quantidade)

const data : Jogador[] = [
  { nome : "Kamila", dificuldade : "Normal", inventario : inventario }, //deixei só um jogador msm
]

const jsonData = JSON.stringify(data, null, 2);

// Write JSON to a file
fs.writeFile('jogadores.json', jsonData, (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File saved successfully as itens.json");
  }
});