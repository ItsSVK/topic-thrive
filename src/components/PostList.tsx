import { Button } from './ui/button';
import { IMsgDataTypes } from '@/types';
import { Badge } from './ui/badge';

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
    <div className="flex flex-col gap-4 mt-10">
      {chat.map(({ id, msg, count, isLiked }) => {
        return (
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
        );
      })}
    </div>
  );
};

export default PostList;
