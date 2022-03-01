import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { useQuery } from 'react-query';
import { GetStory } from '../../../firebase/FirebaseMethods';
import { useAuth } from '../../../context/AuthContextProvider';
import DashboardIndex from '../../../components/creation/dashboard/DashboardIndex';
import { useRouter } from 'next/router';

type TutorialPoint = {
  title: string;
  text: string[];
  isThereANext: boolean;
};

export default function CreationDashboard() {
  const [tutorialPoints, setTutorialPoints] = useState<TutorialPoint[]>([
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
  ]);

  const router = useRouter();
  const { storyId } = router.query;

  const [currentIndex, setIndex] = useState<number>(0);

  const { user } = useAuth();
  const { data: story } = useQuery(
    ['user stories', user?.uid],
    getUserStories,
    {
      enabled: !!user,
    }
  );

  async function getUserStories() {
    return await GetStory(storyId as string);
  }

  function next() {
    if (currentIndex === tutorialPoints.length - 1) {
      //close the thiny
    } else setIndex(currentIndex + 1);
  }

  const [indexIsOpen, setIndexIsOpen] = useState<boolean>(false);

  if (story)
    return (
      <div className="relative z-0">
        <DashboardIndex
          story={story}
          open={indexIsOpen}
          close={() => setIndexIsOpen(false)}
        />
        <div className="z-0 h-full flex items-center justify-between flex-col gap-16">
          <nav className="flex w-full justify-between items-center">
            <button onClick={() => setIndexIsOpen(true)}>
              <span
                className={`material-icons text-4xl transition-opacity ease-in-out duration-500 ${
                  currentIndex >= 1 ? 'opacity-100' : 'opacity-0'
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
                currentIndex >= 2 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              style
            </span>
          </nav>
          <CreationTutorial
            next={next}
            tutPoint={tutorialPoints[currentIndex]}
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

function CreationTutorial({
  tutPoint,
  next,
}: {
  tutPoint: TutorialPoint;
  next: () => void;
}) {
  return (
    <div className="center flex-col gap-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-2xl">{tutPoint.title}</h1>
        <div className="flex flex-col gap-1">
          {tutPoint.text.map((t, i) => {
            return (
              <p key={i} className="first-letter:capitalize">
                {t}
              </p>
            );
          })}
        </div>
      </div>
      {tutPoint.isThereANext && <button onClick={next}>{'got it >'}</button>}
    </div>
  );
}

function Loading() {
  const [isDisplayed, setIsDisplayed] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true);
    }, 1000 * 2);
  }, []);

  return (
    <div className="h-full center flex-col gap-4">
      <div className="animate-pulse text-center">loading...</div>
      <span
        className={`transition-all duration-300 ${
          isDisplayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 '
        }`}
      >
        well... this is awkward
      </span>
    </div>
  );
}
