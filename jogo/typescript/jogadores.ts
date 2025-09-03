import { Bau } from "./lista_ligada_sets";
import { Inventario } from "./inventario";
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
    pvpEnabled : boolean;
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
    find(playerName: string): Bau | null {
        let current = this.head;
        while(current) {
            if (current.jogador === playerName) {
                return current.data;
            }
            current = current.next;
        }
        return null;
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