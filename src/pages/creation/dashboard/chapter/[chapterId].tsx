import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TutorialPoint } from '../../../../models/ClientModels/Creation';
import { TutorialPointsDisplayer } from '../../../../components/Tutorials/TutorialShower';
import Layout from '../../../../components/Layout';
import { useQuery, useMutation } from 'react-query';
import {
  GetChapter,
  UpdateChapter,
} from '../../../../firebase/FirebaseMethods';
import { Chapter } from '../../../../models/ServerModels';
import { Loading } from '../../../../components/Utilis/Loading';

const tutorialPoints = [
  {
    title: 'FYI:',
    text: [
      '1. chapters are automatically numbered',
      '2. you can change the numbers',
      "3. the number of the chapter decides the order in which they're shown to the player",
    ],
    isThereANext: true,
  },
  {
    title: 'FYI:',
    text: [
      '4. chapters have names',
      "5. is your choice if you want your players to see the name of the chapters. Some writers use the names as a form of organization, others like to tease their players with the titles. It's your call",
      '6. names can be edited at any point',
    ],
    isThereANext: true,
  },
];
export default function ChapterEditor() {
  const router = useRouter();
  const { chapterId } = router.query;

  const { data: chapter } = useQuery(
    ['chapter', chapterId],
    () => GetChapter(chapterId as string),
    {
      enabled: !!chapterId,
    }
  );

  const mutation = useMutation((update: Chapter) => {
    return UpdateChapter(chapterId as string, update);
  });

  const [tutIndex, setTutIndex] = useState<number>(0);

  if (!chapter) return <Loading />;

  return (
    <div className="center flex-col w-full gap-8">
      <nav className="flex w-full justify-between items-center">
        <button
          className="first-letter:capitalize opacity-50 text-xl"
          onClick={() => router.back()}
        >
          {`<    ${chapter.title}`}
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
