//adicionar forEach para poder percorrer a lista ligada

export class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    info() {
        return `[#${this.key}: ${this.value}]\n`;
    }
}