type Fn<T> = () => Promise<T>;

var promiseAll = function<T>(functions: Fn<T>[]): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    const results: T[] = new Array(functions.length);
    let completed = 0;

    functions.forEach((fn, i) => {
      fn()
        .then((value: T) => {
          results[i] = value;
          completed++;

          if (completed === functions.length) {
            resolve(results);
          }
        })
        .catch((error: unknown) => {
          reject(error);
        });
    });
  });
};



/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */