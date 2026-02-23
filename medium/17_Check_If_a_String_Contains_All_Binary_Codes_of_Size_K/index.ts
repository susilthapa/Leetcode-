function hasAllCodes(s: string, k: number): boolean {

    // Total number of possible binary codes of length k = 2^k
    const needed = 1 << k;

    // Early check:
    // A string of length n can only form (n - k + 1) substrings of size k.
    // To contain all 2^k codes, we need:
    // n - k + 1 >= 2^k  →  n >= 2^k + k - 1
    // If string is too short, it's impossible.
    if (s.length < needed + k - 1) return false;

    // A Set to store unique substrings of length k
    const seen = new Set<string>();

    // Loop over all possible starting indices of substrings of size k
    // Last valid start index is s.length - k
    for (let i = 0; i <= s.length - k; i++) {

        // Extract substring of length k starting at index i
        const sub = s.substring(i, i + k);

        // Add it to the set (Set automatically keeps only unique values)
        seen.add(sub);

        // If we've collected all possible codes, return true early
        if (seen.size === needed) return true;
    }

    // If after scanning entire string we still don't have all codes
    return false;
}

