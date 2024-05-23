'use client';
import UserList from './sections/UserList';
import TopBanner from './sections/TopBanner';
import EventInfo from './sections/EventInfo';
import styles from './page.module.scss';
import {
  useEventDetail,
  useEventUser,
  useMyEventList,
} from '@/hooks/swr/useEvents';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
export default function EventDetailPage() {
  const pathname = usePathname();
  const pathnameList = pathname?.split('/');
  const eventHandle = pathnameList?.[pathnameList.length - 1] || '';
  const {data} = useEventDetail(eventHandle);
  const [eventId, setEventId] = useState(0);
  const myEvents = useMyEventList(100); // // host 판별 임시 API(API 나오기 전)

  // host 판별 임시 로직 (API 나오기 전)
  const isHost = myEvents.data?.data?.find(
    (item: {handle: string}) => item.handle === eventHandle
  );

  useEffect(() => {
    if (data?.data?.id) {
      setEventId(data.data.id);
    }
  }, [data]);

  const {data: eventUserData} = useEventUser(eventId, 100);
  return (
    <div className={styles['page-wrapper']}>
      <TopBanner
        viewCount={data?.data?.viewCounts}
        eventType={data?.data?.type}
        eventTitle={data?.data?.title}
        coverImage={data?.data?.coverImage}
      />
      <EventInfo eventDetailData={data?.data} />
      <UserList
        eventDetailData={data?.data}
        eventUserData={eventUserData?.data}
        isHost={isHost}
      />
    </div>
  );
}
