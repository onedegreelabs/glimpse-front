// 윈도우 창 크기 변화할 때 마다 현재 윈도우의 창 크기 반환

import {useState, useEffect} from 'react';

export function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } else {
      return;
    }
  }, []);

  return windowWidth;
}
