import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const petId = params.id;

        if (!ObjectId.isValid(petId)) {
            return NextResponse.json(
                { message: 'Invalid pet ID.' },
                { status: 422 }
            );
        }

        const client = new MongoClient(process.env.MONGODB_URI as string);

        try {
            await client.connect();
            const db = client.db('furry-therapy'); // Adjust database name if necessary
            const collection = db.collection('pet_collection');

            // Find the pet by ID
            const pet = await collection.findOne({ _id: new ObjectId(petId) });

            if (!pet) {
                return NextResponse.json(
                    { message: 'No pet found with the given ID.' },
                    { status: 404 }
                );
            }

            // Close the MongoDB connection
            client.close();

            // Return the pet data
            return NextResponse.json(
                { message: 'Pet data fetched successfully!', pet },
                { status: 200 }
            );
        } catch (error) {
            console.error('Error fetching pet data:', error);
            return NextResponse.json(
                { message: 'Failed to fetch pet data.' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Invalid request:', error);
        return NextResponse.json(
            { message: 'Invalid request. Please check the parameters.' },
            { status: 400 }
        );
    }
}
