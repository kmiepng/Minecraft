import { Itens } from './itens.ts'

class Inventario{
    inventario : Itens[]
    constructor(){
        this.inventario = []
    }
    add_slot(item : Itens){
        //Verificação de existência no inventário
        const itemExistente = this.inventario.find(i => i.nome === item.nome)
        if (itemExistente){
            if (item.tipo === 'Ferramenta' || item.tipo === 'Armadura'){
                console.log('Não pode stackar armadura/ferramenta') //ferramentas e armaduras não podem stackar
                return false
            }
            const quantidade_sobrando = item.add_item(item.quantidade)
            if (quantidade_sobrando){
                this.inventario.push(item)
            }
        }
    }
}