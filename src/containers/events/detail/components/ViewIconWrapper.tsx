'use client';

import {useState} from 'react';
import styles from './viewIconWrapper.module.scss';
import Image from 'next/image';

const ViewTypes = {
  BOX: 'box',
  DESKTOPGIRD: 'desktopGrid',
  MOBILEGIRD: 'mobileGrid',
  LIST: 'list',
} as const;

export type ViewType = (typeof ViewTypes)[keyof typeof ViewTypes];

export default function ViewIconWrapper() {
  const [toggleView, setToggleVIew] = useState<ViewType>('box');

  const onChangeView = (viewType: ViewType): void => {
    setToggleVIew(viewType);
  };

  return (
    <div className={styles['grid-icon-wrapper']}>
      <button onClick={() => onChangeView('box')}>
        <Image
          src={
            toggleView === ViewTypes.BOX
              ? '/assets/glimpse-list/dark-box.svg'
              : '/assets/glimpse-list/light-box.svg'
          }
          alt="박스뷰"
          width={22}
          height={22}
        />
      </button>
      <button
        onClick={() => onChangeView('desktopGrid')}
        className={styles['desktop-grid-btn']}
      >
        <Image
          src={
            toggleView === ViewTypes.DESKTOPGIRD
              ? '/assets/glimpse-list/dark-grid.svg'
              : '/assets/glimpse-list/light-grid.svg'
          }
          alt="데스크탑 그리드뷰"
          width={22}
          height={22}
        />
      </button>
      <button
        onClick={() => onChangeView('mobileGrid')}
        className={styles['mobile-grid-btn']}
      >
        <Image
          src={
            toggleView === ViewTypes.MOBILEGIRD
              ? '/assets/glimpse-list/dark-grid.svg'
              : '/assets/glimpse-list/light-grid.svg'
          }
          alt="모바일 그리드뷰"
          width={22}
          height={22}
        />
      </button>
      <button
        onClick={() => onChangeView('list')}
        className={styles['list-view']}
      >
        <Image
          src={
            toggleView === ViewTypes.LIST
              ? '/assets/glimpse-list/dark-list.svg'
              : '/assets/glimpse-list/light-list.svg'
          }
          alt="리스트뷰"
          width={22}
          height={22}
        />
      </button>
    </div>
  );
}
