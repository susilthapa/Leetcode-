## Array Reduce Transformation (Without `Array.reduce`)

Given an integer array `nums`, a reducer function `fn`, and an initial value `init`, return the final result obtained by executing the `fn` function on each element of the array sequentially.

### How it works

The value is calculated as:

- `val = fn(init, nums[0])`
- `val = fn(val, nums[1])`
- `val = fn(val, nums[2])`
- ...
- Continue until all elements are processed

Return the final value of `val`.

If the array is empty, return `init`.

---

### Example 1

**Input**

```js
nums = [1, 2, 3, 4];
fn = function sum(accum, curr) {
  return accum + curr;
};
init = 0;
```

**Output**
`10`

### Example 2

**Input**

```nums = [1, 2, 3, 4]
fn = function sum(accum, curr) { return accum + curr * curr; }
init = 100

Output: 130
```
