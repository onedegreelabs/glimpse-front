'use client';
import {useEffect} from 'react';
import styles from './dayEvent.module.scss';
import EventCard from '../components/EventCard';
import {EventDataType} from '@/types/eventTypes';

export default function DayEvent(data: EventDataType) {
  useEffect(() => {
    console.log(data);
    // tmpLogin();
  }, [data]);
  return (
    <div className={styles['day-event-wrapper']}>
      <div className={styles['date-text']}>Feb 18, 2023 Sunday</div>
      <EventCard />
      <EventCard />
    </div>
  );
}
