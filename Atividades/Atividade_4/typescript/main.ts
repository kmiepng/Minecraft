import { Itens, tipoArmadura, tipoItem } from "./itens";
import { Inventario_Armadura } from "./armadura_inventario";
import { Inventario } from "./inventario";

export const peitoral_diamante = new Itens('Peitoral de Diamante', 1, 'Armadura', undefined, 'Peitoral');
export const espada_de_ferro = new Itens('Espada de Ferro', 1, 'Ferramenta')
const picareta_de_ferro = new Itens('Picareta de Ferro', 1, 'Ferramenta', 'Fortuna III')
export let bloco_terra = new Itens('Bloco de Terra', 64, 'Bloco')
let diamante = new Itens('Diamante', 16, 'Minerio')
let pedrgulho = new Itens('Bloco de Pedrgulho', 64, 'Bloco')

let inventario = new Inventario()

inventario.addItem(espada_de_ferro, espada_de_ferro.quantidade)
inventario.mostrarInventario()