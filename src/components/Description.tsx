'use client';
import axios from 'axios';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export type DescriptionComponentProps = {
  pathId: String;
  userId: String;
  username: String;
  spaceUsername: String;
};
export const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  pathId,
  userId,
  spaceUsername,
  username,
}) => {
  const { toast } = useToast();

  const clearTopic = async () => {
    await axios.post('/api/topic/clear');
  };

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
            <Button
              onClick={() => clearTopic()}
              className="mt-6"
              type="button"
              variant="destructive"
            >
              Clear Topics
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionComponent;
