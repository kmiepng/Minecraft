import * as fs from 'fs';
import { Itens } from './typescript/itens'
import { Inventario } from './typescript/inventario'
import { escreverArrayHtml } from "./htmlReport";

// Carrega o JSON existente
const configPath = "./itens.json";
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
let inventario = config.inventario;

const iron = new Itens('Barra de Ferro', 64, 'Minerio');
const diamant = new Itens('Diamante', 64, 'Minerio');
const gold = new Itens('Barra de Ouro', 64, 'Minerio');
const lapis = new Itens('Lapis Lazuli', 64, 'Minerio');
const coal = new Itens('Minério de Carvão', 64, 'Minerio')

// Função para gerar recursos aleatórios
function gerarRecursosAleatorios() {
  const recursos = [iron, diamant, gold, lapis, coal];
  for (let i = 0; i < 4; i++) {
    const r = recursos[Math.floor(Math.random() * recursos.length)];
    inventario.addItem(r, r.quantidade);
  }
}
// Atualiza recursos minerados
gerarRecursosAleatorios();

// Salva o JSON atualizado
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

// Mostra inventário no terminal
inventario.mostrarInventario()

// Gera o relatório HTML
escreverArrayHtml(config);