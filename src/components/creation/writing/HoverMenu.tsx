import React from 'react';

export type iHoverMenuItem = {
  text: string;
  onClick: () => void;
};

export function HoverMenu({
  menuItems,
  shouldBeVisible,
  hide,
}: {
  menuItems: iHoverMenuItem[];
  shouldBeVisible: boolean;
  hide: () => void;
}) {
  return (
    <div
      className={`absolute left-[50%] translate-x-[-50%] top-[50%] z-20
                   flex flex-col
                 bg-onSurface text-surface drop-shadow-xl rounded-lg overflow-hidden
                   h-fit   
                   transition-all duration-150 ease-in-out
                   ${
                     shouldBeVisible
                       ? 'visible opacity-100 scale-100'
                       : 'invisible opacity-0 scale-75'
                   }

                    `}
    >
      {menuItems.map((item, i) => {
        return <HoverMenuItem key={i} menuItem={item} />;
      })}
    </div>
  );
}

function HoverMenuItem({ menuItem }: { menuItem: iHoverMenuItem }) {
  return (
    <button
      className="w-full py-6 px-8 bg-onSurface text-surface hover:bg-surface hover:text-onSurface"
      onClick={menuItem.onClick}
    >
      {menuItem.text}
    </button>
  );
}
