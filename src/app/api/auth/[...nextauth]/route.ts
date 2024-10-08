import { MongoClient } from 'mongodb'
import { session } from '@/lib/session'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

// MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI!

// Create a MongoDB client
let client: MongoClient
let db: any

const connectToDatabase = async () => {
  if (!client) {
    client = await MongoClient.connect(MONGODB_URI);
    db = client.db();
  }
  return { client, db }
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error('No profile')
      }

      const { db } = await connectToDatabase()

      await db.collection('users').updateOne(
        { email: profile.email },
        {
          $set: {
            name: profile.name,
            email: profile.email,
          },
          $setOnInsert: { createdAt: new Date() },
        },
        { upsert: true }
      )

      return true
    },
    session,
    async jwt({ token, user, account, profile }) {
      if (profile) {
        const { db } = await connectToDatabase()
        const userDoc = await db.collection('users').findOne({ email: profile.email })

        if (!userDoc) {
          throw new Error('No user found')
        }
        token.id = userDoc._id.toString();
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
