'use client';
import PostForm from './form/PostForm';
import { useEffect, useId, useState } from 'react';
import { IMsgDataTypes, PostFormInput, ResponseData } from '@/types';
import { SubmitHandler } from 'react-hook-form';
import PostList from './PostList';
import axios, { AxiosResponse } from 'axios';
import { socket } from '@/lib/socket';
import { pusherClient, pusherServer } from '@/lib/pusher';
import { useToast } from './ui/use-toast';
import { useMutation } from '@tanstack/react-query';

type SocketSetupProps = {
  roomId: string;
  chat: IMsgDataTypes[];
  userId: String;
};

export const SocketSetup: React.FC<SocketSetupProps> = ({
  roomId,
  chat: chats,
  userId,
}) => {
  const [chat, setChat] = useState<IMsgDataTypes[]>(chats);
  const { toast } = useToast();

  const { mutate: postTopicMutation, isLoading: isLoadingPostTopic } =
    useMutation({
      mutationFn: (data: any) => {
        return fetch('/api/topic', {
          method: 'POST',
          body: JSON.stringify({
            msg: data.title,
            roomId,
          }),
        });
      },
      onError: error => {
        console.error(error);
      },
      onSuccess: () => {},
    });

  const { mutate: postTopicLikeMutation, isLoading: isLoadingPostTopicLike } =
    useMutation({
      mutationFn: ({ isLiked, key }: any) => {
        return fetch(`/api/topic/like-unlike/${key}`, {
          method: 'POST',
          body: JSON.stringify({
            isLiked: !isLiked,
          }),
        });
      },
      onError: error => {
        console.error(error);
      },
      onSuccess: () => {},
    });

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind('receive_msg', (data: IMsgDataTypes) => {
      setChat((pre: IMsgDataTypes[]) => [...pre, data]);
    });

    pusherClient.bind('delete_topic', () => {
      setChat([]);
      toast({
        title: 'Topic Cleared',
        description: 'Topics have been cleared by Space Admin',
        variant: 'default',
      });
    });

    pusherClient.bind('count_reflect', (data: any) => {
      setChat((pre: IMsgDataTypes[]) => {
        const post = data.data as IMsgDataTypes;
        const likedUserIds: String[] = data.likedUserIds;
        post.isLiked = likedUserIds.includes(userId);
        const result = pre.map(item => (item.id === post.id ? post : item));
        return result;
      });
    });
  }, [roomId]);

  const submitHandler: SubmitHandler<PostFormInput> = async (data, e) => {
    e?.target.reset();
    postTopicMutation(data);

    // await axios.post('/api/topic', {
    //   msg: data.title,
    //   roomId,
    // });
  };

  const handleClick = async (key: string, isLiked: boolean) => {
    postTopicLikeMutation({ isLiked, key });

    // const result: AxiosResponse = await axios.post(
    //   `/api/topic/like-unlike/${key}`,
    //   {
    //     isLiked: !isLiked,
    //   }
    // );
  };

  return (
    <div>
      <PostForm
        onSubmit={submitHandler}
        isLoadingPostTopic={isLoadingPostTopic}
      />
      <PostList
        chat={chat}
        handleClick={handleClick}
        isLoadingPostTopicLike={isLoadingPostTopicLike}
      />
    </div>
  );
};

export default SocketSetup;
