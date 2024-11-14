import { IntegerType, MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

interface PetData {
    owner: string;
    name: string;
    age: IntegerType;
    species: string;
    breed: string;
    gender: string;
    weight: string;
    location: string;
    vaccinationStatus: string;
    personalityTraits: string[];
    interests: string[];
    favoriteFoods: string[];
    bio: string;
    image: string;
}

export async function POST(req: NextRequest) {
    const data: PetData = await req.json();

    const {
        owner,
        name,
        age,
        species,
        breed,
        gender,
        weight,
        location,
        vaccinationStatus,
        personalityTraits,
        interests,
        favoriteFoods,
        bio,
        image,
    } = data;

    if (
        !owner ||
        !name ||
        !age ||
        !species ||
        !breed ||
        !gender ||
        !weight ||
        !location ||
        !vaccinationStatus ||
        !personalityTraits ||
        !interests ||
        !favoriteFoods ||
        !bio ||
        !image
    ) {
        return NextResponse.json(
            { message: 'Invalid input. Please fill all the fields correctly.' },
            { status: 422 }
        );
    }

    const client = new MongoClient(process.env.MONGODB_URI as string);

    try {
        await client.connect();
        const db = client.db('furry-therapy');
        const collection = db.collection('pet_collection');

        await collection.insertOne({
            owner,
            name,
            age,
            species,
            breed,
            gender,
            weight,
            location,
            vaccinationStatus,
            personalityTraits,
            interests,
            favoriteFoods,
            bio,
            image,
            customers: [],
        });


        const db2 = client.db();
        const collection2 = db2.collection('users');

        await collection2.updateOne(
            { email: owner },
            {
                $set: {
                    userType: 'pet_owner',
                },
            }
        );

        client.close();

        return NextResponse.json({ message: 'Stored successfully!' }, { status: 201 });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return NextResponse.json({ message: 'Storing registration failed.' }, { status: 500 });
    }
}
