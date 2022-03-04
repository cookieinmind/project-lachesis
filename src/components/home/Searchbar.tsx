import React from 'react';
import Shadow from '../utilis/Shadow';

export default function Searchbar({
  text,
  setText,
}: {
  text: string;
  setText: (newVal) => void;
}) {
  return (
    <Shadow color="bg-yellow">
      <div className="flex gap-2 px-4 py-2 items-center rounded-full bg-surface border-[3px] border-onSurface">
        <span className="material-icons">search</span>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-transparent border-none placeholder:font-display focus:ring-transparent"
          placeholder="Search"
        />
      </div>
    </Shadow>
  );
}
