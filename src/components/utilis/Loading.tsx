import { MainRoutes } from '@/models/Routers';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const TIME_FOR_MESSAGE = 1000 * 5;
const TIME_FOR_LINK = 1000 * 8;

export function Loading() {
  const [messageIsDisplayed, setMsgIsDisplayed] = useState(false);

  const [linkIsDisplayed, setLinkIsDisplayed] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setMsgIsDisplayed(true);
    }, TIME_FOR_MESSAGE);

    setInterval(() => {
      setLinkIsDisplayed(true);
    }, TIME_FOR_LINK);
  }, []);

  return (
    <div className="h-full center flex-col gap-4">
      <div className="animate-pulse text-center">loading...</div>
      <span
        className={`transition-all duration-300 ${
          messageIsDisplayed
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-1 '
        }`}
      >
        well... this is awkward
      </span>

      <Link href={MainRoutes.dashboard}>
        <a
          className={`transition-all duration-300 text-center ${
            linkIsDisplayed
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-1 '
          }`}
        >
          <span>... there seems to be problem, want to go </span>
          <span className="underline">back to your dashboard?</span>
        </a>
      </Link>
    </div>
  );
}
