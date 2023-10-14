import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { pusherServer } from '@/lib/pusher';

export async function POST(req: NextRequest) {
  //   return NextResponse.json({ success: true });

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json(
        { message: 'Unauthorized access. Please login to continue' },
        { status: 403 }
      );

    if (session?.user)
      await prisma.topic.deleteMany({
        where: {
          roomId: session.user.id,
        },
      });

    pusherServer.trigger(session.user.id, 'delete_topic', {});

    return NextResponse.json(
      { message: 'Topics Cleared Successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
