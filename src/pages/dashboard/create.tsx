import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContextProvider';
import { AddNewStory, CreateUserModel } from '../../firebase/FirebaseMethods';
import { PublicUserData, Story } from '../../models/ServerModels';
import { useRouter } from 'next/router';
import { DashboardRoutes, GetStoryRoute } from '../../models/Routers';
import { IconButton } from '@/components/utilis/IconButton';

export default function CreateStory() {
  const [title, setTitle] = useState<string>();
  const { user, signInAnon } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function createStory() {
    setIsLoading(true);
    let uid: string = user?.uid;
    if (!user) {
      const u = await signInAnon();
      console.log(u);
      uid = u.uid;
      //create a user file.
      const userModel: PublicUserData = {
        username: `anon`,
        storiesPlaying: [],
      };
      await CreateUserModel(u.uid, userModel);
    }

    const story: Story = {
      title,
      description: '',
      author_uid: uid,
      chapters_ids: [],
      tutorialFinished: false,
    };

    const id = await AddNewStory(story);
    const link = GetStoryRoute(id);
    console.log('-', story);
    router.push(link);
    setIsLoading(false);
  }

  const goBack = () => router.back();

  return (
    <>
      <header className="w-full flex gap-4 items-center bg-blue p-2 mb-4 border-b-3 border-onSurface">
        <IconButton icon="arrow_back" onClick={goBack} />
        <h1 className="text-xl font-display">New story</h1>
      </header>

      <main className="p-2 flex flex-col justify-between gap-16">
        <div className="center flex-col gap-4">
          <h2 className="text-2xl">Give your story a name</h2>
          <input
            type="text"
            className="bg-transparent min-w-[50%] text-center
            focus:ring-0 focus:opacity-100             
            opacity-75 border-b-2 border-t-0 border-x-0 
            focus:border-onSurface
            "
            value={title}
            onChange={(e) => {
              if (e.target.value === '') setTitle(undefined);
              else setTitle(e.target.value);
            }}
          />
          <p className="opacity-50">
            {"(you can change it later, don't mind it too much)"}
          </p>
        </div>
        <IconButton
          icon="arrow_forward"
          onClick={createStory}
          label={'continue'}
          color="bg-green"
          disabled={title === undefined}
          loadingState={{
            isLoading: isLoading,
            loadingLabel: 'creating...',
          }}
        />
      </main>
    </>
  );
}

// CreateStory.getLayout = function getLayout(page) {
//   return <MainLayout>{page}</MainLayout>;
// };
