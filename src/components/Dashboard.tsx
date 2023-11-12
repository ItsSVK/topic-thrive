'use client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

interface DashboardComponentProps {
  userId: string;
  username: string;
}

export const DashboardComponent: React.FC<DashboardComponentProps> = ({
  userId,
  username,
}) => {
  const router = useRouter();

  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [btnDisableText, setBtnDisableText] = useState<string>('My Space');

  const [space, setSpace] = useState<string>('');

  const { mutate: checkSpaceMutation, isLoading: isLoadingCheckSpace } =
    useMutation({
      mutationFn: (space: string) => {
        return axios.get(`/api/topic/check/${space}`);
      },
      onError: error => {
        console.error(error);
        toast.error('Something went wrong', {
          description: 'Failed to proceed your request, Please try again',
        });
      },
      onSuccess: data => {
        if (data.data.data) {
          router.refresh();
          router.push(`/space/${space}`);
        } else {
          toast.info('Space is not found', {
            description:
              'Space with given SpaceID could not be found, please recheck',
          });
        }
      },
    });

  const handleClick = () => checkSpaceMutation(space);

  return (
    <section className="text-gray-600 body-font mt-20">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="/cover.jpg"
          ></img>
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Hi {username}, Welcome to <b>Topic-Thrive</b>
          </h1>
          <p className="mb-8 leading-relaxed">
            Here you can connect with your team members/colleagues/students and
            have conversations about the Topics other's have, And finally can
            decide which are the Topics everyone is interested to discuss, with
            votes.
          </p>
          <div className="flex w-full md:justify-start justify-center items-end mt-5">
            <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
              <label className="leading-7 text-sm text-gray-600">
                Space/Meeting ID
              </label>
              <Input
                type="text"
                onChange={e => {
                  setSpace(e.target.value);
                }}
                placeholder="Enter SpaceID you received from meeting Host"
              />
            </div>
            <Button
              onClick={() => {
                if (space !== '') handleClick();
              }}
              disabled={isLoadingCheckSpace}
              className="min-w-[150px] inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-md text-sm"
            >
              {isLoadingCheckSpace ? 'Please Wait ...' : 'Join Space'}
            </Button>
          </div>
          <p className="text-xs mt-2 text-gray-500 mb-4 w-full italic">
            eg: clnfprdmb0000ydhq9x4pak8v
          </p>
          <div className="flex w-full md:justify-start justify-center items-center">
            <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
              Or to Invite others to your space, click here
            </div>
            <Button
              onClick={() => {
                setBtnDisable(true);
                setBtnDisableText('Please Wait ...');
                router.push(`/space/${userId}`);
                router.refresh();
              }}
              disabled={btnDisable}
              className="min-w-[150px] inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-md text-sm"
            >
              {btnDisableText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardComponent;
