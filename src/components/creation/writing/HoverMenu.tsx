import React, { useCallback, useEffect } from 'react';
import Modal from '@/components/utilis/Modal';
import { useModal } from '@/context/ModalContextProvider';

export type iHoverMenuItem = {
  text: string;
  onClick: () => void;
  disabled: boolean;
};

export function HoverMenu({
  menuItems,
  showMenu,
  hide,
}: {
  menuItems: iHoverMenuItem[];
  showMenu: boolean;
  hide: () => void;
}) {
  return (
    <Modal>
      <div className="fixed inset-0 z-0" id="container">
        <div
          className="fixed inset-0 bg-onSurface opacity-50 cursor-pointer"
          onClick={hide}
        />

        <div
          className={`absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-75%]  z-20
                   flex flex-col
                 bg-onSurface text-surface drop-shadow-xl rounded-lg overflow-hidden
                   h-fit w-10/12
                   transition-all duration-150 ease-in-out
                   ${
                     showMenu
                       ? 'visible opacity-100 scale-100'
                       : 'invisible opacity-0 scale-75'
                   }

                    `}
        >
          {menuItems.map((item, i) => {
            return <HoverMenuItem key={i} menuItem={item} />;
          })}
        </div>
      </div>
    </Modal>
  );
}

function HoverMenuItem({ menuItem }: { menuItem: iHoverMenuItem }) {
  return (
    <button
      className="w-full py-6 px-8 bg-onSurface text-surface hover:bg-surface hover:text-onSurface 
      disabled:opacity-50 disabled:hover:bg-onSurface disabled:hover:text-surface"
      onClick={menuItem.onClick}
      disabled={menuItem.disabled}
    >
      {menuItem.text}
    </button>
  );
}
