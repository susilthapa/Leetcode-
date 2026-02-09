function findDisappearedNumbers(nums: number[]): number[] {
    const seen = new Set(nums);
    
    const result: number[] = [];
    for (let i = 1; i <= nums.length; i++) {
        if (!seen.has(i)) {
            result.push(i);
        }
    }
    
    return result;
};


// Optimal Solution: Marking In-Place (O(n) time, O(1) space)

function findDisappearedNumbers2(nums: number[]): number[] {
    // Mark indices as visited by making values negative
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1;  // Get index (1-based to 0-based)
        if (nums[index] > 0) {
            nums[index] = -nums[index];  // Mark as seen
        }
    }
    
    // Collect indices that are still positive (never visited)
    const result: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            result.push(i + 1);  // Convert back to 1-based
        }
    }
    
    return result;
}