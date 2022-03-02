import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { AddNewChapter, GetChapters } from '@/firebase/FirebaseMethods';
import { GetChapterRoute } from '@/models/Routers';
import {
  Chapter,
  Connection,
  Destination,
  Route,
  Story,
} from '@/models/ServerModels';
import { CreateRoute } from '@/models/ChapterHelpers';

export default function DashboardIndex({
  story,
  open,
  close,
  story_id,
}: {
  story: Story;
  story_id: string;
  open: boolean;
  close: () => void;
}) {
  const router = useRouter();
  const { data: chaptersData } = useQuery(['story chapters', story_id], () =>
    GetChapters(story_id)
  );

  async function manageNewChapterCreation() {
    //1. create the chapter
    const dest: Destination = {
      connectsTo: Connection.NewRoute,
      thingItConnectsTo_id: '',
    };

    let highestNumber: number = 1;
    chaptersData.chapters.map((c) => {
      console.log(c);
      if (highestNumber <= c.chapterNumber) {
        highestNumber = c.chapterNumber + 1;
      }
    });

    const chapterInitialRoute = CreateRoute();

    const chapter: Chapter = {
      title: `chapter ${highestNumber}`,
      chapterNumber: highestNumber,
      story_id,
      initialSetup: dest,
      routes: [chapterInitialRoute],
      storyTitle: story.title,
    };

    //2 save it in db
    const chapter_id = await AddNewChapter(chapter, story_id, story);
    story = { ...story, chapters_ids: [...story.chapters_ids, chapter_id] };

    //3. redirect to the chapter editor page
    const link = GetChapterRoute(chapter_id, story_id);
    router.push(link);
  }

  return (
    <div className={`fixed inset-0 z-10 ${open ? 'visible' : 'invisible'}`}>
      <div
        className={`fixed inset-0 bg-onSurface opacity-75 z-10 ${
          open ? 'visible' : 'invisible'
        }`}
        onClick={close}
      />
      <aside
        className={`top-0 bottom-0 left-0 absolute flex flex-col gap-4 drop-shadow-xl z-20 transition-all ease-in-out duration-300 bg-surface p-4 w-[75%]
      ${open ? 'opacity-100 translate-x-[0]' : 'opacity-0 translate-x-[-100%]'}
      `}
      >
        <div className="flex w-full justify-between">
          <h3>Index</h3>
          <span>
            {chaptersData?.chapters.length}{' '}
            {chaptersData?.chapters.length === 1 ? 'chapter' : 'chapters'}
          </span>
        </div>

        {/* chapters */}
        {chaptersData && (
          <div className="flex flex-col gap-2">
            {chaptersData.chapters.map((c, i) => {
              return (
                <ChapterItem
                  chapter={c}
                  key={c.title + i}
                  chapter_id={chaptersData.ids[i]}
                  chapterLink={GetChapterRoute(chaptersData.ids[i], story_id)}
                />
              );
            })}
          </div>
        )}

        <div className="h-full w-full flex items-end">
          <button
            className="w-full py-2 rounded-xl border-2"
            onClick={manageNewChapterCreation}
          >
            + new chapter
          </button>{' '}
        </div>
      </aside>
    </div>
  );
}

function ChapterItem({
  chapter,
  chapter_id,
  chapterLink,
}: {
  chapter: Chapter;
  chapter_id: string;
  chapterLink: string;
}) {
  const router = useRouter();
  function openChapter() {
    router.push(chapterLink);
  }

  return (
    <button
      className="flex w-full justify-between items-center"
      onClick={openChapter}
    >
      <span>{chapter.title}</span>
      <span className="opacity-50">#{chapter.chapterNumber}</span>
    </button>
  );
}
