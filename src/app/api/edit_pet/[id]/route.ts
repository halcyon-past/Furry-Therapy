import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const petId = params.id;

        if (!ObjectId.isValid(petId)) {
            return NextResponse.json(
                { message: 'Invalid pet ID.' },
                { status: 422 }
            );
        }

        const client = new MongoClient(process.env.MONGODB_URI as string);
        await client.connect();
        const db = client.db('furry-therapy');
        const collection = db.collection('pet_collection');

        const body = await req.json();

        // Remove _id from the update body if it exists
        delete body._id;

        // Update the pet document without modifying the _id field
        const result = await collection.updateOne(
            { _id: new ObjectId(petId) },
            { $set: body }
        );

        client.close();

        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { message: 'No pet found with the given ID or no changes made.' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Pet updated successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating the pet:', error);
        return NextResponse.json(
            { message: 'Failed to update pet.' },
            { status: 500 }
        );
    }
}
