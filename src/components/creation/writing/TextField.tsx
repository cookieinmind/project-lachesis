import React, { useState } from 'react';
import { useLongPress } from 'use-long-press';
import TextareaAutosize from 'react-textarea-autosize';
import { HoverMenu } from './HoverMenu';

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
  createNewOne,
  initialText,
  updateText,
  placeholder,
}: {
  placeholder: string;
  createNewOne: () => void;
  initialText?: string;
  updateText: (text: string) => void;
}) {
  const [text, setText] = useState<string>(initialText ? initialText : '');
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const longPress = useLongPress(() => {
    setShowMenu(true);
  }, {});

  // function checkForEnter(e: React.KeyboardEvent) {
  //   const userPressedEnter = e.code === 'Enter';
  //   const theFieldIsNotEmpty = text.trim() !== '';
  //   if (userPressedEnter && theFieldIsNotEmpty) {
  //     console.log('creating a new route!');
  //     e.preventDefault();
  //     createNewOne();
  //     return;
  //   }
  // }

  return (
    <div className="relative z-0 w-full">
      <TextareaAutosize
        className={`w-full borde bg-transparent h-full focus:ring-0 border-0 border-none resize-none
          ${showMenu ? 'opacity-50 underline' : ''}
        `}
        value={text}
        placeholder={placeholder}
        onChange={(e) => {
          updateText(e.target.value);
          setText(e.target.value);
        }}
        // onKeyDown={checkForEnter}
        {...longPress}
      />

      <HoverMenu
        hide={() => setShowMenu(false)}
        menuItems={[
          {
            text: "add to character's dialogue",
            onClick: () => setShowMenu(false),
            disabled: true,
          },
          {
            text: 'add check',
            onClick: () => setShowMenu(false),
            disabled: true,
          },
          ,
          {
            text: 'add option',
            onClick: () => setShowMenu(false),
            disabled: false,
          },
        ]}
        shouldBeVisible={showMenu}
      />
    </div>
  );
}
