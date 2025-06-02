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
        <h1>${config.nome}</h1>
         <p><strong>Dificuldade:</strong> ${config.dificuldade}</p>
        <ul><li>
    `;
    for (let i = 0; i < config.inventario.length; i++) {
        const slot = config.inventario[i];
        if (slot === undefined) {
            html += `<li>[vazio]</li>`;
        }
        else {
            html += `<li>[${slot === null || slot === void 0 ? void 0 : slot.item.informacao()}]</li>`;
        }
    }
    html += `</ul></li></body></html>`;
    fs_1.default.writeFileSync("relatorio.html", html);
}
function escreverInventario() {
    document.addEventListener("DOMContentLoaded", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("jogoconfig.json");
        const inventario = yield response.json();
        escreverArrayHtml(inventario);
    }));
}
//# sourceMappingURL=htmlReport.js.map