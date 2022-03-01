import React, { useEffect, useState } from 'react';
import Layout from '../../../../components/Layout';
import { useQuery } from 'react-query';
import { GetStory } from '../../../../firebase/FirebaseMethods';
import { useAuth } from '../../../../context/AuthContextProvider';
import DashboardIndex from '../../../../components/creation/dashboard/DashboardIndex';
import { useRouter } from 'next/router';
import { TutorialPointsDisplayer } from '../../../../components/Tutorials/TutorialShower';
import { Loading } from '../../../../components/Utilis/Loading';

const tutorialPoints = [
  {
    title: 'stories are divided in chapters',
    text: [
      'you can have as many chapters as you like.',
      'though, we recommened to keep it short',
      'specially if this is your first one',
    ],
    isThereANext: true,
  },
  {
    title: 'this is your index',
    text: [
      'the index is in charge of keeping you organized',
      'all of your chapters will appear in there',
    ],
    isThereANext: true,
  },
  {
    title: 'this is your deck',
    text: [
      'the dex is in charge of keeping track of your characters',
      'if you are not into scrolling through all of your chapters to change the name of one character',
      'we recommend using it',
    ],
    isThereANext: true,
  },
  {
    title: "let's create your first chapter",
    text: ['Open your index', '(the one on your left ...)'],
    isThereANext: false,
  },
];

export default function CreationDashboard() {
  const router = useRouter();
  const { storyId: story_Id } = router.query;

  const [tutIndex, setTutIndex] = useState<number>(0);

  const { user } = useAuth();
  const { data: story } = useQuery(
    ['user stories', user?.uid],
    getUserStories,
    {
      enabled: !!user,
    }
  );

  async function getUserStories() {
    return await GetStory(story_Id as string);
  }

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
          <TutorialPointsDisplayer
            tutorialPoints={tutorialPoints}
            index={tutIndex}
            setIndex={setTutIndex}
          />
          <div />
        </div>
      </div>
    );

  return <Loading />;
}

CreationDashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
