import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './[...nextauth]/route'; // Adjust this path based on your project
import { getUserSession } from '@/lib/session';

export async function GET(req: NextRequest) {
    const session = await getUserSession();
    console.log('Session:', session);
  try {
    // Correctly use getServerSession with NextRequest
    //const session = await getServerSession(req, authOptions);

    // If there is no session, respond with a 401 status
    if (!session) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    // Return the current session data as JSON
    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    console.error('Error fetching session:', error);

    // Use type assertion to handle unknown error type
    const errorMessage = (error as Error).message || 'Unknown error';

    // Return the error in valid JSON format
    return NextResponse.json({
      message: 'Error fetching session',
      error: errorMessage,
    }, { status: 500 });
  }
}
