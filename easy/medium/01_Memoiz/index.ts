type Fn = (...params: number[]) => number;

function memoize(fn: Fn): Fn {
  let mem: Record<string, number> = {};
  return function (...args) {
    const argKey = JSON.stringify(args);
    if (argKey in mem) return mem[argKey];
    const result = fn(...args);
    mem[argKey] = result;
    return result;
  };
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */
