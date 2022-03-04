import React from 'react';
export function HomeCard({
  title,
  subtitle,
  bgColor,
}: {
  title: string;
  subtitle: string;
  bgColor: string;
}) {
  const containerClass =
    bgColor + ' px-6 py-8 border-3 border-onSurface rounded-t-2xl rounded-b-md';

  return (
    <div className={containerClass}>
      <h3 className="font-display text-2xl">{title}</h3>
      <p>{subtitle}</p>
    </div>
  );
}
