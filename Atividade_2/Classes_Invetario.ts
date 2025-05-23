import { Ferramenta, Armadura, Bloco } from "./Classes_Itens";

class slot_Inventario{
    constructor(){
        this.item = []
    }
    item : any
    adicionar_slot(item : any, quantidade : number = 1){
        const itemExistente = this.item.find(i => i.nome === item.nome)
        if (itemExistente){
            if (item.tipo === 'Ferramenta' || item.tipo === 'Armadura'){
                console.log('Não pode stackar armadura/ferramenta')
                return false
            } else{
                item.add_bloco(quantidade);
            }
        } else if (this.item.length === 0){
            this.item[0] = item
            return true
        } else{
            console.log(`Não é possível adicionar ${item.nome} no slot, slot cheio`)
            return false
        }
        return false 
    }
    remover_slot(quantidade : number = 1){
        const item = this.item[0]
        if (item.quantidade > quantidade){
            item.quantidade -= quantidade;
        } else {
            this.item = []
            return item;
        }
    }
    info(){
        if (this.item.length > 0){
            const item = this.item[0]
            if (item.tipo === 'Ferramenta'){
                item.info_ferramenta()
            }else if (item.tipo === 'Armadura'){
                item.info_armadura()
            }else{
                item.info_bloco()
            }
        }
        else {
            return console.log('Vazio')
        }
    }
}