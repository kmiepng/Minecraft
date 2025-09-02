import { defaultToString, ValuePair } from './utils';
//O dicionário será usado como uma 'wiki' para ver a lista de 'crafting' dos itens disponíveis
export class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    //O valor da chave agora é um array
    //Estou utilizando o mesmo método para evitar colisão de HashTable
    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);
            //Mudança que fiz para o método set
            if (this.table[tableKey] == null) {
                this.table[tableKey] = [];
            }
            this.table[tableKey].push(new ValuePair(tableKey, value));
            return true;
        }
        return false;
    }
    get(key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair;
    }
    hasKey(key) {
        return this.table[this.toStrFn(key)] != null;
    }
    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    values() {
        return this.keyValues().map((valuePair) => valuePair.value);
    }
    keys() {
        return this.keyValues().map((valuePair) => valuePair.key);
    }
    keyValues() {
        return Object.values(this.table);
    }
    forEach(callbackFn) {
        const valueArrays = this.keyValues(); // Pega todos os arrays de ValuePair
        for (const valueArray of valueArrays) { // Itera sobre cada array
            for (const valuePair of valueArray) { // Itera sobre cada ValuePair dentro do array
                const result = callbackFn(valuePair.key, valuePair.value);
                if (result === false) { // Permite interromper a iteração
                    return;
                }
            }
        }
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return Object.keys(this.table).length;
    }
    clear() {
        this.table = {};
    }
    toStringMap() {
        if (this.isEmpty()) {
            return '';
        }
        const valueArrays = this.keyValues();
        let objString = '';
        valueArrays.forEach(valueArray => {
            // Pega a chave do primeiro item (todos na lista interna compartilham a mesma chave de hash)
            const key = valueArray[0].key;
            // Mapeia os valores para uma string
            const valuesStr = valueArray.map(pair => pair.value).join(', ');
            objString += `${key.info()} => [${valuesStr}]`;
        });
        return objString;
    }
}
//# sourceMappingURL=dicionario.js.map