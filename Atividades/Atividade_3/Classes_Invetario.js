"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slot_Inventario = exports.slot_Armadura = void 0;
var slot_Inventario = /** @class */ (function () {
    function slot_Inventario() {
        this.item = []; //slot unico de um inventario
    }
    slot_Inventario.prototype.adicionar_slot = function (item) {
        var itemExistente = this.item.find(function (i) { return i.nome === item.nome; }); //aqui verifica se o slot ta cheio
        if (itemExistente) { //como está cheio, verifica o tipo do item q ocupa
            if (item.tipo === 'Ferramenta' || item.tipo === 'Armadura') {
                console.log('Não pode stackar armadura/ferramenta'); //ferramentas e armaduras não podem stackar
                return false;
            }
            else if (item.tipo === 'Bloco') {
                item.add_bloco(item.quantidade); //se for bloco, adiciona oq dá chamando 
                //a função que criei na classe de blocos
            }
            else {
                item.add_minerio(item.quantidade); //mesma coisa, mas pra minerio
            }
        }
        else if (this.item.length === 0) {
            this.item[0] = item; //agr, se estiver vazio, adiciona qualquer item no espaço
            return true;
        }
        else {
            console.log("N\u00E3o \u00E9 poss\u00EDvel adicionar ".concat(item.nome, " no slot")); //aqui, o item que quero adicionar
            // é diferente do item q ocupa
            return false;
        }
        return false;
    };
    slot_Inventario.prototype.remover_slot = function (quantidade) {
        if (quantidade === void 0) { quantidade = 1; }
        var item = this.item[0]; //só pra facilitar minha vida na hora de ler a funcao
        if (item.quantidade > quantidade) { // se a quantidade de itens no slot for maior q a quantidade que
            item.quantidade -= quantidade; //quero remover, ent remove so oq quero
        }
        else {
            this.item = []; //senão, remove tudo do slot
            return item; //retorno o objeto
        }
    };
    slot_Inventario.prototype.info = function () {
        if (this.item.length > 0) { //aqui verifica se tem algum item no slot
            var item = this.item[0]; //só pra facilitar minha vida na hora de ler a funcao
            if (item.tipo === 'Ferramenta') {
                item.info_ferramenta(); // se for ferramenta, uso a função pras ferramentas
            }
            else if (item.tipo === 'Armadura') {
                item.info_armadura(); // se for armadura, uso a função pras armaduras
            }
            else if (item.tipo === 'Bloco') {
                item.info_bloco(); //se for bloco, função pra bloco
            }
            else {
                item.info_minerio(); //informação de minério
            }
        }
        else {
            return console.log('Vazio'); //se não tiver nada, retorna vazio
        }
    };
    return slot_Inventario;
}());
exports.slot_Inventario = slot_Inventario;
var slot_Armadura = /** @class */ (function () {
    function slot_Armadura(capacidade) {
        if (capacidade === void 0) { capacidade = 4; }
        this.armaduras = [];
        this.capacidade = capacidade;
        this.slot_cabeca = [];
        this.slot_peitoral = [];
        this.slot_calca = [];
        this.slot_bota = [];
        //estou dando push nessa ordem pra simular o inventario de armadura do mine
        this.armaduras.push(this.slot_cabeca, this.slot_peitoral, this.slot_calca, this.slot_bota);
    }
    slot_Armadura.prototype.mostrar_slot_Armadura = function () {
        var qtd_armor_por_slot = 1; //só pra não deixar número mágico no código
        for (var i = 0; i < this.capacidade; i++) { //usei 2 for pq o array se comporta como bidimensional
            for (var j = 0; j < qtd_armor_por_slot; j++) { //pois dei push em arrays diferentes
                var armadura = this.armaduras[i][j]; //pra facilitar minha vida na hr de ler o código
                if (armadura === undefined) { //se não tiver nada no slot, printa 'Vazio'
                    console.log("[".concat(i + 1, ", ").concat(j + 1, "]: Vazio"));
                }
                else {
                    var info = armadura.info_armadura();
                    console.log("[".concat(i + 1, ", ").concat(j + 1, "]: ").concat(info)); //senão, retorna as informações da armadura naquele slot
                }
            }
        }
    };
    slot_Armadura.prototype.equipar_armadura = function (armadura) {
        //estou verificando o tipo da armadura que quero adicionar
        if (armadura.armadura_tipo === 'Capacete') {
            if (this.slot_cabeca.length > 0) { //se o slot estiver cheio, não adiciona
                console.log('Não é possível adicionar, slot cheio');
                return false;
            }
            return this.slot_cabeca[0] = armadura; //se estiver vazio, adiciona
        }
        if (armadura.armadura_tipo === 'Peitoral') { //mesmo esquema
            if (this.slot_peitoral.length > 0) {
                console.log('Não é possível adicionar, slot cheio');
                return false;
            }
            return this.slot_peitoral[0] = armadura;
        }
        if (armadura.armadura_tipo === 'Calca') { //mesmo esquema
            if (this.slot_calca.length > 0) {
                console.log('Não é possível adicionar, slot cheio');
                return false;
            }
            return this.slot_calca[0] = armadura;
        }
        if (armadura.armadura_tipo === 'Bota') { //mesmo esquema
            if (this.slot_bota.length > 0) {
                console.log('Não é possível adicionar, slot cheio');
                return false;
            }
            return this.slot_bota[0] = armadura;
        }
    };
    slot_Armadura.prototype.remover_armadura = function (armadura) {
        var itemExistente = false; //pra poder verificar se tem item ou n
        var qtd_armor_por_slot = 1; //pra não deixar numero mágico pelo código
        for (var i = 0; i < qtd_armor_por_slot; i++) {
            var armor = this.armaduras[i][qtd_armor_por_slot - 1]; //(qtd_amor_por_slot - 1) pois retorna a primeira posição do array
            if (armor.nome === armadura.nome) { // se tiver, itemExistente se torna true
                itemExistente = true;
            }
        }
        if (itemExistente) { //aqui é pra verificar o tipo do item que quero remover
            if (armadura.armadura_tipo === 'Capacete') {
                this.slot_cabeca.shift();
                return armadura;
            }
            if (armadura.armadura_tipo === 'Peitoral') {
                this.slot_peitoral.shift();
                return armadura;
            }
            if (armadura.armadura_tipo === 'Calca') {
                this.slot_calca.shift();
                return armadura;
            }
            if (armadura.armadura_tipo === 'Bota') {
                this.slot_bota.shift();
                return armadura;
            }
        }
        return false; //caso não tenha item pra remover, usei esse return false pra não dar erro no código
    };
    slot_Armadura.prototype.usar_armadura = function (dano) {
        var qtd_armor_por_slot = 1; //pra não deixar numero magico pelo codigo
        for (var i = 0; i < this.capacidade; i++) {
            var armor = this.armaduras[i][qtd_armor_por_slot - 1];
            if (armor !== undefined) { //aqui é pra dar dano nas armaduras que tem no inventario
                armor.durabilidade > 0 ? armor.durabilidade -= dano : console.log("".concat(armor.nome, " quebrou!"));
            }
        }
        return this.armaduras; //aqui retorno a atualização do array
    };
    return slot_Armadura;
}());
exports.slot_Armadura = slot_Armadura;
