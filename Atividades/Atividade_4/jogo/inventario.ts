import { Itens } from './itens'

interface slotInventario{ //criei interface pois criar uma classe pra adicionar em outra classe deu errado
    item : Itens
    quantidade : number
}

class Inventario{
    inventario : (slotInventario | undefined)[];
    constructor(linhas = 2, colunas = 5){
        this.inventario = new Array(linhas*colunas)
    }
    addItem(item : Itens, qtd_add : number){
        let item_sobrando = qtd_add;
        const max_slot = 64;
        for (let i = 0; i < this.inventario.length; i ++){
            const slot = this.inventario[i]
            if (slot?.item.nome === item.nome && (item.tipo !== 'Armadura' || 'Ferramenta')){
                const espaco = slot.quantidade - item.quantidade;
                espaco > item_sobrando ? slot.quantidade += item_sobrando : slot.quantidade += espaco && (item_sobrando -= espaco);
                if (item_sobrando === 0) return true; 
            }
        }
        for (let i = 0; i < this.inventario.length; i++) {
            if (this.inventario[i] === undefined) {
                const espaco = Math.min(item_sobrando, max_slot)
                this.inventario[i] = {
                    item: item,
                    quantidade: espaco,
                }
                item_sobrando -= espaco;
                if (item_sobrando === 0) return true;
            }
        }
        return false;
    }
    removeItem(item : Itens, qtd_remove = 1){
        for (let i = 0; i < this.inventario.length; i++){
            const slot = this.inventario[i]
            if(slot?.item.nome === item.nome){
                slot.quantidade -= qtd_remove
            }
            if (slot?.quantidade === 0) this.inventario[i] = undefined;  
        }
    }
    mostrarInventario(){
        const [linhas, colunas] = [2, 5]
        console.log('======INVENTÁRIO======')
        for (let linha = 0; linha < linhas; linha++) {
            let linhaTexto = '';
            for (let coluna = 0; coluna < colunas; coluna++) {
                const indice = linha * colunas + coluna;
                const slot = this.inventario[indice];

                if (slot !== undefined) {
                    linhaTexto += `[ ${slot?.item.informacao()} ] `;
                } else {
                    linhaTexto += ' [ vazio      ] ';
                }
            }
            console.log(linhaTexto);
        }
    }
}

export { Inventario }