# Binary Tree Level Order Traversal

## Problem Statement

Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Example:**
```
Input: root = [3,9,20,null,null,15,7]
       3
      / \
     9  20
       /  \
      15   7

Output: [[3],[9,20],[15,7]]
```

## How Inputs Are Passed

### Understanding the Input Format

On LeetCode, the input is shown as an array like `[3,9,20,null,null,15,7]`, but your function receives a **TreeNode object**, not an array.

**Array Representation (What you see):**
```
[3, 9, 20, null, null, 15, 7]
```

**Actual Tree Structure (What you receive):**
```typescript
// LeetCode internally converts the array to this:
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);
```

### How Array-to-Tree Conversion Works

The array uses **level-order representation**:

```
Array index:  0   1   2    3     4     5   6
Values:      [3,  9,  20, null, null, 15, 7]

Tree:              3          <- index 0
                  / \
                 9   20       <- indices 1, 2
                / \ / \
              null null 15 7  <- indices 3, 4, 5, 6
```

**Rules:**
- Index 0 is the root
- For node at index `i`:
  - Left child is at index `2*i + 1`
  - Right child is at index `2*i + 2`
- `null` means no node at that position

### Creating Test Cases Manually

If you want to test locally, you need to build the tree manually:

```typescript
// Example 1: [3,9,20,null,null,15,7]
const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);

console.log(levelOrder(root1));
// Output: [[3], [9, 20], [15, 7]]

// Example 2: [1]
const root2 = new TreeNode(1);
console.log(levelOrder(root2));
// Output: [[1]]

// Example 3: []
const root3 = null;
console.log(levelOrder(root3));
// Output: []
```

### Helper Function to Build Tree from Array

For easier testing, you can create a helper function:

```typescript
function arrayToTree(arr: (number | null)[]): TreeNode | null {
    if (arr.length === 0 || arr[0] === null) return null;

    const root = new TreeNode(arr[0]);
    const queue: TreeNode[] = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift()!;

        // Process left child
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]!);
            queue.push(node.left);
        }
        i++;

        // Process right child
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]!);
            queue.push(node.right);
        }
        i++;
    }

    return root;
}

// Now you can test easily:
const tree = arrayToTree([3, 9, 20, null, null, 15, 7]);
console.log(levelOrder(tree));
// Output: [[3], [9, 20], [15, 7]]
```

### What LeetCode Does Behind the Scenes

1. **Parses the input array** `[3,9,20,null,null,15,7]`
2. **Builds the TreeNode structure** using logic similar to our helper
3. **Calls your function** with the root node: `levelOrder(root)`
4. **Compares your output** to the expected result

So when you submit on LeetCode:
- You **don't** handle array parsing
- You **only** implement the logic that processes the TreeNode
- LeetCode handles all input/output conversion

## Approach: Breadth-First Search (BFS)

This problem is a classic application of BFS, where we traverse the tree level by level using a queue data structure.

### Algorithm Overview

1. **Handle edge case**: If the tree is empty, return an empty array
2. **Initialize**: Create a queue and add the root node
3. **Process level by level**:
   - Capture the current queue size (number of nodes at this level)
   - Process exactly that many nodes
   - Collect their values into a level array
   - Add their children to the queue for the next level
4. **Repeat** until the queue is empty

### Why This Works

The key insight is **capturing `queue.length` at the start of each iteration**. This tells us exactly how many nodes belong to the current level, even though we're adding child nodes to the queue as we process the current level.

### Step-by-Step Walkthrough

Let's trace through an example:

```
Tree:      3
          / \
         9  20
           /  \
          15   7
```

**Initial State:**
- Queue: [3]
- Result: []

**Iteration 1 (Level 0):**
- levelSize = 1 (queue has 1 node)
- Process node 3: add value 3, enqueue children 9 and 20
- Queue after: [9, 20]
- Result: [[3]]

**Iteration 2 (Level 1):**
- levelSize = 2 (queue has 2 nodes)
- Process node 9: add value 9, no children
- Process node 20: add value 20, enqueue children 15 and 7
- Queue after: [15, 7]
- Result: [[3], [9, 20]]

**Iteration 3 (Level 2):**
- levelSize = 2 (queue has 2 nodes)
- Process node 15: add value 15, no children
- Process node 7: add value 7, no children
- Queue after: []
- Result: [[3], [9, 20], [15, 7]]

**Done:** Queue is empty, return result

## Implementation Details

```typescript
function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];

    const result: number[][] = [];
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;  // Critical: capture size before loop
        const currentLevel: number[] = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}
```

### Key Points

1. **Queue Operations:**
   - `queue.shift()` removes and returns the first element (dequeue)
   - `queue.push()` adds elements to the end (enqueue)

2. **Level Isolation:**
   - The `for` loop runs exactly `levelSize` times
   - This ensures we only process nodes from the current level
   - New children go into the queue but aren't processed until the next iteration

3. **The `!` operator:**
   - TypeScript non-null assertion
   - Safe here because we only shift when `queue.length > 0`

## Complexity Analysis

**Time Complexity: O(n)**
- We visit each node exactly once
- Each node is enqueued and dequeued once
- n = total number of nodes in the tree

**Space Complexity: O(w)**
- w = maximum width of the tree (maximum nodes at any level)
- The queue holds at most one complete level at a time
- In the worst case (complete binary tree), the last level has n/2 nodes
- Therefore, space complexity is O(n) in the worst case

