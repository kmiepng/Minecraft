"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Itens = void 0;
class Itens {
    constructor(nome, quantidade, tipo, encantamento, armadura) {
        this.nome = nome;
        this.quantidade = quantidade;
        this.tipo = tipo;
        this.encantamento = encantamento;
        this.armadura = armadura;
    }
    informacao() {
        let informacao = `${this.nome}, x${this.quantidade}`;
        if (this.encantamento !== undefined) {
            informacao += `, ${this.encantamento}`;
        }
        return informacao;
    }
}
exports.Itens = Itens;
//# sourceMappingURL=itens.js.map