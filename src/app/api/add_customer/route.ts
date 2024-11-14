import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/lib/session';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {
    try {
        const session = await getUserSession();

        if (!session || !session.email) {
            return NextResponse.json(
                { message: 'Unauthorized. Please log in.' },
                { status: 401 }
            );
        }

        const { petId, email } = await req.json();

        if (!petId || !email) {
            return NextResponse.json(
                { message: 'Pet ID and email are required.' },
                { status: 422 }
            );
        }

        const client = new MongoClient(process.env.MONGODB_URI as string);

        try {
            await client.connect();
            const db = client.db('furry-therapy');
            const collection = db.collection('pet_collection');

            // Fetch the pet to check if it exists and contains the customers array
            const pet = await collection.findOne({ _id: new ObjectId(petId) });

            if (!pet) {
                return NextResponse.json(
                    { message: 'No pet found with the given ID.' },
                    { status: 404 }
                );
            }

            // Check if the email is already in the customers array
            if (pet.customers && pet.customers.includes(email)) {
                return NextResponse.json(
                    { message: 'Email already exists in the customers array.' },
                    { status: 409 } // 409 Conflict status code
                );
            }

            // Add the email to the customers array if it's not already present
            const result = await collection.updateOne(
                { _id: new ObjectId(petId) },
                { $push: { customers: email } } // Using $push since we manually checked for duplicates
            );

            client.close();

            return NextResponse.json(
                { message: 'Customer email added to pet successfully!' },
                { status: 200 }
            );
        } catch (error) {
            console.error('Error updating the pet:', error);
            return NextResponse.json(
                { message: 'Failed to update the pet.' },
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
