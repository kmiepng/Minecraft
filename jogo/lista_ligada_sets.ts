import { Inventario } from "./inventario";
import { Itens } from "./itens";

//Classe de Sets utilizada para implementar o Bau
export class Bau {
    bau: Inventario
    constructor() {
        this.bau = new Inventario();
    }
    add(element : Itens) {
        return this.bau.add_slot(element)
    }
    delete(element : Itens, quantidade : number | null = null) {
        return this.bau.rmv_slot(element.nome, quantidade)
    }
    has(element : Itens) {
        return this.bau.inventario.some(item => item.nome === element.nome);
    }
    values() : Itens[] {
        return this.bau.inventario;
    }
    bau_comunitario(otherSet : Bau) : Bau{
        const unionBau = new Bau();
        // Adiciona todos os itens do primeiro baú
        this.values().forEach(item => {
            // Criamos uma cópia para não modificar o item original
            const itemCopy = new Itens(item.nome, item.quantidade, item.tipo, item.durabilidade, item.encantamento);
            unionBau.add(itemCopy);
        });
        // Adiciona todos os itens do segundo baú (a lógica de 'add' já vai stackar)
        otherSet.values().forEach(item => {
            const itemCopy = new Itens(item.nome, item.quantidade, item.tipo, item.durabilidade, item.encantamento);
            unionBau.add(itemCopy);
        });
        return unionBau;
    }
    bau_filtrado(otherSet : Bau, filtro : string) : Bau {
        const filteredBau = new Bau();
        // Passa pelos itens do primeiro baú
        this.values().forEach(item => {
            if (item.tipo === filtro) {
                const itemCopy = new Itens(item.nome, item.quantidade, item.tipo, item.durabilidade, item.encantamento);
                filteredBau.add(itemCopy);
            }
        });
        // Passa pelos itens do segundo baú
        otherSet.values().forEach(item => {
            if (item.tipo === filtro) {
                const itemCopy = new Itens(item.nome, item.quantidade, item.tipo, item.durabilidade, item.encantamento);
                filteredBau.add(itemCopy);
            }
        });
        return filteredBau;
    }
    diferenca_baus(otherSet : Bau) : Bau {
        const differenceBau = new Bau();
        const selfItems = new Map<string, { total: number, item: Itens }>();
        // Contar a quantidade total de cada item no baú atual (this)
        this.values().forEach(item => {
            if (selfItems.has(item.nome)) {
                selfItems.get(item.nome)!.total += item.quantidade;
            } else {
                // Guarda uma cópia do primeiro item encontrado para usar como modelo
                const itemSample = new Itens(item.nome, 0, item.tipo, item.durabilidade, item.encantamento);
                selfItems.set(item.nome, { total: item.quantidade, item: itemSample });
            }
        });
        // Subtrair as quantidades do outro baú (otherSet)
        otherSet.values().forEach(item => {
            if (selfItems.has(item.nome)) {
                selfItems.get(item.nome)!.total -= item.quantidade;
            }
        });
        // Adicionar o resultado (se for positivo) ao baú de diferença
        selfItems.forEach((value) => {
            if (value.total > 0) {
                const newItem = value.item;
                newItem.quantidade = value.total;
                differenceBau.add(newItem); // add() vai cuidar de criar os stacks necessários
            }
        });
        return differenceBau;
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.bau.inventario.length;
    }
    clear() {
        this.bau.inventario = [];
    }
    getValoresAgrupados(): Itens[] {
        // Usa um Map para facilitar o agrupamento: { 'nomeDoItem': ObjetoItemComTotal }
        const itensAgrupados = new Map<string, Itens>();

        this.bau.inventario.forEach(itemNoSlot => {
            if (itensAgrupados.has(itemNoSlot.nome)) {
                // Se o item já existe no nosso mapa, apenas somamos a quantidade
                const itemExistente = itensAgrupados.get(itemNoSlot.nome)!;
                itemExistente.quantidade += itemNoSlot.quantidade;
            } else {
                // Se é a primeira vez que vemos este item, criamos uma cópia dele
                // para não alterar o objeto original do inventário.
                const novoItemAgrupado = new Itens(
                    itemNoSlot.nome,
                    itemNoSlot.quantidade,
                    itemNoSlot.tipo,
                    itemNoSlot.durabilidade,
                    itemNoSlot.encantamento
                );
                itensAgrupados.set(itemNoSlot.nome, novoItemAgrupado);
            }
        });

        // Converte o Map de volta para um array de Itens
        return Array.from(itensAgrupados.values());
    }
    toString(): string {
        if (this.isEmpty()) {
            return '[ Vazio ]';
        }
        // Usamos o método para obter a lista consolidada
        const valoresAgrupados = this.getValoresAgrupados();
        return valoresAgrupados
            .map(item => `[${item.info_item()}]`) // O info_item() já mostra nome e quantidade
            .join('\n');
    }
}
// Construct Single Node
class NodeBau {
    jogador : string
    data : Bau;
    next : NodeBau | null
    constructor(jogador : string, data : Bau, next : (NodeBau | null) = null) {
        this.jogador = jogador;
        this.data = data;
        this.next = next;
    }
}
//lista ligada que recebe os sets(baús) dos jogadores e o nome

export interface Jogador{
    playerName : string;
    dificuldade : string;
    pvpEnabled : boolean;
    inventario : Inventario;
}

export class Jogadores {
    head : NodeBau | null;
    size : number;
    constructor() {
        this.head = null;
        this.size = 0;
    }
    // Insert first node
    insertFirst(nome : Jogador, data : Bau) {
        this.head = new NodeBau(nome.playerName, data, this.head);
        this.size++;
    }
    // Insert last node
    insertLast(nome : Jogador, data : Bau) {
        let node = new NodeBau(nome.playerName, data);
        let current;
        // If empty, make head
        if (!this.head) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }
    // Insert at index
    insertAt(nome : Jogador, data : Bau, index : number) {
        //  If index is out of range
        if (index > 0 && index > this.size) {
            return;
        }
        // If first index
        if (index === 0) {
            this.insertFirst(nome, data);
            return;
        }
        const node = new NodeBau(nome.playerName, data);
        let current, previous;
        // Set current to first
        current = this.head;
        let count = 0;
        while (count < index) {
            previous = current; // Node before index
            count++;
            current = current!.next; // Node after index
        }
        node.next = current;
        previous!.next = node;
        this.size++;
    }
    // Get at index
    getAt(index : number) {
        let current = this.head;
        let count = 0;
        while (current) {
            if (count == index) {
                console.log(current.data);
            }
            count++;
            current = current.next;
        }
        return null;
    }
    // Remove at index
    removeAt(index : number) {
        if (index > 0 && index > this.size) {
            return;
        }
        let current = this.head;
        let previous;
        let count = 0;
        // Remove first
        if (index === 0) {
            this.head = current!.next;
        } else {
            while (count < index) {
                count++;
                previous = current;
                current = current!.next;
            }
            previous!.next = current!.next;
        }
        this.size--;
    }
    // Clear list
    clearList() {
        this.head = null;
        this.size = 0;
    }
    // Print list data
    printListData() {
        let current = this.head;
        while (current) {
        console.log(`Baú de ${current.jogador}:`);
        console.log(current.data.toString())
        current = current.next;
        }
    }
}