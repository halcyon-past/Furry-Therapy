import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET(req: NextRequest) {
    try {
        // Get the session to verify the user
        const session = await getServerSession();

        // If session is not found or no email is present, return unauthorized error
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Get the user's email from the session
        const { email } = session.user;

        // Initialize MongoDB client and connect
        const client = new MongoClient(process.env.MONGODB_URI as string);
        await client.connect();

        // Select the database and collection
        const db = client.db('furry-therapy');
        const petsCollection = db.collection('pet_collection');

        // Fetch pets that belong to the logged-in user (using the owner's email)
        const userPets = await petsCollection.find({ owner: email }).toArray();
        console.log('User pets:', userPets);

        // Close the client connection
        await client.close();

        // If no pets found, return a message indicating so
        if (userPets.length === 0) {
            return NextResponse.json({ message: 'No pets found' });
        }

        // Return the fetched pets
        return NextResponse.json({ pets: userPets }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user pets:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
