import * as fs from 'fs';
import { Itens } from './jogo/itens'
import { Inventario } from './jogo/inventario'
import { escreverArrayHtml } from "./htmlReport";

// Carrega o JSON existente
const configPath = "./jogadores.json";
const dados = JSON.parse(fs.readFileSync(configPath, "utf-8"));

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
    for (const jogador of dados){
      jogador.inventario.inventario.addItem(r)
    }
  }
}

// Atualiza recursos minerados
gerarRecursosAleatorios();

// Salva o JSON atualizado
fs.writeFileSync(configPath, JSON.stringify(dados, null, 2));

// Mostra inventário no terminal
for (const jogador of dados){
  console.log(`Jogador(a): ${jogador.nome}`)
  console.log(`Dificuldade escolhida: ${jogador.dificuldade}`)
  jogador.inventario.inventario.mostrarInventario()
}

// Gera o relatório HTML
escreverArrayHtml(dados);