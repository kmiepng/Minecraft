import { Itens } from "./itens.js";
import { Dictionary } from "./dicionario_de_construcao.js";

let bloco_madeira = new Itens('Bloco de Madeira', 64, 'Bloco');
const tabela_construcao = new Dictionary();

tabela_construcao.set(bloco_madeira, 'Espada de Madeira');
tabela_construcao.toString();