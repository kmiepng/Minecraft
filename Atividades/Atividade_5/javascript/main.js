"use strict";
const bubblesort_1 = require("./bubblesort");
const mergesort_1 = require("./mergesort");
const gerar_listas_1 = require("./gerar_listas");
const testeSort_1 = require("./testeSort");
const search_1 = require("./search");
const auto_1 = __importDefault(require("chart.js/auto"));
//Criando o inventário e arrays para armazenar dados
const tamArray = [100, 500, 1000, 5000, 10000];
let Inventario = [];
const bubbleTimes = [];
const mergeTimes = [];
const binaryTimes = [];
const linearTimes = [];
//Saída no terminal
for (const tam of tamArray) {
    (0, gerar_listas_1.gerarRecursosAleatorios)(Inventario, tam);
    console.log(`Tamanho do array: ${tam}`);
    bubbleTimes.push((0, testeSort_1.testSort)("BubbleSort", bubblesort_1.bubblesort, Inventario));
    mergeTimes.push((0, testeSort_1.testSort)("Mergesort", mergesort_1.mergeSort, Inventario));
    binaryTimes.push((0, testeSort_1.testSearch)("Binary Search", search_1.binarySearch, Inventario, "Carvão"));
    linearTimes.push((0, testeSort_1.testSearch)("Linear Search", search_1.linearSearch, Inventario, "Carvão"));
}
const sort = document.getElementById("sortingChart");
new auto_1.default(sort, {
    type: "line",
    data: {
        labels: tamArray,
        datasets: [
            {
                label: "BubbleSort",
                data: bubbleTimes,
                borderColor: "rgb(255, 99, 132)",
                fill: false,
            },
            {
                label: "MergeSort",
                data: mergeTimes,
                borderColor: "rgb(54, 162, 235)",
                fill: false,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Comparação de Algoritmos de Ordenação",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Tamanho do Array",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Tempo de processamento",
                },
            },
        },
    },
});
const ctx = document.getElementById("searchingChart");
new auto_1.default(ctx, {
    type: "line",
    data: {
        labels: tamArray,
        datasets: [
            {
                label: "Binary Search",
                data: binaryTimes,
                borderColor: "rgb(255, 99, 132)",
                fill: false,
            },
            {
                label: "Linear Search",
                data: linearTimes,
                borderColor: "rgb(54, 162, 235)",
                fill: false,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Comparação de Algoritmos de Busca",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Tamanho do Array",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Tempo de processamento",
                },
            },
        },
    },
});
//# sourceMappingURL=main.js.map