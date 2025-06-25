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
export const cobblestone = new Itens('Pedregulho', 64)
export const diamant = new Itens('Diamante', 64)
export const gold = new Itens('Ouro', 64)
export const sword_d = new Itens('Espada de Diamante', 1)
export const coal = new Itens('Carvão', 64)
export const Inventario = [];
