import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { LikeSchema } from '@/schemas/LikeForm.schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { useParams } from 'next/navigation';
import { NextPageContext } from 'next';
import { RequestContext } from 'next/dist/server/base-server';
import { pusherServer } from '@/lib/pusher';

export async function POST(req: Request, context: any) {
  //   return NextResponse.json({ success: true });
  try {
    const body = await req.json();

    const { isLiked } = LikeSchema.parse(body);

    const session = await getServerSession(authOptions);

    // if (!session?.user)
    //   return NextResponse.json(
    //     { message: 'Unauthorized access. Please login to continue' },
    //     { status: 403 }
    //   );

    const { id } = context.params;

    const likedAlready = await prisma.like.findFirst({
      where: {
        topicId: id,
        userId: session?.user.id,
      },
      include: {
        topic_id: {
          select: {
            count: true,
          },
        },
      },
    });

    let responseData = await prisma.topic.findFirst({ where: { id } });

    if (isLiked && session) {
      if (!likedAlready) {
        await prisma.like.create({
          data: {
            topicId: id,
            userId: session.user.id,
          },
        });
        responseData = await prisma.topic.update({
          where: {
            id,
          },
          data: {
            count: {
              increment: 1,
            },
          },
        });
      }
    } else {
      if (likedAlready) {
        await prisma.like.delete({
          where: {
            id: likedAlready.id,
          },
        });

        responseData = await prisma.topic.update({
          where: {
            id,
          },
          data: {
            count: {
              decrement: 1,
            },
          },
        });
      }
    }

    const likedUsers = await prisma.like.findMany({
      where: { topicId: id },
      select: { userId: true },
    });

    const likedUserIds = likedUsers.map(like => like.userId);

    if (responseData)
      pusherServer.trigger(responseData.roomId, 'count_reflect', {
        data: responseData,
        likedUserIds: likedUserIds,
      });

    return NextResponse.json(
      {
        responseData,
        data: likedUserIds,
        message: 'Topic updated Successfully',
      },
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
