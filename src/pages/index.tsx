import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '../context/AuthContextProvider';
import Image from 'next/image';
import { HomeNav } from '@/components/home/HomeNav';
import { HomeCard } from '@/components/home/HomeCard';
import { useEffect, useState } from 'react';
import Searchbar from '@/components/utilis/Searchbar';
import { PublicUserData } from '@/models/ServerModels';
import { CreateUserModel } from '@/firebase/FirebaseMethods';

const DUMMY_PIC_URL =
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60';

export default function Home() {
  const { user, signInAnon } = useAuth();
  const [text, setText] = useState<string>();

  const photoURL = user?.photoURL ? user.photoURL : DUMMY_PIC_URL;

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

  return (
    <div className="h-full flex flex-col gap-8  p-2">
      {/* Hero text */}
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-5xl font-light leading-[60px]">
          Welcome to
          <br />
          <span>Project</span>
          <br />
          <span>Lachesis</span>
        </h1>
        <div className="flex flex-col gap-2">
          <p>Choose-your-own-adventure light novels</p>
          <p>Get paid for writing</p>
        </div>
      </div>

      {photoURL && (
        <figure
          className="aspect-square rounded-full overflow-hidden fixed top-2 right-2
        w-12 h-12 border-3 border-onSurface"
        >
          <Image
            src={photoURL}
            width={40}
            height={40}
            alt="profile picture of the user"
            layout="fill"
            objectFit="cover"
          />
        </figure>
      )}

      <nav className="flex flex-col gap-4">
        <Searchbar text={text} setText={setText} />
        <HomeNav />
      </nav>

      <div className="flex flex-col gap-2">
        <HomeCard
          title="Top books"
          subtitle="check out the top 50 books"
          bgColor="bg-blue"
        />
        <HomeCard
          title="Top authors"
          subtitle="Authors with the most readers per month"
          bgColor="bg-yellow"
        />
        <HomeCard
          title="Create a story"
          subtitle="Write and get paid"
          bgColor="bg-salmon"
        />
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
