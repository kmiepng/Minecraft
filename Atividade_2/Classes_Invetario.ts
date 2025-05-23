import { Ferramenta, Armadura, Bloco } from "./Classes_Itens";

class slot_Inventário{
    constructor(capacidade = 64){
        this.item = []
        this.capacidade = capacidade;
    }
    item : any
    capacidade : number
    adicionar_slot(item : any){
        const itemExistente = this.item.find(i => i.nome === item.nome)
        if (itemExistente){
            if (item.tipo === 'Ferramenta' || item.tipo === 'Armadura'){
                console.log('Não pode stackar armadura/ferramenta')
                return false
            }
            this.item.add_bloco(item);
        }
        console.log('Slot cheio')
        return false
    }
    info(){
        return this.item.toString()
    }
}

let espada_de_ferro = new Ferramenta('Espada de Ferro', 'Ferramenta', 250);
let slot1 = new slot_Inventário;

slot1.adicionar_slot(espada_de_ferro);
slot1.info();