'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import React from 'react';
import { PostFormInput } from '@/types';

interface PostFormProps {
  onSubmit: SubmitHandler<PostFormInput>;
  isLoadingPostTopic: boolean;
  allowPost: boolean;
}

const PostForm: React.FC<PostFormProps> = ({
  onSubmit,
  isLoadingPostTopic,
  allowPost,
}) => {
  const form = useForm<PostFormInput>({
    defaultValues: {
      title: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full justify-center items-center lg:flex-row gap-3"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="relative w-full sm:w-96">
              <FormControl>
                <Input
                  id="title"
                  aria-describedby="title"
                  {...form.register('title', { required: true })}
                  className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Type Your Topic"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-3 lg:mt-0 w-44"
          type="submit"
          disabled={isLoadingPostTopic ?? !allowPost}
        >
          {isLoadingPostTopic ? 'Please wait ...' : 'Post It'}
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
