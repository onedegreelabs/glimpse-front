'use client';

import styles from './userList.module.scss';
import {useEffect, useState} from 'react';
import BoxView from '../components/BoxView';
import SearchWrapper from '../components/SearchWrapper';
import FilteringWrapper from '../components/FilteringWrapper';
import {eventUserDataType, EventDataType} from '@/types/eventTypes';
import {useRouter} from 'next/navigation';

export default function UserList({
  eventDetailData,
  eventUserData,
  isHost,
  setModal,
}: {
  eventDetailData: EventDataType;
  eventUserData: eventUserDataType[];
  isHost: boolean;
  setModal: React.Dispatch<
    React.SetStateAction<{type: string; id: number; isOpen: boolean}>
  >;
}) {
  const [userList, setUserList] = useState<eventUserDataType[]>([]);

  useEffect(() => {
    if (eventUserData) {
      const tempList = [...eventUserData];
      const hostIndex = tempList.findIndex(item => item.role === 'Organizer');
      // host를 리스트 가장 앞으로 배치
      if (hostIndex !== -1) {
        const [item] = tempList.splice(hostIndex, 1);
        tempList.unshift(item);
      }
      setUserList(tempList);
    }
  }, [eventUserData]);
  const [userListForRender, setUserListForRender] = useState<
    eventUserDataType[]
  >([]);

  useEffect(() => {
    setUserListForRender(userList);
  }, [userList]);

  const [searchWord, setSerachWord] = useState('');

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyword = e.target.value;
    console.log(keyword);
    if (keyword !== '') {
      const filtered = userList.filter(data => {
        const name = data?.user?.name || '';
        return name.includes(keyword);
      });
      setUserListForRender(filtered);
    } else {
      setUserListForRender(userList);
    }
    setSerachWord(keyword);
  };

  const router = useRouter();
  const rsvpUrl = isHost
    ? `${window.location.href}/rsvp/formbuilder`
    : `${window.location.href}/rsvp`;
  const moveToRsvp = () => {
    if (typeof window !== 'undefined') {
      router.push(rsvpUrl);
    }
  };

  return (
    <>
      <div className={styles['control-section-wrapper']}>
        {/* 로켓 믹서 전용 프로필 정보 업데이트 요청 버튼*/}
        {eventDetailData?.title === 'Rocket Mixer - Seoul' && (
          <div
            className={styles['rsvp-button']}
            onClick={() =>
              (window.location.href =
                'https://docs.google.com/forms/d/e/1FAIpQLSeYQGmuBcUXMTE9QHzgnBpyQkbhrimkGw590fJSFVALNbiQ2Q/viewform?usp=sf_link')
            }
          >
            Profile card update request
          </div>
        )}
        {eventDetailData?.title !== 'Rocket Mixer - Seoul' && (
          <div className={styles['rsvp-button']} onClick={moveToRsvp}>
            {isHost ? 'Go to Event Management' : 'RSVP Now'}
          </div>
        )}
        <section className={styles['search-area']}>
          <p className={styles['list-title']}>
            Participants <span>{userListForRender.length}</span>
          </p>
          <SearchWrapper onSearch={onSearch} searchWord={searchWord} />
        </section>
        {/* <div className={styles['divider']} />
        <FilteringWrapper /> */}
      </div>
      <div className={styles['user-list-wrapper']}>
        <section className={styles['view-area']}>
          <BoxView userList={userListForRender} setModal={setModal} />
        </section>
      </div>
    </>
  );
}
