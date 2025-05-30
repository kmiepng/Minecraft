"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventario_Armadura = void 0;
var Inventario_Armadura = /** @class */ (function () {
    function Inventario_Armadura(capacidade) {
        if (capacidade === void 0) { capacidade = 4; }
        this.capacidade = capacidade;
        this.inventario = new Array(capacidade);
    }
    Inventario_Armadura.prototype.addArmadura = function (armadura) {
        var slotOcupado = this.inventario.find(function (i) { return (i === null || i === void 0 ? void 0 : i.armadura.nome) === armadura.nome; });
        if (!slotOcupado) {
            for (var i = 0; i < this.capacidade; i++) {
                var slot = this.inventario[i];
                if (armadura.armadura === (slot === null || slot === void 0 ? void 0 : slot.armadura.armadura))
                    this.inventario[i] = { armadura: armadura, tipo: armadura.armadura };
                return true;
            }
        }
        return false;
    };
    Inventario_Armadura.prototype.removeArmadura = function (armadura) {
        var slotRemove = this.inventario.find(function (i) { return (i === null || i === void 0 ? void 0 : i.armadura.nome) === armadura.nome; });
        if (slotRemove) {
            for (var i = 0; i < this.capacidade; i++) {
                var slot = this.inventario[i];
                if (armadura.armadura === (slot === null || slot === void 0 ? void 0 : slot.armadura.armadura))
                    this.inventario[i] = null;
                return true;
            }
        }
        return false;
    };
    Inventario_Armadura.prototype.mostrarInventario = function () {
        console.log("INVENTARIO");
        this.inventario.forEach(function (slot, i) {
            if (slot) {
                console.log("[".concat(slot.armadura.informacao(), "]"));
            }
            else {
                console.log("[  vazio  ]");
            }
        });
    };
    return Inventario_Armadura;
}());
exports.Inventario_Armadura = Inventario_Armadura;
