"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Itens = void 0;
var Itens = /** @class */ (function () {
    function Itens(nome, quantidade, tipo, encantamento, armadura) {
        this.nome = nome;
        this.quantidade = quantidade;
        this.tipo = tipo;
        this.encantamento = encantamento;
        this.armadura = armadura;
    }
    Itens.prototype.informacao = function () {
        var informacao = "".concat(this.nome, ", x").concat(this.quantidade);
        if (this.encantamento !== undefined) {
            informacao += ", ".concat(this.encantamento);
        }
        return informacao;
    };
    return Itens;
}());
exports.Itens = Itens;
