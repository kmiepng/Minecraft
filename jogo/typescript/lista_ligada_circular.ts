//Essa LinkedList duplamente ligada será usada para mostrar o ciclo do dia do jogo
// Interface para o nosso objeto de dados
export interface CicloDiario {
    nome: string;
    imagem: string;
    corFundo: string;
}
export class Nodee{
    data : CicloDiario;
    prev : Nodee | null;
    next : Nodee | null;
    constructor(data : CicloDiario){
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
    adicionar(ciclo : CicloDiario) {
        const novo = new Nodee(ciclo);
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