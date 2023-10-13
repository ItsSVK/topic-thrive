import DashboardComponent from '@/components/ui/Dashboard';
import { authOptions } from '@/lib/auth';
import { NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const AdminDashboardPage: NextPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/sign-in');
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl">
        {session && `Welcome ${session.user.username} To Dashboard`}
      </h2>
      <p className="mt-5">You can join any user's space with their Space ID</p>
      <DashboardComponent userId={session.user.id} />
    </div>
  );
};

export default AdminDashboardPage;
