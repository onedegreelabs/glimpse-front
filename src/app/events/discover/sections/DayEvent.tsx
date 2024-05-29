'use client';
import styles from './dayEvent.module.scss';
import EventCard from '../components/EventCard';
import {EventDataType} from '@/types/eventTypes';
import {useEffect, useState} from 'react';
import {EventDataType2} from '@/types/rocketTypes';

interface DayEventProps {
  data: EventDataType2[];
  date: string;
  pageType: string;
}

export default function DayEvent({data, date, pageType}: DayEventProps) {
  const formatDate = (inputDate: string) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const dateParts = inputDate.split('-');
    const year = dateParts[0];
    const month = months[parseInt(dateParts[1]) - 1];
    const day = dateParts[2];

    const formattedDate = new Date(inputDate);
    const dayOfWeek = days[formattedDate.getDay()];

    return `${month} ${day}, ${year} ${dayOfWeek}`;
  };

  const [dateText, setDateText] = useState('');
  useEffect(() => {
    if (date) {
      setDateText(formatDate(date));
    }
  }, [date]);

  return (
    <div className={styles['day-event-wrapper']}>
      <div className={styles['date-text']}>{dateText}</div>
      {data.map((event, idx) => {
        return (
          <div key={idx}>
            <EventCard eventData={event} pageType={pageType} />
          </div>
        );
      })}
    </div>
  );
}
