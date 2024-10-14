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
      authorization: { params: { redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google` } },
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
      // Find the user in the database
      const userDoc = await db.collection('users').findOne({ email: profile.email });

      if (userDoc) {
        // If the user already exists, just update the name and image
        await db.collection('users').updateOne(
          { email: profile.email },
          {
            $set: {
              name: profile.name,
              image: (profile as GoogleProfile).picture,
            },
          }
        );
      } else {
        // If the user does not exist, initialize the fields
        await db.collection('users').updateOne(
          { email: profile.email },
          {
            $set: {
              name: profile.name,
              email: profile.email,
              image: (profile as GoogleProfile).picture,
              bio: null, // Initialize only when creating a new user
              needs: [], // Initialize only when creating a new user
              userType: 'default', // Initialize with a default userType
            },
            $setOnInsert: { createdAt: new Date() }, // Ensure createdAt is set on insert
          },
          { upsert: true } // Insert if it does not exist
        );
      }

      return true;
    },
    async session({ session, token }) {
      // Ensure token is available
      if (token) {
        // Set initial user fields from token
        session.user.id = token.id as string;
        session.user.image = token.image as string | null;
        session.user.userType = token.userType as string;
    
        // If user ID is available in token, fetch updated user data from the database
        if (token.id) {
          try {
            const { db } = await connectToDatabase();
            const userDoc = await db.collection('users').findOne({ _id: token.id });
    
            if (userDoc) {
              // Update the session with the latest user data from the database
              session.user = {
                id: userDoc._id.toString(),
                name: userDoc.name,
                email: userDoc.email,
                image: userDoc.image,
                userType: userDoc.userType, // Add this if you want to store userType from DB
                // Include any other fields you want
              };
    
              // Update the token with the latest user data as well
              token.user = { ...session.user }; // Keep token up-to-date with user data
            }
          } catch (error) {
            console.error('Error fetching user data from database:', error);
          }
        }
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
        token.userType = userDoc.userType || 'default';
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
