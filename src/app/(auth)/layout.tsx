import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <img className="w-96 mb-32" src="/topicthrive.png" alt="" />
      <div className="bg-slate-200 p-10 rounded-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
