import fs from 'fs';
import { Itens } from './itens.js'

// Carrega o JSON existente
const configPath = "./jogadores.json";
const dados = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const iron = new Itens('Barra de Ferro', 64);
const diamant = new Itens('Diamante', 64);
const gold = new Itens('Barra de Ouro', 64);
const copper = new Itens('Cobre', 64);
const coal = new Itens('Minério de Carvão', 64)
const cobblestone = new Itens('Pedregulho', 64)

// Função para gerar recursos aleatórios
function gerarRecursosAleatorios() {
    const recursos = [iron, diamant, gold, copper, coal, cobblestone];
    for (const jogador of dados){
        let aleatorios = []
        for (let i = 0; i < 4; i++) {
            const r = recursos[Math.floor(Math.random() * recursos.length)];
            aleatorios.push(r)
        }
        jogador.inventario = [...aleatorios]
    }
}

// Atualiza recursos minerados
gerarRecursosAleatorios();

// Salva o JSON atualizado
fs.writeFileSync(configPath, JSON.stringify(dados, null, 2));