import React from 'react';
import Shadow from '../utilis/Shadow';

export function HomeNav() {
  return (
    <div className="flex w-full items-center justify-between ">
      <HomeNavItem text="Writers" />
      <HomeNavItem text="Tags" />
      <HomeNavItem text="Rankings" />
    </div>
  );
}

function HomeNavItem({ text }: { text: string }) {
  return (
    <Shadow color="bg-surface">
      <div className="bg-surface border-3 border-onSurface rounded-2xl py-3 px-6">
        <span className="font-display font-medium capitalize">{text}</span>
      </div>
    </Shadow>
  );
}
