export function bubblesort(arr : any[]){
    let n = arr.length;
    // Outer loop: Iterate over the entire array
    for (let i = 0; i < n - 1; i++) {
    // Flag to detect if any swapping happened
        let swapped = false;

        // Inner loop: Traverse the array from 0 to n-i-1
        // After each pass, the largest element is placed at the end
        for (let j = 0; j < n - i - 1; j++) {
        // Compare adjacent elements and swap if they're in the wrong order
        const compareNomes = arr[j].nome.localeCompare(arr[j + 1].nome, 'pt-BR');
        if (
            compareNomes > 0 ||
            (compareNomes === 0 && arr[j].quantidade > arr[j + 1].quantidade)
          ) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }    
        // Mark that a swap occurred
        swapped = true;
      }

    // If no elements were swapped, the array is already sorted, so break early
    if (!swapped) {
      break;
    }
  }
  return arr;
}