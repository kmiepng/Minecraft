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
    constructor(nome : string, tipo : string, durabilidade : number, fortalecimento = null){
        super(nome, tipo);
        this.durabilidade = durabilidade; //quantos blocos consegue quebrar antes de acabar a ferramenta
        this.fortalecimento = fortalecimento; //aprimoramentos da ferramenta ex: fortuna III
    }
    durabilidade : number;
    fortalecimento : any;
    info_ferramenta(){
        let informacao = this.informacao_item(); //informação para a ferramenta
        this.fortalecimento !== null ? informacao += `Durabilidade: ${this.durabilidade}, Encantamento: ${this.fortalecimento}` : informacao += `Durabilidade: ${this.durabilidade}`;
        return console.log(informacao); //verifica se tem encantamento
    }
    usar_ferramenta(){
        this.durabilidade > 0? this.durabilidade-- : console.log(`${this.nome} quebrou!`); /* verifica
        se ainda dá pra usar a ferramenta, se não der é pq tá quebrada */
    }
}
//Armadura é uma vestimenta que dá resistência ao player
//Criei a classe armadura pois ao usá-la, ela sai do inventário principal e vai para o invetário de armaduras
//Então, para testar essa funcionalidade, criei essa classe separada para testar em outro modulo
class Armadura extends Itens{
    constructor(nome : string, tipo : string, armadura_tipo : string, durabilidade : number, fortalecimento = null){
        super(nome, tipo);
        this.armadura_tipo = armadura_tipo; //se é capacete, calça, bota ou peitoral
        this.durabilidade = durabilidade; //quanto de dano pode tomar
        this.fortalecimento = fortalecimento; //aprimoramentos da armadura, ex: Fire protection IV
        }
        armadura_tipo : string;
        durabilidade : number;
        fortalecimento : any;
    info_armadura(){
        let informacao = this.informacao_item(); //informação para armadura
        this.fortalecimento !== null ? informacao += `Durabilidade: ${this.durabilidade}, Encantamento: ${this.fortalecimento}` : informacao += `Durabilidade: ${this.durabilidade}`;
        return console.log(informacao); //verifica se tem encantamento
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
        let informacao = this.informacao_item();
        informacao += `Quantidade: ${this.quantidade}`; //um bloco pode ser stackado
        return console.log(informacao);
    }
    add_bloco(quantidade : number){
        let espaço_sobrando = 64 - this.quantidade; //verifica se tem espaço sobrando
        if (this.quantidade === 64){ //se a quantidade do bloco for igual a 64 não dá mais pra adicionar bloco
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
    constructor(nome : string, tipo :string, quantidade = 1){
        super(nome, tipo)
        this.quantidade = quantidade //um minério pode stackar também
    }
    quantidade : number
    info_minerio(){
        let informacao = this.informacao_item();
        informacao += `Quantidade: ${this.quantidade}`; //mostra as informações do minério
        return console.log(informacao);
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

export {Ferramenta, Armadura, Bloco, Minerio};