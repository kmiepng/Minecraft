export class Itens {
    nome : string;
    quantidade : number;
    tipo : string;
    durabilidade : number | null;
    encantamento : string | null;
    //Como está sendo criado uma classe comum, a durabilidade e o encantamento são opcionais
    constructor(nome : string, quantidade : number, tipo : string, durabilidade : (number | null) = null, encantamento : (string | null) = null){
        this.nome = nome;
        this.quantidade = quantidade;
        this.tipo = tipo;
        this.durabilidade = durabilidade;
        this.encantamento = encantamento;
    }
    //Como alguns itens podem ter informações que outros itens não tem, faço a verificação antes de retornar a informação
    info_item () {
        let info = `${this.nome}, x${this.quantidade}`;
        if (this.tipo === 'Armadura' || this.tipo === 'Ferramenta') info += `, Durabilidade: ${this.durabilidade}`;
        if (this.encantamento != null) info += `, ${this.encantamento}`;
        return info;
    }
    //Apenas blocos e ferramentas podem ser utilizadas, então se não for um bloco sendo usado, será uma ferramenta
    usar(qtd = 1){
        const uso = qtd
        let info = ''
        if (this.tipo === 'Bloco'){
            this.quantidade > 0? this.quantidade -= uso : info += 'Não há mais blocos para usar'
        } else {
            (this.durabilidade != null && this.durabilidade> 0)? this.durabilidade -= uso : info += `${this.nome} quebrou!`
        }
        //Caso algum dos itens utilizados não esteja mais disponível para uso, a variavel info informará
        return info
    }
    add_item(quantidade : number){
        const capacidade = 64 //Evita numero magico
        //Verifica se tem espaço sobrando
        let espaço_sobrando = capacidade - this.quantidade;
        //Se a quantidade do bloco for igual a 64 não dá mais pra adicionar bloco
        if (this.quantidade === capacidade){ 
            console.log('Slot cheio');
        } //Se tiver espaço sobrando, adiciona até atingir o limite
        else if (espaço_sobrando >= quantidade){ 
            this.quantidade += quantidade;
        } //Se o espaço sobrando for menor q a quantiadade que queremos adicionar, adicionamos apenas o que dá
        else{
            this.quantidade += espaço_sobrando;
        }
        //Retorno o espaço sobrando para poder utilizá-lo quando fizer o inventário
        return espaço_sobrando;
    }
}