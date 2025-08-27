//classe de itens
export class Itens {
    constructor(nome, quantidade, tipo) {
        this.nome = nome; //nome do item, ex: Picareta de Ferro
        this.quantidade = quantidade; //quantos itens tem em um stack
        this.tipo = tipo; // tipo do item, ex: Ferramenta
    }
    //função para pegar informação do item
    informacao_item() {
        let informacao;
        informacao = `${this.nome}, x${this.quantidade}`;
        return informacao;
    }
}
//inventario como conjunto
export class Inventario {
    constructor() {
        this.inventario = {};
    }
    add(element) {
        if (!this.has(element)) {
            this.inventario[element.nome] = element;
            return true;
        }
        return false;
    }
    delete(element) {
        if (this.has(element)) {
            delete this.inventario[element.nome];
            return true;
        }
        return false;
    }
    has(element) {
        return Object.prototype.hasOwnProperty.call(this.inventario, element);
    }
    values() {
        return Object.values(this.inventario);
    }
    //não alterei a função pois funcionou normalmente para os mesmos objetos criados
    bau_comunitario(otherSet) {
        const unionInventario = new Inventario();
        this.values().forEach(value => unionInventario.add(value));
        otherSet.values().forEach(value => unionInventario.add(value));
        return unionInventario;
    }
    //fiz uma alteração para fazer interseção pelo tipo do item
    bau_filtrado(otherSet, filtro) {
        const intersectionSet = new Inventario();
        const values = this.values();
        const otherValues = otherSet.values();
        let biggerSet = values;
        let smallerSet = otherValues;
        if (otherValues.length - values.length > 0) {
            biggerSet = otherValues;
            smallerSet = values;
        }
        //aqui fiz uma operação de custo O(n²) para poder fazer oq eu queria direitinho
        for (let i = 0; i < smallerSet.length; i++) {
            for (let j = 0; j < biggerSet.length; j++) {
                const smallerValue = smallerSet[i];
                const biggerValue = biggerSet[j];
                //aparece como erro pq o tipo de values é unknown, mas a operação funciona
                if ((smallerValue.tipo === filtro) && (biggerValue.tipo === filtro)) {
                    if (smallerValue.nome === biggerValue.nome) {
                        intersectionSet.add(smallerValue);
                    }
                    else {
                        intersectionSet.add(smallerValue);
                        intersectionSet.add(biggerValue);
                    }
                }
            }
        }
        return intersectionSet;
    }
    //verifico pelo nome se o item é o mesmo ou não
    //aparece como erro pq o valor de value é unknown pro transpilador, mas funciona direitinho
    diferenca_inventarios(otherSet) {
        const differenceSet = new Inventario();
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
        this.inventario = {};
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
    verificarTipo(filtro) {
        const IsTipo = this.values().every(item => item.tipo === filtro);
        return IsTipo;
    }
}
