//classe de itens do mine
class Itens{
    constructor(nome, tipo, quantidade = 1, durabilidade = null, fortalecimento = null){
        this.nome = nome; //nome da ferramenta, ex: picareta de diamante
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.durabilidade = durabilidade; //quantos blocos consegue quebrar antes de acabar a ferramenta
        this.fortalecimento = fortalecimento; //aprimoramentos da ferramenta ex: fortuna I
    }
    usar_ferramenta(){
        this.durabilidade > 0? this.durabilidade-- : console.log(`${this.nome} quebrou!`); /* verifica
        se ainda dá pra usar a ferramenta, se não der é pq tá quebrada */
    }
    usar_bloco(){
        this.quantidade > 0? this.quantidade-- : console.log(`Não há mais ${this.nome} no slot`);
    }
    informacao_item(){
        let informacao = `${this.nome}, Quantidade: ${this.quantidade}`;  //informações básicas

        if (this.durabilidade !== null){
            if (this.fortalecimento !== null){ //verifica se há algum encantamento para concatenar às infos
            informacao += `, Durabilidade: ${this.durabilidade}, Fortalecimento: ${this.fortalecimento}`;
            }
            informacao += `, Durabilidade: ${this.durabilidade}`;
        }
        return console.log(`${informacao}`);
    }
}

//funcoes de algumas funções relacionadas aos itens
function drop_Minerio(nome_drop, encantamento = null, min_drop = 1, max_drop = 4){  //quantidade de minério que dropa após minerar um bloco de minério
    //não to considerando os drops extras de carvão, cobre e redstone
    drop =  Math.floor(Math.random() * (max_drop-min_drop +1)) + min_drop;
    if (encantamento !== null){ //verificando se quebrou o minério com a picareta encantada
        encantamento === 'Toque de seda' ? nome_drop = new Itens(`Bloco de ${nome_drop}`, 'Bloco') : nome_drop = new Itens(nome_drop, 'Minério', drop);
    }
    else{
        nome_drop = new Itens(nome_drop, 'Minério'); //caso não, dropa apenas 1 minério normal
    }
    return nome_drop;
}

//teste

let picareta_de_ferro = new Itens('Picareta de Ferro', 'Ferramenta', 1, '250', 'Toque de seda');

picareta_de_ferro.informacao_item();

picareta_de_ferro.usar_ferramenta();
let diamante = drop_Minerio('Diamante', 'Fortuna III');

diamante.informacao_item();
picareta_de_ferro.informacao_item();

let pedregulho = new Itens('Pedregulho', 'Bloco', 64)
pedregulho.informacao_item();