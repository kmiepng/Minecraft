"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binarySearch = binarySearch;
exports.linearSearch = linearSearch;
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    // Keep dividing the search space by half
    while (left <= right) {
        // Find the middle index
        let mid = Math.floor((left + right) / 2);
        // Check if the middle element is the target
        if (arr[mid].nome === target) {
            return mid; // Target found, return its index
        }
        // If target is smaller, ignore the right half
        if (arr[mid].nome > target) {
            right = mid - 1;
        }
        // If target is larger, ignore the left half
        else {
            left = mid + 1;
        }
    }
    // Target not found
    return -1;
}
function linearSearch(arr, target) {
    const n = arr.length;
    for (let i = 0; i < n; i++)
        if (arr[i].nome == target)
            return i;
    return -1;
}
//# sourceMappingURL=search.js.map