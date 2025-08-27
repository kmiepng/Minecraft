//Criação de itens para testar algoritmos de ordenação

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
/*
Testar depois com poções

export type Pocao = {
    pocao : string;
    efeito : string;
    duracao : number; //vou deixar a duracao em segundos
}
    
*/