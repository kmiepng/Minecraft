import * as fs from 'fs';
import { Itens } from './jogo/itens'
import { Inventario } from './jogo/inventario'
import { Inventario_Armadura } from './jogo/armadura_inventario';

type Jogador = {
  nome : string;
  dificuldade : string;
  inventario : Inventario;
  armadura : Inventario_Armadura;
}

let inventario = new Inventario();
const iron_pickaxe = new Itens('Picareta de Ferro', 1, 'Ferramenta');
inventario.addItem(iron_pickaxe, iron_pickaxe.quantidade)
let armadura_inventario = new Inventario_Armadura()
const iron_boot = new Itens('Bota de Ferro', 1, 'Armadura', undefined, 'Bota')
armadura_inventario.addArmadura(iron_boot)

const data : Jogador[] = [
  { nome : "Kamila", dificuldade : "Normal", inventario : inventario, armadura : armadura_inventario }, //deixei só um jogador msm
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