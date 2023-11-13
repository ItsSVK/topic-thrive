import { IMsgDataTypes } from '@/types';
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
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24">
        <FlipMove
          className="flex flex-wrap -m-2"
          staggerDurationBy="30"
          duration={500}
          enterAnimation={'accordionVertical'}
          leaveAnimation={'accordionVertical'}
        >
          {chat.map(({ id, msg, count, isLiked }) => (
            <button
              className="p-2 lg:w-1/3 md:w-1/2 w-full"
              onClick={() => handleClick(id, isLiked)}
              key={id}
              disabled={isLoadingPostTopicLike}
            >
              <div
                className={`h-full flex items-center border p-4 rounded-lg ${
                  isLiked ? 'bg-indigo-200' : 'border-gray-200'
                } ${
                  isLoadingPostTopicLike
                    ? isLiked
                      ? 'bg-indigo-100'
                      : 'bg-slate-200'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="w-1/4">
                  <span
                    className={`w-16 h-16 ${
                      isLiked ? 'bg-white' : 'bg-gray-300'
                    } rounded-full mr-4 flex justify-center items-center`}
                  >
                    {count}
                  </span>
                </div>
                <h2 className="text-gray-900 title-font font-medium w-3/4 break-words overflow-hidden">
                  {msg}
                </h2>
              </div>
            </button>
          ))}
        </FlipMove>
      </div>
    </section>
  );
};

export default PostList;
