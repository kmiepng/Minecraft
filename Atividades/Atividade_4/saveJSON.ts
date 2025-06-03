import fs from 'fs';
import { Itens } from './itens'

type Jogador = {
  nome : string;
  dificuldade : string;
  inventario : Itens[];
}

let inventario : Itens[] = new Array()
const iron_pickaxe = new Itens('Picareta de Ferro', 1);
inventario.push(iron_pickaxe)

const data : Jogador[] = [
  { nome : "Kamila", dificuldade : "Normal", inventario : inventario },
  { nome : "Emanoel", dificuldade : "Dificil", inventario : inventario},
  { nome : "Taygo", dificuldade : "Hardcore", inventario : inventario},
]

const jsonData = JSON.stringify(data, null, 2);

// Write JSON to a file
localStorage.setItem('jogadores', jsonData);
// fs.writeFile('jogadores.json', jsonData, (err) => {
//   if (err) {
//     console.error("Error writing file:", err);
//   } else {
//     console.log("File saved successfully as itens.json");
//   }
// });