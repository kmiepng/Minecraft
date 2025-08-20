import { Itens } from './itens.js'
import { HashTable } from './servidor.js'

const Servidor = new HashTable()

const picareta_de_ferro = new Itens('Picareta de Ferro', 1, 'Ferramenta', 250)
const machado_de_ferro = new Itens('Machado de Ferro', 1, 'Ferramenta', 250)
const diamante = new Itens('Diamante', 64, 'Minerio')
const madeira = new Itens('Madeira de Carvalho', 64, 'Bloco')
const terra = new Itens('Bloco de Terra', 64, 'Bloco')
const pedregulho = new Itens('Pedregulho', 64, 'Bloco')

const [Kamila, Emanoel, Taygo, Marcos, Mauricio, Jp] = [
    [picareta_de_ferro, pedregulho], [madeira, machado_de_ferro],
    [picareta_de_ferro, diamante], [terra, madeira], [terra, pedregulho],
    [pedregulho, diamante, picareta_de_ferro]
]

Servidor.put('kmiepng', Kamila);
Servidor.put('yell', Emanoel);
Servidor.put('aha', Taygo);
Servidor.put('nevary', Marcos);
Servidor.put('lilgreed', Mauricio);
Servidor.put('sazuto', Jp);

console.log(Servidor.get('kmiepng'));
console.log(Servidor.get('aha'));