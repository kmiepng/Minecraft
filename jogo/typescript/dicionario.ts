import { defaultToString, ValuePair } from './utils';
//O dicionário será usado como uma 'wiki' para ver a lista de 'crafting' dos itens disponíveis
export class Dictionary {
    //O construtor se mantem o mesmo
    toStrFn : typeof defaultToString
    table : any
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    //O valor da chave agora é um array
    //Estou utilizando o mesmo método para evitar colisão de HashTable
    set(key : any, value : any) : boolean{
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
    get(key : any) : (ValuePair[] | undefined) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair;
    }
    hasKey(key : any) : boolean {
        return this.table[this.toStrFn(key)] != null;
    }
    remove(key : any) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    values() : any[]{
        return this.keyValues().map((valuePair : any) => valuePair.value);
    }
    keys() : string[] {
        return this.keyValues().map((valuePair : any) => valuePair.key);
    }
    keyValues() : ValuePair[][] {
        return Object.values(this.table);
    }
    forEach(callbackFn: (key: any, value: any) => any): void {
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