type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type ArrayType = { id: number } & Record<string, JSONValue>;

function join(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
  const result: Record<number, ArrayType> = {};
  for (let i = 0; i < arr1.length; i++) {
    result[arr1[i].id as number] = arr1[i];
  }
  for (let i = 0; i < arr2.length; i++) {
    const obj = arr2[i];
    if (result[obj.id]) {
      result[obj.id] = { ...result[obj.id], ...obj };
    } else {
      result[obj.id] = obj;
    }
  }

  return Object.values(result);
}


function joinTwo(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
  const map = new Map<number, ArrayType>();

  for (const item of arr1) {
    map.set(item.id, item);
  }

  for (const item of arr2) {
    const existing = map.get(item.id);
    map.set(
      item.id,
      existing ? { ...existing, ...item } : item
    );
  }

  return Array.from(map.values());
}

// Example 1:

// Input:
// arr1 = [
//     {"id": 1, "x": 1},
//     {"id": 2, "x": 9}
// ],
// arr2 = [
//     {"id": 3, "x": 5}
// ]
// Output:
// [
//     {"id": 1, "x": 1},
//     {"id": 2, "x": 9},
//     {"id": 3, "x": 5}
// ]
// Explanation: There are no duplicate ids so arr1 is simply concatenated with arr2.
// Example 2:

// Input:
// arr1 = [
//     {"id": 1, "x": 2, "y": 3},
//     {"id": 2, "x": 3, "y": 6}
// ],
// arr2 = [
//     {"id": 2, "x": 10, "y": 20},
//     {"id": 3, "x": 0, "y": 0}
// ]
// Output:
// [
//     {"id": 1, "x": 2, "y": 3},
//     {"id": 2, "x": 10, "y": 20},
//     {"id": 3, "x": 0, "y": 0}
// ]
