import { Itens } from './itens'

//Gerando quantidade de itens aleatória
function getRandomQtd(min = 1, max = 64) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Deixei a mesma variável pros itens por preguiça
let qtd_item = getRandomQtd()
const cobblestone = new Itens('Pedregulho', qtd_item)
const diamant = new Itens('Diamante', qtd_item)
const gold = new Itens('Ouro', qtd_item)
const sword_d = new Itens('Espada de Diamante', 1)
const coal = new Itens('Carvão', qtd_item)
//Gerar recursos aleatórios
export function gerarRecursosAleatorios(Inventario : any[], tamArray : number) {
    const recursos = [diamant, gold, cobblestone, sword_d, coal];
    let aleatorios : Itens[] = []
    for (let i = 0; i < tamArray; i++) {
        const r = recursos[Math.floor(Math.random() * recursos.length)];
        aleatorios.push(r)
    }
    Inventario = [...aleatorios]
}