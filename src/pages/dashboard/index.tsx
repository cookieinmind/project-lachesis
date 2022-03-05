import MainLayout from '@/components/layouts/MainLayout';
import { DashboardRoutes, GetStoryRoute } from '@/models/Routers';
import React, { useEffect, useMemo, useState } from 'react';
import {
  CreateUserModel,
  GetUserStoriesWithIds,
} from '@/firebase/FirebaseMethods';
import { useQuery } from 'react-query';
import { useAuth } from '@/context/AuthContextProvider';
import { Loading } from '@/components/utilis/Loading';
import Searchbar from '@/components/utilis/Searchbar';
import { useRouter } from 'next/router';
import { PublicUserData, Story } from '@/models/ServerModels';
import { IconButton } from '@/components/utilis/IconButton';

export default function Dashboard() {
  //*State
  const router = useRouter();
  const { user, signInAnon } = useAuth();
  const [searchText, setSearchText] = useState<string>('');

  //*Queries
  const { data: storiesData } = useQuery(
    ['users stories'],
    () => GetUserStoriesWithIds(user.uid),
    {
      enabled: !!user,
      onSuccess: () => console.log('got the stories!!'),
    }
  );

  //*Memos
  const stories: Story[] = useMemo((): Story[] => {
    if (!storiesData?.stories) return [];
    const _stories = storiesData.stories;
    if (searchText === '') return _stories;

    return _stories.filter((s) => s.title.includes(searchText));
  }, [storiesData, searchText]);

  function newStory() {
    router.push(DashboardRoutes.Create);
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
    <div className="flex flex-col gap-5 h-full">
      <div className="sticky top-4 z-50">
        <Searchbar
          text={searchText}
          setText={setSearchText}
          placeholder={'Search through your stories'}
          color="bg-blue"
        />
      </div>
      {/* Stories */}
      <div className="flex flex-col gap-4 pb-24">
        <IconButton icon="add" label="new story" onClick={newStory} />
        {stories?.length > 0 &&
          stories.map((story, i) => {
            const numChaps = story.chapters_ids.length;
            const chapsLabel = numChaps !== 1 ? 'chapters' : 'chapter';

            function goToStory() {
              router.push(GetStoryRoute(storiesData.ids[i]));
            }

            return (
              <div
                className="bg-surface border-onSurface border-3 w-full flex justify-between  py-2 px-4 rounded-xl"
                key={i}
              >
                {/* Text */}
                <div className="flex flex-col">
                  <span className="text-lg font-display">{story.title}</span>
                  <span className="opacity-50 text-sm font-medium">
                    {numChaps} {chapsLabel}
                  </span>
                </div>

                {/* Go button */}
                <IconButton icon="create" color="bg-blue" onClick={goToStory} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
