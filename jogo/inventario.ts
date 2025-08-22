import { Itens } from './itens'

class Inventario{
    inventario : Itens[]
    constructor(){
        this.inventario = []
    }
    add_slot(item : Itens){
        const capacidade = 64;
        //Verificacão de existência no inventário
        const itemExistente = this.inventario.find(i => i.nome === item.nome)
        if (itemExistente){
            if (item.tipo === 'Ferramenta' || item.tipo === 'Armadura'){
                console.log('Não pode stackar armadura/ferramenta')
                this.inventario.push(item)
                return false
            }
            //Verificando se falta adicionar item
            let isSobrando = itemExistente.add_item(item.quantidade);
            if (isSobrando !== false){
                while(isSobrando > 0) {
                    const quantidadeAdicionar = Math.min(isSobrando, capacidade);
                    this.inventario.push(new Itens(item.nome, quantidadeAdicionar, item.tipo, item.durabilidade, item.encantamento));
                    isSobrando -= quantidadeAdicionar;
                }
            }
            return true
        }
        this.inventario.push(item);
        return true
    }
    rmv_slot(nomeItem : string, quantidade : (number | null) = null){
        const indicesItens = this.inventario.map((item, index) => item.nome === nomeItem ? index : -1).filter(index => index !== -1);
        if (indicesItens.length === 0) {
            console.log(`"${nomeItem}" não encontrado no inventário.`);
            return false;
        }
        let quantidadeARemover: number;
        if (quantidade === null) {
            // Se a quantidade for nula, removemos tudo.
            quantidadeARemover = Infinity;
        } else {
            quantidadeARemover = quantidade;
        }
        let quantidadeRemovida = 0;
        for (let i = indicesItens.length - 1; i >= 0; i--) {
            if (quantidadeARemover <= 0) break; // Já removemos o suficiente.
            const indexSlot = indicesItens[i];
            const slot = this.inventario[indexSlot];
            if (slot.quantidade <= quantidadeARemover) {
                // Se o stack inteiro for menor ou igual ao que queremos remover, removemos o stack.
                quantidadeRemovida += slot.quantidade;
                quantidadeARemover -= slot.quantidade;
                // Remove o item do inventário
                this.inventario.splice(indexSlot, 1);
            } else {
                // Se o stack for maior, apenas diminui a quantidade.
                quantidadeRemovida += quantidadeARemover;
                slot.quantidade -= quantidadeARemover;
                quantidadeARemover = 0;
            }
        }
        if (quantidadeRemovida > 0) {
            console.log(`${quantidadeRemovida} de "${nomeItem}" foram removidos.`);
            return true;
        }
        return false;
    }
    mostrarInventario() {
        console.log("--- Inventário ---");
        if(this.inventario.length === 0) {
            console.log("[ Vazio ]");
        } else {
            this.inventario.forEach((item, index) => {
                console.log(`Slot ${index+1}: ${item.info_item()}`);
            });
        }
        console.log("------------------");
    }
}