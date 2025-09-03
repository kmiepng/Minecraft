// ------------------------- IMPORTS -------------------------------------

import { Itens, ItensPilha } from "./itens";
import { Inventario, InventarioComPilha } from "./inventario";
import { bubblesort, mergeSort, linearSearch, binarySearch, testSearch, testSort } from "./search_e_sort_algoritmos";
import { TrouxaPilha, ItemTrouxa } from "./pilhas";
import { ListaLigadaCircularDuasVias, CicloDiario, Nodee } from "./lista_ligada_circular";
import { Bau, Jogadores } from "./lista_ligada_sets";
import { Dictionary, Receita } from "./dicionario";
import { HashTable } from "./hashTable";
import { heapSortInventario } from "./minHeap";
import { FilaDeque, FilacomNode } from "./filas";

// -------------------------JOGO-----------------------------------------

// Um mapa para associar nomes de itens a seus arquivos de imagem
const itemImagens: { [key: string]: string } = {
    "Terra": "images/dirt.png",
    "Pedra": "images/stone.png",
    "Picareta de Diamante": "images/diamond_pickaxe.png",
    "Maçã Dourada": "images/golden_apple.png",
    "Ferro": "images/iron_ingot.png",
    "Diamante": "images/diamond.png",
    "Bloco de Ferro": "images/iron_ore.png", // Imagem para o bloco dropado por Toque de Seda
    "Bloco de Diamante": "images/diamond_ore.png",
    "Trouxa": "images/bundle.png",
    "Graveto" : "images/stick.png"
};

