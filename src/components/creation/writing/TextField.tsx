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
  initialText,
  updateText,
  placeholder,
}: {
  placeholder: string;
  onEnter: () => void;
  initialText?: string;
  updateText: (text: string) => void;
}) {
  const [text, setText] = useState<string>(initialText ? initialText : '');

  const longPress = useLongPress(() => {
    console.log('long pressed!');
  }, {});

  function checkForEnter(e: React.KeyboardEvent) {
    if (e.code === 'Enter') {
      onEnter();
    }
  }

  return (
    <TextareaAutosize
      className="w-full borde bg-transparent h-full focus:ring-0 border-2 border-primary"
      value={text}
      placeholder={placeholder}
      onChange={(e) => {
        updateText(e.target.value);
        setText(e.target.value);
      }}
      onKeyUp={checkForEnter}
      {...longPress}
    />
  );
}
