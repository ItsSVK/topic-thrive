'use client';
import { redirect, useRouter } from 'next/navigation';
import { Button } from './button';
import { Input } from './input';
import { useState } from 'react';

interface DashboardComponentProps {
  userId: string;
}

export const DashboardComponent: React.FC<DashboardComponentProps> = ({
  userId,
}) => {
  const router = useRouter();

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
              router.push(`/space/${space}`);
              router.refresh();
            }
          }}
          className="min-w-[150px]"
        >
          Join Space
        </Button>
      </div>
      <p className="mt-5">OR</p>
      <p>Can explore your Space</p>
      <Button
        onClick={() => {
          router.push(`/space/${userId}`);
          router.refresh();
        }}
        className="mt-5"
      >
        My Space
      </Button>
    </div>
  );
};

export default DashboardComponent;
