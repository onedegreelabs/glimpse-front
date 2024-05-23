'use client';
import UserList from './sections/UserList';
import TopBanner from './sections/TopBanner';
import EventInfo from './sections/EventInfo';
import CardModal from './components/CardModal';
import styles from './page.module.scss';
import {
  useEventDetail,
  useEventUser,
  useMyEventList,
} from '@/hooks/swr/useEvents';
import {useEffect, useState} from 'react';

export default function EventDetailPage() {
  const eventHandle = 'rocketmixerseoul';
  const {data} = useEventDetail('rocketmixerseoul');
  const [eventId, setEventId] = useState(0);
  const myEvents = useMyEventList(100); // // host 판별 임시 API(API 나오기 전)
  const [modal, setModal] = useState({id: 0, isOpen: false});

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

  function onCloseModal() {
    setModal(prev => ({...prev, isOpen: false}));
  }
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
        setModal={setModal}
      />
      {modal.isOpen && (
        <CardModal
          userId={modal.id}
          eventUserData={eventUserData?.data}
          onCloseModal={onCloseModal}
        />
      )}
    </div>
  );
}
