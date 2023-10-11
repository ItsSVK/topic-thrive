import SignInForm from '@/components/form/SignInForm';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/admin');
  }

  return (
    <div className="w-full">
      <SignInForm />
    </div>
  );
};

export default page;
