import { Jogo } from "./jogo";
import { Itens } from "./itens";

// Quando a página carregar, inicializa o jogo.
window.addEventListener('DOMContentLoaded', () => {
    // Cria uma instância do jogo, ligando-a à div 'inventario-grid'
    const meuJogo = new Jogo('inventario-grid');
    
    // Renderiza o inventário inicial (vazio)
    meuJogo.renderizarInventario();

    // Conecta os botões do HTML às funções do nosso jogo
    
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
