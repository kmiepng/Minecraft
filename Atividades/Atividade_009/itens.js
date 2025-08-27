//Base para a atividade
export class Itens {
    constructor(nome, quantidade, tipo, durabilidade = null, encantamento = null){
        this.nome = nome;
        this.quantidade = quantidade;
        this.tipo = tipo;
        this.durabilidade = durabilidade;
        this.encantamento = encantamento;
    }
    informacao_item() {
        let informacao;
        informacao = `${this.nome}, x${this.quantidade}`; 
        if (this.durabilidade != null) informacao += `${this.durabilidade}`;
        if (this.encantamento != null) informacao += `${this.encantamento}`;
        return informacao;
    }
}