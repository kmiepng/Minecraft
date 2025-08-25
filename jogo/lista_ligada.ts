import { Itens } from "./itens";

//Essa LinkedList duplamente ligada será usada para mostrar o ciclo do dia do jogo
class Nodee{
    data : string;
    prev : Nodee | null;
    next : Nodee | null;
    constructor(data : string){
        this.data = data;
        this.prev = null;
        this.next = null;
    }
    getData(){
        return this.data;
    }
}
export class ListaLigadaCircularDuasVias {
    head : Nodee | null;
    constructor() {
        this.head = null;
    }
    adicionar(horario : string) {
        const novo = new Nodee(horario);
        if (!this.head) {
            novo.next = novo;
            novo.prev = novo;
            this.head = novo;
        } else {
            const ultimo = this.head.prev;
            // conecta novo entre o último e o head
            novo.next = this.head;
            novo.prev = ultimo;

            this.head.prev = novo;
            ultimo!.next = novo;
        }
    }
    remover(horario : string) {
        if (!this.head) return;
        let atual : (Nodee | null)= this.head;
        do {
            if (atual?.data === horario) {
                if (atual.next === atual) {
                    // Só um elemento
                    this.head = null;
                } else {
                    atual.prev!.next = atual.next;
                    atual.next!.prev = atual.prev;
                    if (atual === this.head) {
                        this.head = atual.next;
                    }
                }
                return;
            }
            atual = atual!.next;
        } while (atual !== this.head);
    }

    // Mostra a lista de horarios em ordem
    print() {
        if (!this.head) return;

        let info = '| ';
        let atual : (Nodee | null) = this.head;
        do {
            info += (atual?.data + ' | ');
            atual = atual!.next;
        } while (atual !== this.head);

        return info;
    }
}
//Lista ligada com sets
class Bau {
    inventario: Itens[]
    constructor() {
        this.inventario = [];
    }
    add(element : any) {
        if (!this.has(element)) {
            this.inventario[element.nome] = element;
            return true;                                                                        
        }
        return false;
    }
    delete(element : any) {
        if (this.has(element)) {
            delete this.inventario[element.nome];
            return true;
        }
        return false;
    }
    has(element : any) {
        return Object.prototype.hasOwnProperty.call(this.inventario, element);
    }
    values() {
        return Object.values(this.inventario);
    }
    //não alterei a função pois funcionou normalmente para os mesmos objetos criados
    bau_comunitario(otherSet : Bau) {
        const unionInventario = new Bau();
        this.values().forEach(value => unionInventario.add(value));
        otherSet.values().forEach(value => unionInventario.add(value));
        return unionInventario;
    }
    //fiz uma alteração para fazer interseção pelo tipo do item
    bau_filtrado(otherSet : Bau, filtro : string) {
        const intersectionSet = new Bau();
        const values = this.values();
        const otherValues = otherSet.values();
        let biggerSet = values;
        let smallerSet = otherValues;
        if (otherValues.length - values.length > 0) {
            biggerSet = otherValues;
            smallerSet = values;
        }
        //aqui fiz uma operação de custo O(n²) para poder fazer oq eu queria direitinho
        for (let i = 0; i < smallerSet.length; i++){
            for (let j = 0; j < biggerSet.length; j++){
                const smallerValue = smallerSet[i];
                const biggerValue = biggerSet[j];
                //aparece como erro pq o tipo de values é unknown, mas a operação funciona
                if ((smallerValue.tipo=== filtro)&&(biggerValue.tipo === filtro)){
                    if (smallerValue.nome === biggerValue.nome){
                        intersectionSet.add(smallerValue);
                    } else {
                        intersectionSet.add(smallerValue);
                        intersectionSet.add(biggerValue)
                    }
                }
            }
        }
        return intersectionSet;
    }
    //verifico pelo nome se o item é o mesmo ou não
    //aparece como erro pq o valor de value é unknown pro transpilador, mas funciona direitinho
    diferenca_inventarios(otherSet : Bau) {
        const differenceSet = new Bau();
        this.values().forEach(value => {
        if (!otherSet.has(value.nome)) {
            differenceSet.add(value);
        }
        });
        return differenceSet;
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return Object.keys(this.inventario).length;
    }
    clear() {
        this.inventario = [];
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const values = this.values();
        //aqui aparece como erro mas é pq o tipo de values é unknown, mas funciona direitinho o que eu quero
        let objString = `${values[0].nome}, x${values[0].quantidade}`;
        for (let i = 1; i < values.length; i++) {
            objString = `${objString} | ${values[i].nome}, x${values[i].quantidade}`;
        }
        return objString;
    }
    verificarTipo(filtro : string){
        const IsTipo = this.values().every(item => item.tipo === filtro)
        return IsTipo
    }
}
// Construct Single Node
class NodeInventario {
    jogador : string
    data : Bau;
    next : NodeInventario | null
  constructor(jogador : string, data : Bau, next : (NodeInventario | null) = null) {
    this.jogador = jogador;
    this.data = data;
    this.next = next;
  }
}
//lista ligada que recebe os sets(baús) dos jogadores e o nome
export class Jogadores {
  head : NodeInventario | null;
  size : number;
  constructor() {
    this.head = null;
    this.size = 0;
  }
  // Insert first node
  insertFirst(nome : string, data : Bau) {
    this.head = new NodeInventario(nome, data, this.head);
    this.size++;
  }

  // Insert last node
  insertLast(nome : string, data : Bau) {
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
  insertAt(nome : string, data : Bau, index : number) {
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