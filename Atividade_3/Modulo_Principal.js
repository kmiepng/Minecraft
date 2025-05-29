"use strict";
//teste das classes que criei
Object.defineProperty(exports, "__esModule", { value: true });
//parte de import
var Classes_Itens_1 = require("./Classes_Itens");
var Classes_Invetario_1 = require("./Classes_Invetario");
var Classe_Mob_1 = require("./Classe_Mob");
/*=================TABELINHA DE INFORMAÇÕES=================
FERRAMENTAS DE FERRO: Durabilidade = 250
CAPACETE DE FERRO: Durabilidade = 165
PEITORAL DE FERRO: Durabilidade = 240
CALCA DE FERRO: Durabilidade = 225
BOTA DE FERRO: Durabilidade = 195
FERRAMENTAS DE DIAMANTE: Durabilidade = 1561
CAPACETE DE DIAMANTE: Durabilidade = 363
PEITORAL DE DIAMANTE: Durabilidade = 528
CALCA DE DIAMANTE: Durabilidade = 495
BOTA DE DIAMANTE: Durabilidade = 429
*/
//criando itens
var capacete_de_ferro = new Classes_Itens_1.Armadura('Capacete de Ferro', 'Armadura', 'Capacete', 165);
var bota_de_ferro = new Classes_Itens_1.Armadura('Botas de Ferro', 'Armadura', 'Bota', 195);
var espada_de_ferro = new Classes_Itens_1.Ferramenta('Espada de Ferro', 'Ferramenta', 250);
var espada_de_ferro_atacar = espada_de_ferro.usar_ferramenta();
var picareta_de_ferro = new Classes_Itens_1.Ferramenta('Picareta de Ferro', 'Ferramenta', 250, 'Toque de seda');
//criando mob
var vida = (0, Classe_Mob_1.vida_aleatoria)();
var zumbi = new Classe_Mob_1.Mob('Zumbi', vida);
var zumbi_atacar = zumbi.atacar();
//criando slot de armadura
var slot_Armor = new Classes_Invetario_1.slot_Armadura();
var slot_1 = new Classes_Invetario_1.slot_Inventario();
//teste
slot_1.adicionar_slot(picareta_de_ferro);
slot_1.adicionar_slot(espada_de_ferro);
slot_Armor.equipar_armadura(capacete_de_ferro);
slot_Armor.equipar_armadura(bota_de_ferro);
slot_Armor.mostrar_slot_Armadura();
slot_Armor.remover_armadura(capacete_de_ferro);
slot_Armor.mostrar_slot_Armadura();
//ataque de zumbi
slot_Armor.usar_armadura(zumbi_atacar);
zumbi.receber_dano(espada_de_ferro_atacar);
//mostrando o estado dos itens e do zumbi após o ataque
espada_de_ferro.info_ferramenta();
slot_Armor.mostrar_slot_Armadura();
zumbi.info_mob();
//mineração
picareta_de_ferro.usar_ferramenta();
var fortalecimento = picareta_de_ferro.fortalecimento;
var diamante = (0, Classes_Itens_1.drop_Minerio)('Diamante', fortalecimento);
console.log(picareta_de_ferro.info_ferramenta());
console.log(diamante.info_bloco());
