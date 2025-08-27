"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSort = testSort;
exports.testSearch = testSearch;
//Função teste, com o tempo gasto para processar cada sort incluso
function testSort(name, sortFunc, data) {
    const startTime = performance.now();
    const sorted = sortFunc(data);
    const endTime = performance.now();
    return endTime - startTime;
}
function testSearch(name, searchFunc, data, target) {
    const startTime = performance.now();
    const search = searchFunc(data, target);
    const endTime = performance.now();
    return endTime - startTime;
}
//# sourceMappingURL=testeSort.js.map