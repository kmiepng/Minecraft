import { ItensPilha, Itens } from "./itens";

export class Pilha {
    count : number;
    items : ItensPilha[];
    constructor() {
        this.count = 0;
        this.items = [];
    }
    push(element : ItensPilha) {
        if (this.count === 64){
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
        this.items = [];
        this.count = 0;
    }
}

//Utilização de pilha com node para simular uma trouxa no Minecraft
class Node {
    data : Itens
    next : Node | null
    constructor(data : Itens, next : (Node | null) = null) {
        this.data = data;
        this.next = next;
    }   
    getData() {
        return this.data.info_item();
    }
}

export class TrouxaPilha {
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
            console.log("Trouxa está vazia");
            return null;
        }
        const poppedData = this.top;
        this.top = this.top.next;
        this.size--;
        return poppedData.data;
    }

    peek() {
        if (this.top === null) {
            console.log("Trouxa está vazia");
            return null;
        }
        return this.top.data;
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    mostrarTrouxa() {
        let current = this.top;
        let result = "Conteúdo da trouxa: ";
        if(current === null) return result + "[Vazia]";
        while (current !== null) {
            result += `- ${current.getData()}\n`;
            current = current.next;
        }
        return result;
    }
}
export class ItemTrouxa extends Itens {
    conteudo: TrouxaPilha;
    constructor() {
        // Inicializa como um item padrão do tipo 'Trouxa'
        super("Trouxa", 1, "Trouxa");
        this.conteudo = new TrouxaPilha();
    }
}