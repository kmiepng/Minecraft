//classe de itens do mine
class Itens{ 
    constructor(nome, tipo){
        
        this.nome = nome; //nome do item, ex: Picareta de Ferro
        this.tipo = tipo; // tipo do item, ex: Ferramenta
    } 
    nome : String;
    tipo : String;
    informacao_item(){
        let informacao = `${this.nome}, `
        return informacao;
    }
}

class Ferramenta extends Itens{
    constructor(nome, tipo, durabilidade, fortalecimento = null){
        super(nome, tipo)
        this.durabilidade = durabilidade; //quantos blocos consegue quebrar antes de acabar a ferramenta
        this.fortalecimento = fortalecimento; //aprimoramentos da ferramenta ex: fortuna I
    }
    durabilidade : number;
    fortalecimento : any;
    info_ferramenta(){
        let informacao = this.informacao_item()
        this.fortalecimento !== null ? informacao += `Durabilidade: ${this.durabilidade}, Encantamento: ${this.fortalecimento}` : `Durabilidade: ${this.durabilidade}`
    }
    usar_ferramenta(){
        this.durabilidade > 0? this.durabilidade-- : console.log(`${this.nome} quebrou!`); /* verifica
        se ainda dá pra usar a ferramenta, se não der é pq tá quebrada */
    }
}

class Armadura extends Itens{
    constructor(nome, tipo, armadura_tipo, durabilidade, fortalecimento = null){
        super(nome, tipo)
        this.armadura_tipo = armadura_tipo; //se é capacete, calça, bota ou peitoral
        this.durabilidade = durabilidade; //quanto de dano pode tomar
        this.fortalecimento = fortalecimento; //aprimoramentos da armadura, ex: Fire protection IV
        }
        armadura_tipo : string;
        durabilidade : number;
        fortalecimento : any;
    equipar_armadura(armadura){
        let [slot_cabeca, slot_peitoral, slot_calca, slot_bota] = [[],[],[],[]]
        if (this.armadura_tipo === 'Capacete'){
            if(slot_cabeca.length > 0){
                console.log('Não é possível adicionar, slot cheio')
                return console.log(slot_cabeca)
            }
            return slot_cabeca.push(armadura)
        }
    }
}

class Bloco extends Itens{
    constructor(nome, tipo, quantidade = 64){
        super(nome, tipo)
        this.quantidade = quantidade;
    }
    quantidade : number;
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
        this.quantidade > 0? this.quantidade-- : console.log(`Não há mais ${this.nome} no inventário`)
    }
}

let bota_diamante = new Armadura('Bota de Diamante', 'Armadura', 'Bota', 429)

bota_diamante.equipar_armadura(bota_diamante)