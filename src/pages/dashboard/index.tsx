import Layout from '@/components/Layout';
import { DashboardRoutes, GetStoryRoute, MainRoutes } from '@/models/Routers';
import Link from 'next/link';
import React from 'react';
import { GetUserStoriesWithIds } from '@/firebase/FirebaseMethods';
import { useQuery } from 'react-query';
import { useAuth } from '@/context/AuthContextProvider';
import { Loading } from '@/components/utilis/Loading';

export default function Dashboard() {
  const { user } = useAuth();
  const { data: storiesData } = useQuery(
    ['users stories'],
    () => GetUserStoriesWithIds(user.uid),
    {
      enabled: !!user,
    }
  );

  if (!storiesData) return <Loading />;

  return (
    <div className="center flex-col gap-8 h-full">
      <div className="text-center">
        <h1 className="text-3xl">Dashboard</h1>
        <div className="opacity-50 center flex-col gap-2">
          <span className="material-icons">warning</span>
          <p>
            {
              "your stories are save in the cloud, but you will lose access to them if you don't "
            }
            <span className="underline">{'sign up >'}</span>
          </p>
        </div>
      </div>
      <Link href={DashboardRoutes.Create}>{'Create new one >'}</Link>
      <div className="center flex-col gap-4">
        <h2 className="text-xl opacity-50">Yours stories:</h2>
        {storiesData &&
          storiesData.stories.map((story, i) => {
            return (
              <Link href={GetStoryRoute(storiesData.ids[i])} key={i}>
                {`${story.title} >`}
              </Link>
            );
          })}
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
