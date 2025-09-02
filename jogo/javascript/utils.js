export function defaultToString(item) {
    if (item === null) {
        return 'NULL';
    }
    else if (item === undefined) {
        return 'UNDEFINED';
    }
    else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.nome;
}
// Construct Single Node
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}
// Create/Get/Remove Nodes From Linked List
export class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    // Insert first node
    insertFirst(data) {
        this.head = new Node(data, this.head);
        this.size++;
    }
    // Insert last node
    insertLast(data) {
        let node = new Node(data);
        let current;
        // If empty, make head
        if (!this.head) {
            this.head = node;
        }
        else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }
    // Insert at index
    insertAt(data, index) {
        //  If index is out of range
        if (index > 0 && index > this.size) {
            return;
        }
        // If first index
        if (index === 0) {
            this.insertFirst(data);
            return;
        }
        const node = new Node(data);
        let current, previous;
        // Set current to first
        current = this.head;
        let count = 0;
        while (count < index) {
            previous = current; // Node before index
            count++;
            current = current.next; // Node after index
        }
        node.next = current;
        previous.next = node;
        this.size++;
    }
    // Get at index
    getAt(index) {
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
    removeAt(index) {
        if (index > 0 && index > this.size) {
            return;
        }
        /*
        if (index < 0 || index >= this.size) {
            return;
        }
        */
        let current = this.head;
        let previous;
        let count = 0;
        // Remove first
        if (index === 0) {
            this.head = current.next;
        }
        else {
            while (count < index) {
                count++;
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
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
            console.log(current.data);
            current = current.next;
        }
    }
    toStringLinkedList() {
        let current = this.head;
        let info = '';
        while (current) {
            info += current.data.info();
            current = current.next;
        }
        return info;
    }
}
export class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    info() {
        return `[#${this.key}: ${this.value}]\n`;
    }
}
export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
};
export const DOES_NOT_EXIST = -1;
export function lesserEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}
export function biggerEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}
export function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
export function defaultEquals(a, b) {
    return a === b;
}
export function swap(array, a, b) {
    /* const temp = array[a];
    array[a] = array[b];
    array[b] = temp; */
    [array[a], array[b]] = [array[b], array[a]];
}
export function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a);
}
export function defaultDiff(a, b) {
    return Number(a) - Number(b);
}
//# sourceMappingURL=utils.js.map