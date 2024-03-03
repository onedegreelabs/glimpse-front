'use client';
import {useEffect} from 'react';
import styles from './dayEvent.module.scss';
import {events} from '@/services/eventsApi';
import EventCard from '../components/EventCard';
import {tmpLogin} from '../tmpLogin';
export default function DayEvent() {
  useEffect(() => {
    const eventList = events.my.getMyEventList(3);
    console.log(eventList);
    // tmpLogin();
  }, []);
  return (
    <div className={styles['day-event-wrapper']}>
      <div className={styles['date-text']}>Feb 18, 2023 Sunday</div>
      <EventCard />
      <EventCard />
    </div>
  );
}
