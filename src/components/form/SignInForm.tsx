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
import { useToast } from '../ui/use-toast';
import { SigninSchema } from '@/schemas/SigninForm.schema';
import { useMutation } from '@tanstack/react-query';

const SignInForm = () => {
  const { toast } = useToast();
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
      if (signInData?.error === 'CredentialsSignin') {
        toast({
          title: 'Wrong credentails',
          description: 'Please provide correct credentials',
          variant: 'destructive',
          duration: 2000,
        });
      } else {
        router.refresh();
        router.push('/admin');
      }
    },
    onError: (error: any) => {
      console.error(error);
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
        description: 'Failed to proceed your request, Please try again',
        duration: 1000,
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof SigninSchema>) => {
    submitSignIn(values);

    // const signInData = await signIn('credentials', {
    //   email,
    //   password,
    //   redirect: false,
    // });

    // if (signInData?.error) {
    //   const errors = { title: 'Error', description: 'Something went Wrong' };
    //   if (signInData?.error === 'CredentialsSignin') {
    //     errors.title = 'Invalid Credentails';
    //     errors.description = 'Please provide correct credentials';
    //   }
    //   toast({
    //     ...errors,
    //     variant: 'destructive',
    //   });
    //   console.log(signInData.error);
    // } else {
    //   router.refresh();
    //   router.push('/admin');
    // }
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
