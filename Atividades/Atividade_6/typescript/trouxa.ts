import { Itens } from "./itens";

class Node {
    data : Itens
    next : Node | null
    constructor(data : Itens, next : (Node | null) = null) {
        this.data = data;
        this.next = next;
    }   
    getData() {
        return this.data.info();
    }
}

class TrouxaPilha {
    top : Node | null
    size : number
    constructor() {
        this.top = null;
        this.size = 0;
    }

    push(data : Itens) {
        const newNode = new Node(data, this.top);
        this.top = newNode;
        this.size++;
    }

    pop() {
        if (this.top === null) {
            console.log("Stack is empty");
            return null;
        }
        const poppedData = this.top.getData();
        this.top = this.top.next;
        this.size--;
        return poppedData;
    }

    peek() {
        if (this.top === null) {
            console.log("Stack is empty");
            return null;
        }
        return this.top.getData();
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    print() {
        let current = this.top;
        let result = "Top ";
        while (current !== null) {
            result += current.getData() + " -> ";
            current = current.next;
        }
        result += "End";
        console.log(result);
    }
}