import fs from 'fs';
import { Itens } from './jogo/itens'

export function escreverArrayHtml(config : any) : void {
    let html = `<html>
      <head><title>Minecraft Jogadores</title></head>
      <body>
    `
    for (const jogador of config){
    html += `<h1>Jogador(a): ${config.nome}</h1>
    <p><strong>Dificuldade:</strong> ${config.dificuldade}</p>
    <ul><li>`

    for (let i = 0; i<jogador.inventario.inventario.length; i++){
        const slot = jogador.inventario.inventario[i]
            if (slot === undefined){
                html += `<li>[vazio]</li>`
            } else {
                html += `<li>[${slot?.item.informacao()}]</li>`
            }
        }

    html += `</ul></li></body></html>`
    }
    fs.writeFileSync("relatorio.html", html);
}

function escreverInventario(){
    document.addEventListener("DOMContentLoaded", async() => {
        const response = await fetch ("jogoconfig.json");
        const inventario = await response.json();
        escreverArrayHtml(inventario);
    });
}
