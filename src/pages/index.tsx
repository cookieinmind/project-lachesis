import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { DashboardRoutes, MainRoutes } from '../models/Routers';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContextProvider';
import Image from 'next/image';
import Shadow from '@/components/utilis/Shadow';
import { HomeNav } from '@/components/home/HomeNav';
import { HomeCard } from '@/components/home/HomeCard';
import { useState } from 'react';
import Searchbar from '@/components/home/Searchbar';

export default function Home() {
  const { user, logOut } = useAuth();
  const [text, setText] = useState<string>();

  const photoURL = user?.photoURL;

  return (
    <div className="h-full flex flex-col gap-8  p-2">
      {/* Hero text */}
      <div className="text-center center flex-col gap-4">
        <h1 className="font-display text-5xl font-light leading-[64px]">
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
        <figure>
          <Image src={photoURL} width={40} height={40} alt="profile picture" />
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
  return <Layout>{page}</Layout>;
};
