import * as fs from 'fs';
import { Itens } from './typescript/itens'

export function escreverArrayHtml(array : any[]) : void {
    let html = '<ul><li>'

    for (let i = 0; i<array.length; i++){
        const slot = array[i]
        if (slot === undefined){
            html += `<li>[vazio]</li>`
        } else {
            html += `<li>[${slot?.item.informacao()}]</li>`
        }
    }
    html += `</ul></li>`
    fs.writeFileSync("relatorio.html", html);
}

function escreverInventario(){
    document.addEventListener("DOMContentLoaded", async() => {
        const response = await fetch ("jogoconfig.json");
        const inventario = await response.json();
        escreverArrayHtml(inventario);
    });
}
