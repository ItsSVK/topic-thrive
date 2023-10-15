import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { pusherServer } from '@/lib/pusher';
import { AllowPostToggleSchema } from '@/schemas/AllowPostToggleForm.schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { allow_post } = AllowPostToggleSchema.parse(body);

    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json(
        { message: 'Unauthorized access. Please login to continue' },
        { status: 403 }
      );

    if (session?.user) {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          allow_post,
        },
      });
    }

    await pusherServer.trigger(session.user.id, 'toggle_allow_post', {
      data: allow_post,
    });

    return NextResponse.json(
      { message: 'Allow Post Toggled Successfully' },
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
