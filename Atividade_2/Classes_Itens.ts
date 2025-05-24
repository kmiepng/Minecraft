//Itens é uma classe genérica que engloba as entidades que existem no inventário de um player
class Itens{ 
    constructor(nome : string, tipo : string){
        this.nome = nome; //nome do item, ex: Picareta de Ferro
        this.tipo = tipo; // tipo do item, ex: Ferramenta
    } 
    nome : string;
    tipo : string;
    informacao_item(){
        let informacao : string;
        informacao = `${this.nome}, `; //função genérica para moldar de acordo com a informação q o player quer
        return informacao;
    }
}
//Ferramenta é um tipo de item que serve para facilitar a gameplay, como quebrar blocos, matar mobs, etc.
class Ferramenta extends Itens{
    constructor(nome : string, tipo : string, durabilidade : number, fortalecimento ?: string){
        super(nome, tipo);
        this.durabilidade = durabilidade; //quantos blocos consegue quebrar antes de acabar a ferramenta
        this.fortalecimento = fortalecimento; //aprimoramentos da ferramenta ex: fortuna III
    }
    durabilidade : number;
    fortalecimento ?: string;
    info_ferramenta(){
        let informacao = super.informacao_item(); //informação para a ferramenta
        this.fortalecimento !== undefined ? informacao += `Durabilidade: ${this.durabilidade}, Encantamento: ${this.fortalecimento}` : informacao += `Durabilidade: ${this.durabilidade}`;
        return informacao; //verifica se tem encantamento
    }
    usar_ferramenta(min_dano = 5, max_dano = 15){
        this.durabilidade > 0? this.durabilidade-- : console.log(`${this.nome} quebrou!`); /* verifica
        se ainda dá pra usar a ferramenta, se não der é pq tá quebrada */
        let dano = Math.floor(Math.random() * (max_dano - min_dano + 1)) + min_dano; //isso serve pra ataque
        return dano
    }
}
//Armadura é uma vestimenta que dá resistência ao player
//Criei a classe armadura pois ao usá-la, ela sai do inventário principal e vai para o invetário de armaduras
//Então, para testar essa funcionalidade, criei essa classe separada para testar em outro modulo
class Armadura extends Itens{
    constructor(nome : string, tipo : string, armadura_tipo : string, durabilidade : number, fortalecimento ?: string ){
        super(nome, tipo);
        this.armadura_tipo = armadura_tipo; //se é capacete, calça, bota ou peitoral
        this.durabilidade = durabilidade; //quanto de dano pode tomar
        this.fortalecimento = fortalecimento; //aprimoramentos da armadura, ex: Fire protection IV
        }
        armadura_tipo : string;
        durabilidade : number;
        fortalecimento ?: string;
    info_armadura(){
        let informacao = super.informacao_item(); //informação para armadura
        this.fortalecimento !== undefined ? informacao += `Durabilidade: ${this.durabilidade}, Encantamento: ${this.fortalecimento}` : informacao += `Durabilidade: ${this.durabilidade}`;
        return informacao; //verifica se tem encantamento
    }
}
//Bloco é uma representação 3d de um item
class Bloco extends Itens{
    constructor(nome : string, tipo : string, quantidade = 1){
        super(nome, tipo);
        this.quantidade = quantidade;
    }
    quantidade : number;
    info_bloco(){
        let informacao = super.informacao_item();
        informacao += `Quantidade: ${this.quantidade}`; //um bloco pode ser stackado
        return informacao;
    }
    add_bloco(quantidade : number){
        const capacidade = 64
        let espaço_sobrando = capacidade - this.quantidade; //verifica se tem espaço sobrando
        if (this.quantidade === capacidade){ //se a quantidade do bloco for igual a 64 não dá mais pra adicionar bloco
            console.log('Slot cheio');
        } else if (espaço_sobrando >= quantidade){ //se tiver espaço sobrando, adiciona até atingir o limite
            this.quantidade += quantidade;
        } else{
            this.quantidade += espaço_sobrando;; //se o espaço sobrando for menor q a quantiadade que queremos
                                                //adicionar, adicionamos apenas o que dá
        }
    }
    usar_bloco(){ //usar um bloco é colocar ele no mundo principal
        this.quantidade > 0? this.quantidade-- : console.log(`Não há mais ${this.nome} no inventário`);
    }
}
//Minerio é um tipo de item que serve para criar: blocos, ferramentas e armadura
//criei a classe Minerio apenas pq não vou exportar a classe genérica 'Itens'
class Minerio extends Itens{
    constructor(nome : string, tipo : string, quantidade = 1){
        super(nome, tipo)
        this.quantidade = quantidade //um minério pode stackar também
    }
    quantidade : number
    info_minerio(){
        let informacao = super.informacao_item();
        informacao += `Quantidade: ${this.quantidade}`; //mostra as informações do minério
        return informacao;
    }
    add_minerio(quantidade : number){ //adiciona da mesma maneira que um bloco
        let espaço_sobrando = 64 - this.quantidade;
        if (this.quantidade === 64){
            console.log('Slot cheio');
        } else if (espaço_sobrando >= quantidade){
            this.quantidade += quantidade;
        } else{
            this.quantidade += espaço_sobrando;;
        }
    }
}

//funcao para drop de minerio após usar uma picareta
function drop_Minerio(nome_drop : any, encantamento ?: string, min_drop = 1, max_drop = 4){  //quantidade de minério que dropa após minerar um bloco de minério
    //não to considerando os drops extras de carvão, cobre e redstone
    let drop =  Math.floor(Math.random() * (max_drop-min_drop +1)) + min_drop;
    if (encantamento !== undefined){ //verificando se quebrou o minério com a picareta encantada
        if (encantamento === 'Toque de seda') { 
            nome_drop = new Bloco(`Bloco de ${nome_drop}`, 'Bloco') 
        } else if (encantamento === 'Fortuna') {
            nome_drop = new Minerio(nome_drop, 'Minério', drop);
        }
    }
    else{
        nome_drop = new Minerio(nome_drop, 'Minério'); //caso não, dropa apenas 1 minério normal
    }
    return nome_drop;
}

export {Ferramenta, Armadura, Bloco, Minerio, drop_Minerio};