"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Inventario = /** @class */ (function () {
    function Inventario(linhas, colunas) {
        if (linhas === void 0) { linhas = 4; }
        if (colunas === void 0) { colunas = 9; }
        this.linhas = linhas;
        this.colunas = colunas;
        this.inventario = new Array(linhas * colunas);
    }
    Inventario.prototype.addItem = function (item, qtd_add) {
        if (qtd_add === void 0) { qtd_add = 1; }
        var item_sobrando = qtd_add;
        var max_slot = 64;
        for (var i = 0; i < this.inventario.length; i++) {
            var slot = this.inventario[i];
            if ((slot === null || slot === void 0 ? void 0 : slot.item.nome) === item.nome && (item.tipo !== 'Armadura' || 'Ferramenta')) {
                var espaco = slot.quantidade - item.quantidade;
                espaco > item_sobrando ? slot.quantidade += item_sobrando : slot.quantidade += espaco && (item_sobrando -= espaco);
                if (item_sobrando === 0)
                    return true;
            }
        }
        for (var i = 0; i < this.inventario.length; i++) {
            if (this.inventario[i] === null) {
                var espaco = Math.min(item_sobrando, max_slot);
                this.inventario[i] = {
                    item: item,
                    quantidade: espaco,
                };
                item_sobrando -= espaco;
                if (item_sobrando === 0)
                    return true;
            }
        }
        return false;
    };
    Inventario.prototype.mostrarInventario = function () {
        console.log('======INVENTÁRIO======');
        for (var linha = 0; linha < this.linhas; linha++) {
            var linhaTexto = '';
            for (var coluna = 0; coluna < this.colunas; coluna++) {
                var indice = linha * this.colunas + coluna;
                var slot = this.inventario[indice];
                if (slot) {
                    var texto = "".concat(slot.item.nome, " x").concat(slot.quantidade);
                    linhaTexto += "[ ".concat(texto, " ] ");
                }
                else {
                    linhaTexto += "[ ".concat('vazio', " ] ");
                }
            }
            console.log(linhaTexto);
        }
    };
    return Inventario;
}());
