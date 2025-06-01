import * as fs from 'fs';
import { Itens } from './typescript/itens'

type slotInventario = {
    item : Itens;
    quantidade : number;
}

const picareta_de_ferro = new Itens('Picareta de Ferro', 1, 'Ferramenta');
const pedrgulho = new Itens('Pedregulho', 64, 'Bloco');

const data : slotInventario[] = [
    { item : picareta_de_ferro, quantidade : 1},
    { item : pedrgulho, quantidade : 64}
]

const jsonData = JSON.stringify(data, null, 2);

// Write JSON to a file
fs.writeFile('itens.json', jsonData, (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File saved successfully as itens.json");
  }
});