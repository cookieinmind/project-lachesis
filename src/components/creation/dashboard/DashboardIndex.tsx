import React, { useState } from 'react';
import { Chapter, Story } from '../../../models/ServerModels';

export default function DashboardIndex({
  story,
  open,
  close,
}: {
  story: Story;
  open: boolean;
  close: () => void;
}) {
  return (
    <div className={`fixed inset-0 z-0 ${open ? 'visible' : 'invisible'}`}>
      <div
        className={`fixed inset-0 bg-onSurface opacity-75 z-10 ${
          open ? 'visible' : 'invisible'
        }`}
        onClick={close}
      />
      <aside
        className={`top-0 bottom-0 left-0 absolute flex flex-col drop-shadow-xl z-20 transition-all ease-in-out duration-300 bg-surface p-4 w-1/2
      ${open ? 'opacity-100 translate-x-[0]' : 'opacity-0 translate-x-[-100%]'}
      `}
      >
        <div className="flex w-full justify-between">
          <h3>Index</h3>
          <span>{story.chapters_ids.length} chapters</span>
        </div>
        <div className="h-full center w-full">
          <button className="w-full py-2 rounded-xl border-2">
            + new chapter
          </button>{' '}
        </div>
      </aside>
    </div>
  );
}
