"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventario_Armadura = void 0;
class Inventario_Armadura {
    constructor(capacidade = 4) {
        this.inventario = new Array(capacidade);
    }
    addArmadura(armadura) {
        const slotOcupado = this.inventario.find(i => (i === null || i === void 0 ? void 0 : i.armadura.nome) === armadura.nome);
        if (!slotOcupado) {
            if (armadura.armadura = 'Capacete') {
                this.inventario[0] = { armadura: armadura, tipo: armadura.armadura };
                return true;
            }
            if (armadura.armadura = 'Peitoral') {
                this.inventario[1] = { armadura: armadura, tipo: armadura.armadura };
                return true;
            }
            if (armadura.armadura = 'Calca') {
                this.inventario[2] = { armadura: armadura, tipo: armadura.armadura };
                return true;
            }
            if (armadura.armadura = 'Bota') {
                this.inventario[3] = { armadura: armadura, tipo: armadura.armadura };
                return true;
            }
        }
        return false;
    }
    removeArmadura(armadura) {
        const capacidade = 4;
        const slotRemove = this.inventario.find(i => (i === null || i === void 0 ? void 0 : i.armadura.nome) === armadura.nome);
        if (slotRemove) {
            for (let i = 0; i < capacidade; i++) {
                const slot = this.inventario[i];
                if (armadura.armadura === (slot === null || slot === void 0 ? void 0 : slot.armadura.armadura))
                    this.inventario[i] = undefined;
                return true;
            }
        }
        return false;
    }
    mostrarInventario() {
        console.log("INVENTARIO");
        for (let i = 0; i < this.inventario.length; i++) {
            const slot = this.inventario[i];
            if (slot !== undefined) {
                console.log(`[${slot === null || slot === void 0 ? void 0 : slot.armadura.informacao()}]`);
            }
            else {
                console.log(`[  vazio  ]`);
            }
        }
        ;
    }
}
exports.Inventario_Armadura = Inventario_Armadura;
//# sourceMappingURL=armadura_inventario.js.map