import { defaultToString } from './util.js';
import { ValuePair } from './valuepair.js';
//Simulando um servidor
export default class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    //Função Hash para jogar os jogadores para um índice na tabela
    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    //O jogador entrou num servidor
    //Implementando o tratamento de colisão preguiçosa
    put(key, value) {
        if (key != null && value != null) {
        const position = this.hashCode(key);
            if (
                this.table[position] == null ||
                (this.table[position] != null && this.table[position].isDeleted)
                ) {
                this.table[position] = new ValuePair(key, value);
            } else {
                let index = position + 1;
                while (this.table[index] != null && !this.table[position].isDeleted) {
                    index++;
                }
                this.table[index] = new ValuePair(key, value);
            }
            return true;
        }
        return false;
    }
    //Verificação do inventário do jogador
    get(key) {
       const position = this.hashCode(key);
        if (this.table[position] != null) {
            if (this.table[position].key === key && !this.table[position].isDeleted) {
                return this.table[position].value;
            }
            let index = position + 1;
            while (
                this.table[index] != null &&
                (this.table[index].key !== key || this.table[index].isDeleted)
                ) {
                if (this.table[index].key === key && this.table[index].isDeleted) {
                    return undefined;
                }
                index++;
            }
            if (
                this.table[index] != null &&
                this.table[index].key === key &&
                !this.table[index].isDeleted
                ) {
                return this.table[position].value;
            }
        }
        return undefined;
    }
    //O jogador saiu do servidor
    remove(key) {
        const position = this.hashCode(key);
        if (this.table[position] != null) {
            if (this.table[position].key === key && !this.table[position].isDeleted) {
                this.table[position].isDeleted = true;
                return true;
            }
            let index = position + 1;
            while (
                this.table[index] != null &&
                (this.table[index].key !== key || this.table[index].isDeleted)
                ) {
                index++;
            }
            if (
                this.table[index] != null &&
                this.table[index].key === key &&
                !this.table[index].isDeleted
                ) {
                this.table[index].isDeleted = true;
                return true;
            }
        }
        return false;
    }
    size() {
        return Object.keys(this.table).length;
    }
}
