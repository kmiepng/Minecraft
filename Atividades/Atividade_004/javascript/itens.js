"use strict";
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
//# sourceMappingURL=itens.js.map