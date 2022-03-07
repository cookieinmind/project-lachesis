import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { GetStory, UpdateStory } from '@/firebase/FirebaseMethods';
import { useAuth } from '@/context/AuthContextProvider';
import DashboardIndex from '@/components/creation/dashboard/DashboardIndex';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TutorialPointsDisplayer } from '@/components/tutorials/TutorialShower';
import { Loading } from '@/components/utilis/Loading';
import { MainRoutes } from '@/models/Routers';
import { TutorialPoint } from '@/models/client/Creation';
import { IconButton } from '@/components/utilis/IconButton';

export default function CreationDashboard() {
  const router = useRouter();
  const { storyId: story_Id } = router.query;

  const { user } = useAuth();
  const { data: story } = useQuery(
    ['story', story_Id],
    () => GetStory(story_Id as string),
    {
      enabled: !!user,
    }
  );

  function GoBack() {
    router.back();
  }

  if (story)
    return (
      <div className="bg-blue relative z-0 h-screen  p-2">
        <nav className="w-full flex justify-between items-center">
          <IconButton
            icon="arrow_back"
            color="bg-surface"
            onClick={() => router.back()}
          />

          <h1 className="font-display text-xl">{story.title}</h1>

          <IconButton
            icon="more_vert"
            color="bg-surface"
            onClick={() => console.error('to implement')}
          />
        </nav>
      </div>
    );

  return <Loading />;
}
