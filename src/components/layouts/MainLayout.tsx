import React, { useEffect } from 'react';
import Navbar from '@/components/navigation/Navbar';

export default function MainLayout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div
      className={`relative bg-surface text-onSurface h-screen w-screen font-handwritten p-2`}
      id="layout"
    >
      {children}

      <div className="w-full fixed bottom-0">
        <Navbar />
      </div>
    </div>
  );
}
