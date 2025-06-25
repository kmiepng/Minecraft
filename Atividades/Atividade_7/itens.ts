class Itens{
    nome : string;
    tipo : string;
    quantidade : number;
    constructor(nome : string, quantidade : number, tipo : string){
        this.nome = nome; //nome do item, ex: Picareta de Ferro
        this.quantidade = quantidade; //quantos itens tem em um stack
        this.tipo = tipo; // tipo do item, ex: Ferramenta
    } 

    informacao_item(){
        let informacao : string;
        informacao = `${this.nome}, x${this.quantidade}`; //função genérica para moldar de acordo com a informação q o player quer
        return informacao;
    }
}
