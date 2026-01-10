interface Array<T> {
  snail(rowsCount: number, colsCount: number): number[][];
}

Array.prototype.snail = function (
  rowsCount: number,
  colsCount: number
): number[][] {
  if (this.length !== rowsCount * colsCount) return [];
  if (rowsCount === 1) return [this];
  const store = [];

  for (let i = 0; i < colsCount; i++) {
    store.push(this.slice(i * rowsCount, i * rowsCount + rowsCount));
  }

  const final = [];
  for (let i = 0; i < rowsCount; i++) {
    final.push(
      store.map((arr, index) => {
        if (index % 2 === 0) {
          return arr[i];
        } else {
          return arr[arr.length - 1 - i];
        }
      })
    );
  }
  return final;
};

/**
 * const arr = [1,2,3,4];
 * arr.snail(1,4); // [[1,2,3,4]]
 */
