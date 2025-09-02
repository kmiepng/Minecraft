import { defaultToString, ValuePair } from "./utils";
export class HashTable {
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
            if (this.table[position] == null ||
                (this.table[position] != null && this.table[position].isDeleted)) {
                this.table[position] = new ValuePair(key, value);
            }
            else {
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
    //Verificação do estado do jogador
    get(key) {
        const position = this.hashCode(key);
        if (this.table[position] != null) {
            if (this.table[position].key === key && !this.table[position].isDeleted) {
                return this.table[position].value;
            }
            let index = position + 1;
            while (this.table[index] != null &&
                (this.table[index].key !== key || this.table[index].isDeleted)) {
                if (this.table[index].key === key && this.table[index].isDeleted) {
                    return undefined;
                }
                index++;
            }
            if (this.table[index] != null &&
                this.table[index].key === key &&
                !this.table[index].isDeleted) {
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
            while (this.table[index] != null &&
                (this.table[index].key !== key || this.table[index].isDeleted)) {
                index++;
            }
            if (this.table[index] != null &&
                this.table[index].key === key &&
                !this.table[index].isDeleted) {
                this.table[index].isDeleted = true;
                return true;
            }
        }
        return false;
    }
    size() {
        return Object.keys(this.table).length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    setPvpState(key, isPvpEnabled) {
        const position = this.hashCode(key);
        if (this.table[position] != null) {
            // Verifica a posição original do hash
            if (this.table[position].key === key && !this.table[position].isDeleted) {
                // Encontrou o jogador, agora altera o estado do PvP
                this.table[position].value.pvpEnabled = isPvpEnabled;
                return true; // Sucesso
            }
            // Se não estiver na posição original, procura nas próximas (sondagem linear)
            let index = position + 1;
            while (this.table[index] != null &&
                (this.table[index].key !== key || this.table[index].isDeleted)) {
                index++;
            }
            // Verifica se encontrou o jogador após a sondagem
            if (this.table[index] != null &&
                this.table[index].key === key &&
                !this.table[index].isDeleted) {
                // Encontrou o jogador, agora altera o estado do PvP
                this.table[index].value.pvpEnabled = isPvpEnabled;
                return true; // Sucesso
            }
        }
        // Se o loop terminar e não encontrar o jogador
        return false; // Jogador não encontrado
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]} => ${this.table[keys[0]].pvpEnabled}}`;
        for (let i = 1; i < keys.length; i++) {
            objString = `${objString},{${keys[i]} => ${this.table[keys[i]].pvpEnabled}}`;
        }
        return objString;
    }
}
//# sourceMappingURL=hashTable.js.map