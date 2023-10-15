'use client';
import { redirect, useRouter } from 'next/navigation';
import { Button } from './button';
import { Input } from './input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

interface DashboardComponentProps {
  userId: string;
}

export const DashboardComponent: React.FC<DashboardComponentProps> = ({
  userId,
}) => {
  const router = useRouter();

  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [btnDisableText, setBtnDisableText] = useState<string>('My Space');
  const [btnjoinDisable, setBtnjoinDisable] = useState<boolean>(false);
  const [btnjoinDisableText, setBtnjoinDisableText] =
    useState<string>('Join Space');

  const [space, setSpace] = useState<String>('');

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
            if (space !== '') {
              setBtnjoinDisable(true);
              setBtnjoinDisableText('Please Wait ...');
              router.push(`/space/${space}`);
              router.refresh();
            }
          }}
          disabled={btnjoinDisable}
          className="min-w-[150px]"
        >
          {btnjoinDisableText}
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
