import { Itens } from './itens'
import { mergeSort } from './mergesort';

function getRandomQtd(min = 1, max = 64) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let qtd_item = getRandomQtd()

const cobblestone = new Itens('Pedregulho', qtd_item)
const diamant = new Itens('Diamante', qtd_item)
const gold = new Itens('Ouro', qtd_item)

const tamArray = 10;
let Inventario : Itens[] = []

function gerarRecursosAleatorios() {
    const recursos = [diamant, gold, cobblestone];
    let aleatorios : Itens[] = []
    for (let i = 0; i < tamArray; i++) {
        const r = recursos[Math.floor(Math.random() * recursos.length)];
        aleatorios.push(r)
    }
    Inventario = [...aleatorios]
}

gerarRecursosAleatorios();

console.log('Inventário antes de ordenar:')
for (let i = 0; i < tamArray; i++){
    console.log(`${Inventario[i].nome}, x${Inventario[i].quantidade}`)
}
mergeSort(Inventario, 0, tamArray - 1);
console.log('Inventário após ordenar:')
for (let i = 0; i < tamArray; i++){
    console.log(`${Inventario[i].nome}, x${Inventario[i].quantidade}`)
}