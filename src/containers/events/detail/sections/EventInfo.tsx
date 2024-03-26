import styles from './eventInfo.module.scss';
import EventDescription from '../components/EventDescription';
import {getDateTextFromDateObj, getTimeTextFromDateObj} from '@/lib/utils';
import Image from 'next/image';
import {EventDataType} from '@/types/eventTypes';
import {useEffect, useState} from 'react';
export default function EventInfo({
  eventDetailData,
}: {
  eventDetailData: EventDataType;
}) {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [dateText, setDateTimeText] = useState('');
  const [startTimeText, setStartTimeText] = useState('');
  const [endTimeText, setEndTimeText] = useState('');

  useEffect(() => {
    if (eventDetailData) {
      setDateTimeText(
        getDateTextFromDateObj(new Date(eventDetailData?.startAt))
      );
      setStartTimeText(
        getTimeTextFromDateObj(new Date(eventDetailData?.startAt))
      );
      setEndTimeText(getTimeTextFromDateObj(new Date(eventDetailData?.endAt)));
      if (eventDetailData.type === 'Offline') {
        const location = `${eventDetailData.region.oneDepth} ${eventDetailData.region.twoDepth} ${eventDetailData.region.threeDepth}`;
        setLocation(location);
      } else {
        setLocation(eventDetailData.externalLink);
      }
      setDescription(eventDetailData.description);
    }
  }, [eventDetailData]);

  return (
    <section className={styles['header-content-area']}>
      <section className={styles['event-info-area']}>
        <div className={styles['event-info-top-wrapper']}>
          <div className={styles['event-date-wrapper']}>
            <Image
              src={'/assets/glimpse-list/calendar-icon.svg'}
              alt={'달력 아이콘'}
              width={16}
              height={16}
            />
            <div>{dateText}</div>
          </div>
          <div className={styles['event-date-wrapper']}>
            <Image
              src={'/assets/glimpse-list/Clock.svg'}
              alt={'시계 아이콘'}
              width={16}
              height={16}
            />
            <div>
              {startTimeText} - {endTimeText} (KST)
            </div>
          </div>
          <div className={styles['event-date-wrapper']}>
            {eventDetailData?.type === 'Offline' ? (
              <>
                <Image
                  src={'/assets/glimpse-list/Location.svg'}
                  alt={'위치 아이콘'}
                  width={16}
                  height={16}
                />
                <div>{location}</div>
              </>
            ) : (
              <>
                <Image
                  src={'/assets/events/clip_icon.svg'}
                  alt={'위치 아이콘'}
                  width={16}
                  height={16}
                  style={{marginTop: '12px'}}
                />
                <div className={styles['external-link']}>
                  {location}
                  <div className={styles['copy-wrapper']}>
                    <Image
                      src={'/assets/events/Copy.svg'}
                      alt={'위치 아이콘'}
                      width={16}
                      height={16}
                      style={{marginBottom: '3px'}}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <EventDescription description={description} />
      </section>
    </section>
  );
}
