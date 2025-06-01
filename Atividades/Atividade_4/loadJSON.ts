import * as fs from 'fs';

type slotInventario = {
    item : string;
    quantidade : number;
}

const rawData = fs.readFileSync('itens.json', 'utf-8')

const inventario : slotInventario[] = JSON.parse(rawData)

console.log(inventario)