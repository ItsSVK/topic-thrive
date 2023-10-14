import { Button } from './ui/button';
import { IMsgDataTypes } from '@/types';
import { Badge } from './ui/badge';

export type PostListProps = {
  chat: IMsgDataTypes[];
  handleClick: Function;
};
export const PostList: React.FC<PostListProps> = ({ chat, handleClick }) => {
  return (
    <div className="flex flex-col gap-4 mt-10">
      {chat.map(({ id, msg, count, isLiked }) => (
        <Button
          onClick={() => handleClick(id, isLiked)}
          className="mt-1"
          type="button"
          key={id}
          variant={isLiked ? 'default' : 'outline'}
        >
          <Badge variant={isLiked ? 'secondary' : 'outline'}>{count}</Badge>
          {msg}
        </Button>
      ))}
    </div>
  );
};

export default PostList;
