# Nested Array Generator

## Problem Description

Given a multi-dimensional array of integers, return a generator object which yields integers in the same order as inorder traversal.

A **multi-dimensional array** is a recursive data structure that contains both integers and other multi-dimensional arrays.

**Inorder traversal** iterates over each array from left to right, yielding any integers it encounters or applying inorder traversal to any arrays it encounters.

---

## Examples

### Example 1

**Input:**
```javascript
arr = [[[6]], [1, 3], []]
```

**Output:**
```javascript
[6, 1, 3]
```

**Explanation:**
```javascript
const generator = inorderTraversal(arr);
generator.next().value; // 6
generator.next().value; // 1
generator.next().value; // 3
generator.next().done;  // true
```

### Example 2

**Input:**
```javascript
arr = []
```

**Output:**
```javascript
[]
```

**Explanation:**
There are no integers so the generator doesn't yield anything.

---

## Constraints

- `0 <= arr.flat().length <= 10^5`
- `0 <= arr.flat()[i] <= 10^5`
- `maxNestingDepth <= 10^5`
