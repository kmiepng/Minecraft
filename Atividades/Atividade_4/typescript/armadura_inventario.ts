import { Itens, tipoArmadura } from "./itens";

interface slotArmadura {
    armadura : Itens
    tipo : tipoArmadura | undefined
}

class Inventario_Armadura {
    inventario : (slotArmadura | undefined )[];
    capacidade : number;
    constructor(capacidade = 4){
        this.capacidade = capacidade
        this.inventario = new Array(capacidade)
    }
    addArmadura(armadura : Itens){
        const slotOcupado = this.inventario.find(i => i?.armadura.nome === armadura.nome)
        if (!slotOcupado){
            if (armadura.armadura = 'Capacete') {
                this.inventario[0] = {armadura : armadura, tipo : armadura.armadura}
                return true
            }
            if (armadura.armadura = 'Peitoral') {
                this.inventario[1] = {armadura : armadura, tipo : armadura.armadura}
                return true
            }
            if (armadura.armadura = 'Calca') {
                this.inventario[2] = {armadura : armadura, tipo : armadura.armadura}
                return true
            }
            if (armadura.armadura = 'Bota') {
                this.inventario[3] = {armadura : armadura, tipo : armadura.armadura}
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
                if (armadura.armadura === slot?.armadura.armadura) this.inventario[i] = undefined;
                return true
            }
        }
        return false
    }
    mostrarInventario(){
        console.log("INVENTARIO");
        for(let i = 0; i < this.inventario.length; i ++){
            const slot = this.inventario[i]
            if (slot !== undefined) {
                console.log(`[${slot?.armadura.informacao()}]`);
            } else {
                console.log(`[  vazio  ]`);
            }
        };
    }
}

export { Inventario_Armadura }