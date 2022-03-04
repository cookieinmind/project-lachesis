import React from 'react';

export default function Shadow({
  children: child,
  color,
}: {
  children: JSX.Element;
  color: string;
}) {
  const shadowClass =
    color +
    ' absolute left-[calc(50%+6px)] translate-x-[calc(-50%-6px)] top-[6px] z-0';

  const shadowChildren = React.cloneElement(child, {
    className: `${child.props.className} ${shadowClass}`,
  });

  return (
    <div className="relative w-full mb-[6px]">
      {/* Shadow */}
      {shadowChildren}
      {/* Actual rendering */}
      <div className="absolute z-10">{child}</div>
      {/* So the container gets the size of the child */}
      <div className="invisible">{child}</div>
    </div>
  );
}