export class Jogo{
    //Inventario
    inventario: Inventario;
    inventarioPilha: InventarioComPilha;
    //Elementos HTML
    elementoInventarioHTML: HTMLElement;
    elementoInventarioPilhaHTML: HTMLElement;
    //Clique no inventário
    slotSelecionado: number | null = 0;
    slotPilhaSelecionado: number | null = 0;
    // Propriedades para a simulação do funil
    inventarioCima: Inventario;
    inventarioBaixo: Inventario;
    funilFila: FilacomNode;
    transferenciaInterval: number | null = null;
    // Elementos HTML do funil
    elementoInventarioCimaHTML: HTMLElement;
    elementoInventarioBaixoHTML: HTMLElement;
    elementoFunilHTML: HTMLElement;
    elementoStatusFunilHTML: HTMLElement;
    // Propriedades para a simulação do funil deque
    inventarioCimaDeque: Inventario;
    inventarioBaixoDeque: Inventario;
    funilDeque: FilaDeque;
    // Elementos HTML do funil deque
    elementoInventarioCimaDequeHTML: HTMLElement;
    elementoInventarioBaixoDequeHTML: HTMLElement;
    elementoFunilDequeHTML: HTMLElement;
    // Propriedades para o carrossel
    cicloDoDia: ListaLigadaCircularDuasVias;
    tempoAtualNode: Nodee | null;
    cicloInterval: number | null = null;
    // Elementos HTML do carrossel
    elementoCicloDisplay: HTMLElement;
    elementoCicloImagem: HTMLImageElement;
    elementoCicloNome: HTMLElement;
    // Propriedades para a Tabela de Criação
    receitasDeCrafting: Dictionary<string, Receita>;
    ingredienteSelecionado: string | null = null;
    elementoCraftingKeys: HTMLElement;
    elementoCraftingDisplay: HTMLElement;
    constructor(idElementoInventario: string, idGridPilha: string,
        idGridCima: string, idGridBaixo: string, idGridFunil: string, idStatusFunil: string,
        idGridCimaDeque: string, idGridBaixoDeque: string, idGridFunilDeque: string
    ) {
        this.inventario = new Inventario();
        // Garante que o elemento do inventário exista no HTML
        const elemento = document.getElementById(idElementoInventario);
        if (!elemento) {
            throw new Error(`Elemento com id "${idElementoInventario}" não encontrado no DOM.`);
        }
        this.elementoInventarioHTML = elemento;
        // Inicializa o inventário de Pilha
        this.inventarioPilha = new InventarioComPilha(); // Usa o tamanho padrão (9)
        this.elementoInventarioPilhaHTML = document.getElementById(idGridPilha)!;
        // Inicializa os componentes do funil com node
        this.inventarioCima = new Inventario();
        this.inventarioBaixo = new Inventario();
        this.funilFila = new FilacomNode();

        this.elementoInventarioCimaHTML = document.getElementById(idGridCima)!;
        this.elementoInventarioBaixoHTML = document.getElementById(idGridBaixo)!;
        this.elementoFunilHTML = document.getElementById(idGridFunil)!;
        this.elementoStatusFunilHTML = document.getElementById(idStatusFunil)!;
        // Inicializa os componentes do funil deque
        this.inventarioCimaDeque = new Inventario();
        this.inventarioBaixoDeque = new Inventario();
        this.funilDeque = new FilaDeque();

        this.elementoInventarioCimaDequeHTML = document.getElementById(idGridCimaDeque)!;
        this.elementoInventarioBaixoDequeHTML = document.getElementById(idGridBaixoDeque)!;
        this.elementoFunilDequeHTML = document.getElementById(idGridFunilDeque)!;
        // Inicializa os componentes do Carrossel
        this.cicloDoDia = new ListaLigadaCircularDuasVias();
        this.tempoAtualNode = null;
        this._inicializarCicloDoDia(); // Chama o método para popular a lista

        this.elementoCicloDisplay = document.getElementById('ciclo-display')!;
        this.elementoCicloImagem = document.getElementById('ciclo-imagem') as HTMLImageElement;
        this.elementoCicloNome = document.getElementById('ciclo-nome')!;
        // Inicializa os componentes da Tabela de Criação
        this.receitasDeCrafting = new Dictionary<string, Receita>();
        this.elementoCraftingKeys = document.getElementById('crafting-keys-list')!;
        this.elementoCraftingDisplay = document.getElementById('crafting-recipes-display')!;
        this._inicializarReceitas();
    }
    // ------------------------------------------ INVENTARIO ---------------------------------------------------------
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
     * Simula a mineração de um bloco.
     * Ele usa a ferramenta no slot selecionado, diminui a durabilidade
     * e adiciona o drop resultante ao inventário.
    */
    minerarBloco(nomeMinerio: string) {
        // Verificar se um slot está selecionado
        if (this.slotSelecionado === null || this.inventario.inventario[this.slotSelecionado] === undefined) {
            console.log("Nenhuma ferramenta selecionada!");
            return;
        }

        // Obter a ferramenta ativa e verificar se é válida
        const ferramentaAtiva = this.inventario.inventario[this.slotSelecionado];
        if (ferramentaAtiva.tipo !== 'Ferramenta') {
            console.log(`O item "${ferramentaAtiva.nome}" não é uma ferramenta!`);
            return;
        }

        // Usar a ferramenta e diminuir a durabilidade
        ferramentaAtiva.usar(1);
        console.log(`Durabilidade de ${ferramentaAtiva.nome}: ${ferramentaAtiva.durabilidade}`);

        // Calcular o drop do minério
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
            itemDropado = new Itens(nomeMinerio, 1, 'Minério'); 
        }

        console.log(`Dropou: ${itemDropado.quantidade}x ${itemDropado.nome}`);
        this.adicionarItem(itemDropado);

