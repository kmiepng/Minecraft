class Node {
    constructor(item, prev = null, next = null) {
        this.item = item;
        this.prev = prev;
        this.next = next;
    }
    getData() {
        return this.item.info_item();
    }
}
export class FilacomNode {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    add_item(item) {
        const newItem = new Node(item);
        if (this.tail === null) {
            this.head = this.tail = newItem;
        }
        else {
            newItem.next = this.tail;
            this.tail.prev = newItem;
            this.tail = newItem;
        }
        this.size++;
    }
    remove_item() {
        if (this.head === null) {
            console.log('Não há mais item no funil');
            return null;
        }
        const data = this.head.getData();
        this.head = this.head.prev;
        if (this.head !== null) {
            this.head.next = null;
        }
        else {
            this.tail = null;
        }
        this.size--;
        return data;
    }
    print() {
        let current = this.head;
        let result = '';
        while (current !== null) {
            result += current.getData();
            if (current.next !== null)
                result += '|';
            current = current.next;
        }
        return result;
    }
    peek() {
        if (this.head === null) {
            console.log("");
            return null;
        }
        return this.head.getData();
    }
    toArray() {
        const result = this.print().split("|");
        return result;
    }
}
export class FilaDeque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    addFront(element) {
        if (this.isEmpty()) {
            this.addBack(element);
        }
        else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        }
        else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1];
            }
            this.count++;
            this.items[0] = element;
        }
    }
    addBack(element) {
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
        objString += ' |';
        return objString;
    }
}
//# sourceMappingURL=filas.js.map