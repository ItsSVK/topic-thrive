'use client';
import PostForm from './form/PostForm';
import { useEffect, useId, useState } from 'react';
import { IMsgDataTypes, PostFormInput, ResponseData } from '@/types';
import { SubmitHandler } from 'react-hook-form';
import PostList from './PostList';
import axios, { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { socket } from '@/lib/socket';

type SocketSetupProps = {
  roomId: String;
  chat: IMsgDataTypes[];
  userId: String;
};

export const SocketSetup: React.FC<SocketSetupProps> = ({
  roomId,
  chat: chats,
  userId,
}) => {
  const [chat, setChat] = useState<IMsgDataTypes[]>(chats);

  useEffect(() => {
    // socket.on('connect', () => {
    // console.log('Connected to server');
    socket.emit('join_room', roomId);
    // socket.on('receive_message', (data: any) => {
    //   console.log(data);
    // });
    socket.on('receive_msg', (data: IMsgDataTypes) => {
      console.log('Received Data', data);
      setChat((pre: IMsgDataTypes[]) => [...pre, data]);
    });

    socket.on('count_reflect', data => {
      console.log('Received Updated Data through Socket');
      console.log(data);

      setChat((pre: IMsgDataTypes[]) => {
        const post = data.data as IMsgDataTypes;
        const likedUserIds: String[] = data.likedUserIds;
        post.isLiked = likedUserIds.includes(userId);
        console.log('post');
        console.log(post);
        console.log(userId);

        const result = pre.map(item => (item.id === post.id ? post : item));
        return result;
      });
    });
    // });

    socket.on('connect_error', err => {
      console.log(`Socket Server might be down`);
    });

    socket.on('error', err => {
      console.log(`Socket Error`);
      console.log(err.stack);
    });
  }, [socket]);

  const submitHandler: SubmitHandler<PostFormInput> = async (data, e) => {
    e?.target.reset();

    const postData: AxiosResponse = await axios.post(
      'http://localhost:3000/api/topic',
      {
        msg: data.title,
      }
    );

    console.log('Respnse from server');
    console.log(postData);
    setChat((pre: IMsgDataTypes[]) => [...pre, postData.data.topic]);

    socket.emit('send_msg', postData.data.topic);
  };

  const handleClick = async (key: string, isLiked: boolean) => {
    const result: AxiosResponse = await axios.post(
      `http://localhost:3000/api/topic/like-unlike/${key}`,
      {
        isLiked: !isLiked,
      }
    );
    const data: ResponseData = result.data;
    // const post = data.responseData as IMsgDataTypes;
    // const likedUserIds: string[] = data.data;

    setChat((pre: IMsgDataTypes[]) => {
      const post = data.responseData as IMsgDataTypes;
      const likedUserIds: String[] = data.data;
      post.isLiked = likedUserIds.includes(userId);
      console.log('post');
      console.log(post);
      console.log(userId);

      const result = pre.map(item => (item.id === post.id ? post : item));
      return result;
    });

    socket.emit('count_updated', {
      data: data.responseData,
      likedUserIds: data.data,
    });

    // setChat((pre: IMsgDataTypes[]) => {
    //   const post = data.responseData as IMsgDataTypes;
    //   const likedUserIds: string[] = data.data;
    //   socket.emit('count_updated', { data: data.responseData, likedUserIds });
    //   if (session) {
    //     const userId = session.user.id;
    //     post.isLiked = likedUserIds.includes(userId);
    //   }
    //   const result = pre.map(item => (item.id === key ? post : item));
    //   return result;
    // });
  };

  return (
    <div>
      <PostForm onSubmit={submitHandler} />
      <PostList chat={chat} handleClick={handleClick} />
    </div>
  );
};

export default SocketSetup;
