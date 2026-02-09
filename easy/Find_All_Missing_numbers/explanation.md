# Find All Numbers Disappeared in an Array - Solution Explanation

## Solution Code

```typescript
function findDisappearedNumbers(nums: number[]): number[] {
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
```

---

## The Key Insight

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE IDEA                                     │
└─────────────────────────────────────────────────────────────────┘

    Since nums[i] is in range [1, n] and array length is n:

    → Each VALUE can map to a valid INDEX!

    Value 1 → Index 0
    Value 2 → Index 1
    Value 3 → Index 2
    ...
    Value n → Index n-1


    We use the SIGN of each position as a "visited" marker.

    Negative = this index's corresponding number EXISTS
    Positive = this index's corresponding number is MISSING
```

---

## Step-by-Step Example

```
Input: nums = [4, 3, 2, 7, 8, 2, 3, 1]
Indices:       0  1  2  3  4  5  6  7
```

### Phase 1: Mark Visited Indices

```
┌─────────────────────────────────────────────────────────────────┐
│                    MARKING PHASE                                │
└─────────────────────────────────────────────────────────────────┘


Initial:  [4, 3, 2, 7, 8, 2, 3, 1]
           0  1  2  3  4  5  6  7


i = 0: nums[0] = 4 → mark index 3
       [4, 3, 2, -7, 8, 2, 3, 1]
                 ^^

i = 1: nums[1] = 3 → mark index 2
       [4, 3, -2, -7, 8, 2, 3, 1]
              ^^

i = 2: nums[2] = -2 → |−2| = 2 → mark index 1
       [4, -3, -2, -7, 8, 2, 3, 1]
           ^^

i = 3: nums[3] = -7 → |−7| = 7 → mark index 6
       [4, -3, -2, -7, 8, 2, -3, 1]
                              ^^

i = 4: nums[4] = 8 → mark index 7
       [4, -3, -2, -7, 8, 2, -3, -1]
                                ^^

i = 5: nums[5] = 2 → mark index 1 (already negative, skip)
       [4, -3, -2, -7, 8, 2, -3, -1]

i = 6: nums[6] = -3 → |−3| = 3 → mark index 2 (already negative, skip)
       [4, -3, -2, -7, 8, 2, -3, -1]

i = 7: nums[7] = -1 → |−1| = 1 → mark index 0
       [-4, -3, -2, -7, 8, 2, -3, -1]
        ^^


Final:  [-4, -3, -2, -7, 8, 2, -3, -1]
          0   1   2   3  4  5   6   7
                         ^  ^
                         │  │
                         │  └── Index 5 is POSITIVE → 6 is missing
                         └── Index 4 is POSITIVE → 5 is missing
```

### Phase 2: Find Missing Numbers

```
┌─────────────────────────────────────────────────────────────────┐
│                    COLLECTION PHASE                             │
└─────────────────────────────────────────────────────────────────┘


Array:   [-4, -3, -2, -7, 8, 2, -3, -1]
Index:     0   1   2   3  4  5   6   7
Sign:      -   -   -   -  +  +   -   -
                          ^  ^
                          │  │
                          │  └── Positive! → 5 + 1 = 6 is missing
                          └── Positive! → 4 + 1 = 5 is missing


Result: [5, 6]
```

---

## Visual Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    VALUE → INDEX MAPPING                        │
└─────────────────────────────────────────────────────────────────┘


    Values in array: 4, 3, 2, 7, 8, 2, 3, 1


    Value    Maps to Index    Mark negative
    ─────    ──────────────   ─────────────
      1   →      0            nums[0] *= -1
      2   →      1            nums[1] *= -1
      2   →      1            (already negative)
      3   →      2            nums[2] *= -1
      3   →      2            (already negative)
      4   →      3            nums[3] *= -1
      7   →      6            nums[6] *= -1
      8   →      7            nums[7] *= -1


    Missing values (5 and 6) never mark indices 4 and 5!


    Index:    0    1    2    3    4    5    6    7
             [-4] [-3] [-2] [-7] [8]  [2] [-3] [-1]
              ✓    ✓    ✓    ✓   ✗    ✗    ✓    ✓
                                 │    │
                                 │    └── Still positive → 6 missing
                                 └── Still positive → 5 missing
```