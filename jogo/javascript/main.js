import { Jogo } from "./jogo.js";
import { Itens } from "./itens.js";
// Quando a página carregar, inicializa o jogo.
window.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    // Passa os IDs dos dois grids de inventário para o construtor do Jogo
    const meuJogo = new Jogo('inventario-grid', 'inventario-pilha-grid');
    // Renderiza o estado inicial de ambos os inventários
    meuJogo.renderizarInventario();
    meuJogo.renderizarInventarioPilha();
    // ----------------------- LÓGICA PARA TROCA DE ABAS ---------------------------
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            var _a;
            // Remove 'active' de todos os botões e painéis
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            // Adiciona 'active' ao botão clicado
            button.classList.add('active');
            // Adiciona 'active' ao painel correspondente
            const tabId = button.getAttribute('data-tab');
            (_a = document.getElementById(tabId)) === null || _a === void 0 ? void 0 : _a.classList.add('active');
        });
    });
    // ----------------- CONEXÃO DOS BOTÕES (INVENTÁRIO DE PILHA) --------------------------
    (_a = document.getElementById('add-pedra-pilha')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const itemPedra = { id: 'pedra', nome: 'Pedra' };
        meuJogo.adicionarItemPilha(itemPedra, 10);
    });
    (_b = document.getElementById('add-terra-pilha')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        const itemTerra = { id: 'terra', nome: 'Terra' };
        meuJogo.adicionarItemPilha(itemTerra, 5);
    });
    (_c = document.getElementById('rmv-item-pilha')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        // Remove 1 item por padrão
        meuJogo.removerItemPilha(1);
    });
    (_d = document.getElementById('rmv-slot-pilha')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
        meuJogo.removerSlotPilha();
    });
    // ------------------------ Conecta os botões do HTML às funções do nosso jogo -----------------------------
    // Botão para adicionar Terra
    (_e = document.getElementById('add-terra')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => {
        const itemTerra = new Itens("Terra", 10, "Bloco");
        meuJogo.adicionarItem(itemTerra);
    });
    // Botão para adicionar Picareta
    (_f = document.getElementById('add-picareta')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => {
        const itemPicareta = new Itens("Picareta de Diamante", 1, "Ferramenta", 1561, "Eficiência V");
        meuJogo.adicionarItem(itemPicareta);
    });
    // Botão para adicionar Maçã
    (_g = document.getElementById('add-maca')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', () => {
        const itemMaca = new Itens("Maçã Dourada", 5, "Comida");
        meuJogo.adicionarItem(itemMaca);
    });
    // Botão para remover Terra
    (_h = document.getElementById('rmv-terra')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', () => {
        meuJogo.removerItem("Terra", 5);
    });
    // Botão para remover Picareta
    (_j = document.getElementById('rmv-picareta')) === null || _j === void 0 ? void 0 : _j.addEventListener('click', () => {
        // Remove a primeira picareta que encontrar
        meuJogo.removerItem("Picareta de Diamante", 1);
    });
    // Novo: Adicionar picareta com Fortuna
    (_k = document.getElementById('add-picareta-fortuna')) === null || _k === void 0 ? void 0 : _k.addEventListener('click', () => {
        meuJogo.adicionarItem(new Itens("Picareta de Diamante", 1, "Ferramenta", 1561, "Fortuna"));
    });
    // Novo: Adicionar picareta com Toque de Seda
    (_l = document.getElementById('add-picareta-seda')) === null || _l === void 0 ? void 0 : _l.addEventListener('click', () => {
        meuJogo.adicionarItem(new Itens("Picareta de Diamante", 1, "Ferramenta", 1561, "Toque de seda"));
    });
    // --- Botões de Ação ---
    // Conecta o botão de minerar ao nosso método
    (_m = document.getElementById('minerar-ferro')) === null || _m === void 0 ? void 0 : _m.addEventListener('click', () => {
        meuJogo.minerarBloco("Ferro");
    });
    // Conecta o botão de minerar ao nosso método
    (_o = document.getElementById('minerar-diamante')) === null || _o === void 0 ? void 0 : _o.addEventListener('click', () => {
        meuJogo.minerarBloco("Diamante");
    });
    // --- Listener para Ordenação ---
    // Listener para o botão de comparação por nome
    (_p = document.getElementById('sort-compare')) === null || _p === void 0 ? void 0 : _p.addEventListener('click', () => {
        meuJogo.compararOrdenacao();
    });
    // Listener para o botão de ordenação por durabilidade
    (_q = document.getElementById('sort-heap')) === null || _q === void 0 ? void 0 : _q.addEventListener('click', () => {
        meuJogo.ordenarPorDurabilidade();
    });
});
//# sourceMappingURL=main.js.map