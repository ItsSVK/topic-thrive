import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserAccountnav from './UserAccountnav';
import Help from './Help';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/admin">
          {/* <Subtitles /> */}
          <img className="w-10" src="/topicthrive-icon.png" alt="" />
        </Link>
        <div className="flex gap-8">
          {session?.user ? (
            <UserAccountnav />
          ) : (
            <div className="flex gap-3">
              <Link className={buttonVariants()} href="/sign-in">
                Sign in
              </Link>
              <Link className={buttonVariants()} href="/sign-up">
                Sign up
              </Link>
            </div>
          )}
          <Help />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
