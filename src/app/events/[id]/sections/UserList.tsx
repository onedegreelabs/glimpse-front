'use client';

import styles from './userList.module.scss';
import {useEffect, useState} from 'react';
import BoxView from '../components/BoxView';
import SearchWrapper from '../components/SearchWrapper';
import FilteringWrapper from '../components/FilteringWrapper';
import {eventUserDataType} from '@/types/eventTypes';

export default function UserList({
  eventUserData,
}: {
  eventUserData: eventUserDataType[];
}) {
  const [userList, setUserList] = useState<eventUserDataType[]>([]);
  useEffect(() => {
    if (eventUserData) {
      setUserList(eventUserData);
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
    if (keyword !== '') {
      const filtered = userList.filter(data => {
        const fullName = data?.user?.familyName + ' ' + data?.user?.givenName;
        return fullName.includes(keyword);
      });
      setUserListForRender(filtered);
    } else {
      setUserListForRender(userList);
    }
    setSerachWord(keyword);
  };

  return (
    <>
      <div className={styles['control-section-wrapper']}>
        <section className={styles['search-area']}>
          <p className={styles['list-title']}>
            Participants <span>{userListForRender.length}</span>
          </p>
          <SearchWrapper onSearch={onSearch} searchWord={searchWord} />
        </section>
        <div className={styles['divider']} />
        <FilteringWrapper />
      </div>
      <div className={styles['user-list-wrapper']}>
        <section className={styles['view-area']}>
          <BoxView userList={userListForRender} />
        </section>
      </div>
    </>
  );
}
