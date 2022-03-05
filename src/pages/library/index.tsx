import MainLayout from '@/components/layouts/MainLayout';
import Searchbar from '@/components/utilis/Searchbar';
import React, { useState } from 'react';

export default function Library() {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <div className="flex flex-col gap-5 h-full">
      <h1 className="text-2xl font-display">Your Library</h1>
      <div className="sticky top-4 z-50">
        <Searchbar
          text={searchText}
          setText={setSearchText}
          placeholder={'Search'}
          color="bg-blue"
        />
      </div>

      <div className="center w-full h-full border-dashed border-3 border-onSurface rounded-xl mb-20">
        <h2 className="text-lg text-center">
          This section is under development
        </h2>
      </div>
    </div>
  );
}

Library.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
