import { Inventario } from "./itens";

// Construct Single Node
class NodeInventario {
    data : Inventario;
    next : Inventario | null
  constructor(data : Inventario, next : (Inventario | null) = null) {
    this.data = data;
    this.next = next;
  }
}

class Jogadores {
  head : NodeInventario | null;
  size : number;
  constructor() {
    this.head = null;
    this.size = 0;
  }
  // Insert first node
  insertFirst(data : Inventario) {
    this.head = new NodeInventario(data, this.head);
    this.size++;
  }

  // Insert last node
  insertLast(data : Inventario) {
    let node = new NodeInventario(data);
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
  insertAt(data : Inventario, index : number) {
    //  If index is out of range
    if (index > 0 && index > this.size) {
      return;
    }

    // If first index
    if (index === 0) {
      this.insertFirst(data);
      return;
    }

    const node = new NodeInventario(data);
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
      console.log(current.data);
      current = current.next;
    }
  }
}