import React, { useEffect } from 'react';

export default function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div
      className={`relative bg-surface text-onSurface h-screen w-screen font-handwritten py-2`}
      id="layout"
    >
      {children}
    </div>
  );
}
