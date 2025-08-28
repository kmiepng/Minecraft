export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

export const DOES_NOT_EXIST = -1;

export function defaultCompare(a : number, b : number) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export function swap(array : any[], a : any, b : any) {
  /* const temp = array[a];
  array[a] = array[b];
  array[b] = temp; */
  [array[a], array[b]] = [array[b], array[a]];
}
// export function reverseCompare(compareFn) {
//   return (a, b) => compareFn(b, a);
// }