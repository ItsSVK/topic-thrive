import { Button } from './ui/button';
import { IMsgDataTypes } from '@/types';
import { Badge } from './ui/badge';
import FlipMove from 'react-flip-move';

export type PostListProps = {
  chat: IMsgDataTypes[];
  handleClick: Function;
  isLoadingPostTopicLike: boolean;
};
export const PostList: React.FC<PostListProps> = ({
  chat,
  handleClick,
  isLoadingPostTopicLike,
}) => {
  return (
    <div>
      <FlipMove
        className="flex flex-col gap-4 mt-10"
        staggerDurationBy="30"
        duration={500}
        enterAnimation={'accordionVertical'}
        leaveAnimation={'accordionVertical'}
      >
        {chat.map(({ id, msg, count, isLiked }) => (
          <Button
            className="mt-1"
            type="button"
            onClick={() => handleClick(id, isLiked)}
            key={id}
            disabled={isLoadingPostTopicLike}
            variant={isLiked ? 'default' : 'outline'}
          >
            <Badge variant={isLiked ? 'secondary' : 'outline'}>{count}</Badge>
            {isLoadingPostTopicLike ? 'Please wait ...' : msg}
          </Button>
        ))}
      </FlipMove>
    </div>
  );
};

export default PostList;
