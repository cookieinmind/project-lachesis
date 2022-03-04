import React from 'react';

export default function Shadow({
  children: child,
  color: shadowColor,
}: {
  children: JSX.Element;
  color: string;
}) {
  const shadowClass =
    shadowColor +
    ' absolute left-[calc(50%+12px)] translate-x-[calc(-50%-6px)] top-[6px] z-0';

  function getShadowClasses(originalClasses: string): string {
    if (!originalClasses) return shadowClass;
    const firstIndex = originalClasses.indexOf('bg-');
    const lastIndex = originalClasses.indexOf(' ', firstIndex);
    const sen1 = originalClasses.slice(0, firstIndex);
    const send2 = originalClasses.slice(lastIndex, originalClasses.length);

    return sen1 + send2 + ' ' + shadowClass;
  }

  const shadowChildren = React.cloneElement(child, {
    className: getShadowClasses(child.props.className),
  });

  return (
    <div className="relative w-full mb-[6px] center">
      {/* Shadow */}
      {shadowChildren}
      {/* Actual rendering */}
      <div className="absolute z-10 block">{child}</div>
      {/* So the container gets the size of the child */}
      <div className="invisible">{child}</div>
    </div>
  );
}
