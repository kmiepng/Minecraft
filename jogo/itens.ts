type tipoItem = 'bloco' | 'ferramenta' | 'armadura' | 'minerio'

interface Item {
    nome : string
    quantidade : number
    tipo : tipoItem
    encantamento ?: string
}

export default class Itens {
    item : Item
    constructor(item : Item){
        this.item = item
    }
    info(){
        let informacao = `${this.item.nome}, Quantidade: ${this.item.quantidade}`
        if (this.item.encantamento !== undefined){
            informacao += `, Encantamento: ${this.item.encantamento}`
        }
        return informacao
    }
}