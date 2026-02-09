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