import { Jogo } from "./jogo";
import { Itens, ItensPilha } from "./itens";
import { ItemTrouxa } from "./pilhas";

// Quando a página carregar, inicializa o jogo.
window.addEventListener('DOMContentLoaded', () => {
    // Passa os IDs dos dois grids de inventário para o construtor do Jogo
    const meuJogo = new Jogo(
        'inventario-grid', 'inventario-pilha-grid',
        'inventario-cima-grid', 'inventario-baixo-grid', 'funil-grid', 'status-funil',
        'inventario-cima-grid deque', 'inventario-baixo-grid deque', 'funil-grid deque');

    // Renderiza o estado inicial de ambos os inventários
    meuJogo.renderizarInventario();
    meuJogo.renderizarInventarioPilha();
    meuJogo.renderizarTodosOsInventarios();
    meuJogo.renderizarTodosOsInventariosDeque();
    meuJogo.renderizarCicloDoDia();
    meuJogo.iniciarCicloAutomatico();
    meuJogo.renderizarTabelaDeCrafting();
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
    // ----------------------- CONEXÃO DOS BOTÕES DA TROUXA ----------------------------------------

    document.getElementById('add-trouxa')?.addEventListener('click', () => {
        meuJogo.adicionarItem(new ItemTrouxa());
    });
    
    document.getElementById('guardar-na-trouxa')?.addEventListener('click', () => {
        meuJogo.guardarItemNaTrouxa();
    });

    document.getElementById('esvaziar-trouxa')?.addEventListener('click', () => {
        meuJogo.esvaziarTrouxa();
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

    // ---------------------------- Listener para Ordenação ----------------------------------
    // Listener para o botão de comparação por nome
     document.getElementById('sort-compare')?.addEventListener('click', () => {
        meuJogo.compararOrdenacao();
    });
    // Listener para o botão de ordenação por durabilidade
    document.getElementById('sort-heap')?.addEventListener('click', () => {
        meuJogo.ordenarPorDurabilidade();
    });
    // -------------------------- LISTENERS PARA A SIMULAÇÃO DO FUNIL COM NODE ------------------------

    document.getElementById('add-itens-bau-cima')?.addEventListener('click', () => {
        meuJogo.popularBauDeCima();
    });

    document.getElementById('iniciar-transferencia')?.addEventListener('click', () => {
        meuJogo.iniciarTransferenciaFunil();
    });

    document.getElementById('parar-transferencia')?.addEventListener('click', () => {
        meuJogo.pararTransferenciaFunil();
    });

    // ----------------------- LISTENERS PARA A SIMULAÇÃO DO FUNIL DEQUE -------------------------------------

    document.getElementById('add-itens-bau-cima deque')?.addEventListener('click', () => {
        meuJogo.popularBauDeCimaDeque();
    });

    // Conecta os 4 novos botões de controle manual
    document.getElementById('funil-puxar-normal')?.addEventListener('click', () => {
        meuJogo.puxarItemParaFunil(false); // prioridade = false
    });

    document.getElementById('funil-puxar-prioritario')?.addEventListener('click', () => {
        meuJogo.puxarItemParaFunil(true); // prioridade = true
    });

    document.getElementById('funil-empurrar')?.addEventListener('click', () => {
        meuJogo.empurrarItemDoFunil();
    });

    document.getElementById('funil-devolver')?.addEventListener('click', () => {
        meuJogo.devolverUltimoItemDoFunil();
    });
    // ---------------- LISTENERS PARA O CARROSSEL DO CICLO DO DIA -------------------------

    document.getElementById('ciclo-anterior')?.addEventListener('click', () => {
        meuJogo.retrocederTempo();
    });

    document.getElementById('ciclo-proximo')?.addEventListener('click', () => {
        meuJogo.avancarTempo();
    });

    document.getElementById('ciclo-iniciar')?.addEventListener('click', () => {
        meuJogo.iniciarCicloAutomatico();
    });
    
    document.getElementById('ciclo-pausar')?.addEventListener('click', () => {
        meuJogo.pausarCicloAutomatico();
    });
});
