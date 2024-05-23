'use client';
import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {useEventDetail} from '@/hooks/swr/useEvents';

import RsvpFormBuilder from './sections/rsvpFormBuilder/RsvpFormBuilder';

export default function RsvpFormBuilderPage() {
  const pathname = usePathname();
  const pathnameList = pathname?.split('/');
  const eventHandle = pathnameList?.[pathnameList.length - 3] || '';
  const {data} = useEventDetail(eventHandle); // {data, error, isLoading}
  const [eventId, setEventId] = useState(0);

  useEffect(() => {
    if (data?.data?.id) {
      setEventId(data.data.id);
    }
  }, [data]);

  return <RsvpFormBuilder eventId={eventId} />;
}
