import { IntegerType, MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

interface PetData{
    owner:string
    name:string;
    age:IntegerType;
    species:string;
    bio:string;
    image:string;
    adjectives:string[];
}


export async function POST(req: NextRequest) {
    const data: PetData = await req.json();

    const {owner,name,age,species,bio,image,adjectives} = data;

    if (
        !owner ||
        !name ||
        !age ||
        !species ||
        !bio ||
        !image ||
        !adjectives
    ){
        return NextResponse.json({ message: 'Invalid input. Please fill all the fields correctly.' }, { status: 422 });
  }

    const client = new MongoClient(process.env.MONGODB_URI as string);

  try {
    await client.connect();
    const db = client.db('furry-therapy');
    const collection = db.collection('pets_collection');

    await collection.insertOne({
      owner,
      name,
      age,
      species,
      bio,
      image,
      adjectives
    });

    client.close();

    return NextResponse.json({ message: 'Stored successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return NextResponse.json({ message: 'Storing registration failed.' }, { status: 500 });
  }
}
