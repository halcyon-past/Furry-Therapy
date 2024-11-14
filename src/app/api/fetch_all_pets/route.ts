import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        // Initialize MongoDB client and connect
        const client = new MongoClient(process.env.MONGODB_URI as string);
        await client.connect();

        // Select the database and collection
        const db = client.db('furry-therapy');
        const petsCollection = db.collection('pet_collection');

        // Fetch all pets
        const allPets = await petsCollection.find({}).toArray();
        console.log('All pets:', allPets);

        // Close the client connection
        await client.close();

        // If no pets are found, return a message indicating so
        if (allPets.length === 0) {
            return NextResponse.json({ message: 'No pets found' });
        }

        // Return all pets
        return NextResponse.json({ pets: allPets }, { status: 200 });
    } catch (error) {
        console.error('Error fetching all pets:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
