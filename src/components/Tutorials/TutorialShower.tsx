import React, { useState } from 'react';
import { TutorialPoint } from '../../models/ClientModels/Creation';

export function TutorialPointsDisplayer({
  tutorialPoints,
  index,
  setIndex,
}: {
  tutorialPoints: TutorialPoint[];
  index: number;
  setIndex: (n: number) => void;
}) {
  function next() {
    if (index === tutorialPoints.length - 1) {
      //close the thiny
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
        <div className="flex flex-col gap-1">
          {tutPoint.text.map((t, i) => {
            return (
              <p key={i} className="first-letter:capitalize">
                {t}
              </p>
            );
          })}
        </div>
      </div>
      {tutPoint.isThereANext && <button onClick={next}>{'got it >'}</button>}
    </div>
  );
}
