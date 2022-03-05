import React from 'react';

export enum ShadowHeight {
  four = 'left-[calc(50%+9px)] translate-x-[calc(-50%-4px)] top-[4px]',
  six = 'left-[calc(50%+12px)] translate-x-[calc(-50%-6px)] top-[6px]',
}

export default function Shadow({
  children: child,
  color: shadowColor,
  height = ShadowHeight.six,
}: {
  children: JSX.Element;
  color: string;
  height?: ShadowHeight;
}) {
  const shadowClass = `${shadowColor} ${height} absolute z-0`;

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

  const invisibleCopy = React.cloneElement(child, {
    className: child.props.className + ' insivible',
  });

  const childCopy = React.cloneElement(child, {
    className: child.props.className + ' absolute z-10 block',
  });

  return (
    <div className="relative mb-[6px] center">
      {/* Shadow */}
      {shadowChildren}
      {/* Actual rendering */}
      {/* <div className="absolute z-10 block">{child}</div> */}
      {childCopy}
      {/* So the container gets the size of the child */}
      {invisibleCopy}
    </div>
  );
}
