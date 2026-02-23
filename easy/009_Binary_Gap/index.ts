function binaryGap(n: number): number {

    // Convert number to binary string
    const bin = n.toString(2);

    let lastIndex = -1;  // stores index of previous '1'
    let maxDist = 0;     // stores maximum distance

    // Loop through binary string
    for (let i = 0; i < bin.length; i++) {

        // If current bit is '1'
        if (bin[i] === '1') {

            // If we saw a previous '1', compute distance
            if (lastIndex !== -1) {
                maxDist = Math.max(maxDist, i - lastIndex);
            }

            // Update last seen position
            lastIndex = i;
        }
    }

    return maxDist;
}