'use client';
import {useState} from 'react';
import styles from './index.module.scss';
import CreateRoundButton from './sections/CreateRoundButton';
import DayEvent from './sections/DayEvent';
import EmptyEvent from './sections/EmptyEvent';

export default function EventMyContainer() {
  const [isEmptyEvent, setIsEmptyEvent] = useState(true);
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
