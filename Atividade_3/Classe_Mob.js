"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mob = void 0;
exports.vida_aleatoria = vida_aleatoria;
var Mob = /** @class */ (function () {
    function Mob(nome, vida) {
        this.nome = nome;
        this.vida = vida;
    }
    Mob.prototype.atacar = function (min_dano, max_dano) {
        if (min_dano === void 0) { min_dano = 1; }
        if (max_dano === void 0) { max_dano = 10; }
        var dano = Math.floor(Math.random() * (max_dano - min_dano + 1)) + min_dano;
        return dano;
    };
    Mob.prototype.receber_dano = function (dano) {
        this.vida > 0 ? this.vida -= dano : console.log("".concat(this.nome, " morreu!")); //se a vida for 0, claramente morreu
        return this.vida;
    };
    Mob.prototype.info_mob = function () {
        var informacao = "".concat(this.nome, ", Vida: ").concat(this.vida); //informações do mob pra testar no código principal
        return console.log(informacao);
    };
    return Mob;
}());
exports.Mob = Mob;
//essa vida aleaória é só pra eu n ter q pensar toda vez na hr de criar o mob aleatorio
function vida_aleatoria(max_vida, min_vida) {
    if (max_vida === void 0) { max_vida = 20; }
    if (min_vida === void 0) { min_vida = 10; }
    var vida = Math.floor(Math.random() * (max_vida - min_vida + 1)) + min_vida;
    return vida;
}
