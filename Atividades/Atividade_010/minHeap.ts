import { Compare, defaultCompare, swap } from './util.ts';
import { Itens } from './itens.ts';
import { Inventario } from './inventario.ts';

export class MinHeap {
    compareFn : (a : number, b : number) => number
    heap : Inventario
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.heap = this.heap;
    }
    insert(value : any) {
        if (value != null) {
            const index = this.heap.length;
            this.heap.push(value);
            this.siftUp(index);
            return true;
        }
        return false;
    }
    siftUp(index : number) {
        let parent = this.getParentIndex(index) as number;
        while (
            index > 0 &&
            this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN
        ) {
            swap(this.heap, parent, index);
            index = parent;
            parent = this.getParentIndex(index) as number;
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
    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0];
    }
    extract() {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.shift();
        }
        const removedValue = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.siftDown(0);
        return removedValue;
    }

    getLeftIndex(index) {
        return (2 * index) + 1;
    }
    getRightIndex(index) {
        return (2 * index) + 2;
    }
    getParentIndex(index : any) : undefined | number {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }

    siftDown(index) {
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
}