        // Verificar se a ferramenta quebrou e removê-la
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
     * Método privado e genérico para renderizar QUALQUER inventário do tipo 'Inventario'.
     * @param inventarioObject O objeto de inventário a ser renderizado.
     * @param targetElement O elemento HTML onde o inventário será desenhado.
     * @param selectedSlotIndex O índice do slot atualmente selecionado (pode ser null).
     * @param onSlotClick Uma função a ser executada quando um slot é clicado (pode ser null).
     */
    private _renderizarInventario(
        inventarioObject: Inventario, 
        targetElement: HTMLElement, 
        selectedSlotIndex: number | null, 
        onSlotClick: ((index: number) => void) | null
    ) {
        targetElement.innerHTML = ''; // Limpa o conteúdo do elemento alvo

        if (inventarioObject.inventario.length === 0) {
            targetElement.innerHTML = '<p class="inventario-vazio">[ Vazio ]</p>';
            return;
        }

        inventarioObject.inventario.forEach((item, index) => {
            const slotDiv = document.createElement('div');
            slotDiv.className = 'inventory-slot';

            // Usa o índice de slot selecionado que foi passado como parâmetro
            if (index === selectedSlotIndex) {
                slotDiv.classList.add('selected');
            }

            // Se uma função de clique foi fornecida, adiciona o evento
            if (onSlotClick) {
                slotDiv.addEventListener('click', () => {
                    onSlotClick(index); // Executa a função passada
                });
            }
            
            // A lógica de tooltip e imagem continua a mesma
            if (item instanceof ItemTrouxa) {
                slotDiv.title = item.conteudo.mostrarTrouxa();
            } else {
                slotDiv.title = item.info_item();
            }

            const img = document.createElement('img');
            img.src = itemImagens[item.nome] || 'images/default.png';
            img.alt = item.nome;
            slotDiv.appendChild(img);

            if (item.quantidade > 1) {
                const quantidadeTexto = document.createElement('span');
                quantidadeTexto.className = 'item-quantity';
                quantidadeTexto.innerText = item.quantidade.toString();
                slotDiv.appendChild(quantidadeTexto);
            }
            
            targetElement.appendChild(slotDiv);
        });
    }
    /**
     * Renderiza o inventário principal do jogador.
     */
    public renderizarInventario() {
        // Define o que acontece quando um slot do inventário principal é clicado
        const clickHandler = (index: number) => {
            this.slotSelecionado = index;
            this.renderizarInventario(); // Re-renderiza para mostrar a seleção
        };

        // Chama o método ajudante com os dados do inventário principal
        this._renderizarInventario(this.inventario, this.elementoInventarioHTML, this.slotSelecionado, clickHandler);
    }
    // --------------------------------------------------- MÉTODOS PARA A TROUXA -----------------------------------------------------

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
        if (!itemSelecionado) return;
        if (itemSelecionado instanceof ItemTrouxa) {
            alert("Não é possível guardar uma trouxa dentro de outra.");
            return;
        }
        
