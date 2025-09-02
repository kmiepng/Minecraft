import { Jogo } from "./jogo";
import { Itens, ItensPilha } from "./itens";

// Quando a página carregar, inicializa o jogo.
window.addEventListener('DOMContentLoaded', () => {
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
            // Remove 'active' de todos os botões e painéis
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Adiciona 'active' ao botão clicado
            button.classList.add('active');
            
            // Adiciona 'active' ao painel correspondente
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId!)?.classList.add('active');
        });
    });
    // ----------------- CONEXÃO DOS BOTÕES (INVENTÁRIO DE PILHA) --------------------------
    document.getElementById('add-pedra-pilha')?.addEventListener('click', () => {
        const itemPedra: ItensPilha = { id: 'pedra', nome: 'Pedra' };
        meuJogo.adicionarItemPilha(itemPedra, 10);
    });

    document.getElementById('add-terra-pilha')?.addEventListener('click', () => {
        const itemTerra: ItensPilha = { id: 'terra', nome: 'Terra' };
        meuJogo.adicionarItemPilha(itemTerra, 5);
    });
    
    document.getElementById('rmv-item-pilha')?.addEventListener('click', () => {
        // Remove 1 item por padrão
        meuJogo.removerItemPilha(1);
    });

    document.getElementById('rmv-slot-pilha')?.addEventListener('click', () => {
        meuJogo.removerSlotPilha();
    });
    
    // ------------------------ Conecta os botões do HTML às funções do nosso jogo -----------------------------
    
    // Botão para adicionar Terra
    document.getElementById('add-terra')?.addEventListener('click', () => {
        const itemTerra = new Itens("Terra", 10, "Bloco");
        meuJogo.adicionarItem(itemTerra);
    });

    // Botão para adicionar Picareta
    document.getElementById('add-picareta')?.addEventListener('click', () => {
        const itemPicareta = new Itens("Picareta de Diamante", 1, "Ferramenta", 1561, "Eficiência V");
        meuJogo.adicionarItem(itemPicareta);
    });
    
    // Botão para adicionar Maçã
    document.getElementById('add-maca')?.addEventListener('click', () => {
        const itemMaca = new Itens("Maçã Dourada", 5, "Comida");
        meuJogo.adicionarItem(itemMaca);
    });

    // Botão para remover Terra
    document.getElementById('rmv-terra')?.addEventListener('click', () => {
        meuJogo.removerItem("Terra", 5);
    });
    
    // Botão para remover Picareta
    document.getElementById('rmv-picareta')?.addEventListener('click', () => {
        // Remove a primeira picareta que encontrar
        meuJogo.removerItem("Picareta de Diamante", 1);
    });
        // Novo: Adicionar picareta com Fortuna
    document.getElementById('add-picareta-fortuna')?.addEventListener('click', () => {
        meuJogo.adicionarItem(new Itens("Picareta de Diamante", 1, "Ferramenta", 1561, "Fortuna"));
    });

    // Novo: Adicionar picareta com Toque de Seda
    document.getElementById('add-picareta-seda')?.addEventListener('click', () => {
        meuJogo.adicionarItem(new Itens("Picareta de Diamante", 1, "Ferramenta", 1561, "Toque de seda"));
    });

    // --- Botões de Ação ---
    
    // Conecta o botão de minerar ao nosso método
    document.getElementById('minerar-ferro')?.addEventListener('click', () => {
        meuJogo.minerarBloco("Ferro");
    });
    
    // Conecta o botão de minerar ao nosso método
    document.getElementById('minerar-diamante')?.addEventListener('click', () => {
        meuJogo.minerarBloco("Diamante");
    });

    // --- Listener para Ordenação ---
    // Listener para o botão de comparação por nome
     document.getElementById('sort-compare')?.addEventListener('click', () => {
        meuJogo.compararOrdenacao();
    });
    // Listener para o botão de ordenação por durabilidade
    document.getElementById('sort-heap')?.addEventListener('click', () => {
        meuJogo.ordenarPorDurabilidade();
    });
});
