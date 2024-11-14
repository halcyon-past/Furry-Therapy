import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {
    try {
        const { email, petId } = await req.json();

        if (!email || !petId) {
            return NextResponse.json(
                { message: 'Email and pet ID are required.' },
                { status: 422 }
            );
        }

        const client = new MongoClient(process.env.MONGODB_URI as string);

        try {
            await client.connect();
            const db = client.db('test');
            const usersCollection = db.collection('users');

            // Fetch the user to check if they exist and have a likedPets array
            const user = await usersCollection.findOne({ email: email });

            if (!user) {
                return NextResponse.json(
                    { message: 'No user found with the given email.' },
                    { status: 404 }
                );
            }

            // Check if the petId is already in the likedPets array
            if (user.likedPets && user.likedPets.includes(petId)) {
                return NextResponse.json(
                    { message: 'Pet ID already exists in likedPets array.' },
                    { status: 409 } // 409 Conflict status code
                );
            }

            // Add the petId to the likedPets array if it's not already present
            const result = await usersCollection.updateOne(
                { email: email },
                { $push: { likedPets: petId } } // Using $push since we manually checked for duplicates
            );

            client.close();

            return NextResponse.json(
                { message: 'Pet ID added to likedPets successfully!' },
                { status: 200 }
            );
        } catch (error) {
            console.error('Error updating the user:', error);
            return NextResponse.json(
                { message: 'Failed to update the user.' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Invalid request payload:', error);
        return NextResponse.json(
            { message: 'Invalid request. Please check the payload.' },
            { status: 400 }
        );
    }
}
