export class Itens{
    nome : string
    quantidade : number
    constructor(nome : string, quantidade : number){
        this.nome = nome;
        this.quantidade = quantidade;
    }
    info = () =>{ //só para n deixar a classe sem nada
        const informacao = `${this.nome}, x${this.quantidade}`
        return informacao
    }
}

export const cobblestone = new Itens('Pedregulho', 64)
export const diamant = new Itens('Diamante', 64)
export const gold = new Itens('Ouro', 64)
export const sword_d = new Itens('Espada de Diamante', 1)
export const coal = new Itens('Carvão', 64)
export const Inventario : Itens[] = []