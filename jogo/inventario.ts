import { Itens } from './itens'

interface slotInventario{ //criei interface pois criar uma classe pra adicionar em outra classe deu errado
    item : Itens
    quantidade : number
}

class Inventario{
    inventario : (slotInventario | null)[];
    linhas : number;
    colunas : number;
    constructor(linhas = 4, colunas = 9){
        this.linhas = linhas;
        this.colunas = colunas;
        this.inventario = new Array(linhas*colunas)
    }
    addItem(item : Itens, qtd_add = 1){
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
            if (this.inventario[i] === null) {
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
    mostrarInventario(){
        console.log('======INVENTÁRIO======')
        for (let linha = 0; linha < this.linhas; linha++) {
            let linhaTexto = '';
            for (let coluna = 0; coluna < this.colunas; coluna++) {
                const indice = linha * this.colunas + coluna;
                const slot = this.inventario[indice];

                if (slot) {
                    linhaTexto += `[ ${slot.item.informacao()} ] `;
                } else {
                    linhaTexto += ' [ vazio      ] ';
                }
            }
            console.log(linhaTexto);
        }
    }
}