import { Itens } from './itens.js'
import { HashTable } from './servidor.js'

const Servidor = new HashTable()

const Inventario = []
const picareta_de_ferro = new Itens('Picareta de Ferro', 1, 'Ferramenta', 250)