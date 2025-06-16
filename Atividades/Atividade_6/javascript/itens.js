export class Itens {
    constructor(nome, quantidade) {
        this.info = () => {
            const informacao = `${this.nome}, x${this.quantidade}`;
            return informacao;
        };
        this.nome = nome;
        this.quantidade = quantidade;
    }
}
export const pedregulho = new Itens('Pedregulho', 64);
export const pickaxe_sword = new Itens('Picareta de Ferro', 1);
export const Inventario = [];
