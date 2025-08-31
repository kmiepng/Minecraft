import { Compare, defaultCompare, swap } from './utils';
import { Itens } from './itens';
import { Inventario } from './inventario';

class MinHeap {
    compareFn : (a : Itens, b : Itens) => number
    heap : Itens[]
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.heap = [];
    }
    insert(value : Itens) {
        if (value != null) {
            const index = this.heap.length;
            this.heap.push(value);
            this.siftUp(index - 1);
            return true;
        }
        return false;
    }
    siftUp(index : number) {
        let parent = this.getParentIndex(index);
        while (
            index > 0 &&
            parent !== undefined &&
            this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN
        ) {
            swap(this.heap, parent, index);
            index = parent;
            parent = this.getParentIndex(index) as number;
        }
    }
    siftDown(index : number) {
        let element = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();
        if (
            left < size &&
            this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN
        ) {
            element = left;
        }
        if (
            right < size &&
            this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN
        ) {
            element = right;
        }
        if (index !== element) {
            swap(this.heap, index, element);
            this.siftDown(element);
        }
    }
    size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.size() <= 0;
    }
    clear() {
        this.heap = [];
    }
    findMinimum() : Itens | undefined {
        return this.isEmpty() ? undefined : this.heap[0];
    }
    extract() : Itens | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.shift();
        }
        const removedValue = this.heap[0];
        this.heap[0] = this.heap.pop() as Itens;
        this.siftDown(0);
        return removedValue;
    }

    getLeftIndex(index : number) : number{
        return (2 * index) + 1;
    }
    getRightIndex(index : number) : number {
        return (2 * index) + 2;
    }
    getParentIndex(index : any) : undefined | number {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }
}

function compareByDurability(a: Itens, b: Itens): number {
    const durA = a.durabilidade;
    const durB = b.durabilidade;

    // Ambos não têm durabilidade (são iguais nesse critério)
    if (durA === null && durB === null) {
        return Compare.EQUALS; // 0
    }
    // 'a' não tem durabilidade, então é "maior" que 'b'
    if (durA === null) {
        return Compare.BIGGER_THAN; // 1
    }
    // 'b' não tem durabilidade, então é "maior" que 'a'
    if (durB === null) {
        return Compare.LESS_THAN; // -1
    }
    
    // Ambos têm durabilidade, então comparamos os números
    // Se durA < durB, retorna -1 (LESS_THAN)
    // Se durA > durB, retorna 1 (BIGGER_THAN)
    // Se durA === durB, retorna 0 (EQUALS)
    return defaultCompare(durA, durB);
}

export function heapSortInventarioPorDurabilidade(inventario: Inventario): Itens[] {
    const sortedInventario: Itens[] = [];
    if (!inventario || inventario.inventario.length === 0) {
        return sortedInventario;
    }

    // Cria um MinHeap usando nossa função de comparação customizada
    const minHeap = new MinHeap(compareByDurability);

    // Insere todos os itens do inventário no heap
    for (const item of inventario.inventario) {
        minHeap.insert(item);
    }

    // Extrai os itens do heap um por um. Como é um MinHeap,
    // eles sairão em ordem crescente de durabilidade.
    while (!minHeap.isEmpty()) {
        const nextItem = minHeap.extract();
        if (nextItem) {
            sortedInventario.push(nextItem);
        }
    }

    return sortedInventario;
}