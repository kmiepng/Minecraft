import { Itens } from "./itens.js";
import { Dictionary } from "./dicionario_de_construcao.js";

let bloco_madeira = new Itens('Bloco de Madeira', 64, 'Bloco');
let bloco_pedregulho = new Itens('Bloco de Pedregulho', 64, 'Bloco');
let diamante = new Itens('Diamante', 32, 'Minério');
let ferro = new Itens('Ferro', 16, 'Minério')
const tabela_construcao = new Dictionary();

tabela_construcao.set(bloco_madeira, 'Espada de Madeira');
tabela_construcao.set(bloco_madeira, 'Porta de Madeira');
tabela_construcao.set(bloco_pedregulho, 'Tijolo de Pedregulho');
tabela_construcao.set(ferro, 'Espada de Ferro');
tabela_construcao.set(ferro, 'Capacete de Ferro');
//usando toString para mostrar toda a tabela
console.log(tabela_construcao.toStringMap());
//usando o forEach para mostrar toda a tabela
tabela_construcao.forEach((k, v) => {
  console.log('forEach: ', `chave: ${k}, valor: ${v}`);
});

console.log(tabela_construcao.get(bloco_madeira));

console.log(tabela_construcao.hasKey(diamante));

tabela_construcao.remove(ferro);
console.log(tabela_construcao.toStringMap());