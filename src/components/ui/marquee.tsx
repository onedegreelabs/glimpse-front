'use client';

import MarQuee from 'react-fast-marquee';

type MarqueeType = {
  data: string[];
  className?: string;
  innerClassName?: string;
};

export function Marquee({ data, className, innerClassName }: MarqueeType) {
  return (
    <MarQuee className={className}>
      {data.map((item) => (
        <span className={innerClassName} key={item}>
          {item}
        </span>
      ))}
    </MarQuee>
  );
}
