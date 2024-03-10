'use client';
import {useEffect, useState} from 'react';
import styles from './index.module.scss';
import CreateRoundButton from './sections/CreateRoundButton';
import DayEvent from './sections/DayEvent';
import EmptyEvent from './sections/EmptyEvent';
import useSWR from 'swr';
import {eventsAPI} from '@/services/eventsApi';
export default function EventMyContainer() {
  const [isEmptyEvent, setIsEmptyEvent] = useState(true);
  // const fetcher = eventsAPI.my.getMyEventList;
  const fetcher = eventsAPI.getAllEvents;
  const {data, error, isLoading} = useSWR('events/my-events?take=3', fetcher);

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
