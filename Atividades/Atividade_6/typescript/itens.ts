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

export const pedregulho = new Itens('Pedregulho', 64);
export const pickaxe_sword = new Itens('Picareta de Ferro', 1)
export const Inventario : Itens[] = []