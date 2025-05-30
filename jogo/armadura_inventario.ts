import { Itens, tipoArmadura } from "./itens";

interface slotArmadura {
    armadura : Itens
    tipo : tipoArmadura | undefined
}

class Inventario_Armadura {
    inventario : (slotArmadura | null )[];
    capacidade : number;
    constructor(capacidade = 4){
        this.capacidade = capacidade
        this.inventario = new Array(capacidade)
    }
    addArmadura(armadura : Itens){
        const slotOcupado = this.inventario.find(i => i?.armadura.nome === armadura.nome)
        if (!slotOcupado){
            for (let i = 0; i < this.capacidade; i++){
                const slot = this.inventario[i]
                if (armadura.armadura === slot?.armadura.armadura) this.inventario[i] = {armadura : armadura, tipo : armadura.armadura};
                return true
            }
        }
        return false
    }
    removeArmadura(armadura : Itens){
        const slotRemove = this.inventario.find(i => i?.armadura.nome === armadura.nome)
        if (slotRemove){
            for (let i = 0; i < this.capacidade; i++){
                const slot = this.inventario[i]
                if (armadura.armadura === slot?.armadura.armadura) this.inventario[i] = null;
                return true
            }
        }
        return false
    }
    mostrarInventario(){
        console.log("INVENTARIO");
        this.inventario.forEach((slot, i) => {
            if (slot) {
                console.log(`[${slot.armadura.informacao()}]`);
            } else {
                console.log(`[  vazio  ]`);
            }
        });
    }
}

export { Inventario_Armadura }