        // Encontra a primeira trouxa no inventário
        const trouxa = this.inventario.inventario.find(item => item instanceof ItemTrouxa) as ItemTrouxa | undefined;

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
        } else {
            alert("O item selecionado não é uma trouxa.");
        }
    }
    // -------------------------------------------- ALGORITMOS DE SORT -----------------------------------------------
    compararOrdenacao() {
        const inventarioAtual = this.inventario.inventario;

        if (inventarioAtual.length < 2) {
            console.log("Inventário muito pequeno para comparar ordenação.");
            return;
        }

        console.log(`--- Iniciando Comparação de Desempenho (Tamanho do Array: ${inventarioAtual.length}) ---`);

        // Criar uma cópia do array. É essencial para uma comparação justa
        const inventarioParaTeste = [...inventarioAtual];

        // Testar Bubble Sort
        const startTimeBubble = performance.now();
        bubblesort(inventarioParaTeste); // Executamos na cópia
        const endTimeBubble = performance.now();
        const durationBubble = endTimeBubble - startTimeBubble;
        console.log(`Bubble Sort: ${durationBubble.toFixed(4)} ms`);

        // Testar Merge Sort (na MESMA cópia original e desordenada)
        const startTimeMerge = performance.now();
        const inventarioOrdenado = mergeSort(inventarioParaTeste); // Executamos e guardamos o resultado
        const endTimeMerge = performance.now();
        const durationMerge = endTimeMerge - startTimeMerge;
        console.log(`Merge Sort:  ${durationMerge.toFixed(4)} ms`);
        console.log(`----------------------------------------------------`);

        // Exibir os resultados na página HTML
        const resultsElement = document.getElementById('performance-results');
        if (resultsElement) {
            resultsElement.innerText = `Resultados (Inventário com ${inventarioAtual.length} slots):\n` +
                                       `Bubble Sort: ${durationBubble.toFixed(4)} ms\n` +
                                       `Merge Sort:  ${durationMerge.toFixed(4)} ms`;
        }

        // Atualizar o inventário real com o resultado do algoritmo mais eficiente
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

    
    // ------------------------------------ MÉTODOS PARA O INVENTÁRIO DE PILHA ------------------------------------

    adicionarItemPilha(item: ItensPilha, quantidade: number) {
        this.inventarioPilha.addSlot(item, quantidade);
        this.renderizarInventarioPilha();
    }

    //Chama o método para remover uma quantidade do slot de pilha selecionado.
    removerItemPilha(quantidade: number = 1) {
        if (this.slotPilhaSelecionado !== null) {
            this.inventarioPilha.rmvItens(this.slotPilhaSelecionado, quantidade);
            this.renderizarInventarioPilha(); // Atualiza a UI
        } else {
            console.log("Nenhum slot selecionado no inventário de pilha.");
        }
    }

    //Chama o método para limpar completamente o slot de pilha selecionado.
    removerSlotPilha() {
        if (this.slotPilhaSelecionado !== null) {
            this.inventarioPilha.rmvSlot(this.slotPilhaSelecionado);
            this.renderizarInventarioPilha(); // Atualiza a UI
        } else {
            console.log("Nenhum slot selecionado no inventário de pilha.");
        }
    }

    renderizarInventarioPilha() {
        this.elementoInventarioPilhaHTML.innerHTML = ''; // Limpa o grid

        this.inventarioPilha.inventario.forEach((slot, index) => { // Itera sobre as pilhas
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
                const item = slot.peek()!; // Pega o item do topo para saber qual é
                const quantidade = slot.size(); // Pega o tamanho da pilha para a quantidade

                slotDiv.title = `${item.nome} x${quantidade}`;

                const img = document.createElement('img');
                img.src = itemImagens[item.nome] || 'images/default.png';
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
    // -------------------------------------- MÉTODOS PARA A SIMULAÇÃO DO FUNIL COM NODE ---------------------------------------

    renderizarFunil() {
        this.elementoFunilHTML.innerHTML = '';
        const itensNoFunil = this.funilFila.toArray();
        for (let i = 0; i < 5; i++) { // Renderiza 5 slots
            const slotDiv = document.createElement('div');
            slotDiv.className = 'inventory-slot';
            const item = itensNoFunil[i];
            // Se existir um item para este slot, desenha sua imagem e quantidade
            if (item) {
                // Adiciona o tooltip com as informações do item
                slotDiv.title = item.info_item();

                // Cria e configura a imagem do item
                const img = document.createElement('img');
                img.src = itemImagens[item.nome] || 'images/default.png';
                img.alt = item.nome;
                slotDiv.appendChild(img);

                // Cria e configura o texto da quantidade (se for maior que 1)
                if (item.quantidade > 1) {
                    const quantidadeTexto = document.createElement('span');
                    quantidadeTexto.className = 'item-quantity';
                    quantidadeTexto.innerText = item.quantidade.toString();
                    slotDiv.appendChild(quantidadeTexto);
                }
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
            let algoAconteceu = false;
            // Se o funil já tem um item, nossa primeira ação é tentar movê-lo para baixo.
            if (!this.funilFila.isEmpty()) {
                const itemParaEmpurrar = this.funilFila.remove_item();
                if (itemParaEmpurrar) {
                    this.inventarioBaixo.add_slot(itemParaEmpurrar);
                    algoAconteceu = true;
                }
            } 
            // Só tentamos puxar um novo item se o funil estava vazio E o baú de cima tem itens.
            else if (this.funilFila.size < 5 && this.inventarioCima.inventario.length > 0) {
                const itemParaPuxar = this.inventarioCima.inventario[0];
                // Criamos um novo item copiando as propriedades do original.
                const itemTransferido = new Itens(
                    itemParaPuxar.nome,
                    1, // Apenas uma unidade é transferida por vez
                    itemParaPuxar.tipo,
                    itemParaPuxar.durabilidade,
                    itemParaPuxar.encantamento
                );
                this.funilFila.add_item(itemTransferido);
                itemParaPuxar.quantidade--;

                if (itemParaPuxar.quantidade <= 0) {
                    this.inventarioCima.inventario.shift();
                }

                algoAconteceu = true;
            }

            if (algoAconteceu) {
                this.renderizarTodosOsInventarios();
            }

            // Parar a transferência se não houver mais nada a fazer
            if (this.inventarioCima.inventario.length === 0 && this.funilFila.isEmpty()) {
                this.pararTransferenciaFunil();
            };

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
        const min_drop = 1, max_drop = 4;
        const drop = Math.floor(Math.random() * (max_drop - min_drop + 1)) + min_drop;
        this.inventarioCima.add_slot(new Itens("Pedra", 10, "Bloco"));
        this.inventarioCima.add_slot(new Itens("Diamante", drop, "Minério"));
        this.inventarioCima.add_slot(new Itens("Maçã Dourada", 5, "Comida"));
        this.renderizarTodosOsInventariosDeque();
    }
    /**
     * Renderiza os inventários da simulação do funil (baús e o próprio funil).
     */
    public renderizarTodosOsInventarios() {
        // Chama o ajudante para o baú de cima. Não há seleção nem clique, então passamos 'null'.
        this._renderizarInventario(this.inventarioCima, this.elementoInventarioCimaHTML, null, null);

        // O funil tem sua própria lógica de renderização, então o chamamos separadamente.
        this.renderizarFunil();

        // Chama o ajudante para o baú de baixo. Também sem seleção ou clique.
        this._renderizarInventario(this.inventarioBaixo, this.elementoInventarioBaixoHTML, null, null);
    }
    // -------------------------------------- MÉTODOS PARA A SIMULAÇÃO DO FUNIL DEQUE ---------------------------------------
    renderizarFunilDeque() {
        this.elementoFunilDequeHTML.innerHTML = '';
        const itensNoFunil = this.funilDeque.toArray(); // Usa o Deque
        for (let i = 0; i < 5; i++) { // Renderiza 5 slots
            const slotDiv = document.createElement('div');
            slotDiv.className = 'inventory-slot deque';
            const item = itensNoFunil[i];
            if (item) {
                // Adiciona o tooltip com as informações do item
                slotDiv.title = item.info_item();

                // Cria e configura a imagem do item
                const img = document.createElement('img');
                img.src = itemImagens[item.nome] || 'images/default.png';
                img.alt = item.nome;
                slotDiv.appendChild(img);

                // Cria e configura o texto da quantidade (se for maior que 1)
                if (item.quantidade > 1) {
                    const quantidadeTexto = document.createElement('span');
                    quantidadeTexto.className = 'item-quantity';
                    quantidadeTexto.innerText = item.quantidade.toString();
                    slotDiv.appendChild(quantidadeTexto);
                }
            }
            this.elementoFunilDequeHTML.appendChild(slotDiv);
        }
    }
     /**
     * Puxa um item do baú de cima e o adiciona ao funil (Deque).
     * @param prioridade Se true, adiciona no início (addFront), senão no fim (addBack).
     */
    puxarItemParaFunil(prioridade: boolean) {
        if (this.inventarioCimaDeque.inventario.length === 0) {
            alert("Baú de cima está vazio!");
            return;
        }
        if (this.funilDeque.size() >= 5) {
            alert("Funil está cheio!");
            return;
        }

        const stackOriginal = this.inventarioCimaDeque.inventario[0];
        const itemTransferido = new Itens(
            stackOriginal.nome, 1, stackOriginal.tipo,
            stackOriginal.durabilidade, stackOriginal.encantamento
        );

        if (prioridade) {
            this.funilDeque.addFront(itemTransferido);
        } else {
            this.funilDeque.addBack(itemTransferido);
        }
        
        stackOriginal.quantidade--;
        if (stackOriginal.quantidade <= 0) {
            this.inventarioCimaDeque.inventario.shift();
        }
        this.renderizarTodosOsInventariosDeque();
    }
    /**
     * Empurra o primeiro item do funil (Deque) para o baú de baixo. (removeFront)
     */
    empurrarItemDoFunil() {
        if (this.funilDeque.isEmpty()) {
            alert("Funil está vazio!");
            return;
        }
        const itemEmpurrado = this.funilDeque.removeFront();
        if (itemEmpurrado) {
            this.inventarioBaixoDeque.add_slot(itemEmpurrado);
        }
        this.renderizarTodosOsInventariosDeque();
    }

    /**
     * Devolve o ÚLTIMO item do funil (Deque) de volta para o baú de cima. (removeBack)
     */
    devolverUltimoItemDoFunil() {
        if (this.funilDeque.isEmpty()) {
            alert("Funil está vazio!");
            return;
        }
        const itemDevolvido = this.funilDeque.removeBack();
        if (itemDevolvido) {
            // Usamos o add_slot aqui, ele vai empilhar ou criar um novo slot corretamente.
            this.inventarioCimaDeque.add_slot(itemDevolvido);
        }
        this.renderizarTodosOsInventariosDeque();
    }
    public renderizarTodosOsInventariosDeque() {
        // Chama o ajudante para o baú de cima. Não há seleção nem clique, então passamos 'null'.
        this._renderizarInventario(this.inventarioCimaDeque, this.elementoInventarioCimaDequeHTML, null, null);

        // O funil tem sua própria lógica de renderização, então o chamamos separadamente.
        this.renderizarFunilDeque();

        // Chama o ajudante para o baú de baixo. Também sem seleção ou clique.
        this._renderizarInventario(this.inventarioBaixoDeque, this.elementoInventarioBaixoDequeHTML, null, null);
    }
    popularBauDeCimaDeque() {
        const min_drop = 1, max_drop = 4;
        const drop = Math.floor(Math.random() * (max_drop - min_drop + 1)) + min_drop;
        this.inventarioCimaDeque.add_slot(new Itens("Pedra", 10, "Bloco"));
        this.inventarioCimaDeque.add_slot(new Itens("Diamante", drop, "Minério"));
        this.inventarioCimaDeque.add_slot(new Itens("Maçã Dourada", 5, "Comida"));
        this.renderizarTodosOsInventariosDeque();
    }
    /**
     * Método privado para popular nossa lista circular com os horários do dia.
     */
    private _inicializarCicloDoDia() {
        const horarios: CicloDiario[] = [
            { nome: "Amanhecer", imagem: "images/sunrise.png", corFundo: "#ffcf78" },
            { nome: "Manhã", imagem: "images/day.png", corFundo: "#87CEEB" },
            { nome: "Meio-dia", imagem: "images/noon.png", corFundo: "#4aa2d6" },
            { nome: "Tarde", imagem: "images/afternoon.png", corFundo: "#fca34e" },
            { nome: "Pôr do Sol", imagem: "images/sunset.png", corFundo: "#ff6a62" },
            { nome: "Noite", imagem: "images/night.png", corFundo: "#001a3d" },
            { nome: "Meia-noite", imagem: "images/midnight.png", corFundo: "#000f24" },
        ];

        horarios.forEach(h => this.cicloDoDia.adicionar(h));
        this.tempoAtualNode = this.cicloDoDia.head; // Começa no primeiro horário
    }
    // --- MÉTODOS PARA O CARROSSEL ---

    /**
     * Atualiza a interface com os dados do nó de tempo atual.
     */
    renderizarCicloDoDia() {
        if (!this.tempoAtualNode) return;
        
        const dadosAtuais = this.tempoAtualNode.data;
        this.elementoCicloDisplay.style.backgroundColor = dadosAtuais.corFundo;
        this.elementoCicloImagem.src = dadosAtuais.imagem;
        this.elementoCicloNome.innerText = dadosAtuais.nome;
    }

    /**
     * Avança para o próximo nó na lista circular.
     */
    avancarTempo() {
        if (this.tempoAtualNode) {
            this.tempoAtualNode = this.tempoAtualNode.next;
            this.renderizarCicloDoDia();
        }
    }
    /**
     * Retrocede para o nó anterior na lista circular.
     */
    retrocederTempo() {
        if (this.tempoAtualNode) {
            this.tempoAtualNode = this.tempoAtualNode.prev;
            this.renderizarCicloDoDia();
        }
    }
    iniciarCicloAutomatico(intervaloMs: number = 3000) { // 3 segundos por padrão
        if (this.cicloInterval) {
            console.log("O ciclo já está em andamento.");
            return; // Evita criar múltiplos intervalos
        }
        console.log(`Iniciando ciclo automático a cada ${intervaloMs}ms.`);
        this.cicloInterval = window.setInterval(() => {
            this.avancarTempo();
        }, intervaloMs);
    }
    pausarCicloAutomatico() {
        if (this.cicloInterval) {
            clearInterval(this.cicloInterval);
            this.cicloInterval = null;
            console.log("Ciclo pausado.");
        }
    }
    private _inicializarReceitas() {
        // --- Definindo os Itens ---
        const graveto = new Itens("Graveto", 2, "Material");
        const diamante = new Itens("Diamante", 3, "Minério");
        const picaretaDiamante = new Itens("Picareta de Diamante", 1, "Ferramenta", 1561);
        
        // --- Criando a Receita ---
        const receitaPicareta = new Receita(picaretaDiamante, [diamante, graveto]);
        
        // --- Adicionando ao Dicionário ---
        // A mesma receita pode ser encontrada por chaves diferentes
        this.receitasDeCrafting.set("Diamante", receitaPicareta);
        this.receitasDeCrafting.set("Graveto", receitaPicareta);
    }
    // --- MÉTODOS PARA A TABELA DE CRIAÇÃO ---

    renderizarTabelaDeCrafting() {
        // 1. Renderiza a lista de ingredientes-chave (as chaves do dicionário)
        this.elementoCraftingKeys.innerHTML = '<h3>Ingredientes</h3>';
        const listaKeys = document.createElement('ul');
        const chaves = this.receitasDeCrafting.keys();
        // Remove duplicatas para a lista ficar limpa
        const chavesUnicas = [...new Set(chaves)]; 
        
        chavesUnicas.forEach(chave => {
            const itemLista = document.createElement('li');
            itemLista.innerText = chave;
            if (chave === this.ingredienteSelecionado) {
                itemLista.className = 'selected';
            }
            itemLista.addEventListener('click', () => {
                this.ingredienteSelecionado = chave;
                this.renderizarTabelaDeCrafting(); // Re-renderiza tudo ao selecionar
            });
            listaKeys.appendChild(itemLista);
        });
        this.elementoCraftingKeys.appendChild(listaKeys);

        // 2. Renderiza as receitas para o ingrediente selecionado
        this.elementoCraftingDisplay.innerHTML = '<h3>Receitas Possíveis</h3>';
        if (this.ingredienteSelecionado) {
            const receitas = this.receitasDeCrafting.get(this.ingredienteSelecionado);
            if (receitas) {
                // Usamos um Set para não mostrar a mesma receita duas vezes se ela tiver múltiplas chaves
                const receitasUnicas = new Set(receitas);
                receitasUnicas.forEach(receita => {
                    const divReceita = document.createElement('div');
                    divReceita.className = 'recipe';
                    
                    // Renderiza os ingredientes
                    let ingredientesHTML = '<div class="recipe-ingredients">';
                    receita.ingredientes.forEach(ing => {
                        ingredientesHTML += `<div class="inventory-slot" title="${ing.info_item()}"><img src="${itemImagens[ing.nome] || ''}"></div>`;
                    });
                    ingredientesHTML += '</div>';

                    // Renderiza a seta e o resultado
                    const resultadoHTML = `<div class="recipe-arrow">→</div>
                                           <div class="recipe-result">
                                               <div class="inventory-slot" title="${receita.resultado.info_item()}"><img src="${itemImagens[receita.resultado.nome] || ''}"></div>
                                           </div>`;

                    divReceita.innerHTML = ingredientesHTML + resultadoHTML;
                    this.elementoCraftingDisplay.appendChild(divReceita);
                });
            }
        }
    }
}