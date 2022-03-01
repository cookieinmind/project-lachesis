import React, { useState } from 'react';
import { useLongPress } from 'use-long-press';
import TextareaAutosize from 'react-textarea-autosize';

//TODO:
/**
 * 1) when the user hits enter, a new component of this must be created and autofocused
 *
 * 2) when the user deletes in the last character of this component,
 * the text must be send to the prior component and this one must be deleted
 *
 * 3) everytime a component is created or deleted, it must be saved in the cloud
 */

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
      className="w-full border-0 bg-transparent h-full focus:ring-0"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyUp={checkForEnter}
      {...longPress}
    />
  );
}
