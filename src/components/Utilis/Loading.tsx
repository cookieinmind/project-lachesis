import React, { useEffect, useState } from 'react';

export function Loading() {
  const [isDisplayed, setIsDisplayed] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true);
    }, 1000 * 2);
  }, []);

  return (
    <div className="h-full center flex-col gap-4">
      <div className="animate-pulse text-center">loading...</div>
      <span
        className={`transition-all duration-300 ${
          isDisplayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 '
        }`}
      >
        well... this is awkward
      </span>
    </div>
  );
}
