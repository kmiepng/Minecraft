import { Ferramenta, Armadura, Bloco, Minerio } from "./Classes_Itens";

class slot_Inventario{
    constructor(){
        this.item = [] //slot unico de um inventario
    }
    item : any
    adicionar_slot(item : any){
        const itemExistente = this.item.find(i => i.nome === item.nome) //aqui verifica se o slot ta cheio
        if (itemExistente){ //como está cheio, verifica o tipo do item q ocupa
            if (item.tipo === 'Ferramenta' || item.tipo === 'Armadura'){
                console.log('Não pode stackar armadura/ferramenta') //ferramentas e armaduras não podem stackar
                return false
            } else if(item.tipo === 'Bloco'){
                item.add_bloco(item.quantidade); //se for bloco, adiciona oq dá chamando 
                                                //a função que criei na classe de blocos
            } else {
                item.add_minerio(item.quantidade) //mesma coisa, mas pra minerio
            }
        } else if (this.item.length === 0){
            this.item[0] = item //agr, se estiver vazio, adiciona qualquer item no espaço
            return true
        } else{
            console.log(`Não é possível adicionar ${item.nome} no slot`) //aqui, o item que quero adicionar
                                                                        // é diferente do item q ocupa
            return false
        }
        return false 
    }
    remover_slot(quantidade : number = 1){ //deixo por padrão a remoção de itens = 1
        const item = this.item[0] //só pra facilitar minha vida na hora de ler a funcao
        if (item.quantidade > quantidade){ // se a quantidade de itens no slot for maior q a quantidade que
            item.quantidade -= quantidade; //quero remover, ent remove so oq quero
        } else {
            this.item = [] //senão, remove tudo do slot
            return item; //retorno o objeto
        }
    }
    info(){
        if (this.item.length > 0){ //aqui verifica se tem algum item no slot
            const item = this.item[0] //só pra facilitar minha vida na hora de ler a funcao
            if (item.tipo === 'Ferramenta'){
                item.info_ferramenta() // se for ferramenta, uso a função pras ferramentas
            }else if (item.tipo === 'Armadura'){
                item.info_armadura() // se for armadura, uso a função pras armaduras
            }else if (item.tipo === 'Bloco'){
                item.info_bloco() //se for bloco, função pra bloco
            } else{
                item.info_minerio() //informação de minério
            }
        }
        else {
            return console.log('Vazio') //se não tiver nada, retorna vazio
        }
    }
}

class slot_Armadura{
    constructor(capacidade = 4){ //essa capacidade 4 é o tamanho do inventario de armadura
        this.armaduras = []
        this.capacidade = capacidade
        this.slot_cabeca = []
        this.slot_peitoral = []
        this.slot_calca = []
        this.slot_bota = []
        //estou dando push nessa ordem pra simular o inventario de armadura do mine
        this.armaduras.push(this.slot_cabeca, this.slot_peitoral, this.slot_calca, this.slot_bota)
    }
    armaduras : any
    capacidade : number
    slot_cabeca : any
    slot_peitoral : any
    slot_calca : any
    slot_bota : any
    mostrar_slot_Armadura(){
        const qtd_armor_por_slot = 1 //só pra não deixar número mágico no código
        for (let i = 0; i < this.capacidade; i++){ //usei 2 for pq o array se comporta como bidimensional
            for (let j = 0; j < qtd_armor_por_slot; j++){ //pois dei push em arrays diferentes
                const armadura = this.armaduras[i][j]; //pra facilitar minha vida na hr de ler o código
                if (armadura === undefined){ //se não tiver nada no slot, printa 'Vazio'
                    console.log(`[${i+1}, ${j+1}]: Vazio`)
                } else {
                    let info = armadura.info_armadura()
                    console.log(`[${i+1}, ${j+1}]: ${info}`) //senão, retorna as informações da armadura naquele slot
                }
            }
        }
    }
    equipar_armadura(armadura : any){
        //estou verificando o tipo da armadura que quero adicionar
        if (armadura.armadura_tipo === 'Capacete'){
            if(this.slot_cabeca.length > 0){ //se o slot estiver cheio, não adiciona
                console.log('Não é possível adicionar, slot cheio');
                return false;
            }
            return this.slot_cabeca[0] = armadura; //se estiver vazio, adiciona
        }
        if (armadura.armadura_tipo === 'Peitoral'){ //mesmo esquema
            if(this.slot_peitoral.length > 0){
                console.log('Não é possível adicionar, slot cheio');
                return false
            }
            return this.slot_peitoral[0] = armadura;
        }
        if (armadura.armadura_tipo === 'Calca'){ //mesmo esquema
            if(this.slot_calca.length > 0){
                console.log('Não é possível adicionar, slot cheio');
                return false
            }
            return this.slot_calca[0] = armadura;
        }
        if (armadura.armadura_tipo === 'Bota'){ //mesmo esquema
            if(this.slot_bota.length > 0){
                console.log('Não é possível adicionar, slot cheio');
                return false
            }
            return this.slot_bota[0] = armadura;
        }
    }
    remover_armadura(armadura : any){ //aqui irei remover a armadura
        let itemExistente = false; //pra poder verificar se tem item ou n
        const qtd_armor_por_slot = 1; //pra não deixar numero mágico pelo código
        for (let i = 0; i < qtd_armor_por_slot; i ++){
            const armor = this.armaduras[i][qtd_armor_por_slot-1] //(qtd_amor_por_slot - 1) pois retorna a primeira posição do array
            if (armor.nome === armadura.nome){ // se tiver, itemExistente se torna true
                itemExistente = true
            }
        }
        if (itemExistente){ //aqui é pra verificar o tipo do item que quero remover
            if (armadura.armadura_tipo === 'Capacete'){
               this.slot_cabeca.shift()
               return armadura
            }
            if (armadura.armadura_tipo === 'Peitoral'){
                this.slot_peitoral.shift()
                return armadura
            }
            if (armadura.armadura_tipo === 'Calca'){
                this.slot_calca.shift()
                return armadura
            }
            if (armadura.armadura_tipo === 'Bota'){
                this.slot_bota.shift()
                return armadura
            }
        }
        return false //caso não tenha item pra remover, usei esse return false pra não dar erro no código
    }
    usar_armadura(dano : number){ //aqui é pra simular o ataque de um mob
        const qtd_armor_por_slot = 1; //pra não deixar numero magico pelo codigo
        for(let i = 0; i < this.capacidade; i++){
            const armor = this.armaduras[i][qtd_armor_por_slot-1]
            if (armor !== undefined){ //aqui é pra dar dano nas armaduras que tem no inventario
                armor.durabilidade > 0 ? armor.durabilidade -= dano : console.log(`${armor.nome} quebrou!`)
            }
        }
        return this.armaduras //aqui retorno a atualização do array
    }
}
//tentei fazer o inventario maior, mas n deu certo
class Inventario{
    constructor(linhas = 4, colunas = 9){
        this.inventario = [];
        this.linhas = linhas;
        this.colunas = colunas;
        for (let i = 0; i < this.linhas*this.colunas; i++){
            this.inventario.push(new slot_Inventario())
        }
    }
    inventario : any;
    linhas : number;
    colunas : number;
}

export {slot_Armadura, slot_Inventario}