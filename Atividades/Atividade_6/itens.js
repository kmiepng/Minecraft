"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Itens = void 0;
var Itens = /** @class */ (function () {
    function Itens(nome, quantidade) {
        var _this = this;
        this.info = function () {
            var informacao = "".concat(_this.nome, ", x").concat(_this.quantidade);
            return informacao;
        };
        this.nome = nome;
        this.quantidade = quantidade;
    }
    return Itens;
}());
exports.Itens = Itens;
