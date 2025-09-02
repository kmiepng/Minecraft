// ------------------------- IMPORTS -------------------------------------
import { Itens } from "./itens.js";
import { Inventario, InventarioComPilha } from "./inventario.js";
import { bubblesort, mergeSort } from "./search_e_sort_algoritmos.js";
import { ItemTrouxa } from "./pilhas.js";
import { heapSortInventario } from "./minHeap.js";
import { FilacomNode } from "./filas.js";
// -------------------------JOGO-----------------------------------------
// Um mapa para associar nomes de itens a seus arquivos de imagem
const itemImagens = {
    "Terra": "images/dirt.png",
    "Pedra": "images/stone.png",
    "Picareta de Diamante": "images/diamond_pickaxe.png",
    "Maçã Dourada": "images/golden_apple.png",
    "Ferro": "images/iron_ingot.png",
    "Diamante": "images/diamond.png",
    "Bloco de Ferro": "images/iron_ore.png", // Imagem para o bloco dropado por Toque de Seda
    "Bloco de Diamante": "images/diamond_ore.png",
    "Trouxa": "images/bundle.png"
};
export class Jogo {
    constructor(idElementoInventario, idGridPilha, idGridCima, idGridBaixo, idGridFunil, idStatusFunil) {
        //Clique no inventário
        this.slotSelecionado = 0;
        this.slotPilhaSelecionado = 0;
        this.transferenciaInterval = null;
        this.inventario = new Inventario();
        // Garante que o elemento do inventário exista no HTML
        const elemento = document.getElementById(idElementoInventario);
        if (!elemento) {
            throw new Error(`Elemento com id "${idElementoInventario}" não encontrado no DOM.`);
        }
        this.elementoInventarioHTML = elemento;
        // Inicializa o inventário de Pilha
        this.inventarioPilha = new InventarioComPilha(); // Usa o tamanho padrão (9)
        this.elementoInventarioPilhaHTML = document.getElementById(idGridPilha);
        // Inicializa os componentes do funil
        this.inventarioCima = new Inventario();
        this.inventarioBaixo = new Inventario();
        this.funilFila = new FilacomNode();
        this.elementoInventarioCimaHTML = document.getElementById(idGridCima);
        this.elementoInventarioBaixoHTML = document.getElementById(idGridBaixo);
        this.elementoFunilHTML = document.getElementById(idGridFunil);
        this.elementoStatusFunilHTML = document.getElementById(idStatusFunil);
    }
    /**
     * Adiciona um item ao inventário e atualiza a interface gráfica.
     */
    adicionarItem(item) {
        this.inventario.add_slot(item);
        this.renderizarInventario(); // Re-desenha o inventário na tela
    }
    /**
     * Remove uma quantidade de um item do inventário e atualiza a interface.
     */
    removerItem(nomeItem, quantidade = null) {
        this.inventario.rmv_slot(nomeItem, quantidade);
        this.renderizarInventario(); // Re-desenha o inventário na tela
    }
    /**
     * Simula a mineração de um bloco.
     * Ele usa a ferramenta no slot selecionado, diminui a durabilidade
     * e adiciona o drop resultante ao inventário.
    */
    minerarBloco(nomeMinerio) {
        // 1. Verificar se um slot está selecionado
        if (this.slotSelecionado === null || this.inventario.inventario[this.slotSelecionado] === undefined) {
            console.log("Nenhuma ferramenta selecionada!");
            return;
        }
        // 2. Obter a ferramenta ativa e verificar se é válida
        const ferramentaAtiva = this.inventario.inventario[this.slotSelecionado];
        if (ferramentaAtiva.tipo !== 'Ferramenta') {
            console.log(`O item "${ferramentaAtiva.nome}" não é uma ferramenta!`);
            return;
        }
        // 3. Usar a ferramenta e diminuir a durabilidade
        // O método 'usar' da sua classe Itens já faz isso!
        ferramentaAtiva.usar(1);
        console.log(`Durabilidade de ${ferramentaAtiva.nome}: ${ferramentaAtiva.durabilidade}`);
        // 4. Calcular o drop do minério (lógica da sua função)
        let itemDropado;
        const encantamento = ferramentaAtiva.encantamento;
        // Valores padrão para o drop
        const min_drop = 1, max_drop = 4;
        const drop = Math.floor(Math.random() * (max_drop - min_drop + 1)) + min_drop;
        if (encantamento === 'Toque de seda') {
            itemDropado = new Itens(`Bloco de ${nomeMinerio}`, 1, 'Bloco');
        }
        else if (encantamento === 'Fortuna') {
            itemDropado = new Itens(nomeMinerio, drop, 'Minério');
        }
        else {
            // Se não tiver encantamento, dropa o minério bruto (ex: Ferro, Diamante)
            // No Minecraft, minérios como ferro dropam o bloco, mas vamos simplificar para dropar o item final.
            itemDropado = new Itens(nomeMinerio, 1, 'Minério');
        }
        console.log(`Dropou: ${itemDropado.quantidade}x ${itemDropado.nome}`);
        this.adicionarItem(itemDropado);
        // 5. Verificar se a ferramenta quebrou e removê-la
        if (ferramentaAtiva.durabilidade !== null && ferramentaAtiva.durabilidade <= 0) {
            console.log(`Sua ${ferramentaAtiva.nome} quebrou!`);
            // Remove o item que estava no slot selecionado
            this.inventario.inventario.splice(this.slotSelecionado, 1);
            this.renderizarInventario(); // Re-renderiza para mostrar que o item sumiu
        }
        else {
            // Se não quebrou, apenas atualiza a UI para mostrar a nova durabilidade no tooltip
            this.renderizarInventario();
        }
    }
    /**
     * Limpa o HTML e desenha cada item do inventário na tela.
     * Esta é a função-chave para a representação gráfica.
    */
    renderizarInventario() {
        this.elementoInventarioHTML.innerHTML = '';
        if (this.inventario.inventario.length === 0) {
            this.elementoInventarioHTML.innerHTML = '<p class="inventario-vazio">Inventário Vazio</p>';
            return;
        }
        this.inventario.inventario.forEach((item, index) => {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            // Adiciona a classe 'selected' se for o slot ativo
            if (index === this.slotSelecionado) {
                slot.classList.add('selected');
            }
            // Adiciona o evento para tornar este o slot ativo ao clicar
            slot.addEventListener('click', () => {
                this.slotSelecionado = index;
                console.log(`Slot ${index} selecionado: ${item.nome}`);
                this.renderizarInventario(); // Re-renderiza para mostrar a seleção
            });
            // Tooltip
            if (item instanceof ItemTrouxa) {
                // Se o item for uma Trouxa, o tooltip mostra seu conteúdo
                slot.title = item.conteudo.mostrarTrouxa();
            }
            else {
                // Caso contrário, mostra as informações normais do item
                slot.title = item.info_item();
            }
            const img = document.createElement('img');
            img.src = itemImagens[item.nome] || 'images/default.png';
            img.alt = item.nome;
            slot.appendChild(img);
            if (item.quantidade > 1) {
                const quantidadeTexto = document.createElement('span');
                quantidadeTexto.className = 'item-quantity';
                quantidadeTexto.innerText = item.quantidade.toString();
                slot.appendChild(quantidadeTexto);
            }
            this.elementoInventarioHTML.appendChild(slot);
        });
    }
    // --- MÉTODOS PARA A TROUXA ---
    /**
     * Guarda o item do slot selecionado dentro da primeira trouxa encontrada.
     */
    guardarItemNaTrouxa() {
        if (this.slotSelecionado === null) {
            alert("Selecione um item para guardar!");
            return;
        }
        const itemSelecionado = this.inventario.inventario[this.slotSelecionado];
        // Validações
        if (!itemSelecionado)
            return;
        if (itemSelecionado instanceof ItemTrouxa) {
            alert("Não é possível guardar uma trouxa dentro de outra.");
            return;
        }
        // Encontra a primeira trouxa no inventário
        const trouxa = this.inventario.inventario.find(item => item instanceof ItemTrouxa);
        if (!trouxa) {
            alert("Você não tem uma trouxa no inventário!");
            return;
        }
        // Adiciona o item na trouxa e remove do inventário
        trouxa.conteudo.push(itemSelecionado);
        this.inventario.inventario.splice(this.slotSelecionado, 1);
        // Atualiza a UI
        this.slotSelecionado = null; // Desseleciona para evitar erros
        this.renderizarInventario();
    }
    /**
     * Esvazia o conteúdo da trouxa selecionada de volta para o inventário.
     */
    esvaziarTrouxa() {
        if (this.slotSelecionado === null) {
            alert("Selecione uma trouxa para esvaziar!");
            return;
        }
        const itemSelecionado = this.inventario.inventario[this.slotSelecionado];
        if (itemSelecionado && itemSelecionado instanceof ItemTrouxa) {
            // Usa o método pop() até a trouxa ficar vazia
            while (!itemSelecionado.conteudo.isEmpty()) {
                const itemDeDentro = itemSelecionado.conteudo.pop();
                if (itemDeDentro) {
                    this.adicionarItem(itemDeDentro); // Usa o método já existente para adicionar de volta
                }
            }
            this.renderizarInventario();
        }
        else {
            alert("O item selecionado não é uma trouxa.");
        }
    }
    compararOrdenacao() {
        const inventarioAtual = this.inventario.inventario;
        if (inventarioAtual.length < 2) {
            console.log("Inventário muito pequeno para comparar ordenação.");
            return;
        }
        console.log(`--- Iniciando Comparação de Desempenho (Tamanho do Array: ${inventarioAtual.length}) ---`);
        // 1. Criar uma cópia do array. É ESSENCIAL para uma comparação justa!
        const inventarioParaTeste = [...inventarioAtual];
        // 2. Testar Bubble Sort
        const startTimeBubble = performance.now();
        bubblesort(inventarioParaTeste); // Executamos na cópia
        const endTimeBubble = performance.now();
        const durationBubble = endTimeBubble - startTimeBubble;
        console.log(`Bubble Sort: ${durationBubble.toFixed(4)} ms`);
        // 3. Testar Merge Sort (na MESMA cópia original e desordenada)
        const startTimeMerge = performance.now();
        const inventarioOrdenado = mergeSort(inventarioParaTeste); // Executamos e guardamos o resultado
        const endTimeMerge = performance.now();
        const durationMerge = endTimeMerge - startTimeMerge;
        console.log(`Merge Sort:  ${durationMerge.toFixed(4)} ms`);
        console.log(`----------------------------------------------------`);
        // Bônus: Exibir os resultados na página HTML
        const resultsElement = document.getElementById('performance-results');
        if (resultsElement) {
            resultsElement.innerText = `Resultados (Inventário com ${inventarioAtual.length} slots):\n` +
                `Bubble Sort: ${durationBubble.toFixed(4)} ms\n` +
                `Merge Sort:  ${durationMerge.toFixed(4)} ms`;
        }
        // 4. Atualizar o inventário real com o resultado do algoritmo mais eficiente
        this.inventario.inventario = inventarioOrdenado;
        this.slotSelecionado = 0; // Resetar a seleção
        this.renderizarInventario();
    }
    ordenarPorDurabilidade() {
        if (this.inventario.inventario.length < 2) {
            console.log("Inventário muito pequeno para ordenar.");
            return;
        }
        console.log("Ordenando inventário por durabilidade com Heap Sort...");
        const startTime = performance.now();
        // Chama a função de Heap Sort e atualiza o inventário com o resultado
        this.inventario.inventario = heapSortInventario(this.inventario);
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`Ordenação por durabilidade concluída em ${duration.toFixed(4)} ms.`);
        // Atualiza a UI para refletir a nova ordem
        this.slotSelecionado = 0;
        this.renderizarInventario();
    }
    // --------------------- MÉTODOS PARA O INVENTÁRIO DE PILHA ----------------------
    adicionarItemPilha(item, quantidade) {
        this.inventarioPilha.addSlot(item, quantidade);
        this.renderizarInventarioPilha();
    }
    //Chama o método para remover uma quantidade do slot de pilha selecionado.
    removerItemPilha(quantidade = 1) {
        if (this.slotPilhaSelecionado !== null) {
            this.inventarioPilha.rmvItens(this.slotPilhaSelecionado, quantidade);
            this.renderizarInventarioPilha(); // Atualiza a UI
        }
        else {
            console.log("Nenhum slot selecionado no inventário de pilha.");
        }
    }
    //Chama o método para limpar completamente o slot de pilha selecionado.
    removerSlotPilha() {
        if (this.slotPilhaSelecionado !== null) {
            this.inventarioPilha.rmvSlot(this.slotPilhaSelecionado);
            this.renderizarInventarioPilha(); // Atualiza a UI
        }
        else {
            console.log("Nenhum slot selecionado no inventário de pilha.");
        }
    }
    renderizarInventarioPilha() {
        this.elementoInventarioPilhaHTML.innerHTML = ''; // Limpa o grid
        this.inventarioPilha.inventario.forEach((slot, index) => {
            const slotDiv = document.createElement('div');
            slotDiv.className = 'inventory-slot';
            // Adiciona a classe 'selected' se o slot estiver selecionado
            if (index === this.slotPilhaSelecionado) {
                slotDiv.classList.add('selected');
            }
            // Adiciona evento de clique para selecionar o slot
            slotDiv.addEventListener('click', () => {
                this.slotPilhaSelecionado = index;
                this.renderizarInventarioPilha(); // Re-renderiza para mostrar a seleção
            });
            if (!slot.isEmpty()) {
                const item = slot.peek(); // Pega o item do topo para saber qual é
                const quantidade = slot.size(); // Pega o tamanho da pilha para a quantidade
                slotDiv.title = `${item.nome} x${quantidade}`;
                const img = document.createElement('img');
                img.src = itemImagens[item.nome] || 'assets/images/default.png';
                img.alt = item.nome;
                slotDiv.appendChild(img);
                if (quantidade > 1) {
                    const quantidadeTexto = document.createElement('span');
                    quantidadeTexto.className = 'item-quantity';
                    quantidadeTexto.innerText = quantidade.toString();
                    slotDiv.appendChild(quantidadeTexto);
                }
            }
            this.elementoInventarioPilhaHTML.appendChild(slotDiv);
        });
    }
    // --- MÉTODOS PARA A SIMULAÇÃO DO FUNIL ---
    renderizarTodosOsInventarios() {
        // Reutiliza o método de renderização do inventário principal
        this._renderizarInventario(this.inventarioCima, this.elementoInventarioCimaHTML, null);
        this._renderizarInventario(this.inventarioBaixo, this.elementoInventarioBaixoHTML, null);
        this.renderizarFunil();
    }
    renderizarFunil() {
        this.elementoFunilHTML.innerHTML = '';
        const itensNoFunil = this.funilFila.toArray();
        for (let i = 0; i < 5; i++) { // Renderiza 5 slots
            const slotDiv = document.createElement('div');
            slotDiv.className = 'inventory-slot';
            const item = itensNoFunil[i];
            if (item) {
                // ... (lógica para criar img e span de quantidade, igual a renderizarInventario)
            }
            this.elementoFunilHTML.appendChild(slotDiv);
        }
    }
    iniciarTransferenciaFunil() {
        if (this.transferenciaInterval) {
            console.log("Transferência já está em andamento.");
            return;
        }
        this.elementoStatusFunilHTML.innerText = "Status: Transferindo...";
        this.transferenciaInterval = window.setInterval(() => {
            // 1. Puxar item do baú de cima para o funil
            if (this.funilFila.size < 5 && this.inventarioCima.inventario.length > 0) {
                const itemParaPuxar = this.inventarioCima.inventario[0];
                this.inventarioCima.rmv_slot(itemParaPuxar.nome, 1);
                this.funilFila.add_item(itemParaPuxar);
            }
            // 2. Empurrar item do funil para o baú de baixo
            if (!this.funilFila.isEmpty()) {
                const itemParaEmpurrar = this.funilFila.remove_item();
                if (itemParaEmpurrar) {
                    this.inventarioBaixo.add_slot(itemParaEmpurrar);
                }
            }
            this.renderizarTodosOsInventarios();
            // 3. Parar a transferência se não houver mais nada a fazer
            if (this.inventarioCima.inventario.length === 0 && this.funilFila.isEmpty()) {
                this.pararTransferenciaFunil();
            }
        }, 1000); // Transfere 1 item por segundo
    }
    pararTransferenciaFunil() {
        if (this.transferenciaInterval) {
            clearInterval(this.transferenciaInterval);
            this.transferenciaInterval = null;
            this.elementoStatusFunilHTML.innerText = "Status: Parado";
            console.log("Transferência parada.");
        }
    }
    // Método auxiliar para popular o baú de cima
    popularBauDeCima() {
        this.inventarioCima.add_slot(new Itens("Pedra", 10, "Bloco"));
        this.inventarioCima.add_slot(new Itens("Diamante", 3, "Minério"));
        this.inventarioCima.add_slot(new Itens("Maçã Dourada", 5, "Comida"));
        this.renderizarTodosOsInventarios();
    }
    // (Precisa refatorar o renderizarInventario original para ser reutilizável)
    // Exemplo de refatoração:
    _renderizarInventario(inventario, elemento, slotSelecionado) {
        this.elementoInventarioHTML.innerHTML = '';
        if (inventario.inventario.length === 0) {
            elemento.innerHTML = '<p class="inventario-vazio">Inventário Vazio</p>';
            return;
        }
        inventario.inventario.forEach((item, index) => {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            // Adiciona a classe 'selected' se for o slot ativo
            if (index === slotSelecionado) {
                slot.classList.add('selected');
            }
            // Adiciona o evento para tornar este o slot ativo ao clicar
            slot.addEventListener('click', () => {
                slotSelecionado = index;
                console.log(`Slot ${index} selecionado: ${item.nome}`);
                this.renderizarInventario(); // Re-renderiza para mostrar a seleção
            });
            // Tooltip
            slot.title = item.info_item();
            const img = document.createElement('img');
            img.src = itemImagens[item.nome] || 'images/default.png';
            img.alt = item.nome;
            slot.appendChild(img);
            if (item.quantidade > 1) {
                const quantidadeTexto = document.createElement('span');
                quantidadeTexto.className = 'item-quantity';
                quantidadeTexto.innerText = item.quantidade.toString();
                slot.appendChild(quantidadeTexto);
            }
            elemento.appendChild(slot);
        });
    }
}
//# sourceMappingURL=jogo.js.map