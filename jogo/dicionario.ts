import { LinkedList, defaultToString, ValuePair } from './utils';
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
    /*Nesse caso, como um item pode criar diversos blocos
    é mais fácil eu deixar o valor como uma linked list do que adicionar a lista inteira de uma vez*/
    set(key : any, value : any) {
        if (key != null && value != null) {
        const tableKey = this.toStrFn(key);
        //Mudança que fiz para o método set
        //this.table[tableKey] = new ValuePair(key, value);
        if (this.table[tableKey] == null){
            this.table[tableKey] = new LinkedList()
        }
        this.table[tableKey].insertLast(new ValuePair(tableKey, value));
        return true;
        } //alterar a implementação do set
        return false;
    }
    get(key : any) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.toStringLinkedList();
    }
    hasKey(key : any) {
        return this.table[this.toStrFn(key)] != null;
    }
    remove(key : any) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    values() {
        return this.keyValues().map((valuePair : any) => valuePair.value);
    }
    keys() {
        return this.keyValues().map((valuePair : any) => valuePair.key);
    }
    keyValues() : any {
        return Object.values(this.table);
    }
    forEach(callbackFn : any) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            let current = valuePairs[i].head
            let result : any = ''
            while(current){
                result += callbackFn(current.data.key, current.data.value);
                current = current.next
            }
            if (result === false) {
                break;  
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
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toStringLinkedList()}`;
        for (let i = 1; i < valuePairs.length; i++) {
            objString += `${valuePairs[i].toStringLinkedList()}`;
        }
        return objString;
    }
}