import React from 'react';
import Shadow from '../utilis/Shadow';

export function HomeNav() {
  return (
    <div className="flex w-full items-center justify-betweeen">
      <HomeNavItem text="Writers" />
      <HomeNavItem text="Tags" />
      <HomeNavItem text="Rankings" />
    </div>
  );
}

function HomeNavItem({ text }: { text: string }) {
  return (
    <Shadow color="bg-surface">
      <div className="bg-surface border-3 border-onSurface rounded-2xl py-2 px-4">
        <span className="capitalize">{text}</span>
      </div>
    </Shadow>
  );
}
