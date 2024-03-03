'use client';
import { GithubIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface GithubProfileData {
  avatar_url: string;
  created_at: string;
  name: string;
  html_url: string;
  login: string;
}

export function AvaterHoverCard() {
  const [githubProfile, setGithubProfile] = useState<GithubProfileData | null>(
    null
  );

  const { mutate: checkSpaceMutation, isLoading: isLoadingCheckSpace } =
    useMutation({
      mutationFn: () => {
        return axios.get(`https://api.github.com/users/ItsSVK`);
      },
      onError: error => {
        console.error(error);
      },
      onSuccess: (data: { data: GithubProfileData }) => {
        setGithubProfile(data.data);
      },
    });

  useEffect(() => {
    checkSpaceMutation();
  }, []);

  const handleClick = () => {
    window.open(githubProfile?.html_url, '_blank');
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-base font-semibold">
          Shouvik Mohanta
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-50">
        <div className="flex justify-between space-x-4">
          <Avatar className="cursor-pointer">
            <AvatarImage
              onClick={handleClick}
              src={githubProfile?.avatar_url}
            />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="">
            <h4
              className="text-sm font-semibold cursor-pointer"
              onClick={handleClick}
            >
              {githubProfile?.name}
            </h4>
            <div className="flex items-center pt-2">
              <GithubIcon className="h-4 w-4 mr-1" />
              <p className="text-sm cursor-pointer" onClick={handleClick}>
                @{githubProfile?.login}
              </p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
