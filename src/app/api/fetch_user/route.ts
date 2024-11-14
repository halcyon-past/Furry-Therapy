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
        const db = client.db('test');
        const usersCollection = db.collection('users');

        // Fetch the user document by email
        const user = await usersCollection.findOne({ email: email });
        console.log('User fetched:', user);

        // Close the client connection
        await client.close();

        // If no user found, return a message indicating so
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Return the fetched user data
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
