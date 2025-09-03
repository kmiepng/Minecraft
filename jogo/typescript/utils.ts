export function defaultToString(item : any) {
    if (item === null) {
        return 'NULL';
    } else if (item === undefined) {
        return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    // Para objetos, usamos JSON.stringify para garantir uma chave única
    return JSON.stringify(item);
}
// Construct Single Node
class Node {
    data : any
    next : any
    constructor(data : any, next : any = null) {
        this.data = data;
        this.next = next;
    }
}
// Classe auxiliar para armazenar pares de chave-valor
export class ValuePair<K, V> {
    public isDeleted?: boolean;
    constructor(public key: K, public value: V) {  this.isDeleted = false;}
}
export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
};
export const DOES_NOT_EXIST = -1;
export function lesserEquals(a : any, b : any, compareFn : any) {
    const comp = compareFn(a, b);
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}
export function biggerEquals(a : any, b : any, compareFn : any) {
    const comp = compareFn(a, b);
    return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}
export function defaultCompare(a : any, b : any) {
    if (a === b) {
    return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
export function defaultEquals(a : any, b : any) {
    return a === b;
}
export function swap(array : any[], a : any, b : any) {
    /* const temp = array[a];
    array[a] = array[b];
    array[b] = temp; */
    [array[a], array[b]] = [array[b], array[a]];
}
export function reverseCompare(compareFn : any) {
    return (a : any, b : any) => compareFn(b, a);
}
export function defaultDiff(a : any, b : any) {
    return Number(a) - Number(b);
}