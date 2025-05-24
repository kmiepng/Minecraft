//teste das classes que criei

//parte de import
import { Ferramenta, Armadura, Bloco, Minerio, drop_Minerio } from "./Classes_Itens"
import {slot_Armadura, slot_Inventario} from "./Classes_Invetario"
import {Mob, vida_aleatoria} from "./Classe_Mob"

/*=================TABELINHA DE INFORMAÇÕES=================

*/
//criando itens
let capacete_de_ferro = new Armadura('Capacete de Ferro', 'Armadura', 'Capacete', 250);
let bota_de_ferro = new Armadura('Botas de Ferro', 'Armadura', 'Bota', 250);
let espada_de_ferro = new Ferramenta('Espada de Ferro', 'Ferramenta', 250);
let espada_de_ferro_atacar = espada_de_ferro.usar_ferramenta()
let picareta_de_ferro = new Ferramenta('Picareta de Ferro', 'Ferramenta', 250, 'Toque de seda')
//criando mob
let vida = vida_aleatoria();
let zumbi = new Mob('Zumbi', vida);
let zumbi_atacar = zumbi.atacar();
//criando slot de armadura
let slot_Armor = new slot_Armadura()
let slot_1 = new slot_Inventario()
//teste
slot_1.adicionar_slot(picareta_de_ferro)
slot_1.adicionar_slot(espada_de_ferro)
slot_Armor.equipar_armadura(capacete_de_ferro)
slot_Armor.equipar_armadura(bota_de_ferro)
slot_Armor.mostrar_slot_Armadura()
slot_Armor.remover_armadura(capacete_de_ferro)
slot_Armor.mostrar_slot_Armadura()
//ataque de zumbi
slot_Armor.usar_armadura(zumbi_atacar)
zumbi.receber_dano(espada_de_ferro_atacar)
//mostrando o estado dos itens e do zumbi após o ataque
espada_de_ferro.info_ferramenta()
slot_Armor.mostrar_slot_Armadura()
zumbi.info_mob()
//mineração
picareta_de_ferro.usar_ferramenta()
let fortalecimento = picareta_de_ferro.fortalecimento
let diamante = drop_Minerio('Diamante', fortalecimento)
console.log(picareta_de_ferro.info_ferramenta())
console.log(diamante.info_bloco())