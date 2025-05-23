import { Ferramenta, Armadura, Bloco, Minerio } from "./Classes_Itens";

class slot_Inventario{
    constructor(){
        this.item = []
    }
    item : any
    adicionar_slot(item : any){
        const itemExistente = this.item.find(i => i.nome === item.nome)
        if (itemExistente){
            if (item.tipo === 'Ferramenta' || item.tipo === 'Armadura'){
                console.log('Não pode stackar armadura/ferramenta')
                return false
            } else{
                item.add_bloco(item.quantidade);
            }
        } else if (this.item.length === 0){
            this.item[0] = item
            return true
        } else{
            console.log(`Não é possível adicionar ${item.nome} no slot, slot cheio`)
            return false
        }
        return false 
    }
    remover_slot(quantidade : number = 1){
        const item = this.item[0]
        if (item.quantidade > quantidade){
            item.quantidade -= quantidade;
        } else {
            this.item = []
            return item;
        }
    }
    info(){
        if (this.item.length > 0){
            const item = this.item[0]
            if (item.tipo === 'Ferramenta'){
                item.info_ferramenta()
            }else if (item.tipo === 'Armadura'){
                item.info_armadura()
            }else{
                item.info_bloco()
            }
        }
        else {
            return console.log('Vazio')
        }
    }
}

class slot_Armadura{
    constructor(capacidade = 4){
        this.armaduras = []
        this.capacidade = capacidade
        this.slot_cabeca = []
        this.slot_peitoral = []
        this.slot_calca = []
        this.slot_bota = []
        this.armaduras.push(this.slot_cabeca, this.slot_peitoral, this.slot_calca, this.slot_bota)
    }
    armaduras : any
    capacidade : number
    slot_cabeca : any
    slot_peitoral : any
    slot_calca : any
    slot_bota : any
    mostrar_slot_Armadura(){
        const qtd_armor_por_slot = 1
        for (let i = 0; i < this.capacidade; i++){
            for (let j = 0; j < qtd_armor_por_slot; j++){
                if (this.armaduras[i][j] === undefined){
                    return console.log('Vazio')
                }
                const armadura = this.armaduras[i][j]
                return console.log(armadura.info_armadura())
            }
        }
    }
    equipar_armadura(armadura : any){
        if (armadura.armadura_tipo === 'Capacete'){
            if(this.slot_cabeca.length > 0){
                const capacete = this.slot_cabeca[0]
                console.log('Não é possível adicionar, slot cheio');
                return console.log(`Item que ocupa o espaço: ${capacete.nome}`);
            }
            return this.slot_cabeca[0] = armadura;
        }
        if (armadura.armadura_tipo === 'Peitoral'){
            if(this.slot_cabeca.length > 0){
                const peitoral = this.slot_peitoral[0]
                console.log('Não é possível adicionar, slot cheio');
                return console.log(`Item que ocupa o espaço: ${peitoral.nome}`);
            }
            return this.slot_peitoral[0] = armadura;
        }
        if (armadura.armadura_tipo === 'Calca'){
            if(this.slot_cabeca.length > 0){
                const calca = this.slot_calca[0]
                console.log('Não é possível adicionar, slot cheio');
                return console.log(`Item que ocupa o espaço: ${calca.nome}`);
            }
            return this.slot_calca[0] = armadura;
        }
        if (armadura.armadura_tipo === 'Bota'){
            if(this.slot_cabeca.length > 0){
                const bota = this.slot_bota[0]
                console.log('Não é possível adicionar, slot cheio');
                return console.log(`Item que ocupa o espaço: ${bota.nome}`);
            }
            return this.slot_bota[0] = armadura;
        }
    }
}
//funcao para drop de minerio após usar uma picareta
function drop_Minerio(nome_drop : any, encantamento = null, min_drop = 1, max_drop = 4){  //quantidade de minério que dropa após minerar um bloco de minério
    //não to considerando os drops extras de carvão, cobre e redstone
    let drop =  Math.floor(Math.random() * (max_drop-min_drop +1)) + min_drop;
    if (encantamento !== null){ //verificando se quebrou o minério com a picareta encantada
        encantamento === 'Toque de seda' ? nome_drop = new Bloco(`Bloco de ${nome_drop}`, 'Bloco') : nome_drop = new Minerio(nome_drop, 'Minério', drop);
    }
    else{
        nome_drop = new Minerio(nome_drop, 'Minério'); //caso não, dropa apenas 1 minério normal
    }
    return nome_drop;
}