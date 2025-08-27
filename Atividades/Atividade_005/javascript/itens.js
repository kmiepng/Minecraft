"use strict";
//Criação de itens para testar algoritmos de ordenação
Object.defineProperty(exports, "__esModule", { value: true });
exports.Itens = void 0;
class Itens {
    constructor(nome, quantidade) {
        this.info = () => {
            const informacao = `${this.nome}, x${this.quantidade}`;
            return informacao;
        };
        this.nome = nome;
        this.quantidade = quantidade;
    }
}
exports.Itens = Itens;
/*
Testar depois com poções

export type Pocao = {
    pocao : string;
    efeito : string;
    duracao : number; //vou deixar a duracao em segundos
}
    
*/ 
//# sourceMappingURL=itens.js.map