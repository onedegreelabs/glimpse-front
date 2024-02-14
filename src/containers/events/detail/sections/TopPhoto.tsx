'use client';

import Chip from '@/components/Chip/page';
import styles from './topPhoto.module.scss';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {events} from '@/network/api';
import {useSearchParams} from 'next/navigation';
import testImg from './test.jpg';

export default function TopPhoto() {
  const searchParams = useSearchParams();
  const eventId = Number(searchParams?.get('eventId'));

  const [eventType, setEventType] = useState('');
  const [eventVisibility, setEventVisibility] = useState('');
  const [coverImgUrl, setCoverImgUrl] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [viewCount, setViewCount] = useState('');

  const getEventData = async (id: number) => {
    const res = await events.detail.getEventList(id);
    if (res?.data?.data) {
      setEventType(res.data.data.type);
      setEventVisibility(res.data.data.visibility);
      setCoverImgUrl(res.data.data.coverImageUrl);
      setEventTitle(res.data.data.title);
      setViewCount(res.data.data.viewCount);
    }
    return res?.data?.data;
  };

  // useEffect(() => {
  //   if (eventId) {
  //     getEventData(eventId);
  //   } else {
  //     getEventData(66);
  //   }
  // }, [eventId]);

  return (
    <div className={styles['event-thumbnail-wrapper']}>
      <Image
        className={styles['event-thumbnail']}
        src={testImg}
        alt="이벤트 썸네일"
      ></Image>
      <div className={styles['event-info-wrapper']}>
        <div className={styles['info-header']}>
          <div className={styles['info-type']}>
            <Chip
              // label={eventType}
              label={'Virtual'}
              height={28}
              backgroundColor="#7E51FD"
              borderRadius={4}
            />
            <Chip
              // label={eventVisibility}
              label={'Private'}
              height={28}
              backgroundColor="#ffffff4d"
              borderRadius={4}
              isOutline
              soldColor="#e1e1e1"
            />
          </div>
          <div className={styles['share-btn-wrapper']}>
            <Image
              alt="share-icon"
              src="/icons/shareBox.svg"
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className={styles['info-middle']}>
          {/* <p>{eventTitle}</p> */}
          <p>Event Title</p>
        </div>
        <div className={styles['info-bottom']}>
          <Chip
            // label={`total view ${viewCount}`}
            label={'total view 192'}
            height={24}
            backgroundColor="#ffffff4d"
            borderRadius={4}
            isOutline
            soldColor="#e1e1e1"
          />
        </div>
      </div>
    </div>
  );
}
