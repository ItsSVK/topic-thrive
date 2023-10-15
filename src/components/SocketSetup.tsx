'use client';
import PostForm from './form/PostForm';
import { useEffect, useState } from 'react';
import { IMsgDataTypes, PostFormInput } from '@/types';
import { SubmitHandler } from 'react-hook-form';
import PostList from './PostList';
import axios from 'axios';
import { pusherClient } from '@/lib/pusher';
import { useToast } from './ui/use-toast';
import { useMutation } from '@tanstack/react-query';

type SocketSetupProps = {
  roomId: string;
  chat: IMsgDataTypes[];
  userId: String;
  allowPost: boolean;
};

export const SocketSetup: React.FC<SocketSetupProps> = ({
  roomId,
  chat: chats,
  userId,
  allowPost,
}) => {
  const [chat, setChat] = useState<IMsgDataTypes[]>(chats);
  const { toast } = useToast();

  const { mutate: postTopicMutation, isLoading: isLoadingPostTopic } =
    useMutation({
      mutationFn: (data: any) => {
        return axios.post('/api/topic', {
          msg: data.title,
          roomId,
        });
      },
      onError: error => {
        console.error(error);
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
          value: 'Failed to proceed your request, Please try again',
          duration: 1000,
        });
      },
    });

  const { mutate: postTopicLikeMutation, isLoading: isLoadingPostTopicLike } =
    useMutation({
      mutationFn: ({ isLiked, key }: any) => {
        return axios.post(`/api/topic/like-unlike/${key}`, {
          isLiked: !isLiked,
        });
      },
      onError: error => {
        console.error(error);
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
          value: 'Failed to proceed your request, Please try again',
          duration: 1000,
        });
      },
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
        return pre.map(item => (item.id === post.id ? post : item));
      });
    });
  }, [roomId]);

  const submitHandler: SubmitHandler<PostFormInput> = async (data, e) => {
    e?.target.reset();
    postTopicMutation(data);
  };

  const handleClick = async (key: string, isLiked: boolean) =>
    postTopicLikeMutation({ isLiked, key });

  return (
    <div>
      <PostForm
        onSubmit={submitHandler}
        isLoadingPostTopic={isLoadingPostTopic}
        allowPost={roomId == userId ? true : allowPost}
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
