'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import clsx from 'clsx';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import CoverPhoto from '../CoverPhoto';
import IconText from '@/components/iconText/IconText';
import BoxView from '../BoxView';
import GridView from '../GridView';
import ListView from '../ListView';
import Container from '@/components/layouts/Container';
import {UserData} from '../type';
import Button from '@/components/button/Button';
import {useEventDetail, useEventUser} from '@/hooks/swr/useEvents';

const ViewTypes = {
  BOX: 'box',
  DESKTOPGIRD: 'desktopGrid',
  MOBILEGIRD: 'mobileGrid',
  LIST: 'list',
} as const;

export type ViewType = (typeof ViewTypes)[keyof typeof ViewTypes];

export default function Glimpselist() {
  const pathname = usePathname();
  const pathnameList = pathname?.split('/');
  const eventHandle = pathnameList?.[pathnameList.length - 1];
  const [eventId, setEventId] = useState(0);
  const eventHandleLink = window.location.href;
  const [eventType, setEventType] = useState('');
  const [coverImgUrl, setCoverImgUrl] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [viewCount, setViewCount] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const [dateText, setDateText] = useState('');
  const [timeText, setTimeText] = useState('');
  const [endDateText, setEndDateText] = useState('');
  const [endTimeText, setEndTimeText] = useState('');

  useEffect(() => {
    if (startDate) {
      const kstDdateObj = new Date(startDate);
      const dateObj = new Date(kstDdateObj.getTime() - 9 * 60 * 60 * 1000);
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
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      const kstDdateObj = new Date(endDate);
      const dateObj = new Date(kstDdateObj.getTime() - 9 * 60 * 60 * 1000);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');

      const formattedDate = `${year}/${month}/${day}`;
      const formattedTime = `${hours}:${minutes} ${
        dateObj.getHours() >= 12 ? 'PM' : 'AM'
      }`;
      setEndDateText(formattedDate);
      setEndTimeText(formattedTime);
    }
  }, [endDate]);

  const {data} = useEventDetail('netflixnchili');
  useEffect(() => {
    if (data?.data) {
      const res = data.data;
      setEventType(res.type);
      setEventTitle(res.title);
      setViewCount(res.viewCounts);
      setEventLink(res.externalLink || '');
      setStartDate(res.startAt);
      setEndDate(res.endAt);
      const location = `${res.region.oneDepth} ${res.region.twoDepth} ${res.region.threeDepth}`;
      setLocation(location);
      setDescription(res.description);
    }
  }, [data]);

  const {data: eventUserData} = useEventUser(1);
  useEffect(() => {
    if (eventUserData?.data) {
      setUserList(eventUserData.data);
    }
  }, [eventUserData]);

  const [userList, setUserList] = useState<UserData[]>([]);
  const [userListForRender, setUserListForRender] = useState<UserData[]>([]);
  const [toggleView, setToggleVIew] = useState<ViewType>('box');
  const [searchWord, setSerachWord] = useState('');

  useEffect(() => {
    setUserListForRender(userList);
  }, [userList]);

  const onChangeView = (viewType: ViewType): void => {
    setToggleVIew(viewType);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const filtered = userList.filter(data => {
        const fullName = data.user.givenName + data.user.familyName;
        return fullName.includes(keyword);
      });
      setUserListForRender(filtered);
    } else {
      setUserListForRender(userList);
    }
    setSerachWord(keyword);
  };

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    return;
  }, []);

  useEffect(() => {
    if (windowWidth > 768 && toggleView === 'list') {
      setToggleVIew('box');
    }
  }, [windowWidth]);

  const onClickShare = function () {
    copyToClipboard(eventHandleLink || '');
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const [openMore, setOpenMore] = useState(false);
  const onClickMore = () => {
    setOpenMore(!openMore);
  };

  return (
    <Container>
      <div className={styles['glimpse-list-wrapper']}>
        <section className={styles['header-content-area']}>
          <CoverPhoto
            eventType={eventType}
            coverImgUrl={coverImgUrl}
            eventTitle={eventTitle}
            viewCount={viewCount}
            eventHandleLink={eventHandleLink}
          />
          <section className={styles['event-info-area']}>
            {eventLink ?? (
              <div className={styles['event-page-link-wrapper']}>
                <Link className={styles['page-link']} href={eventLink}>
                  {eventLink}
                </Link>
              </div>
            )}

            <div
              className={styles['tmp-link']}
              onClick={() => {
                window.open('https://lu.ma/funfunfun');
              }}
            >
              https://lu.ma/funfunfun
            </div>
            <div className={styles['event-info-top-wrapper']}>
              <div className={styles['event-date-wrapper']}>
                {dateText && (
                  <IconText
                    src={'/assets/glimpse-list/calendar-icon.svg'}
                    alt={'달력 아이콘'}
                    width={24}
                    height={24}
                    text={dateText}
                  />
                )}
                {timeText && (
                  <IconText
                    src={'/assets/glimpse-list/clock-icon.svg'}
                    alt={'시계 아이콘'}
                    width={24}
                    height={24}
                    text={timeText}
                  />
                )}
                {endTimeText && (
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    - {endTimeText}
                  </div>
                )}
              </div>
              <div>
                {location && (
                  <IconText
                    src={'/assets/glimpse-list/location-icon.svg'}
                    alt={'위치 아이콘'}
                    width={24}
                    height={24}
                    text={location}
                  />
                )}
              </div>
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
        <section className={styles['body-content-area']}>
          <div className={styles['button-wrapper']}>
            <div className={styles['rsvp-wrapper']}>
              <Button
                color={'ffffff'}
                bgColor={'7E51FD'}
                text={'RSVP'}
                width={240}
                height={44}
                clickEvent={() => {
                  window.open('https://lu.ma/funfunfun');
                }}
              />
            </div>
            <div className={styles['share-wrapper']}>
              <Button
                color={'7E51FD'}
                bgColor={'ffffff'}
                borderColor={'7E51FD'}
                text={'Share'}
                width={240}
                height={44}
                clickEvent={onClickShare}
              />
            </div>
          </div>
          <section className={styles['search-area']}>
            <p className={styles['list-title']}>Participant List</p>
            <div className={styles['list-setting']}>
              <div className={styles['search-wrapper']}>
                <input
                  type="text"
                  placeholder="search..."
                  onChange={onSearch}
                  value={searchWord}
                />
                <Image
                  src="/assets/glimpse-list/search-icon.svg"
                  alt="검색 아이콘"
                  width={24}
                  height={20}
                />
              </div>
              <div className={styles['grid-icon-wrapper']}>
                <button onClick={() => onChangeView('box')}>
                  <Image
                    src={
                      toggleView === ViewTypes.BOX
                        ? '/assets/glimpse-list/dark-box.svg'
                        : '/assets/glimpse-list/light-box.svg'
                    }
                    alt="박스뷰"
                    width={22}
                    height={22}
                  />
                </button>
                <button
                  onClick={() => onChangeView('desktopGrid')}
                  className={styles['desktop-grid-btn']}
                >
                  <Image
                    src={
                      toggleView === ViewTypes.DESKTOPGIRD
                        ? '/assets/glimpse-list/dark-grid.svg'
                        : '/assets/glimpse-list/light-grid.svg'
                    }
                    alt="데스크탑 그리드뷰"
                    width={22}
                    height={22}
                  />
                </button>
                <button
                  onClick={() => onChangeView('mobileGrid')}
                  className={styles['mobile-grid-btn']}
                >
                  <Image
                    src={
                      toggleView === ViewTypes.MOBILEGIRD
                        ? '/assets/glimpse-list/dark-grid.svg'
                        : '/assets/glimpse-list/light-grid.svg'
                    }
                    alt="모바일 그리드뷰"
                    width={22}
                    height={22}
                  />
                </button>
                <button
                  onClick={() => onChangeView('list')}
                  className={styles['list-view']}
                >
                  <Image
                    src={
                      toggleView === ViewTypes.LIST
                        ? '/assets/glimpse-list/dark-list.svg'
                        : '/assets/glimpse-list/light-list.svg'
                    }
                    alt="리스트뷰"
                    width={22}
                    height={22}
                  />
                </button>
              </div>
            </div>
          </section>
          <div className={styles['divider']} />
          <section
            className={clsx(styles['glimpse-area'], {
              [styles['grid-view']]: toggleView === 'desktopGrid',
            })}
          >
            {(toggleView === 'box' || toggleView === 'desktopGrid') && (
              <BoxView userList={userListForRender} />
            )}
            {toggleView === 'mobileGrid' && (
              <GridView userList={userListForRender} />
            )}
            {toggleView === 'list' && <ListView userList={userListForRender} />}
          </section>
        </section>
      </div>
    </Container>
  );
}
