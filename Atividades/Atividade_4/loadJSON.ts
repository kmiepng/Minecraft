import * as fs from 'fs';
import { Itens } from './typescript/itens'

type slotInventario = {
    item : Itens;
    quantidade : number;
}

const rawData = fs.readFileSync('itens.json', 'utf-8')

const inventario : slotInventario[] = JSON.parse(rawData)

console.log(inventario)