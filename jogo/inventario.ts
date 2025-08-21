import { Itens } from './itens'

class Inventario{
    inventario : Itens[]
    constructor(){
        this.inventario = []
    }
    add_slot(item : Itens){
        const capacidade = 64;
        //Verificação de existência no inventário
        const itemExistente = this.inventario.find(i => i.nome === item.nome)
        if (itemExistente){
            if (item.tipo === 'Ferramenta' || item.tipo === 'Armadura'){
                console.log('Não pode stackar armadura/ferramenta')
                this.inventario.push(item)
                return false
            }
            let isSobrando = itemExistente.add_item(item.quantidade);
            if (isSobrando !== false){
                if (isSobrando > capacidade){
                    do{
                    item.quantidade = capacidade;
                    this.inventario.push(item);
                    isSobrando -= capacidade;
                    } while (isSobrando > capacidade)
                }
                item.quantidade = isSobrando
                this.inventario.push(item);
            }
            return true
        }
        this.inventario.push(item);
        return true
    }
}