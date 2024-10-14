import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/lib/session';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
    try {
        const session = await getUserSession();

        if (!session || !session.email) {
            return NextResponse.json(
                { message: 'Unauthorized. Please log in.' },
                { status: 401 }
            );
        }

        const { petId } = await req.json();

        if (!petId) {
            return NextResponse.json(
                { message: 'Pet ID is required.' },
                { status: 422 }
            );
        }

        const client = new MongoClient(process.env.MONGODB_URI as string);

        try {
            await client.connect();
            const db = client.db('furry-therapy');
            const collection = db.collection('pet_collection');

            // Fetch the pet details to check ownership
            const pet = await collection.findOne({ _id: new ObjectId(petId) });

            if (!pet) {
                return NextResponse.json(
                    { message: 'No pet found with the given ID.' },
                    { status: 404 }
                );
            }

            // Check if the session email matches the pet owner
            if (pet.owner !== session.email) {
                return NextResponse.json(
                    { message: 'You are not authorized to delete this pet.' },
                    { status: 403 }
                );
            }

            // Delete the pet if the owner matches
            const result = await collection.deleteOne({ _id: new ObjectId(petId) });

            client.close();

            return NextResponse.json(
                { message: 'Pet deleted successfully!' },
                { status: 200 }
            );
        } catch (error) {
            console.error('Error deleting the pet:', error);
            return NextResponse.json(
                { message: 'Failed to delete the pet.' },
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
