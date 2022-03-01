import Link from 'next/link';
import React, { useState } from 'react';
import Layout from '../../components/Layout';
// import {for} from 'formik'

export default function CreatorIndex() {
  const [title, setTitle] = useState<string>('');

  function saveTitle() {
    console.log(title);
  }

  //TODO: Use formik

  return (
    <div className="h-full center flex-col gap-8">
      <h1 className="text-2xl">Give your story a name</h1>
      <input
        type="text"
        className="bg-transparent max-w-1/2 focus:ring-0 border-b-2 border-t-0 border-x-0"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p className="opacity-50">
        {"(you can change it later don't mind it too much)"}
      </p>

      <button className="text-xl" onClick={saveTitle}>
        {'Continue >'}
      </button>
    </div>
  );
}

CreatorIndex.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
