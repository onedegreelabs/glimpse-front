'use client';
import UserList from './sections/UserList';
import TopBanner from './sections/TopBanner';
import EventInfo from './sections/EventInfo';
import styles from './page.module.scss';
import {useEventDetail, useEventUser} from '@/hooks/swr/useEvents';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
export default function EventDetailPage() {
  const pathname = usePathname();
  const pathnameList = pathname?.split('/');
  const eventHandle = pathnameList?.[pathnameList.length - 1];
  const {data} = useEventDetail(eventHandle);
  const [eventId, setEventId] = useState(0);

  useEffect(() => {
    if (data?.data?.id) {
      setEventId(data.data.id);
    }
  }, [data]);

  const {data: eventUserData} = useEventUser(eventId);
  return (
    <div className={styles['page-wrapper']}>
      <TopBanner
        viewCount={data?.data?.viewCounts}
        eventType={data?.data?.type}
        eventTitle={data?.data?.title}
        coverImage={data?.data?.coverImage}
      />
      <EventInfo eventDetailData={data?.data} />
      <UserList eventUserData={eventUserData?.data} />
    </div>
  );
}
