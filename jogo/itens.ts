export class Itens {
    nome : string;
    quantidade : number;
    tipo : string;
    durabilidade : number| null;
    encantamento : string | null;
    constructor(nome : string, quantidade : number, tipo : string, durabilidade : (number | null) = null, encantamento : (string | null) = null){
        this.nome = nome;
        this.quantidade = quantidade;
        this.tipo = tipo;
        this.durabilidade = durabilidade;
        this.encantamento = encantamento;
    }
    info_item () {
        let info = `${this.nome}, x${this.quantidade}`;
        if (this.tipo === 'Armadura' || this.tipo === 'Ferramenta') info += `, Durabilidade: ${this.durabilidade}`;
        if (this.encantamento != null) info += `, ${this.encantamento}`;
        return info;
    }
}