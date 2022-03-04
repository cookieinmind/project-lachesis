import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '../../context/AuthContextProvider';
import { AddNewStory, CreateUserModel } from '../../firebase/FirebaseMethods';
import { PublicUserData, Story } from '../../models/ServerModels';
import { useRouter } from 'next/router';
import { DashboardRoutes, GetStoryRoute } from '../../models/Routers';

export default function CreateStory() {
  const [title, setTitle] = useState<string>();
  const { user, signInAnon } = useAuth();
  const router = useRouter();

  async function createStory() {
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
  }

  return (
    <>
      {/* <button
        className="text-xl disabled:opacity-50"
        onClick={() => router.back()}
      >
        {'< back'}
      </button> */}
      {/* Pick a title */}
      <div className="h-full center flex-col gap-16">
        {/* Title */}
        <div className="center flex-col gap-4">
          <h1 className="text-2xl">Give your story a name</h1>
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

        <button
          className="text-xl disabled:opacity-50"
          onClick={createStory}
          disabled={title === undefined}
        >
          {'Continue >'}
        </button>
      </div>
    </>
  );
}

CreateStory.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
