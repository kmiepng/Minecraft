import { Itens } from './itens'
import { bubblesort } from './bubblesort';
import { mergeSort } from './mergesort';
import { gerarRecursosAleatorios } from './gerar_listas';
import { testSearch, testSort } from './testeSort';
import { binarySearch, linearSearch } from './search';
import ('chart.js/auto')

//Criando o inventário e arrays para armazenar dados
const tamArray = [100, 500, 1000, 5000, 10000];
let Inventario : Itens[] = []
const bubbleTimes: number[] = [];
const mergeTimes: number[] = [];
const binaryTimes: number[] = [];
const linearTimes: number[] = [];

//Saída no terminal
for (const tam of tamArray){
    gerarRecursosAleatorios(Inventario, tam);
    
    console.log(`Tamanho do array: ${tam}`);
    bubbleTimes.push(testSort("BubbleSort", bubblesort, Inventario));
    mergeTimes.push(testSort("Mergesort", mergeSort, Inventario));
    binaryTimes.push(testSearch("Binary Search", binarySearch, Inventario, "Carvão"));
    linearTimes.push(testSearch("Linear Search", linearSearch, Inventario, "Carvão"));
}

/*const sort = document.getElementById("sortingChart") as HTMLCanvasElement;
new Chart(sort, {
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

const ctx = document.getElementById("searchingChart") as HTMLCanvasElement;
new Chart(ctx, {
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
});*/