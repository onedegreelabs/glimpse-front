'use client';

import {useEffect, useState} from 'react';
import styles from './topInfo.module.scss';
import Link from 'next/link';
import IconText from '@/components/IconText/page';
import {clsx} from 'clsx';
import {events} from '@/network/api';
import {useSearchParams} from 'next/navigation';

export default function TopInfo() {
  const searchParams = useSearchParams();
  const eventId = Number(searchParams?.get('eventId'));

  const [eventLink, setEventLink] = useState('');
  const [startDate, setStartDate] = useState('');
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  // testCode
  useEffect(() => {
    setEventLink('www.panseung.com');
    setDescription(
      '이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!! 이벤트 설명이다~~~~~~~~~~~~~~~~ 아주 길게 쓸거야!!'
    );
    setLocation('서울 특별시 어쩌구 저쩌구 열두시 비둘기구구구');
    setTimeText('임시 타임 12시 32분');
    setDateText('임시 24년 13월 33일');
  });

  const getEventData = async (id: number) => {
    const res = await events.detail.getEventList(id);
    if (res?.data?.data) {
      setEventLink(res.data.data.link);
      setStartDate(res.data.data.startDate);
      setLocation(res.data.data.location);
      setDescription(res.data.data.description);
      setTags(res.data.data.tags);
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

  const [dateText, setDateText] = useState('');
  const [timeText, setTimeText] = useState('');

  // 렌더링에 필요한 시간 계산 로직
  useEffect(() => {
    const dateObj = new Date(startDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}/${month}/${day}`;
    const formattedTime = `${hours}:${minutes} ${
      dateObj.getHours() >= 12 ? 'PM' : 'AM'
    }`;
    setDateText(formattedDate);
    setTimeText(formattedTime);
  }, [startDate]);

  const [openMore, setOpenMore] = useState(false);
  const onClickMore = () => {
    setOpenMore(!openMore);
  };

  return (
    <section className={styles['header-content-area']}>
      <section className={styles['event-info-area']}>
        <div className={styles['event-page-link-wrapper']}>
          <Link className={styles['page-link']} href={eventLink}>
            {eventLink}
          </Link>
        </div>
        <div className={styles['event-info-top-wrapper']}>
          <div className={styles['event-date-wrapper']}>
            <IconText
              src={'/assets/glimpse-list/calendar-icon.svg'}
              alt={'달력 아이콘'}
              width={24}
              height={24}
              text={dateText}
            />
            <IconText
              src={'/assets/glimpse-list/clock-icon.svg'}
              alt={'시계 아이콘'}
              width={24}
              height={24}
              text={timeText}
            />
          </div>
          <div>
            <IconText
              src={'/assets/glimpse-list/location-icon.svg'}
              alt={'위치 아이콘'}
              width={24}
              height={24}
              text={location}
            />
          </div>
        </div>
        <div className={styles['tag-wrapper']}>
          {tags.length > 0 &&
            tags.map((tag, i) => {
              return (
                <div key={`tag_${i}`} className={styles['tag-item']}>
                  {`#${tag}`}
                </div>
              );
            })}
        </div>
        <div className={styles['event-content-area']}>
          <p
            className={clsx({
              [styles['close']]: !openMore,
              [styles['open']]: openMore,
            })}
          >
            {description}
          </p>
        </div>
        <div className={styles['more-button-wrapper']}>
          <button onClick={onClickMore}>
            <IconText
              src={
                openMore
                  ? '/assets/glimpse-list/caret-up.svg'
                  : '/assets/glimpse-list/caret-down.svg'
              }
              alt={'이벤트 설명 펼침 아이콘'}
              width={24}
              height={24}
              text={'More'}
              textWeight={600}
            />
          </button>
        </div>
      </section>
    </section>
  );
}
