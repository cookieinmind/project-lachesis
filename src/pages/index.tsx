import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { DashboardRoutes, MainRoutes } from '../models/Routers';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContextProvider';

export default function Home() {
  const { user, logOut } = useAuth();

  return (
    <div className="h-full center flex-col gap-16">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl">
          Welcome to {process.env.NEXT_PUBLIC_PROJECT_NAME}
        </h1>
        <h2 className="opacity-50">{'find a story >'}</h2>
        <Link href={DashboardRoutes.Create}>{'create a story >'}</Link>
        {user && <Link href={MainRoutes.dashboard}>{'your dashboard >'}</Link>}
      </div>

      {user && <button onClick={logOut}>Log out</button>}
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
