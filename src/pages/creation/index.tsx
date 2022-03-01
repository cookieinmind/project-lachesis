import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContextProvider';
import { AddNewStory, CreateUserModel } from '../../firebase/FirebaseMethods';
import { PublicUserData, Story } from '../../models/ServerModels';
import { useRouter } from 'next/router';
import { CreationRoutes } from '../../models/Routers';

export default function CreatorIndex() {
  const [title, setTitle] = useState<string>();
  const { user, signInAnon } = useAuth();
  const router = useRouter();

  async function createStory() {
    if (!user) {
      const u = await signInAnon();
      console.log(u);
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
      author_uid: user.uid,
      chapters_ids: [],
    };

    const id = await AddNewStory(story);
    router.push(CreationRoutes.dashboard + '/' + id);
  }

  return (
    <>
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

CreatorIndex.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
