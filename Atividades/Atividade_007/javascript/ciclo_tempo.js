class Nodee {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
    getData() {
        return this.data;
    }
}
//lista ligada circular de duas vias
export class CicloDia {
    constructor() {
        this.head = null;
    }
    adicionar(horario) {
        const novo = new Nodee(horario);
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
    remover(horario) {
        if (!this.head)
            return;
        let atual = this.head;
        do {
            if (atual.data === horario) {
                if (atual.next === atual) {
                    // só um elemento
                    this.head = null;
                }
                else {
                    atual.prev.next = atual.next;
                    atual.next.prev = atual.prev;
                    if (atual === this.head) {
                        this.head = atual.next;
                    }
                }
                return;
            }
            atual = atual.next;
        } while (atual !== this.head);
    }
    // mostra a lista de horario em ordem
    print() {
        if (!this.head)
            return;
        let info = '| ';
        let atual = this.head;
        do {
            info += (atual.data + ' | ');
            atual = atual.next;
        } while (atual !== this.head);
        return info;
    }
}
