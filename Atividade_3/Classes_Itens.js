"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Minerio = exports.Bloco = exports.Armadura = exports.Ferramenta = void 0;
exports.drop_Minerio = drop_Minerio;
//Itens é uma classe genérica que engloba as entidades que existem no inventário de um player
var Itens = /** @class */ (function () {
    function Itens(nome, tipo) {
        this.nome = nome; //nome do item, ex: Picareta de Ferro
        this.tipo = tipo; // tipo do item, ex: Ferramenta
    }
    Itens.prototype.informacao_item = function () {
        var informacao;
        informacao = "".concat(this.nome, ", "); //função genérica para moldar de acordo com a informação q o player quer
        return informacao;
    };
    return Itens;
}());
//Ferramenta é um tipo de item que serve para facilitar a gameplay, como quebrar blocos, matar mobs, etc.
var Ferramenta = /** @class */ (function (_super) {
    __extends(Ferramenta, _super);
    function Ferramenta(nome, tipo, durabilidade, fortalecimento) {
        var _this = _super.call(this, nome, tipo) || this;
        _this.durabilidade = durabilidade; //quantos blocos consegue quebrar antes de acabar a ferramenta
        _this.fortalecimento = fortalecimento; //aprimoramentos da ferramenta ex: fortuna III
        return _this;
    }
    Ferramenta.prototype.info_ferramenta = function () {
        var informacao = _super.prototype.informacao_item.call(this); //informação para a ferramenta
        this.fortalecimento !== undefined ? informacao += "Durabilidade: ".concat(this.durabilidade, ", Encantamento: ").concat(this.fortalecimento) : informacao += "Durabilidade: ".concat(this.durabilidade);
        return informacao; //verifica se tem encantamento
    };
    Ferramenta.prototype.usar_ferramenta = function (min_dano, max_dano) {
        if (min_dano === void 0) { min_dano = 5; }
        if (max_dano === void 0) { max_dano = 15; }
        this.durabilidade > 0 ? this.durabilidade-- : console.log("".concat(this.nome, " quebrou!")); /* verifica
        se ainda dá pra usar a ferramenta, se não der é pq tá quebrada */
        var dano = Math.floor(Math.random() * (max_dano - min_dano + 1)) + min_dano; //isso serve pra ataque
        return dano;
    };
    return Ferramenta;
}(Itens));
exports.Ferramenta = Ferramenta;
//Armadura é uma vestimenta que dá resistência ao player
//Criei a classe armadura pois ao usá-la, ela sai do inventário principal e vai para o invetário de armaduras
//Então, para testar essa funcionalidade, criei essa classe separada para testar em outro modulo
var Armadura = /** @class */ (function (_super) {
    __extends(Armadura, _super);
    function Armadura(nome, tipo, armadura_tipo, durabilidade, fortalecimento) {
        var _this = _super.call(this, nome, tipo) || this;
        _this.armadura_tipo = armadura_tipo; //se é capacete, calça, bota ou peitoral
        _this.durabilidade = durabilidade; //quanto de dano pode tomar
        _this.fortalecimento = fortalecimento; //aprimoramentos da armadura, ex: Fire protection IV
        return _this;
    }
    Armadura.prototype.info_armadura = function () {
        var informacao = _super.prototype.informacao_item.call(this); //informação para armadura
        this.fortalecimento !== undefined ? informacao += "Durabilidade: ".concat(this.durabilidade, ", Encantamento: ").concat(this.fortalecimento) : informacao += "Durabilidade: ".concat(this.durabilidade);
        return informacao; //verifica se tem encantamento
    };
    return Armadura;
}(Itens));
exports.Armadura = Armadura;
//Bloco é uma representação 3d de um item
var Bloco = /** @class */ (function (_super) {
    __extends(Bloco, _super);
    function Bloco(nome, tipo, quantidade) {
        if (quantidade === void 0) { quantidade = 1; }
        var _this = _super.call(this, nome, tipo) || this;
        _this.quantidade = quantidade;
        return _this;
    }
    Bloco.prototype.info_bloco = function () {
        var informacao = _super.prototype.informacao_item.call(this);
        informacao += "Quantidade: ".concat(this.quantidade); //um bloco pode ser stackado
        return informacao;
    };
    Bloco.prototype.add_bloco = function (quantidade) {
        var capacidade = 64; //evita numero magico
        var espaço_sobrando = capacidade - this.quantidade; //verifica se tem espaço sobrando
        if (this.quantidade === capacidade) { //se a quantidade do bloco for igual a 64 não dá mais pra adicionar bloco
            console.log('Slot cheio');
        }
        else if (espaço_sobrando >= quantidade) { //se tiver espaço sobrando, adiciona até atingir o limite
            this.quantidade += quantidade;
        }
        else {
            this.quantidade += espaço_sobrando;
            ; //se o espaço sobrando for menor q a quantiadade que queremos
            //adicionar, adicionamos apenas o que dá
        }
    };
    Bloco.prototype.usar_bloco = function () {
        this.quantidade > 0 ? this.quantidade-- : console.log("N\u00E3o h\u00E1 mais ".concat(this.nome, " no invent\u00E1rio"));
    };
    return Bloco;
}(Itens));
exports.Bloco = Bloco;
//Minerio é um tipo de item que serve para criar: blocos, ferramentas e armadura
//criei a classe Minerio apenas pq não vou exportar a classe genérica 'Itens'
var Minerio = /** @class */ (function (_super) {
    __extends(Minerio, _super);
    function Minerio(nome, tipo, quantidade) {
        if (quantidade === void 0) { quantidade = 1; }
        var _this = _super.call(this, nome, tipo) || this;
        _this.quantidade = quantidade; //um minério pode stackar também
        return _this;
    }
    Minerio.prototype.info_minerio = function () {
        var informacao = _super.prototype.informacao_item.call(this);
        informacao += "Quantidade: ".concat(this.quantidade); //mostra as informações do minério
        return informacao;
    };
    Minerio.prototype.add_minerio = function (quantidade) {
        var capacidade = 64; //evita numero magico
        var espaço_sobrando = capacidade - this.quantidade;
        if (this.quantidade === 64) {
            console.log('Slot cheio');
        }
        else if (espaço_sobrando >= quantidade) {
            this.quantidade += quantidade;
        }
        else {
            this.quantidade += espaço_sobrando;
            ;
        }
    };
    return Minerio;
}(Itens));
exports.Minerio = Minerio;
//funcao para drop de minerio após usar uma picareta
function drop_Minerio(nome_drop, encantamento, min_drop, max_drop) {
    if (min_drop === void 0) { min_drop = 1; }
    if (max_drop === void 0) { max_drop = 4; }
    //não to considerando os drops extras de carvão, cobre e redstone
    var drop = Math.floor(Math.random() * (max_drop - min_drop + 1)) + min_drop;
    if (encantamento !== undefined) { //verificando se quebrou o minério com a picareta encantada
        if (encantamento === 'Toque de seda') {
            nome_drop = new Bloco("Bloco de ".concat(nome_drop), 'Bloco');
        }
        else if (encantamento === 'Fortuna') {
            nome_drop = new Minerio(nome_drop, 'Minério', drop);
        }
    }
    else {
        nome_drop = new Minerio(nome_drop, 'Minério'); //caso não, dropa apenas 1 minério normal
    }
    return nome_drop;
}
