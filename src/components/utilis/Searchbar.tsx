import React from 'react';
import Shadow from '../utilis/Shadow';

export default function Searchbar({
  text,
  setText,
  placeholder,
  color = 'bg-yellow',
}: {
  text: string;
  setText: (newVal) => void;
  placeholder?: string;
  color?: string;
}) {
  return (
    <Shadow color={color}>
      <div className="w-full flex gap-2 px-4 py-2 items-center rounded-full bg-surface border-3 border-onSurface">
        <span className="material-icons">search</span>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-transparent border-none placeholder:font-display focus:ring-transparent"
          placeholder={placeholder ? placeholder : 'Search'}
        />
      </div>
    </Shadow>
  );
}
