import { Itens } from "./itens";

class Node{
    item : Itens
    prev : Node | null
    next : Node | null
    constructor(item : Itens, prev : (Node | null) = null, next : (Node | null) = null){
        this.item = item
        this.prev = prev;
        this.next = next;
    }
    getData(){
        return this.item.info_item();
    }
}

export class FilacomNode {
    head : Node | null;
    tail : Node | null;
    size : number;
    constructor(){
        this.head = null
        this.tail = null
        this.size = 0
    }
    add_item(item : Itens){
        const newNode = new Node(item, null, this.head)
        if (this.tail !== null){
            this.head!.prev = newNode;
        } else {
            this.tail = newNode;
        }
        this.head = newNode
        this.size++;
    }
    remove_item() : Itens | null{
        if (this.tail === null){
            console.log('Não há mais item no funil')
            return null;
        }
        const removedNode = this.tail;
        this.tail = this.tail.next;

        if (this.head!==null) {
            this.tail!.prev = null;
        } else {
            this.head = null
        }
        this.size--
        return removedNode.item
    }
    peek() : Itens | null{
        if (this.tail === null) {
            console.log("");
            return null;
        }
        return this.tail.item;
    }
    isEmpty(): boolean {
        return this.size === 0;
    }
    toArray(): Itens[] {
        const result: Itens[] = [];
        let current = this.tail;
        while (current !== null) {
            result.push(current.item);
            current = current.next;
        }
        return result;
    }
}

export class FilaDeque{
    count : number
    lowestCount : number
    items : any
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    addFront(element : Itens) {
        if (this.isEmpty()) {
            this.addBack(element);
        } else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        } else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1];
            }
            this.count++;
            this.items[0] = element;
        }
    }

    addBack(element : Itens) {
        this.items[this.count] = element;
        this.count++;
    }

    removeFront() {
        if (this.isEmpty()) {
        return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }

    removeBack() {
        if (this.isEmpty()) {
        return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }

    peekFront() {
        if (this.isEmpty()) {
        return undefined;
        }
        return this.items[this.lowestCount].info();
    }

    peekBack() {
        if (this.isEmpty()) {
        return undefined;
        }
        return this.items[this.count - 1].info();
    }

    isEmpty() {
        return this.size() === 0;
    }

    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }

    size() {
        return this.count - this.lowestCount;
    }

    toString() {
        if (this.isEmpty()) {
        return '';
        }
        let objString = `| ${this.items[this.lowestCount].info()}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
        objString = `${objString} | ${this.items[i].info()}`;
        }
        objString += ' |'
        return objString;
    }
}