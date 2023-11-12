'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SigninSchema } from '@/schemas/SigninForm.schema';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: submitSignIn, isLoading: isLoadingSubmit } = useMutation({
    mutationFn: (values: any) => {
      return signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });
    },
    onSuccess: signInData => {
      if (signInData?.error) {
        if (signInData?.error === 'CredentialsSignin') {
          toast.error('Wrong credentails', {
            description: 'Please provide correct credentials',
          });
        } else {
          toast.error('Something went wrong', {
            description: 'Failed to proceed your request, Please try again',
          });
        }
      } else {
        toast.success('Login Successful', {
          description: 'Redirecting you to dashboard',
        });
        router.push('/admin');
        router.refresh();
      }
    },
    onError: (error: any) => {
      console.error(error);
      toast.error('Something went wrong', {
        description: 'Failed to proceed your request, Please try again',
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof SigninSchema>) => {
    submitSignIn(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full mt-6"
          type="submit"
          disabled={isLoadingSubmit}
        >
          {isLoadingSubmit ? 'Please wait ...' : 'Sign in'}
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
