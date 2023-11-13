import { HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export const Help: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <HelpCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[725px] lg:max-w-[1000px] xl:max-w-[1300px] overflow-y-scroll max-h-screen mt-10 pb-10">
        <DialogHeader>
          <DialogTitle className="md:text-lg">
            What is this platform about, and what things I can do here:
          </DialogTitle>
          <DialogDescription className="md:text-base">
            Well, Sometimes in a large group like in online class or meeting, we
            couldn't figure out what Topic to talk, everyone gives different
            Topics they interested to talk on. The idea is to provide you a
            platform, where you can host a Meeting/Space, and everyone can Post
            their Topics/Thoughts. And you can discuss and decide the Topics
            your team actually interested to talk to based on everyone's votes.
          </DialogDescription>
        </DialogHeader>
        <br />
        <DialogHeader>
          <DialogTitle className="md:text-lg">
            What things I can do, if I'm hosting my Space:
          </DialogTitle>
          <DialogDescription className="md:text-base">
            <ul className="list-inside">
              <li className="list-disc text-left">
                You can share you Space/Group ID with your
                teammates/colleagues/students, so they can join the same Space
              </li>
              <li className="list-disc text-left">
                Along with you, everyone can Post/Publish there Topics/Thoughts
                on your Space (unless you explicitly revoke publish rights for
                others, on your space)
              </li>
              <li className="list-disc text-left">
                If you getting to many Posts, You can stop others to Post
                further on your space
              </li>
              <li className="list-disc text-left">
                Once done, you can clear all the Topics/Posts from your Space,
                and start over
              </li>
              <li className="list-disc text-left">
                Everyone can vote the Published Topics/Posts, to see which
                Topic/Post gets the most Votes
              </li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <br />
        <DialogHeader>
          <DialogTitle className="md:text-lg">
            What things I can do, if I'm joining someone's Space:
          </DialogTitle>
          <DialogDescription className="md:text-base">
            <ul className="list-inside">
              <li className="list-disc text-left">
                You can join the Space with their Space ID
              </li>
              <li className="list-disc text-left">
                You can Post your Topics/Thoughts on their Space as much as you
                want (unless the Space host explicitly revoke publish rights for
                others, on their space)
              </li>
              <li className="list-disc text-left">
                You can Vote any Topic/Post on the Space along with the
                Topics/Posts you have posted
              </li>
              <li className="list-disc text-left">
                Once done, Space host can clear all the Topics/Posts from their
                Space, and you will also loose all the Topics/Posts, you Posted
                on their Space
              </li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <br />
        <DialogFooter>
          This platform is Realtime, so everyone can see all the changes in
          Topics/Posts Realtime
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Help;
