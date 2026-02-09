function missingNumber(nums: number[]): number {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;  // Sum of 0 to n
    const actualSum = nums.reduce((a, b) => a + b, 0);
    
    return expectedSum - actualSum;
};