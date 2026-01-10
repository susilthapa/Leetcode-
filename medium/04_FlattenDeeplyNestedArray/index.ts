type MultiDimensionalArray = (number | MultiDimensionalArray)[];

var flat = function (
  arr: MultiDimensionalArray,
  n: number
): MultiDimensionalArray {
  const flatten: MultiDimensionalArray = [];

  if (n === 0) return arr;

  const recurr = (arr: MultiDimensionalArray | number, depth = 1): void => {
    if (Array.isArray(arr) && depth <= n) {
      const newDepth = depth + 1;
      arr.map((item) => recurr(item as MultiDimensionalArray, newDepth));
    } else {
      flatten.push(arr);
    }
  };
  arr.map((arrItem) => recurr(arrItem));
  return flatten;
};

/**
 * Simplified version
 *
 */
// type MultiDimensionalArray = (number | MultiDimensionalArray)[];

// var flat = function (arr: MultiDimensionalArray, n: number): MultiDimensionalArray {
//   if (n === 0) return arr;

//   return arr.flatMap((item) =>
//     Array.isArray(item) ? flat(item, n - 1) : item
//   );
// };
