type tipoItem = 'Bloco' | 'Ferramenta' | 'Armadura' | 'Minerio'

class Itens {
    nome : string;
    quantidade : number;
    tipo : tipoItem;
    encantamento ?: string;
    armadura ?: number;
    constructor(nome : string, quantidade : number, tipo : tipoItem, encantamento ?: string, armadura ?: number){
        this.nome = nome;
        this.quantidade = quantidade;
        this.tipo = tipo;
        this.encantamento = encantamento;
        this.armadura = armadura;
    }
    informacao(){
        let informacao = `${this.nome}, x${this.quantidade}`
        if (this.encantamento !== undefined){
            informacao += `, ${this.encantamento}`
        }
        return informacao
    }
}

export { Itens }