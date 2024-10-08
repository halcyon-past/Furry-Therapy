import { MongoClient } from 'mongodb';
import { session } from '@/lib/session';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { Profile } from 'next-auth';

// MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI!;

// Create a MongoDB client
let client: MongoClient;
let db: any;

// Create a database connection
const connectToDatabase = async () => {
  if (!client) {
    client = await MongoClient.connect(MONGODB_URI);
    db = client.db();
  }
  return { client, db };
};

// Extend the Profile type to include the 'picture' property
interface GoogleProfile extends Profile {
  picture?: string;
  sub?: string;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub || 'default-id',
          name: profile.name ?? '',
          email: profile.email ?? '',
          image: profile.picture ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error('No profile');
      }

      const { db } = await connectToDatabase();

      await db.collection('users').updateOne(
        { email: profile.email },
        {
          $set: {
            name: profile.name,
            email: profile.email,
            image: (profile as GoogleProfile).picture,
            bio: null,
            needs: [],
          },
          $setOnInsert: { createdAt: new Date() },
        },
        { upsert: true }
      );

      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.image = token.image as string | null;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (profile) {
        const { db } = await connectToDatabase();
        const userDoc = await db.collection('users').findOne({ email: profile.email });

        if (!userDoc) {
          throw new Error('No user found');
        }
        token.id = userDoc._id.toString();
        token.image = userDoc.image;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
