import { Itens } from "./itens";

export class Empilhamento {
    count : number;
    items : any;
    constructor() {
        this.count = 0;
        this.items = {};
    }
    push(element : Itens) {
        this.items[this.count] = element;
        this.count++;
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }
    isEmpty() {
        return this.count === 0;
    }
    size() {
        return this.count;
    }
    clear() {
        this.items = {};
        this.count = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `| ${this.items[0].info()}`;
        for (let i = 1; i < this.count; i++) {
            objString = `${objString} | ${this.items[i].info()}`;
        }
        objString += ' |';
        return objString;
    }
}