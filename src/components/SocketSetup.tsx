'use client';
import PostForm from './form/PostForm';
import { useEffect, useId, useState } from 'react';
import { IMsgDataTypes, PostFormInput, ResponseData } from '@/types';
import { SubmitHandler } from 'react-hook-form';
import PostList from './PostList';
import axios, { AxiosResponse } from 'axios';
import { socket } from '@/lib/socket';
import { pusherClient, pusherServer } from '@/lib/pusher';

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

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind('receive_msg', (data: IMsgDataTypes) => {
      setChat((pre: IMsgDataTypes[]) => [...pre, data]);
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

    // pusherClient.send_event('count_reflect', roomId)

    // socket.emit('join_room', roomId);
    // socket.on('receive_msg', (data: IMsgDataTypes) => {
    //   setChat((pre: IMsgDataTypes[]) => [...pre, data]);
    // });

    // socket.on('count_reflect', data => {
    //   setChat((pre: IMsgDataTypes[]) => {
    //     const post = data.data as IMsgDataTypes;
    //     const likedUserIds: String[] = data.likedUserIds;
    //     post.isLiked = likedUserIds.includes(userId);
    //     const result = pre.map(item => (item.id === post.id ? post : item));
    //     return result;
    //   });
    // });
    // // });

    // socket.on('connect_error', err => {
    //   console.log(`Socket Server might be down`);
    // });

    // socket.on('error', err => {
    //   console.log(`Socket Error`);
    //   console.log(err.stack);
    // });
  }, [roomId]);

  // useEffect(() => {
  //   socket.emit('join_room', roomId);
  //   socket.on('receive_msg', (data: IMsgDataTypes) => {
  //     setChat((pre: IMsgDataTypes[]) => [...pre, data]);
  //   });

  //   socket.on('count_reflect', data => {
  //     setChat((pre: IMsgDataTypes[]) => {
  //       const post = data.data as IMsgDataTypes;
  //       const likedUserIds: String[] = data.likedUserIds;
  //       post.isLiked = likedUserIds.includes(userId);
  //       const result = pre.map(item => (item.id === post.id ? post : item));
  //       return result;
  //     });
  //   });
  //   // });

  //   socket.on('connect_error', err => {
  //     console.log(`Socket Server might be down`);
  //   });

  //   socket.on('error', err => {
  //     console.log(`Socket Error`);
  //     console.log(err.stack);
  //   });
  // }, [socket]);

  const submitHandler: SubmitHandler<PostFormInput> = async (data, e) => {
    e?.target.reset();

    const postData: AxiosResponse = await axios.post('/api/topic', {
      msg: data.title,
      roomId,
    });

    // setChat((pre: IMsgDataTypes[]) => [...pre, postData.data.topic]);

    // pusherClient.send_event('send_msg', postData.data.topic);
  };

  const handleClick = async (key: string, isLiked: boolean) => {
    const result: AxiosResponse = await axios.post(
      `/api/topic/like-unlike/${key}`,
      {
        isLiked: !isLiked,
      }
    );
    const data: ResponseData = result.data;
    // const post = data.responseData as IMsgDataTypes;
    // const likedUserIds: string[] = data.data;

    // setChat((pre: IMsgDataTypes[]) => {
    //   const post = data.responseData as IMsgDataTypes;
    //   const likedUserIds: String[] = data.data;
    //   post.isLiked = likedUserIds.includes(userId);
    //   const result = pre.map(item => (item.id === post.id ? post : item));
    //   return result;
    // });

    // pusherClient.send_event('count_updated', {
    //   data: data.responseData,
    //   likedUserIds: data.data,
    // });
    // socket.emit('count_updated', {
    //   data: data.responseData,
    //   likedUserIds: data.data,
    // });

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
