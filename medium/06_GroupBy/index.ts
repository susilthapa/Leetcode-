interface Array<T> {
  groupBy(fn: (item: T) => string): Record<string, T[]>;
}

Array.prototype.groupBy = function <T>(fn: (item: T) => string | number) {
  const result = Object.create(null) as Record<string, T[]>;

  for (let i = 0; i < this.length; i++) {
    const item = this[i];
    const key = fn(item);
    const bucket = result[key];

    if (bucket === undefined) {
      result[key] = [item];
    } else {
      bucket.push(item);
    }
  }

  return result;
};

// Solution 2

// interface Array<T> {
//   groupBy(fn: (item: T) => string): Record<string, T[]>;
// }

// Array.prototype.groupBy = function (fn) {
//   const result: Record<string, Array<any>> = {};

//   for (const item of this) {
//     const key = fn(item);
//     (result[key] ??= []).push(item);
//   }

//   return result;
// };

// interface Array<T> {
//     groupBy(fn: (item: T) => string): Record<string, T[]>
// }

// Solution 3

// Array.prototype.groupBy = function(fn) {
//     return this.reduce((acc, currentItem)=>{
//         const key = fn(currentItem)
//         if(key in acc){
//             return {...acc, [key]:[...acc[key], currentItem]}
//         }else{
//            return {...acc, [key]: [currentItem]}
//         }
//     },{})
// }
