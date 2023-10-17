'use client';
import { redirect, useRouter } from 'next/navigation';
import { Button } from './button';
import { Input } from './input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from './use-toast';

interface DashboardComponentProps {
  userId: string;
}

export const DashboardComponent: React.FC<DashboardComponentProps> = ({
  userId,
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [btnDisableText, setBtnDisableText] = useState<string>('My Space');

  const [space, setSpace] = useState<string>('');

  const { mutate: checkSpaceMutation, isLoading: isLoadingCheckSpace } =
    useMutation({
      mutationFn: (space: string) => {
        return axios.get(`/api/topic/check/${space}`);
      },
      onError: error => {
        console.error(error);
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
          description: 'Failed to proceed your request, Please try again',
          duration: 1000,
        });
      },
      onSuccess: data => {
        if (data.data.data) {
          router.refresh();
          router.push(`/space/${space}`);
        } else {
          toast({
            title: 'Space is not found',
            variant: 'destructive',
            description:
              'Space with given SpaceID could not be found, please recheck',
            duration: 2000,
          });
        }
      },
    });

  const handleClick = () => checkSpaceMutation(space);

  return (
    <div className="flex w-full mt-5 max-w-sm items-center space-x-2 flex-col">
      <div className="flex gap-3">
        <Input
          type="text"
          onChange={e => {
            setSpace(e.target.value);
          }}
          placeholder="Space ID"
        />
        <Button
          onClick={() => {
            if (space !== '') handleClick();
          }}
          disabled={isLoadingCheckSpace}
          className="min-w-[150px]"
        >
          {isLoadingCheckSpace ? 'Please Wait ...' : 'Join Space'}
        </Button>
      </div>
      <p className="mt-5">OR</p>
      <p>Can explore your Space</p>
      <Button
        onClick={() => {
          setBtnDisable(true);
          setBtnDisableText('Please Wait ...');
          router.push(`/space/${userId}`);
          router.refresh();
        }}
        disabled={btnDisable}
        className="mt-5"
      >
        {btnDisableText}
      </Button>
    </div>
  );
};

export default DashboardComponent;
