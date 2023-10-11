'use client';
import { signOut } from 'next-auth/react';
import { Button, buttonVariants } from './ui/button';

export const UserAccountnav: React.FC = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
      className={buttonVariants({ variant: 'destructive' })}
    >
      Sign Out
    </Button>
  );
};

export default UserAccountnav;
