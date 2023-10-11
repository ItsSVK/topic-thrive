'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProviderInterface {
  children: ReactNode;
}

export const Provider: React.FC<ProviderInterface> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
