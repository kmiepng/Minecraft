class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
    getData() {
        return this.data.info();
    }
}
class TrouxaPilha {
    constructor() {
        this.top = null;
        this.size = 0;
    }
    push(data) {
        const newNode = new Node(data, this.top);
        this.top = newNode;
        this.size++;
    }
    pop() {
        if (this.top === null) {
            console.log("Trouxa está vazia");
            return null;
        }
        const poppedData = this.top.getData();
        this.top = this.top.next;
        this.size--;
        return poppedData;
    }
    peek() {
        if (this.top === null) {
            console.log("Trouxa está vazia");
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
        let result = "|";
        while (current !== null) {
            result += current.getData() + " | ";
            current = current.next;
        }
        console.log(result);
    }
}
export const trouxa = new TrouxaPilha();
