'use client';
import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {useEventDetail, useMyEventList} from '@/hooks/swr/useEvents';

import RsvpFormBuilder from './sections/RsvpFormBuilder/RsvpFormBuilder';
import NotHostPage from './components/NotHostPage/NotHostPage';

export default function RsvpFormBuilderPage() {
  const pathname = usePathname();
  const pathnameList = pathname?.split('/');
  const eventHandle = pathnameList?.[pathnameList.length - 3];
  const myEvents = useMyEventList(100); // {data, error, isLoading}
  const {data} = useEventDetail(eventHandle); // {data, error, isLoading}
  const [eventId, setEventId] = useState(0);

  useEffect(() => {
    if (data?.data?.id) {
      setEventId(data.data.id);
    }
  }, [data]);
  const isHost =
    myEvents.data?.data?.filter(item => item.handle === eventHandle).length > 0;

  return (
    <>
      {isHost && <RsvpFormBuilder eventId={eventId} />}
      {!isHost && <NotHostPage />}
    </>
  );
}
