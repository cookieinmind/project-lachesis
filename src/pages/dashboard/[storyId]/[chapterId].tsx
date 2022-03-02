import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TutorialPoint } from '@/models/client/Creation';
import { TutorialPointsDisplayer } from '@/components/tutorials/TutorialShower';
import Layout from '@/components/Layout';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { GetChapter, UpdateChapter } from '@/firebase/FirebaseMethods';
import { Chapter, Route } from '@/models/ServerModels';
import { Loading } from '@/components/utilis/Loading';
import RouterEditor from '@/components/creation/writing/RouterEditor';
import { AddRouteToChapter } from '@/models/ChapterHelpers';

const tutorialPoints: TutorialPoint[] = [
  {
    title: 'About chapters',
    text: [
      'most of your chapters are probably going to be static text (like most books) but, at some points in the story you might want to give your readers an option',
      'to do that, just pressed a paragraph for a few seconds and the options will pop up',
    ],
    isThereANext: true,
    buttonText: 'show me how',
  },
];

/**
 * Interface params through which the route is updated
 */
interface iRouteMutationParams {
  route_id: string;
  routeUpdate: Route;
  chapterUpdate: Chapter;
}

export default function ChapterEditor() {
  //*Router
  const router = useRouter();
  const { chapterId: chapter_id, storyId } = router.query;
  const CHAPTER_QUERY = ['chapter', chapter_id];

  const queryClient = useQueryClient();

  //*State
  const [beginExample, setBeginExample] = useState<boolean>(false);
  const [tutIndex, setTutIndex] = useState<number>(0);

  //*Queries
  const { data: chapter, isLoading } = useQuery(
    CHAPTER_QUERY,
    () => GetChapter(chapter_id as string),
    {
      enabled: !!chapter_id,
      onSuccess: () => console.log('updated chapter'),
      onError: (e) => console.error(e),
    }
  );

  //*Mutations
  const chapterMutation = useMutation(
    (update: Chapter) => {
      return UpdateChapter(chapter_id as string, update);
    },
    {
      onSuccess: () => {
        invalidateChapter();
      },
    }
  );

  //*Invalidating queries
  function invalidateChapter() {
    queryClient.invalidateQueries(CHAPTER_QUERY);
  }

  if (isLoading || !chapter) return <Loading />;

  return (
    <div className="center flex-col w-full gap-8">
      <nav className="flex w-full justify-between items-center">
        <button
          className="first-letter:capitalize opacity-50 text-xl flex items-center gap-4"
          onClick={() => router.back()}
        >
          {'<'}
          <div className="flex flex-col items-start">
            <span className="text-lg">{chapter.title}</span>
            <span className="text-sm">{chapter.storyTitle}</span>
          </div>
        </button>

        <span
          className={`material-icons text-4xl transition-opacity ease-in-out duration-500 `}
        >
          style
        </span>
      </nav>

      {!beginExample && (
        <TutorialPointsDisplayer
          tutorialPoints={tutorialPoints}
          index={tutIndex}
          setIndex={setTutIndex}
          onLastIndex={() => setBeginExample(true)}
        />
      )}

      {beginExample && (
        <RouterEditor
          routes={chapter.routes}
          addRoute={async (route: Route) => {
            const update = AddRouteToChapter(chapter, route);
            chapterMutation.mutate(update);
          }}
          chapter_id={chapter_id as string}
          deleteRoute={async (route: Route) => {
            console.error('to do: delete route');
          }}
        />
      )}
    </div>
  );
}

ChapterEditor.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
