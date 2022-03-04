import React from 'react';

export default function Shadow({
  children: child,
  color,
}: {
  children: JSX.Element;
  color: string;
}) {
  const shadowClass =
    color + ' left-[calc(50%+6px)] translate-x-[-50%] top-[6px] absolute z-0';

  const shadowChildren = React.cloneElement(child, {
    className: `${child.props.className} ${shadowClass}`,
  });

  return (
    <div className="relative w-full">
      <div className="absolute left-[50%] translate-x-[-50%] z-10 ">
        {child}
      </div>
      {shadowChildren}
    </div>
  );
}
