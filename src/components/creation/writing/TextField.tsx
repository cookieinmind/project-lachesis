import React, { useState } from 'react';
import { useLongPress } from 'use-long-press';
import TextareaAutosize from 'react-textarea-autosize';

export default function TextField({
  onEnter,
  defaultText,
}: {
  onEnter: () => void;
  defaultText?: string;
}) {
  const longPress = useLongPress(() => {
    console.log('see!');
  }, {});

  const [text, setText] = useState<string>(defaultText ? defaultText : '');

  function checkForEnter(e: React.KeyboardEvent) {
    if (e.code === 'Enter') {
      onEnter();
    }
  }

  return (
    <TextareaAutosize
      className="w-full border-0 bg-transparent h-full"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyUp={checkForEnter}
      {...longPress}
    />
  );
}
