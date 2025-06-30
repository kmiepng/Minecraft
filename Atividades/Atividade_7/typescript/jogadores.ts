import { Inventario } from "./itens";

// Construct Single Node
class NodeInventario {
    jogador : string
    data : Inventario;
    next : NodeInventario | null
  constructor(jogador : string, data : Inventario, next : (NodeInventario | null) = null) {
    this.jogador = jogador;
    this.data = data;
    this.next = next;
  }
}
//lista ligada que recebe os sets(inventários) dos jogadores e o nome
export class Jogadores {
  head : NodeInventario | null;
  size : number;
  constructor() {
    this.head = null;
    this.size = 0;
  }
  // Insert first node
  insertFirst(nome : string, data : Inventario) {
    this.head = new NodeInventario(nome, data, this.head);
    this.size++;
  }

  // Insert last node
  insertLast(nome : string, data : Inventario) {
    let node = new NodeInventario(nome, data);
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
  insertAt(nome : string, data : Inventario, index : number) {
    //  If index is out of range
    if (index > 0 && index > this.size) {
      return;
    }

    // If first index
    if (index === 0) {
      this.insertFirst(nome, data);
      return;
    }

    const node = new NodeInventario(nome, data);
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
      this.head = current.next;
    } else {
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
      console.log(`Inventário de ${current.jogador}:`);
      console.log(current.data.toString())
      current = current.next;
    }
  }
}