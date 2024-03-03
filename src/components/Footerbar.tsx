import { AvaterHoverCard } from './AvaterHoverCard';

const Footerbar = async () => {
  return (
    <div className=" bg-zinc-50 py-1 border-b border-s-zinc-200 fixed w-full z-10 bottom-0">
      <div className="container flex items-center justify-center">
        Crafted with Care by
        <AvaterHoverCard />
      </div>
    </div>
  );
};

export default Footerbar;
