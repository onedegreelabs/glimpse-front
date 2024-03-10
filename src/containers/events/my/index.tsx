'use client';
import {useEffect, useState} from 'react';
import styles from './index.module.scss';
import CreateRoundButton from './sections/CreateRoundButton';
import DayEvent from './sections/DayEvent';
import EmptyEvent from './sections/EmptyEvent';
import useMyEventList from '@/swr/events/getMyEventList';
export default function EventMyContainer() {
  const [isEmptyEvent, setIsEmptyEvent] = useState(true);
  const {data, error, isLoading} = useMyEventList(3);
  useEffect(() => {
    if (data?.data?.length > 0) {
      setIsEmptyEvent(false);
    }
  }, [data]);

  if (isLoading) {
    return <div>로딩 페이지</div>;
  } else if (error) {
    return <div>에러 페이지</div>;
  } else {
    return (
      <div className={styles['event-container-wrapper']}>
        {!isEmptyEvent ? (
          <>
            <DayEvent />
            <DayEvent />
            <DayEvent />
            <DayEvent />
            <DayEvent />
            <div className={styles['create-button']}>
              <CreateRoundButton />
            </div>
          </>
        ) : (
          <EmptyEvent />
        )}
      </div>
    );
  }
}
