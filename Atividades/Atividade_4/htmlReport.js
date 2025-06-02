"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.escreverArrayHtml = escreverArrayHtml;
const fs_1 = __importDefault(require("fs"));
function escreverArrayHtml(config) {
    let html = `<html>
      <head><title>Minecraft Jogadores</title></head>
      <body>
    `;
    for (const jogador of config) {
        html += `<h1>Jogador(a): ${config.nome}</h1>
    <p><strong>Dificuldade:</strong> ${config.dificuldade}</p>
    <ul><li>`;
        for (let i = 0; i < jogador.inventario.inventario.length; i++) {
            const slot = jogador.inventario.inventario[i];
            if (slot === undefined) {
                html += `<li>[vazio]</li>`;
            }
            else {
                html += `<li>[${slot === null || slot === void 0 ? void 0 : slot.item.informacao()}]</li>`;
            }
        }
        html += `</ul></li>`;
    }
    html += `</body></html>`;
    fs_1.default.writeFileSync("relatorio.html", html);
}
/*function escreverInventario(){
    document.addEventListener("DOMContentLoaded", async() => {
        const response = await fetch ("jogoconfig.json");
        const inventario = await response.json();
        escreverArrayHtml(inventario);
    });
}*/
//# sourceMappingURL=htmlReport.js.map