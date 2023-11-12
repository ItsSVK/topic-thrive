'use client';

import { IMsgDataTypes } from '@/types';
import DescriptionComponent from './Description';
import { useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher';
import { toast } from 'sonner';

export type SpaceDashboardComponentProps = {
  userId: string;
  username: String;
  pathId: string;
  spaceUsername: String;
  allow_post: boolean;
  chat: IMsgDataTypes[];
};
export const SpaceDashboardComponent: React.FC<
  SpaceDashboardComponentProps
> = ({ userId, username, pathId, spaceUsername, allow_post, chat }) => {
  const [allowPost, setAllowPost] = useState(allow_post);

  useEffect(() => {
    pusherClient.subscribe(pathId);

    pusherClient.bind('toggle_allow_post', (data: any) => {
      toast.info(
        data.data ? 'You can submit topics now' : 'Cannot submit Topics now',
        {
          description: `Topics submit has been ${
            data.data ? 'enabled' : 'disabled'
          } by Space Admin`,
        }
      );
      setAllowPost(data.data);
    });
  }, []);

  return (
    <div>
      <DescriptionComponent
        userId={userId}
        username={username}
        pathId={pathId}
        spaceUsername={spaceUsername}
        allowPost={allowPost}
        chats={chat}
      />
    </div>
  );
};

export default SpaceDashboardComponent;
