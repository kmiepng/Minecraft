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
        const info = `${this.item.nome}, x${this.item.quantidade}`
        return this.item;
    }
}

export class Funil {
    head : Node | null;
    tail : Node | null;
    size : number;
    constructor(){
        this.head = null
        this.tail = null
        this.size = 0
    }
    add_item(item : Itens){
        const newItem = new Node(item)
        if (this.tail === null){
            this.head = this.tail = newItem
        } else {
            newItem.next = this.tail;
            this.tail.prev = newItem;
            this.tail = newItem
        }
        this.size++;
    }
    remove_item(){
        if (this.head === null){
            console.log('Não há mais item no funil')
            return null;
        }
        const data = this.head.getData();
        this.head = this.head.prev;

        if (this.head!==null) {
            this.head.next = null;
        } else {
            this.tail = null
        }
        this.size--
        return data
    }
    print(){
        let current = this.head;
        let result = 'Começo'
        while (current !== null){
            result += current.getData()
            if (current.next !== null) result += ' <- '
            current = current.next
        }
        result += 'Fim';
        console.log(result)
    }
}