'use client';
import axios from 'axios';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import { useToast } from './ui/use-toast';

export type DescriptionComponentProps = {
  pathId: string;
  userId: String;
  username: String;
  spaceUsername: String;
  allowPost: boolean;
};
export const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  pathId,
  userId,
  spaceUsername,
  username,
  allowPost,
}) => {
  const { toast } = useToast();

  const { mutate: clearTopicMutation, isLoading: isLoadingClear } = useMutation(
    {
      mutationFn: () => {
        return axios.post('/api/topic/clear');
      },
      onError: error => {
        console.error(error);
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
          description: 'Failed to proceed your request, Please try again',
          duration: 1000,
        });
      },
    }
  );

  const { mutate: changeTopicMutation, isLoading: isLoadingChangeTopic } =
    useMutation({
      mutationFn: () => {
        return axios.post('/api/topic/switch', { allow_post: !allowPost });
      },
      onError: error => {
        console.error(error);
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
          description: 'Failed to proceed your request, Please try again',
          duration: 1000,
        });
      },
    });

  const changeTopic = async () => changeTopicMutation();
  const clearTopic = async () => clearTopicMutation();

  return (
    <div>
      <h2 className="text-2xl">
        {userId &&
          `Welcome ${username} To ${
            pathId === userId ? `Your Own Space` : `${spaceUsername}'s Space`
          }`}
      </h2>
      {pathId === userId && (
        <div>
          <h2>
            This is your unique Space Id:{' '}
            <span
              className="text-blue-500 cursor-pointer"
              title="Copy to clipboard"
              aria-label="Copy to clipboard"
              role="button"
              tabIndex={0}
              onClick={() => {
                navigator.clipboard.writeText(userId as string);
                toast({
                  title: 'Space Id copied to clipboard',
                  duration: 1000,
                });
              }}
            >
              {userId}
            </span>
          </h2>
          <div className="flex flex-col align-middle items-center">
            <h2>Share it with your friends to join the same space</h2>
            <div className="flex gap-10">
              {
                <Button
                  onClick={() => clearTopic()}
                  className="mt-6"
                  type="button"
                  variant="destructive"
                  disabled={isLoadingClear}
                >
                  {isLoadingClear ? 'Please wait ...' : 'Clear Topics'}
                </Button>
              }

              <Button
                onClick={() => {
                  changeTopic();
                }}
                className="mt-6"
                type="button"
                disabled={isLoadingChangeTopic}
              >
                {isLoadingChangeTopic
                  ? 'Please wait ...'
                  : allowPost
                  ? 'Disable Topic Posting'
                  : 'Enable Topic Posting'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionComponent;
