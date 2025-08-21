export class Itens {
    nome : string;
    quantidade : number;
    tipo : string;
    durabilidade : number | null;
    encantamento : string | null;
    //Como está sendo criado uma classe comum, a durabilidade e o encantamento são opcionais
    constructor(nome : string, quantidade : number, tipo : string, durabilidade : (number | null) = null, encantamento : (string | null) = null)
    {
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
    //Apenas blocos, armaduras e ferramentas podem ser utilizados
    usar(qtd = 1){
        const uso = qtd
        let info = ''
        //Verificação de tipo de item
        if (this.tipo === 'Bloco'){
            this.quantidade > 0? this.quantidade -= uso : info += `Não há mais ${this.nome} no inventário!`
        }
        //Se o item utilizado for ferramenta, será feito o cálculo de dano
        if (this.tipo === 'Ferramenta') {
            if (this.durabilidade != null && this.durabilidade> 0) {
                this.durabilidade -= uso
                const [min_dano, max_dano] = [5, 10];
                let dano = Math.floor(Math.random() * (max_dano - min_dano + 1)) + min_dano;
                return dano
            }
            info += `${this.nome} quebrou!`
        }
        //Caso algum dos itens utilizados não esteja mais disponível para uso, a variavel info informará
        return info
    }
    add_item(quantidade : number){
        const capacidade = 64 //Evita numero magico
        //Verifica se tem espaço sobrando
        let espaço_sobrando = capacidade - this.quantidade;
        //Se a quantidade do bloco for igual a 64 não dá mais pra adicionar bloco
        if (espaço_sobrando === 0){ 
            console.log('Slot cheio');
            return false
        } //Se tiver espaço sobrando, adiciona até atingir o limite
        else if (espaço_sobrando >= quantidade){ 
            this.quantidade += quantidade;
            return false;
        } //Se o espaço sobrando for menor q a quantiadade que queremos adicionar, adicionamos apenas o que dá
        else{
            this.quantidade += espaço_sobrando;
            //Retorno o que não foi adicionado para poder utilizá-lo quando fizer o inventário
            return (quantidade-espaço_sobrando);
        }
    }
}