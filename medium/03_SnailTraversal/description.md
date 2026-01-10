# Snail Traversal for Arrays

Write code that enhances all arrays such that you can call the  
`snail(rowsCount, colsCount)` method, which transforms a 1D array into a 2D array organized in **snail traversal order**.

---

## Rules

- If `rowsCount * colsCount !== nums.length`, the input is **invalid** and an empty array (`[]`) should be returned.
- Invalid input values should always return an empty array.

---

## Snail Traversal Order

Snail traversal order works as follows:

1. Start at the **top-left cell** with the first value of the array.
2. Traverse the **first column from top to bottom**.
3. Move to the **next column on the right** and traverse it **from bottom to top**.
4. Continue this pattern, alternating the direction of traversal for each column,
   until all values from the original array are placed.

### Example 1

**Input:**

```txt
nums = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15]
rowsCount = 5
colsCount = 4
```

**Output**:

```
[
  [19, 17, 16, 15],
  [10,  1, 14,  4],
  [ 3,  2, 12, 20],
  [ 7,  5, 18, 11],
  [ 9,  8,  6, 13]
]
```

### Example 2

**Input:**

```
nums = [1, 2, 3, 4]
rowsCount = 1
colsCount = 4

```

**Output:**

```
[
  [1, 2, 3, 4]
]
```
