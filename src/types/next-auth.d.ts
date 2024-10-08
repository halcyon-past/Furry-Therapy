// src/types/next-auth.d.ts
import NextAuth from 'next-auth';

// Extend the Profile interface
declare module 'next-auth/providers/google' {
  interface Profile {
    picture: string; // Add the picture property here
  }
}

// Extend the default session interface
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      image?: string | null; // Add the image property
    } & DefaultSession['user']; // Extend the user from DefaultSession
  }
}
