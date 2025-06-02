import * as fs from 'fs';
import { Itens } from './typescript/itens'
import { Inventario } from './typescript/inventario'
import { escreverArrayHtml } from "./htmlReport";

let inventario = new Inventario();
const iron_pickaxe = new Itens('Picareta de Ferro', 1, 'Ferramenta');
inventario.addItem(iron_pickaxe)

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
    inventario.addItem(r);
  }
}

// Carrega o JSON existente
const configPath = "./jogoconfig.json";
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

// Atualiza recursos minerados
config.inventario = gerarRecursosAleatorios();

// Salva o JSON atualizado
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

// Mostra inventário no terminal
inventario.mostrarInventario()

// Gera o relatório HTML
escreverArrayHtml(config);

const jsonData = JSON.stringify(inventario, null, 2);

// Write JSON to a file
fs.writeFile('itens.json', jsonData, (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File saved successfully as itens.json");
  }
});