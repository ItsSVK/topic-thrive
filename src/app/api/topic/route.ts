import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { TopicSchema } from '@/schemas/TopicForm.schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  //   return NextResponse.json({ success: true });

  try {
    const body = await req.json();
    const { msg } = TopicSchema.parse(body);

    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json(
        { message: 'Unauthorized access. Please login to continue' },
        { status: 403 }
      );

    const topic = await prisma.topic.create({
      data: {
        msg,
        roomId: session.user.id,
      },
    });

    return NextResponse.json(
      { topic, message: 'Topic created Successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
