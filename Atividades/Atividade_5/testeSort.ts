//Função teste, com o tempo gasto para processar cada sort incluso
export function testSort(name: string, sortFunc: (arr: number[]) => number[], data: any[]) {
  const startTime = performance.now();
  const sorted = sortFunc(data);
  const endTime = performance.now();

  console.log(`\n=== ${name} ===`);
  console.log(`Tempo: ${(endTime - startTime).toFixed(3)} ms`);
  return endTime - startTime
}

export function testSearch(name: string, searchFunc: (arr: any[], target : any) => any, data: any[], target : any) {
  const startTime = performance.now();
  const search = searchFunc(data, target);
  const endTime = performance.now();

  console.log(`\n=== ${name} ===`);
  console.log(`Tempo: ${(endTime - startTime).toFixed(3)} ms`);
  return endTime - startTime
}
