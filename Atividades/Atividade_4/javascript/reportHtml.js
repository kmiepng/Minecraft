"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Object.defineProperty(exports, "__esModule", { value: true });
function escreverHtml(array) {
    const dados = document.getElementById("Inventário");
    let html = '<li><ul>';
    for (let i = 0; i < array.length; i++) {
        html += `
        <h2><strong>Jogador(a):</strong> ${array[i].nome}</h2>
        <p><strong>Dificuldade:</strong> ${array[i].dificuldade}</p>
        `;
        for (const slot of array[i].inventario) {
            if (slot !== undefined) {
                html += `<li>${slot.nome}, x${slot.quantidade}</li>`;
            }
            else {
                html += '<li>[   vazio   ]</li>';
            }
        }
    }
    html += '</ul></li>';
    dados.innerHTML = html;
}
function escreverInventario() {
    document.addEventListener("DOMContentLoaded", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("jogadores.json");
        const jogadores = yield response.json();
        escreverHtml(jogadores);
    }));
}
escreverInventario();
//# sourceMappingURL=reportHtml.js.map