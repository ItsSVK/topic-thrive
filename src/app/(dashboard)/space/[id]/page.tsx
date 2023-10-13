import DescriptionComponent from '@/components/Description';
import SocketSetup from '@/components/SocketSetup';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { IMsgDataTypes } from '@/types';
import { NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface Props {
  params: { id: String };
}

const SpaceDashboardPage: NextPage<Props> = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/sign-in');
  }
  const userId: String = session.user.id;
  const username: String = session.user.username;
  const pathId: String = params.id;
  const space_user = await prisma.user.findFirst({
    where: {
      id: pathId as string,
    },
    include: {
      Topic: true,
    },
  });
  if (!space_user) return redirect('/admin');

  const topicsList = space_user.Topic;
  const sapceUsername: String = space_user.username;

  // Fetch the liked topics of the current user
  const likedTopics = await prisma.like.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      topicId: true,
    },
  });

  // Create a Set of liked topic IDs for faster lookup
  const likedTopicIds = new Set(likedTopics.map(like => like.topicId));

  // Check if each topic in the list is liked by the current user
  const topicsWithLikedStatus = topicsList.map(topic => {
    const isLiked = likedTopicIds.has(topic.id);
    return {
      ...topic,
      isLiked,
    };
  });

  return (
    <div>
      <DescriptionComponent
        userId={userId}
        username={username}
        pathId={pathId}
        spaceUsername={sapceUsername}
      />
      <SocketSetup
        roomId={params.id}
        chat={topicsWithLikedStatus}
        userId={userId}
      />
    </div>
  );
};

export default SpaceDashboardPage;
