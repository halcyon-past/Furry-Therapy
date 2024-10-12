import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getUserSession } from '@/lib/session';
import { traitsArray } from '@/utils/traits';

export async function POST(req: NextRequest) {
    try {
        const userSession = await getUserSession();
        if (!userSession) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = userSession.id;
        const userEmail = userSession.email;

        const { bio } = await req.json();

        const analyzeResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paragraph: bio, adjectives: traitsArray  }),
        });

        if (!analyzeResponse.ok) {
            return NextResponse.json({ message: 'Error analyzing user' }, { status: 500 });
        }

        const { qualities } = await analyzeResponse.json();

        const client = new MongoClient(process.env.MONGODB_URI as string);
        await client.connect();
        const db = client.db();
        const usersCollection = db.collection('users');

        const updateResult = await usersCollection.updateOne(
            { email: userEmail },
            {
                $set: {
                    bio: bio,
                    needs: qualities,
                },
            }
        );

        const db2 = client.db();
        const collection2 = db2.collection('users');

        await collection2.updateOne(
            { email: userEmail },
            {
                $set: {
                    userType: 'user',
                },
            }
        );

        client.close();

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json({ message: 'No updates made to user data' }, { status: 304 });
        }

        return NextResponse.json({ message: 'User updated successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
    }
}
