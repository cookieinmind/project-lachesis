import React, { useEffect, useState } from 'react';
import Layout from '../../../../components/Layout';
import { useQuery } from 'react-query';
import { GetStory, UpdateStory } from '../../../../firebase/FirebaseMethods';
import { useAuth } from '../../../../context/AuthContextProvider';
import DashboardIndex from '../../../../components/creation/dashboard/DashboardIndex';
import { useRouter } from 'next/router';
import { TutorialPointsDisplayer } from '../../../../components/Tutorials/TutorialShower';
import { Loading } from '../../../../components/Utilis/Loading';
import Link from 'next/link';
import { MainRoutes } from '../../../../models/Routers';
import { TutorialPoint } from '../../../../models/ClientModels/Creation';

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
    ['user stories', user?.uid],
    getUserStories,
    {
      enabled: !!user,
    }
  );

  const [tutIndex, setTutIndex] = useState<number>(
    story?.tutorialFinished ? tutorialPoints.length - 1 : 0
  );

  async function getUserStories() {
    return await GetStory(story_Id as string);
  }
  useEffect(() => {
    const isFinishedOnServer = story?.tutorialFinished;
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
      <div className="relative z-0">
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

            <h3 className="first-letter:capitalize opacity-50">
              {story.title}
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
            <div>
              <div className="flex flex-col items-center gap-8">
                <h1 className="text-2xl">
                  you have written {story.chapters_ids.length} chapters
                </h1>
                <h2 className="opacity-50">{'find a story >'}</h2>
                <Link href={MainRoutes.creation}>{'go to dashboard >'}</Link>
                <h2 className="opacity-50">{'your stories >'}</h2>
              </div>
            </div>
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
