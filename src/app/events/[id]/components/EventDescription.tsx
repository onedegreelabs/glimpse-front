'use client';

import clsx from 'clsx';
import styles from './eventDescription.module.scss';
import {useEffect, useRef, useState} from 'react';
import IconText from '@/components/iconText/IconText';

interface EventDescriptionType {
  description: string;
}

export default function EventDescription({description}: EventDescriptionType) {
  const [openMore, setOpenMore] = useState(true);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    const descriptionEl = descriptionRef.current;
    if (descriptionEl) {
      const {height} = descriptionEl.getBoundingClientRect();
      if (height > 48) {
        setOpenMore(false);
        setShowMoreBtn(true);
      }
    }
  }, [description]);
  const onClickMore = () => {
    setOpenMore(!openMore);
  };
  return (
    <>
      <div className={styles['event-content-area']}>
        <p
          className={clsx({
            [styles['close']]: !openMore,
            [styles['open']]: openMore,
          })}
          ref={descriptionRef}
        >
          {description}
        </p>
      </div>
      {showMoreBtn && (
        <div className={styles['more-button-wrapper']}>
          <button onClick={onClickMore}>
            <IconText
              src={
                openMore
                  ? '/assets/glimpse-list/caret-up.svg'
                  : '/assets/glimpse-list/caret-down.svg'
              }
              alt={'이벤트 설명 펼침 아이콘'}
              width={24}
              height={24}
              text={'More'}
              textWeight={600}
            />
          </button>
        </div>
      )}
    </>
  );
}
