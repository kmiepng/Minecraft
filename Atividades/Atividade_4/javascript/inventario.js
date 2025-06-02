"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventario = void 0;
class Inventario {
    constructor(linhas = 2, colunas = 5) {
        this.linhas = linhas;
        this.colunas = colunas;
        this.inventario = new Array(linhas * colunas);
    }
    addItem(item, qtd_add) {
        let item_sobrando = qtd_add;
        const max_slot = 64;
        for (let i = 0; i < this.inventario.length; i++) {
            const slot = this.inventario[i];
            if ((slot === null || slot === void 0 ? void 0 : slot.item.nome) === item.nome && (item.tipo !== 'Armadura' || 'Ferramenta')) {
                const espaco = slot.quantidade - item.quantidade;
                espaco > item_sobrando ? slot.quantidade += item_sobrando : slot.quantidade += espaco && (item_sobrando -= espaco);
                if (item_sobrando === 0)
                    return true;
            }
        }
        for (let i = 0; i < this.inventario.length; i++) {
            if (this.inventario[i] === undefined) {
                const espaco = Math.min(item_sobrando, max_slot);
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
    }
    removeItem(item, qtd_remove = 1) {
        for (let i = 0; i < this.inventario.length; i++) {
            const slot = this.inventario[i];
            if ((slot === null || slot === void 0 ? void 0 : slot.item.nome) === item.nome) {
                slot.quantidade -= qtd_remove;
            }
            if ((slot === null || slot === void 0 ? void 0 : slot.quantidade) === 0)
                this.inventario[i] = undefined;
        }
    }
    mostrarInventario() {
        console.log('======INVENTÁRIO======');
        for (let linha = 0; linha < this.linhas; linha++) {
            let linhaTexto = '';
            for (let coluna = 0; coluna < this.colunas; coluna++) {
                const indice = linha * this.colunas + coluna;
                const slot = this.inventario[indice];
                if (slot !== undefined) {
                    linhaTexto += `[ ${slot === null || slot === void 0 ? void 0 : slot.item.informacao()} ] `;
                }
                else {
                    linhaTexto += ' [ vazio      ] ';
                }
            }
            console.log(linhaTexto);
        }
    }
}
exports.Inventario = Inventario;
//# sourceMappingURL=inventario.js.map