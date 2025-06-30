import { Itens, Inventario } from "./itens";
import { Jogadores } from "./jogadores";
import { CicloDia } from "./ciclo_tempo";

//teste da lista ligada de sets
const espada_ferro = new Itens('Espada de Ferro', 1, 'Ferramenta')
const picareta_ferro = new Itens('Picareta de Ferro', 1, 'Ferramenta')
const capacete_ferro = new Itens('Capacete de Ferro', 1, 'Armadura')
const bloco_terra = new Itens('Bloco de Terra', 64, 'Bloco')

const i1 = new Inventario()
const i2 = new Inventario()
const i3 = new Inventario()

const jogadores = new Jogadores()

jogadores.insertFirst('Kamila', i1)
jogadores.insertLast('Emanoel', i2)
jogadores.insertAt('Taygo', i3, 1)

i1.add(espada_ferro)
i1.add(capacete_ferro)
i1.add(picareta_ferro)
i2.add(picareta_ferro)
i2.add(bloco_terra)
i3.add(bloco_terra)

const bau = i1.bau_comunitario(i2)
const bau_ferramentas = i1.bau_filtrado(i2, 'Ferramenta')
const bau_exclusivo_kamila = i1.diferenca_inventarios(i2)

console.log(i1.toString())
console.log(i2.toString())
console.log(i3)
console.log(bau.toString())
console.log(bau_ferramentas.toString())
console.log(bau_exclusivo_kamila.toString())

jogadores.printListData()
//teste lista circular duplamente ligada
const ciclo_dia = new CicloDia()

ciclo_dia.adicionar('Dia')
ciclo_dia.adicionar('Tarde')
ciclo_dia.adicionar('Noite')
ciclo_dia.adicionar('Madrugada')

console.log(ciclo_dia.print())