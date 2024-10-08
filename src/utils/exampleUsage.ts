// Importing the utility function
const { sortByAdjectiveMatches } = require('@/utils/petUtils') ;

// Example usage
const targetAdjectives = ["playful", "loving", "loyal"];
const petObjects = [
    {
        owner: "John Doe",
        name: "Bella",
        age: 5,
        species: "Dog",
        bio: "Friendly and energetic golden retriever.",
        image: "https://example.com/images/bella.jpg",
        adjectives: ["playful", "loving", "loyal"]
    },
    {
        owner: "Jane Smith",
        name: "Max",
        age: 3,
        species: "Cat",
        bio: "Curious and clever tabby cat.",
        image: "https://example.com/images/max.jpg",
        adjectives: ["curious", "clever"]
    },
    {
        owner: "Emily Johnson",
        name: "Buddy",
        age: 4,
        species: "Dog",
        bio: "Loyal and friendly labrador.",
        image: "https://example.com/images/buddy.jpg",
        adjectives: ["loyal", "playful"]
    }
];

const sortedPets = sortByAdjectiveMatches(targetAdjectives, petObjects);
console.log(sortedPets);
