// Type definition: A multidimensional array can contain numbers or nested arrays of itself
// This recursive type allows for infinite nesting: [1, [2, [3, [4]]]]
type MultidimensionalArray = (MultidimensionalArray | number)[];

/**
 * Generator function that flattens a nested array structure using inorder traversal
 *
 * How it works:
 * 1. Generator functions (function*) can pause execution and yield values one at a time
 * 2. This allows us to flatten nested arrays without creating intermediate arrays
 * 3. Memory efficient - yields values on-demand rather than storing all at once
 */
function* inorderTraversal(
  arr: MultidimensionalArray,
): Generator<number, void, unknown> {
  // Iterate through each element in the current array level
  for (let element of arr) {
    // Check if the current element is itself an array (nested structure)
    if (Array.isArray(element)) {
      // yield* delegates to another generator function
      // This recursively flattens the nested array and yields all its values
      // The asterisk (*) means "yield all values from this generator"
      // Think of it as: for each value that inorderTraversal(element) yields, yield it here too
      yield* inorderTraversal(element);
    } else {
      // Base case: element is a number, not an array
      // Yield this value back to the caller
      // The generator pauses here until next() is called again
      yield element;
    }
  }
}

/**
 * const gen = inorderTraversal([1, [2, 3]]);
 * gen.next().value; // 1
 * gen.next().value; // 2
 * gen.next().value; // 3
 */
