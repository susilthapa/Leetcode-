/**
 * Definition for a binary tree node.
 */
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function levelOrder(root: TreeNode | null): number[][] {
    // Edge case: if tree is empty, return empty array
    if (!root) return [];

    const result: number[][] = [];
    const queue: TreeNode[] = [root]; // Initialize queue with root node

    // BFS: Process nodes level by level
    while (queue.length > 0) {
        const levelSize = queue.length; // Number of nodes at current level
        const currentLevel: number[] = [];

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!; // Remove first node from queue
            currentLevel.push(node.val);  // Add its value to current level

            // Add children to queue for next level
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel); // Add completed level to result
    }

    return result;
};