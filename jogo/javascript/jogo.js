// ------------------------- IMPORTS -------------------------------------
import { Itens } from "./itens.js";
import { Inventario } from "./inventario.js";
import { bubblesort, mergeSort } from "./search_e_sort_algoritmos.js";
// -------------------------JOGO-----------------------------------------
function drop_Minerio(nome_drop, encantamento, min_drop = 1, max_drop = 4) {
    //não to considerando os drops extras de carvão, cobre e redstone
    let drop = Math.floor(Math.random() * (max_drop - min_drop + 1)) + min_drop;
    if (encantamento !== undefined) { //verificando se quebrou o minério com a picareta encantada
        if (encantamento === 'Toque de seda') {
            nome_drop = new Itens(`Bloco de ${nome_drop}`, 1, 'Bloco');
        }
        else if (encantamento === 'Fortuna') {
            nome_drop = new Itens(nome_drop, drop, 'Minério');
        }
    }
    else {
        nome_drop = new Itens(nome_drop, 1, 'Minério'); //caso não, dropa apenas 1 minério normal
    }
    return nome_drop;
}
// Um mapa para associar nomes de itens a seus arquivos de imagem
const itemImagens = {
    "Terra": "images/dirt.png",
    "Pedra": "images/stone.png",
    "Picareta de Diamante": "images/diamond_pickaxe.png",
    "Maçã Dourada": "images/golden_apple.png",
    "Ferro": "images/iron_ingot.png",
    "Diamante": "images/diamond.png",
    "Bloco de Ferro": "images/iron_ore.png", // Imagem para o bloco dropado por Toque de Seda
    "Bloco de Diamante": "images/diamond_ore.png"
};
export class Jogo {
    constructor(idElementoInventario) {
        this.slotSelecionado = 0;
        this.inventario = new Inventario();
        // Garante que o elemento do inventário exista no HTML
        const elemento = document.getElementById(idElementoInventario);
        if (!elemento) {
            throw new Error(`Elemento com id "${idElementoInventario}" não encontrado no DOM.`);
        }
        this.elementoInventarioHTML = elemento;
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
            slot.title = item.info_item(); // Tooltip com durabilidade atualizada
            const img = document.createElement('img');
            img.src = itemImagens[item.nome] || 'assets/images/default.png';
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
}
//# sourceMappingURL=jogo.js.map