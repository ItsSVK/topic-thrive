'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-0">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Type Your Topic</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      aria-describedby="title"
                      {...form.register('title', { required: true })}
                      placeholder="Test Topic"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isLoadingPostTopic ? (
            <Button className="w-full mt-6" disabled>
              Please wait ...
            </Button>
          ) : (
            <Button className="w-full mt-6" type="submit" disabled={!allowPost}>
              Post It
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default PostForm;
