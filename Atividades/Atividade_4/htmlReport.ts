import fs from 'fs';
import { Itens } from './typescript/itens'

export function escreverArrayHtml(config : any) : void {
    let html = `<html>
      <head><title>Minecraft Jogadores</title></head>
      <body>
        <h1>${config.nome}</h1>
         <p><strong>Dificuldade:</strong> ${config.dificuldade}</p>
        <ul><li>
    `
    for (let i = 0; i<config.inventario.length; i++){
        const slot = config.inventario[i]
        if (slot === undefined){
            html += `<li>[vazio]</li>`
        } else {
            html += `<li>[${slot?.item.informacao()}]</li>`
        }
    }
    html += `</ul></li></body></html>`
    fs.writeFileSync("relatorio.html", html);
}

function escreverInventario(){
    document.addEventListener("DOMContentLoaded", async() => {
        const response = await fetch ("jogoconfig.json");
        const inventario = await response.json();
        escreverArrayHtml(inventario);
    });
}
