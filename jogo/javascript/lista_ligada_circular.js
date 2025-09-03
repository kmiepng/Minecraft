export class Nodee {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
    getData() {
        return this.data;
    }
}
export class ListaLigadaCircularDuasVias {
    constructor() {
        this.head = null;
    }
    adicionar(ciclo) {
        const novo = new Nodee(ciclo);
        if (!this.head) {
            novo.next = novo;
            novo.prev = novo;
            this.head = novo;
        }
        else {
            const ultimo = this.head.prev;
            // conecta novo entre o último e o head
            novo.next = this.head;
            novo.prev = ultimo;
            this.head.prev = novo;
            ultimo.next = novo;
        }
    }
    // Mostra a lista de horarios em ordem
    print() {
        if (!this.head)
            return;
        let info = '| ';
        let atual = this.head;
        do {
            info += ((atual === null || atual === void 0 ? void 0 : atual.data) + ' | ');
            atual = atual.next;
        } while (atual !== this.head);
        return info;
    }
}
//# sourceMappingURL=lista_ligada_circular.js.map