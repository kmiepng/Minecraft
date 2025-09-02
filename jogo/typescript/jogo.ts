// ------------------------- IMPORTS -------------------------------------

import { Itens, ItensPilha } from "./itens";
import { Inventario, InventarioComPilha } from "./inventario";
import { bubblesort, mergeSort, linearSearch, binarySearch, testSearch, testSort } from "./search_e_sort_algoritmos";
import { TrouxaPilha } from "./pilhas";
import { ListaLigadaCircularDuasVias } from "./lista_ligada_circular";
import { Bau, Jogadores } from "./lista_ligada_sets";
import { Dictionary } from "./dicionario";
import { HashTable } from "./hashTable";
import { heapSortInventario } from "./minHeap";
import { FilaDeque, FilacomNode } from "./filas";

// -------------------------JOGO-----------------------------------------

function drop_Minerio(nome_drop : any, encantamento ?: string, min_drop = 1, max_drop = 4){  //quantidade de minério que dropa após minerar um bloco de minério
    //não to considerando os drops extras de carvão, cobre e redstone
    let drop =  Math.floor(Math.random() * (max_drop-min_drop +1)) + min_drop;
    if (encantamento !== undefined){ //verificando se quebrou o minério com a picareta encantada
        if (encantamento === 'Toque de seda') { 
            nome_drop = new Itens(`Bloco de ${nome_drop}`, 1, 'Bloco') 
        } else if (encantamento === 'Fortuna') {
            nome_drop = new Itens(nome_drop, drop, 'Minério');
        }
    }
    else{
        nome_drop = new Itens(nome_drop, 1, 'Minério'); //caso não, dropa apenas 1 minério normal
    }
    return nome_drop;
}

// Um mapa para associar nomes de itens a seus arquivos de imagem
const itemImagens: { [key: string]: string } = {
    "Terra": "assets/images/dirt.png",
    "Pedra": "assets/images/stone.png",
    "Picareta de Diamante": "assets/images/diamond_pickaxe.png",
    "Maçã Dourada": "assets/images/golden_apple.png",
    "Ferro": "assets/images/iron_ingot.png",
    "Diamante": "assets/images/diamond.png",
    "Bloco de Ferro": "assets/images/iron_ore.png", // Imagem para o bloco dropado por Toque de Seda
    "Bloco de Diamante": "assets/images/diamond_ore.png"
};

export class Jogo{
    inventario: Inventario;
    elementoInventarioHTML: HTMLElement;
    slotSelecionado: number | null = 0;

    constructor(idElementoInventario: string) {
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
    adicionarItem(item: Itens) {
        this.inventario.add_slot(item);
        this.renderizarInventario(); // Re-desenha o inventário na tela
    }

    /**
     * Remove uma quantidade de um item do inventário e atualiza a interface.
     */
    removerItem(nomeItem: string, quantidade: number | null = null) {
        this.inventario.rmv_slot(nomeItem, quantidade);
        this.renderizarInventario(); // Re-desenha o inventário na tela
    }
    /**
     * NOVO MÉTODO: Simula a mineração de um bloco.
     * Ele usa a ferramenta no slot selecionado, diminui a durabilidade
     * e adiciona o drop resultante ao inventário.
     */
    minerarBloco(nomeMinerio: string) {
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
        let itemDropado: Itens;
        const encantamento = ferramentaAtiva.encantamento;
        
        // Valores padrão para o drop
        const min_drop = 1, max_drop = 4;
        const drop = Math.floor(Math.random() * (max_drop - min_drop + 1)) + min_drop;

        if (encantamento === 'Toque de seda') {
            itemDropado = new Itens(`Bloco de ${nomeMinerio}`, 1, 'Bloco');
        } else if (encantamento === 'Fortuna') {
            itemDropado = new Itens(nomeMinerio, drop, 'Minério');
        } else {
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
        } else {
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
}