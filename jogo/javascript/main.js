import { Jogo } from "./jogo.js";
import { Itens } from "./itens.js"; // Supondo que Itens.ts está na mesma pasta
// 1. Quando a página carregar, inicialize o jogo.
window.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    // Cria uma instância do nosso jogo, ligando-a à div 'inventario-grid'
    const meuJogo = new Jogo('inventario-grid');
    // Renderiza o inventário inicial (vazio)
    meuJogo.renderizarInventario();
    // 2. Conecta os botões do HTML às funções do nosso jogo
    // Botão para adicionar Terra
    (_a = document.getElementById('add-terra')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const itemTerra = new Itens("Terra", 10, "Bloco");
        meuJogo.adicionarItem(itemTerra);
    });
    // Botão para adicionar Picareta
    (_b = document.getElementById('add-picareta')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        const itemPicareta = new Itens("Picareta de Diamante", 1, "Ferramenta", 1561, "Eficiência V");
        meuJogo.adicionarItem(itemPicareta);
    });
    // Botão para adicionar Maçã
    (_c = document.getElementById('add-maca')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        const itemMaca = new Itens("Maçã Dourada", 5, "Comida");
        meuJogo.adicionarItem(itemMaca);
    });
    // Botão para remover Terra
    (_d = document.getElementById('rmv-terra')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
        meuJogo.removerItem("Terra", 5);
    });
    // Botão para remover Picareta
    (_e = document.getElementById('rmv-picareta')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => {
        // Remove a primeira picareta que encontrar
        meuJogo.removerItem("Picareta de Diamante", 1);
    });
    // Novo: Adicionar picareta com Fortuna
    (_f = document.getElementById('add-picareta-fortuna')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => {
        meuJogo.adicionarItem(new Itens("Picareta de Diamante", 1, "Ferramenta", 1561, "Fortuna"));
    });
    // Novo: Adicionar picareta com Toque de Seda
    (_g = document.getElementById('add-picareta-seda')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', () => {
        meuJogo.adicionarItem(new Itens("Picareta de Diamante", 1, "Ferramenta", 1561, "Toque de seda"));
    });
    // --- Botões de Ação ---
    // Novo: Conecta o botão de minerar ao nosso novo método
    (_h = document.getElementById('minerar-ferro')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', () => {
        meuJogo.minerarBloco("Ferro");
    });
    // Novo: Conecta o botão de minerar ao nosso novo método
    (_j = document.getElementById('minerar-diamante')) === null || _j === void 0 ? void 0 : _j.addEventListener('click', () => {
        meuJogo.minerarBloco("Diamante");
    });
});
//# sourceMappingURL=main.js.map