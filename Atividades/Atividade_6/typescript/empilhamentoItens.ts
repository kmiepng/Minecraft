export class Empilhamento {
    count : number;
    items : any;
    constructor() {
        this.count = 0;
        this.items = {};
    }
    push(element : string) {
        if (this.count === 64){
            console.log("Stack de itens cheio")
            return false
        }
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
        let objString = `| ${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            objString = `${objString} | ${this.items[i]}`;
        }
        objString += ' |';
        return objString;
    }
}

export const empilhamentoItens = new Empilhamento();