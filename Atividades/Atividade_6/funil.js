"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funil = void 0;
var Node = /** @class */ (function () {
    function Node(item, prev, next) {
        if (prev === void 0) { prev = null; }
        if (next === void 0) { next = null; }
        this.item = item;
        this.prev = prev;
        this.next = next;
    }
    Node.prototype.getData = function () {
        var info = "".concat(this.item.nome, ", x").concat(this.item.quantidade);
        return this.item;
    };
    return Node;
}());
var Funil = /** @class */ (function () {
    function Funil() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    Funil.prototype.add_item = function (item) {
        var newItem = new Node(item);
        if (this.tail === null) {
            this.head = this.tail = newItem;
        }
        else {
            newItem.next = this.tail;
            this.tail.prev = newItem;
            this.tail = newItem;
        }
        this.size++;
    };
    Funil.prototype.remove_item = function () {
        if (this.head === null) {
            console.log('Não há mais item no funil');
            return null;
        }
        var data = this.head.getData();
        this.head = this.head.prev;
        if (this.head !== null) {
            this.head.next = null;
        }
        else {
            this.tail = null;
        }
        this.size--;
        return data;
    };
    Funil.prototype.print = function () {
        var current = this.head;
        var result = 'Começo';
        while (current !== null) {
            result += current.getData();
            if (current.next !== null)
                result += ' <- ';
            current = current.next;
        }
        result += 'Fim';
        console.log(result);
    };
    return Funil;
}());
exports.Funil = Funil;
