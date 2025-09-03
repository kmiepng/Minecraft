import { defaultToString, ValuePair } from "./utils";
import { Jogador } from "./jogadores";

export class HashTable<K, V> {
    private toStrFn: (key: K) => string;
    protected table: { [key: number]: ValuePair<K, V> };

    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn as (key: K) => string;
        this.table = {};
    }
    //Função Hash para jogar os jogadores para um índice na tabela
    private loseloseHashCode(key: K): number {
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
    private hashCode(key: K): number {
        return this.loseloseHashCode(key);
    }
    //O jogador entrou num servidor
    //Implementando o tratamento de colisão preguiçosa
    put(key: K, value: V): boolean {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            // Se a posição está livre ou foi liberada (lazy deletion), podemos inserir.
            if (this.table[position] == null || this.table[position].isDeleted) {
                this.table[position] = new ValuePair(key, value);
            } else {
                // Se a posição está ocupada, procuramos a próxima livre (sondagem linear).
                let index = position + 1;
                while (this.table[index] != null && !this.table[index].isDeleted) {
                    index++;
                }
                this.table[index] = new ValuePair(key, value);
            }
            return true;
        }
        return false;
    }
    //Verificação do estado do jogador
    get(key: K): V | undefined {
        const position = this.hashCode(key);

        if (this.table[position] != null) {
            // Verifica a posição original
            if (this.table[position].key === key && !this.table[position].isDeleted) {
                return this.table[position].value;
            }
            // Se não encontrou, inicia a sondagem linear
            let index = position + 1;
            // O loop continua enquanto houver itens e a chave não for a correta OU o item estiver deletado
            while (this.table[index] != null && (this.table[index].key !== key || this.table[index].isDeleted)) {
                index++;
            }
            // Após o loop, verifica se encontramos um item válido
            if (this.table[index] != null && this.table[index].key === key && !this.table[index].isDeleted) {
                return this.table[index].value;
            }
        }
        return undefined; // Não encontrou
    }
    //O jogador saiu do servidor
    remove(key: K): boolean {
        const position = this.hashCode(key);

        if (this.table[position] != null) {
            // Lógica de busca idêntica ao 'get'
            if (this.table[position].key === key && !this.table[position].isDeleted) {
                this.table[position].isDeleted = true; // Apenas marca como removido
                return true;
            }
            let index = position + 1;
            while (this.table[index] != null && (this.table[index].key !== key || this.table[index].isDeleted)) {
                index++;
            }
            if (this.table[index] != null && this.table[index].key === key && !this.table[index].isDeleted) {
                this.table[index].isDeleted = true; // Apenas marca como removido
                return true;
            }
        }
        return false; // Não encontrou
    }
    size() {
        return Object.keys(this.table).length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    setPvpState(key: K, isPvpEnabled: boolean): boolean {
        const player = this.get(key) as Jogador | undefined;
        if (player) {
            player.pvpEnabled = isPvpEnabled;
            return true;
        }
        return false;
    }
    getValues(): V[] {
        const values: V[] = [];
        Object.values(this.table).forEach(pair => {
            if (pair && !pair.isDeleted) {
                values.push(pair.value);
            }
        });
        return values;
    }
}