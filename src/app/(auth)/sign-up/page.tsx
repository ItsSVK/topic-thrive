import SignUpForm from '@/components/form/SignUpForm';
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
      <SignUpForm />
    </div>
  );
};

export default page;
