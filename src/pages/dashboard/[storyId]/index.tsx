import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
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

const tutorialPoints: TutorialPoint[] = [
  {
    title: 'stories are divided in chapters',
    text: [
      'you can have as many chapters as you like.',
      'though, we recommened to keep it short',
      'specially if this is your first one',
    ],
    isThereANext: true,
    buttonText: 'next',
  },
  {
    title: 'this is your index',
    text: [
      'the index is in charge of keeping you organized',
      'all of your chapters will appear in there',
    ],
    isThereANext: true,
    buttonText: 'next',
  },
  {
    title: 'this is your deck',
    text: [
      'the dex is in charge of keeping track of your characters',
      'if you are not into scrolling through all of your chapters to change the name of one character',
      'we recommend using it',
    ],
    isThereANext: true,
    buttonText: 'next',
  },
  {
    title: "let's create your first chapter",
    text: ['Open your index', '(the one on your left ...)'],
    isThereANext: false,
    buttonText: '',
  },
];

export default function CreationDashboard() {
  const router = useRouter();
  const { logOut } = useAuth();
  const { storyId: story_Id } = router.query;

  const { user } = useAuth();
  const { data: story } = useQuery(
    ['story', story_Id],
    () => GetStory(story_Id as string),
    {
      enabled: !!user,
    }
  );

  const [tutIndex, setTutIndex] = useState<number>(0);

  useEffect(() => {
    if (!story) return;

    const isFinishedOnServer = story.tutorialFinished;
    const isFinishedOnClient = tutIndex === tutorialPoints.length - 1;

    if (isFinishedOnClient && !isFinishedOnServer) {
      //Update server
      story.tutorialFinished = true;
      UpdateStory(story_Id as string, story);
    }

    if (!isFinishedOnClient && isFinishedOnServer) {
      //Update client
      setTutIndex(tutorialPoints.length - 1);
    }
  }, [tutIndex, story, story_Id]);

  const [indexIsOpen, setIndexIsOpen] = useState<boolean>(false);

  if (story)
    return (
      <div className="relative z-0 h-full">
        <DashboardIndex
          story={story}
          story_id={story_Id as string}
          open={indexIsOpen}
          close={() => setIndexIsOpen(false)}
        />
        <div className="z-0 h-full flex items-center justify-between flex-col gap-16">
          <nav className="flex w-full justify-between items-center">
            <button onClick={() => setIndexIsOpen(true)}>
              <span
                className={`material-icons text-4xl transition-opacity ease-in-out duration-500 ${
                  tutIndex >= 1 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                bookmark
              </span>
            </button>

            <h3 className="first-letter:capitalize opacity-50 w-full text-center px-16 ">
              {process.env.NEXT_PUBLIC_PROJECT_NAME}
            </h3>

            <span
              className={`material-icons text-4xl transition-opacity ease-in-out duration-500 ${
                tutIndex >= 2 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              style
            </span>
          </nav>
          {story && !story.tutorialFinished && (
            <TutorialPointsDisplayer
              tutorialPoints={tutorialPoints}
              index={tutIndex}
              setIndex={setTutIndex}
            />
          )}

          {story && story.tutorialFinished && (
            <main className="flex flex-col justify-between  items-center gap-8 h-full">
              <header className="text-center">
                <h1 className="text-2xl">{story.title}</h1>
                <p className="opacity-50">
                  {`${story.chapters_ids.length} ${
                    story.chapters_ids.length > 1 ? 'chapters' : 'chapter'
                  }`}
                </p>
              </header>
              <Link href={MainRoutes.dashboard}>{'<  back to dashboard'}</Link>
            </main>
          )}

          <div />
        </div>
      </div>
    );

  return <Loading />;
}

CreationDashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
