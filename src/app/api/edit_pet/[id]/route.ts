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

        const updatedData = await req.json();

        const client = new MongoClient(process.env.MONGODB_URI as string);

        try {
            await client.connect();
            const db = client.db('furry-therapy');
            const collection = db.collection('pet_collection');

            // Find the pet by ID
            const pet = await collection.findOne({ _id: new ObjectId(petId) });

            if (!pet) {
                return NextResponse.json(
                    { message: 'No pet found with the given ID.' },
                    { status: 404 }
                );
            }

            // Update the fields based on provided data
            const updatedPet = {
                ...pet, // Keep existing fields
                ...updatedData, // Overwrite with the new data
            };

            // Perform the update operation in MongoDB
            const result = await collection.updateOne(
                { _id: new ObjectId(petId) },
                { $set: updatedPet }
            );

            if (result.modifiedCount === 0) {
                return NextResponse.json(
                    { message: 'No changes were made to the pet.' },
                    { status: 304 }
                );
            }

            client.close();

            return NextResponse.json(
                { message: 'Pet data updated successfully!' },
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
