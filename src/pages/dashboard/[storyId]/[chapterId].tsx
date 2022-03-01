import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TutorialPoint } from '@/models/client/Creation';
import { TutorialPointsDisplayer } from '@/components/tutorials/TutorialShower';
import Layout from '@/components/Layout';
import { useQuery, useMutation } from 'react-query';
import { GetChapter, UpdateChapter } from '@/firebase/FirebaseMethods';
import { Chapter } from '@/models/ServerModels';
import { Loading } from '@/components/utilis/Loading';

const tutorialPoints: TutorialPoint[] = [
  {
    title: 'About chapters',
    text: [
      'most of your chapters are probably going to be static text (like most books) but, at some points in the story you might want to give your readers an option',
      'to do that, just pressed a paragraph for a few seconds and the options will pop up',
    ],
    isThereANext: true,
    buttonText: 'start writing',
  },
];
export default function ChapterEditor() {
  const router = useRouter();
  const { chapterId, storyId } = router.query;

  console.log(chapterId, storyId);
  const { data: chapter, isLoading } = useQuery(
    ['chapter', chapterId],
    () => GetChapter(chapterId as string),
    {
      enabled: !!chapterId,
      onError: (e) => console.error(e),
    }
  );

  const mutation = useMutation((update: Chapter) => {
    return UpdateChapter(chapterId as string, update);
  });

  const [tutIndex, setTutIndex] = useState<number>(0);

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
      <TutorialPointsDisplayer
        tutorialPoints={tutorialPoints}
        index={tutIndex}
        setIndex={setTutIndex}
      />
    </div>
  );
}

ChapterEditor.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
