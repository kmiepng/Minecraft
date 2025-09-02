import { Itens } from './itens.js';
import { Pilha } from './pilhas.js';
export class Inventario {
    constructor() {
        this.inventario = [];
    }
    add_slot(item) {
        const capacidade = 64;
        //Verificacão de existência no inventário
        let itemExistente = undefined;
        const indicesItens = this.inventario.map((i, index) => item.nome === i.nome ? index : -1).filter(index => index !== -1);
        if (indicesItens.length > 0) {
            const index = indicesItens[indicesItens.length - 1];
            itemExistente = this.inventario[index];
        }
        if (itemExistente) {
            if (item.tipo === 'Ferramenta' || item.tipo === 'Armadura') {
                console.log('Não pode stackar armadura/ferramenta');
                this.inventario.push(item);
                return false;
            }
            //Verificando se falta adicionar item
            let isSobrando = itemExistente.add_item(item.quantidade);
            if (isSobrando !== false) {
                while (isSobrando > 0) {
                    const quantidadeAdicionar = Math.min(isSobrando, capacidade);
                    this.inventario.push(new Itens(item.nome, quantidadeAdicionar, item.tipo, item.durabilidade, item.encantamento));
                    isSobrando -= quantidadeAdicionar;
                }
            }
            return true;
        }
        this.inventario.push(item);
        return true;
    }
    rmv_slot(nomeItem, quantidade = null) {
        const indicesItens = this.inventario.map((item, index) => item.nome === nomeItem ? index : -1).filter(index => index !== -1);
        if (indicesItens.length === 0) {
            console.log(`"${nomeItem}" não encontrado no inventário.`);
            return false;
        }
        let quantidadeARemover;
        if (quantidade === null) {
            // Se a quantidade for nula, removemos tudo.
            quantidadeARemover = Infinity;
        }
        else {
            quantidadeARemover = quantidade;
        }
        let quantidadeRemovida = 0;
        for (let i = indicesItens.length - 1; i >= 0; i--) {
            if (quantidadeARemover <= 0)
                break; // Já removemos o suficiente.
            const indexSlot = indicesItens[i];
            const slot = this.inventario[indexSlot];
            if (slot.quantidade <= quantidadeARemover) {
                // Se o stack inteiro for menor ou igual ao que queremos remover, removemos o stack.
                quantidadeRemovida += slot.quantidade;
                quantidadeARemover -= slot.quantidade;
                // Remove o item do inventário
                this.inventario.splice(indexSlot, 1);
            }
            else {
                // Se o stack for maior, apenas diminui a quantidade.
                quantidadeRemovida += quantidadeARemover;
                slot.quantidade -= quantidadeARemover;
                quantidadeARemover = 0;
            }
        }
        if (quantidadeRemovida > 0)
            return true;
        return false;
    }
    print_inventario() {
        console.log("--- Inventário ---");
        if (this.inventario.length === 0) {
            console.log("[ Vazio ]");
        }
        else {
            this.inventario.forEach((item, index) => {
                console.log(`[${item.info_item()}]`);
            });
        }
        console.log("------------------");
    }
}
export class InventarioComPilha {
    //Não há restrição de tamanho no array, apenas uma pré-definição do seu tamanho
    constructor(tamanho = 9) {
        this.tamanho = tamanho;
        this.inventario = [];
        for (let i = 0; i < this.tamanho; i++) {
            this.inventario.push(new Pilha());
        }
    }
    //Adição de um item em apenas uma pilha
    addItens(item) {
        //Primeiro há a verificação de item
        //Se houver um slot o mesmo item que queremos adicionar, será verificado se há espaço da pilha
        for (const slot of this.inventario) {
            if (!slot.isEmpty() && slot.size() < 64) {
                const itemNoSlot = slot.peek();
                if (itemNoSlot && itemNoSlot.id === item.id) {
                    slot.push(item);
                    return true;
                }
            }
        }
        //Caso não atenda a condição acima, o item será adicionado no primeiro slot vazio que achar
        for (const slot of this.inventario) {
            if (slot.isEmpty()) {
                slot.push(item);
                return true;
            }
        }
    }
    //Adição de vários itens em um slot, foi feita uma função separada para melhor visualização
    addSlot(item, quantidade = 1) {
        for (let i = 0; i < quantidade; i++) {
            if (this.addItens(item)) {
            }
        }
    }
    //Remoção de um item específico de um slot específico
    rmvItens(indexSlot, qtdRemover = 1) {
        //Validar o índice
        if (indexSlot < 0) {
            return undefined;
        }
        const slot = this.inventario[indexSlot];
        //Verificar se o slot já está vazio
        if (slot.isEmpty()) {
            return undefined;
        }
        //Usar o método pop()
        let count = 0;
        do {
            slot.pop();
            count++;
        } while (count < qtdRemover);
    }
    rmvSlot(indexSlot) {
        // Validar o índice e se o slot está vazio
        if (indexSlot < 0 || this.inventario[indexSlot].isEmpty()) {
            return undefined;
        }
        // Guarda a pilha atual para poder retorná-la
        const pilhaRemovida = this.inventario[indexSlot];
        // Substitui a pilha no inventário por uma nova, vazia.
        this.inventario[indexSlot] = new Pilha();
        return pilhaRemovida;
    }
    printInventario() {
        console.log("---------- Inventário ----------");
        this.inventario.forEach((slot, index) => {
            if (!slot.isEmpty()) {
                const item = slot.peek();
                const quantidade = slot.size();
                // Apesar do possível erro, a verificação se o slot está vazio ou não já está sendo feita na condiçãp
                console.log(`| [ ${item.nome} x${quantidade} ] `);
            }
            else {
                console.log(`| [ Vazio ] `);
            }
        });
        console.log("|\n--------------------------------\n");
    }
}
//# sourceMappingURL=inventario.js.map