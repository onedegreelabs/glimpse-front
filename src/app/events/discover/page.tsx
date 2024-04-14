'use client';
import {useEffect, useState} from 'react';
import styles from './page.module.scss';
import DayEvent from './sections/DayEvent';
import EmptyEvent from './sections/EmptyEvent';
import {useEventList, useMyEventList} from '@/hooks/swr/useEvents';
import _ from 'lodash';
import {DayEventProps} from '@/types/eventTypes';
import CreateRoundButton from './sections/CreateRoundButton';
import clsx from 'clsx';
import {useRouter} from 'next/navigation';
import {useIsLoginStore} from '@/stores/auth';

export default function EventDiscoverPage({pageType}: {pageType: string}) {
  const [isEmptyEvent, setIsEmptyEvent] = useState(true);
  const needSwrHook = pageType === 'my' ? useMyEventList : useEventList;
  const {data, error, isLoading} = needSwrHook(100);
  const [eventsByDate, setEventsByDate] = useState<DayEventProps[]>([]);

  const router = useRouter();
  const isLogin = useIsLoginStore(state => state.isLogin);

  useEffect(() => {
    if (pageType === 'my' && !isLogin) {
      router.push('/sign');
    }
  }, [isLogin]);

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
                <div
                  key={`${event?.date}_${idx}`}
                  className={clsx(styles['day-event-wrapper'], {
                    [styles['last-child']]: idx + 1 === eventsByDate.length,
                  })}
                >
                  <DayEvent
                    data={event.events}
                    date={event.date}
                    pageType={pageType}
                  />
                </div>
              );
            })}
            {pageType === 'my' && (
              <div className={styles['create-button']}>
                <CreateRoundButton />
              </div>
            )}
          </>
        ) : (
          <EmptyEvent pageType={pageType} />
        )}
      </div>
    );
  }
}
