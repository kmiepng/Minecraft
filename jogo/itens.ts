type tipoItem = 'Bloco' | 'Ferramenta' | 'Armadura' | 'Minerio'

class Itens {
    nome : string;
    quantidade : number;
    tipo : tipoItem;
    encantamento ?: string;
    constructor(nome : string, quantidade : number, tipo : tipoItem, encantamento ?: string){
        this.nome = nome;
        this.quantidade = quantidade;
        this.tipo = tipo;
        this.encantamento = encantamento;
    }
    informacao(){
        let informacao = `${this.nome}, x${this.quantidade}`
        if (this.encantamento !== undefined){
            informacao += `, ${this.encantamento}`
        }
        return informacao
    }
}