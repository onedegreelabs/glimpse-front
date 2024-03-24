'use client';
import {useEffect, useState} from 'react';
import styles from './index.module.scss';
import DayEvent from './sections/DayEvent';
import EmptyEvent from './sections/EmptyEvent';
import {useMyEventList} from '@/hooks/swr/useEvents';
import _ from 'lodash';
import {DayEventProps} from '@/types/eventTypes';

export default function EventMyContainer() {
  const [isEmptyEvent, setIsEmptyEvent] = useState(true);
  const {data, error, isLoading} = useMyEventList(100);
  const [eventsByDate, setEventsByDate] = useState<DayEventProps[]>([]);

  useEffect(() => {
    if (data?.data) {
      const events = data.data;
      const eventByDateList = _.chain(events)
        .groupBy(event => {
          const startDate = new Date(event.startAt);
          return startDate.toISOString().split('T')[0];
        })
        .toPairs()
        .sortBy(([date]) => new Date(date))
        .map(([date, events]) => ({date, events}))
        .value();

      setEventsByDate(eventByDateList);
      if (!_.isEmpty(eventByDateList)) {
        setIsEmptyEvent(false);
      }
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
            {eventsByDate.map((event, idx) => {
              return (
                <div key={`${event?.date}_${idx}`}>
                  <DayEvent data={event.events} date={event.date} />
                </div>
              );
            })}
          </>
        ) : (
          <EmptyEvent />
        )}
      </div>
    );
  }
}
