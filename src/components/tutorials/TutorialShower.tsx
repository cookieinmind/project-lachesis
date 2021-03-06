import React, { useState } from 'react';
import { TutorialPoint } from '../../models/client/Creation';

export function TutorialPointsDisplayer({
  tutorialPoints,
  index,
  setIndex,
  onLastIndex,
}: {
  onLastIndex?: () => void;
  tutorialPoints: TutorialPoint[];
  index: number;
  setIndex: (n: number) => void;
}) {
  function next() {
    if (index === tutorialPoints.length - 1) {
      if (onLastIndex) onLastIndex();
    } else setIndex(index + 1);
  }

  return <PointDisplay next={next} tutPoint={tutorialPoints[index]} />;
}

function PointDisplay({
  tutPoint,
  next,
}: {
  tutPoint: TutorialPoint;
  next: () => void;
}) {
  return (
    <div className="center flex-col gap-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-2xl">{tutPoint.title}</h1>
        <div className="flex flex-col gap-3">
          {tutPoint.text.map((t, i) => {
            return (
              <p key={i} className="first-letter:capitalize">
                {t}
              </p>
            );
          })}
        </div>
      </div>
      {tutPoint.isThereANext && (
        <button onClick={next}>{`${tutPoint.buttonText} >`}</button>
      )}
    </div>
  );
}
