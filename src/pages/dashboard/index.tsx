import MainLayout from '@/components/layouts/MainLayout';
import { DashboardRoutes, GetStoryRoute, MainRoutes } from '@/models/Routers';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  CreateUserModel,
  GetUserStoriesWithIds,
} from '@/firebase/FirebaseMethods';
import { useQuery } from 'react-query';
import { useAuth } from '@/context/AuthContextProvider';
import { Loading } from '@/components/utilis/Loading';
import Searchbar from '@/components/utilis/Searchbar';
import Shadow from '@/components/utilis/Shadow';
import { useRouter } from 'next/router';
import { PublicUserData } from '@/models/ServerModels';

export default function Dashboard() {
  const { user, signInAnon } = useAuth();
  const { data: storiesData } = useQuery(
    ['users stories'],
    () => GetUserStoriesWithIds(user.uid),
    {
      enabled: !!user,
    }
  );
  const router = useRouter();

  const [searchText, setSearchText] = useState<string>();

  function newStory() {
    router.push(MainRoutes.create);
  }

  useEffect(() => {
    async function createUser() {
      const u = await signInAnon();
      console.log(u);
      //create a user file.
      const userModel: PublicUserData = {
        username: `anon`,
        storiesPlaying: [],
      };
      await CreateUserModel(u.uid, userModel);
    }

    if (!user) createUser();
  }, [user, signInAnon]);

  if (!storiesData) return <Loading />;

  return (
    <div className="p-2 flex flex-col gap-4 h-full">
      <Searchbar
        text={searchText}
        setText={setSearchText}
        placeholder={'Search through your stories'}
        color="bg-blue"
      />
      <Shadow color="bg-surface">
        <button
          className="bg-surface border-3 border-onSurface py-2 px-4 rounded-xl flex items-center gap-2"
          onClick={newStory}
        >
          <span className="material-icons text-lg">add</span>
          <span>New story</span>
        </button>
      </Shadow>
      {/* Stories */}
      {storiesData && storiesData.stories.length > 0 && (
        <div className="flex flex-col gap-4 h-full">
          {storiesData.stories.map((story, i) => {
            const numChaps = story.chapters_ids.length;
            const chapsLabel = numChaps > 1 ? 'chapters' : 'chapter';

            function goToStory() {
              router.push(GetStoryRoute(storiesData.ids[i]));
            }

            return (
              <Shadow color="bg-orange" key={i}>
                <button
                  onClick={goToStory}
                  className="border-3 border-onSurface py-2 px-4 rounded-xl 
                capitalize w-fit flex items-end flex-col bg-surface"
                >
                  <span className="text-lg font-display">{story.title}</span>
                  <span className="opacity-50 text-sm font-medium ">
                    {numChaps} {chapsLabel}
                  </span>
                </button>
              </Shadow>
            );
          })}
        </div>
      )}{' '}
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

//  <p>
//    {
//      "your stories are save in the cloud, but you will lose access to them if you don't "
//    }
//    <span className="underline">{'sign up >'}</span>
//  </p>;

//<Link href={DashboardRoutes.Create}>{'Create a story >'}</Link>
