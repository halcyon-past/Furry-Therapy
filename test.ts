const { MongoClient } = require('mongodb');

async function testConnection() {
    const uri = process.env.MONGODB_URI || 'mongodb+srv://helloworld:helloworld@furry-therapy.yzomu.mongodb.net/?retryWrites=true&w=majority&appName=furry-therapy';

    // Create a new MongoClient
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected successfully to MongoDB!');

        // Reference to the database
        const db = client.db('furry-therapy'); // Replace with your actual database name if different

        // Reference to the collection
        const collection = db.collection('pet_collection');

        // Data to insert
        const petData = {
            owner: 'John Doe',
            name: 'Bella',
            age: 5,
            species: 'Dog',
            bio: 'Friendly and energetic golden retriever.',
            image: 'https://example.com/images/bella.jpg',
            adjectives: ['playful', 'loving', 'loyal']
        };

        // Insert the data into the collection
        const result = await collection.insertOne(petData);

        // Output the result of the insert
        console.log('Inserted document:', result.insertedId);

        // List all documents in the collection (optional)
        const documents = await collection.find().toArray();
        console.log('Documents in collection:', documents);
    } catch (error) {
        console.error('Connection to MongoDB failed:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

testConnection();
