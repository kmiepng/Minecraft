//classe de itens do mine
class Itens{ 
    constructor(nome, tipo){
        
        this.nome = nome; //nome do item, ex: Picareta de Ferro
        this.tipo = tipo; // tipo do item, ex: Ferramenta
    } 
    nome : string;
    tipo : string;
    informacao_item(){
        let informacao : string;
        informacao = `${this.nome}, `;
        return informacao;
    }
}

class Ferramenta extends Itens{
    constructor(nome, tipo, durabilidade, fortalecimento = null){
        super(nome, tipo);
        this.durabilidade = durabilidade; //quantos blocos consegue quebrar antes de acabar a ferramenta
        this.fortalecimento = fortalecimento; //aprimoramentos da ferramenta ex: fortuna I
    }
    durabilidade : number;
    fortalecimento : any;
    info_ferramenta(){
        let informacao = this.informacao_item();
        this.fortalecimento !== null ? informacao += `Durabilidade: ${this.durabilidade}, Encantamento: ${this.fortalecimento}` : `Durabilidade: ${this.durabilidade}`;
        return console.log(informacao);
    }
    usar_ferramenta(){
        this.durabilidade > 0? this.durabilidade-- : console.log(`${this.nome} quebrou!`); /* verifica
        se ainda dá pra usar a ferramenta, se não der é pq tá quebrada */
    }
}

class Armadura extends Itens{
    constructor(nome, tipo, armadura_tipo, durabilidade, fortalecimento = null){
        super(nome, tipo);
        this.armadura_tipo = armadura_tipo; //se é capacete, calça, bota ou peitoral
        this.durabilidade = durabilidade; //quanto de dano pode tomar
        this.fortalecimento = fortalecimento; //aprimoramentos da armadura, ex: Fire protection IV
        }
        armadura_tipo : string;
        durabilidade : number;
        fortalecimento : any;
    info_armadura(){
        let informacao = this.informacao_item();
        this.fortalecimento !== null ? informacao += `Durabilidade: ${this.durabilidade}, Encantamento: ${this.fortalecimento}` : `Durabilidade: ${this.durabilidade}`;
        return console.log(informacao);
    }
    equipar_armadura(armadura){
        const slot_cabeca : any = [];
        const slot_peitoral : any = [];
        const slot_calca : any = [];
        const slot_bota : any = [];
        if (this.armadura_tipo === 'Capacete'){
            if(slot_cabeca.length > 0){
                console.log('Não é possível adicionar, slot cheio');
                return console.log(`Item que ocupa o espaço: ${slot_cabeca}`);
            }
            return slot_cabeca[0] = armadura;
        }
        if (this.armadura_tipo === 'Peitoral'){
            if(slot_cabeca.length > 0){
                console.log('Não é possível adicionar, slot cheio');
                return console.log(`Item que ocupa o espaço: ${slot_peitoral}`);
            }
            return slot_peitoral[0] = armadura;
        }
        if (this.armadura_tipo === 'Calca'){
            if(slot_cabeca.length > 0){
                console.log('Não é possível adicionar, slot cheio');
                return console.log(`Item que ocupa o espaço: ${slot_calca}`);
            }
            return slot_calca[0] = armadura;
        }
        if (this.armadura_tipo === 'Bota'){
            if(slot_cabeca.length > 0){
                console.log('Não é possível adicionar, slot cheio');
                return console.log(`Item que ocupa o espaço: ${slot_bota}`);
            }
            return slot_bota[0] = armadura;
        }
    }
}

class Bloco extends Itens{
    constructor(nome, tipo, quantidade = 64){
        super(nome, tipo);
        this.quantidade = quantidade;
    }
    quantidade : number;
    info_bloco(){
        let informacao = this.informacao_item();
        informacao += `Quantidade: ${this.quantidade}`;
        return console.log(informacao);
    }
    add_bloco(quantidade){
        let espaço_sobrando = 64 - this.quantidade;
        if (this.quantidade === 64){
            console.log('Slot cheio');
        } else if (espaço_sobrando >= quantidade){
            this.quantidade += quantidade;
        } else{
            this.quantidade += espaço_sobrando;
        }
    }
    usar_bloco(){
        this.quantidade > 0? this.quantidade-- : console.log(`Não há mais ${this.nome} no inventário`);
    }
}

export {Ferramenta, Armadura, Bloco};