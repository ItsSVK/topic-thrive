import DashboardComponent from '@/components/Dashboard';
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
    <DashboardComponent
      userId={session.user.id}
      username={session.user.username}
    />
  );
};

export default AdminDashboardPage;
