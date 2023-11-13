'use client';
import axios from 'axios';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import PostForm from './form/PostForm';
import { IMsgDataTypes, PostFormInput } from '@/types';
import { useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher';
import { SubmitHandler } from 'react-hook-form';
import PostList from './PostList';
import { ClipboardCheck, ClipboardList } from 'lucide-react';
import { toast } from 'sonner';

export type DescriptionComponentProps = {
  pathId: string;
  userId: String;
  username: String;
  spaceUsername: String;
  allowPost: boolean;
  chats: IMsgDataTypes[];
};
export const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  pathId,
  userId,
  spaceUsername,
  username,
  allowPost,
  chats,
}) => {
  const [clicked, setClicked] = useState(false);

  const { mutate: clearTopicMutation, isLoading: isLoadingClear } = useMutation(
    {
      mutationFn: () => {
        return axios.post('/api/topic/clear');
      },
      onError: error => {
        console.error(error);
        toast.error('Something went wrong', {
          description: 'Failed to proceed your request, Please try again',
        });
      },
    }
  );

  const { mutate: changeTopicMutation, isLoading: isLoadingChangeTopic } =
    useMutation({
      mutationFn: () => {
        return axios.post('/api/topic/switch', { allow_post: !allowPost });
      },
      onError: error => {
        console.error(error);
        toast.error('Something went wrong', {
          description: 'Failed to proceed your request, Please try again',
        });
      },
    });

  const [chat, setChat] = useState<IMsgDataTypes[]>(() =>
    chats.sort((b, a) => a.count - b.count)
  );

  const { mutate: postTopicMutation, isLoading: isLoadingPostTopic } =
    useMutation({
      mutationFn: (data: any) => {
        return axios.post('/api/topic', {
          msg: data.title,
          roomId: pathId,
        });
      },
      onError: error => {
        console.error(error);
        toast.error('Something went wrong', {
          description: 'Failed to proceed your request, Please try again',
        });
      },
    });

  const {
    mutateAsync: postTopicLikeMutation,
    isLoading: isLoadingPostTopicLike,
  } = useMutation({
    mutationFn: ({ isLiked, key }: any) => {
      return axios.post(`/api/topic/like-unlike/${key}`, {
        isLiked: !isLiked,
      });
    },
    onError: error => {
      console.error(error);
    },
  });

  useEffect(() => {
    pusherClient.subscribe(pathId);

    pusherClient.bind('receive_msg', (data: IMsgDataTypes) => {
      setChat((pre: IMsgDataTypes[]) => [...pre, data]);
    });

    pusherClient.bind('delete_topic', () => {
      setChat([]);
      toast.info('Topic Cleared', {
        description: 'Topics have been cleared by Space Admin',
      });
    });

    pusherClient.bind('count_reflect', (data: any) => {
      setChat((pre: IMsgDataTypes[]) => {
        const post = data.data as IMsgDataTypes;
        const likedUserIds: String[] = data.likedUserIds;
        post.isLiked = likedUserIds.includes(userId);
        const items = pre.map(item => (item.id === post.id ? post : item));
        items.sort((b, a) => a.count - b.count);
        return items;
      });
    });
  }, []);

  const submitHandler: SubmitHandler<PostFormInput> = async (data, e) => {
    e?.target.reset();
    postTopicMutation(data);
  };

  const handleClick = async (key: string, isLiked: boolean) => {
    toast.promise(postTopicLikeMutation({ isLiked, key }), {
      loading: 'Loading...',
      success: () => {
        return 'Perfect🤞🏻';
      },
      error: () => {
        return 'Something went wrong, Please try again';
      },
    });
  };

  const changeTopic = async () => changeTopicMutation();
  const clearTopic = async () => clearTopicMutation();

  return (
    <div className="flex flex-col">
      <section className="text-gray-600 body-font mt-10 flex flex-col justify-center items-center">
        <div className="container mx-auto flex px-5 pt-24 justify-center items-center">
          <div className="flex flex-col mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {userId &&
                `Welcome ${username} to ${
                  pathId === userId ? `your Space` : `${spaceUsername}'s Space`
                }`}
            </h1>
            {pathId === userId && (
              <>
                <p className="leading-relaxed">
                  Share your SpaceID to others to join your Space/Room
                </p>
                <div className="flex gap-2 mt-3">
                  <p className="mb-8 leading-relaxed font-bold">{userId}</p>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(userId as string);
                      setClicked(true);
                      setTimeout(() => {
                        setClicked(false);
                      }, 1000);
                      toast.success('Space Id copied to clipboard');
                    }}
                  >
                    {clicked ? (
                      <ClipboardCheck size={25} color="green" />
                    ) : (
                      <ClipboardList size={25} />
                    )}
                  </span>
                </div>
                <div className="flex flex-row gap-3">
                  <Button
                    onClick={() => clearTopic()}
                    className="inline-flex py-3 px-5 items-center"
                    type="button"
                    variant="destructive"
                    disabled={isLoadingClear}
                  >
                    {isLoadingClear ? 'Please wait ...' : 'Clear Topics'}
                  </Button>

                  <Button
                    onClick={() => {
                      changeTopic();
                    }}
                    className="inline-flex py-3 px-5 items-center"
                    type="button"
                    disabled={isLoadingChangeTopic}
                  >
                    {isLoadingChangeTopic
                      ? 'Please wait ...'
                      : allowPost
                      ? 'Disable Topic Posting'
                      : 'Enable Topic Posting'}
                  </Button>
                </div>
              </>
            )}

            <div className="flex w-full justify-center mt-10 items-center">
              <PostForm
                onSubmit={submitHandler}
                isLoadingPostTopic={isLoadingPostTopic}
                allowPost={pathId == userId ? true : allowPost}
              />
            </div>
          </div>
        </div>
      </section>
      <PostList
        chat={chat}
        handleClick={handleClick}
        isLoadingPostTopicLike={isLoadingPostTopicLike}
      />
    </div>
  );
};

export default DescriptionComponent;
