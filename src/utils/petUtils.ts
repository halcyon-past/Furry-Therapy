interface Pet {
    owner: string;
    name: string;
    age: number;
    species: string;
    bio: string;
    image: string;
    adjectives: string[];
}

// Utility function to sort pets by matching adjectives
export function sortByAdjectiveMatches(targetAdjectives: string[], petObjects: Pet[]): Pet[] {
    // Create a Set from the targetAdjectives for O(1) lookup
    const targetSet = new Set(targetAdjectives);
    
    // Create a map to hold pet objects grouped by their matching adjective counts
    const countMap = new Map<number, Pet[]>();

    // Count matches for each pet object
    petObjects.forEach(pet => {
        const matchCount = pet.adjectives.reduce((count, adjective) => count + (targetSet.has(adjective) ? 1 : 0), 0);
        
        // Group by match count
        if (!countMap.has(matchCount)) {
            countMap.set(matchCount, []);
        }
        countMap.get(matchCount)?.push(pet);
    });

    // Create a sorted array of counts
    const sortedCounts = Array.from(countMap.keys()).sort((a, b) => b - a);

    // Flatten the result based on sorted counts
    const sortedPets: Pet[] = [];
    sortedCounts.forEach(count => {
        sortedPets.push(...countMap.get(count) || []);
    });

    return sortedPets;
}
