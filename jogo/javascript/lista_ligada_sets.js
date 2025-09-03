import { Inventario } from "./inventario.js";
import { Itens } from "./itens.js";
//Classe de Sets utilizada para implementar o Bau
export class Bau {
    constructor() {
        this.bau = new Inventario();
    }
    add(element) {
        return this.bau.add_slot(element);
    }
    delete(element, quantidade = null) {
        return this.bau.rmv_slot(element.nome, quantidade);
    }
    has(element) {
        return this.bau.inventario.some(item => item.nome === element.nome);
    }
    values() {
        return this.bau.inventario;
    }
    bau_comunitario(otherSet) {
        const unionBau = new Bau();
        // Adiciona todos os itens do primeiro baú
        this.values().forEach(item => {
            // Criamos uma cópia para não modificar o item original
            const itemCopy = new Itens(item.nome, item.quantidade, item.tipo, item.durabilidade, item.encantamento);
            unionBau.add(itemCopy);
        });
        // Adiciona todos os itens do segundo baú (a lógica de 'add' já vai stackar)
        otherSet.values().forEach(item => {
            const itemCopy = new Itens(item.nome, item.quantidade, item.tipo, item.durabilidade, item.encantamento);
            unionBau.add(itemCopy);
        });
        return unionBau;
    }
    bau_filtrado(otherSet, filtro) {
        const filteredBau = new Bau();
        // Passa pelos itens do primeiro baú
        this.values().forEach(item => {
            if (item.tipo === filtro) {
                const itemCopy = new Itens(item.nome, item.quantidade, item.tipo, item.durabilidade, item.encantamento);
                filteredBau.add(itemCopy);
            }
        });
        // Passa pelos itens do segundo baú
        otherSet.values().forEach(item => {
            if (item.tipo === filtro) {
                const itemCopy = new Itens(item.nome, item.quantidade, item.tipo, item.durabilidade, item.encantamento);
                filteredBau.add(itemCopy);
            }
        });
        return filteredBau;
    }
    diferenca_baus(otherSet) {
        const differenceBau = new Bau();
        const selfItems = new Map();
        // Contar a quantidade total de cada item no baú atual (this)
        this.values().forEach(item => {
            if (selfItems.has(item.nome)) {
                selfItems.get(item.nome).total += item.quantidade;
            }
            else {
                // Guarda uma cópia do primeiro item encontrado para usar como modelo
                const itemSample = new Itens(item.nome, 0, item.tipo, item.durabilidade, item.encantamento);
                selfItems.set(item.nome, { total: item.quantidade, item: itemSample });
            }
        });
        // Subtrair as quantidades do outro baú (otherSet)
        otherSet.values().forEach(item => {
            if (selfItems.has(item.nome)) {
                selfItems.get(item.nome).total -= item.quantidade;
            }
        });
        // Adicionar o resultado (se for positivo) ao baú de diferença
        selfItems.forEach((value) => {
            if (value.total > 0) {
                const newItem = value.item;
                newItem.quantidade = value.total;
                differenceBau.add(newItem); // add() vai cuidar de criar os stacks necessários
            }
        });
        return differenceBau;
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.bau.inventario.length;
    }
    clear() {
        this.bau.inventario = [];
    }
    getValoresAgrupados() {
        // Usa um Map para facilitar o agrupamento: { 'nomeDoItem': ObjetoItemComTotal }
        const itensAgrupados = new Map();
        this.bau.inventario.forEach(itemNoSlot => {
            if (itensAgrupados.has(itemNoSlot.nome)) {
                // Se o item já existe no nosso mapa, apenas somamos a quantidade
                const itemExistente = itensAgrupados.get(itemNoSlot.nome);
                itemExistente.quantidade += itemNoSlot.quantidade;
            }
            else {
                // Se é a primeira vez que vemos este item, criamos uma cópia dele
                // para não alterar o objeto original do inventário.
                const novoItemAgrupado = new Itens(itemNoSlot.nome, itemNoSlot.quantidade, itemNoSlot.tipo, itemNoSlot.durabilidade, itemNoSlot.encantamento);
                itensAgrupados.set(itemNoSlot.nome, novoItemAgrupado);
            }
        });
        // Converte o Map de volta para um array de Itens
        return Array.from(itensAgrupados.values());
    }
    toString() {
        if (this.isEmpty()) {
            return '[ Vazio ]';
        }
        // Usamos o método para obter a lista consolidada
        const valoresAgrupados = this.getValoresAgrupados();
        return valoresAgrupados
            .map(item => `[${item.info_item()}]`) // O info_item() já mostra nome e quantidade
            .join('\n');
    }
}
//# sourceMappingURL=lista_ligada_sets.js.map