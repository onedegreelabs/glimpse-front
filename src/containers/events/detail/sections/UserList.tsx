'use client';

import styles from './userList.module.scss';
import {useEffect, useState} from 'react';
import BoxView from '../components/BoxView';
import {userData} from '../type';
import {eventUserListData} from '../mock/mock';
import SearchWrapper from '../components/SearchWrapper';
import FilteringWrapper from '../components/FilteringWrapper';
import {useWindowWidth} from '@/hooks/useWindowWidth';

export default function UserList() {
  const userList = eventUserListData;
  const [userListForRender, setUserListForRender] = useState<userData[]>([]);
  const [toggleView, setToggleVIew] = useState('box');

  useEffect(() => {
    setUserListForRender(userList);
  }, [userList]);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth > 768 && toggleView === 'list') {
      setToggleVIew('box');
    }
  }, [windowWidth]);

  const [searchWord, setSerachWord] = useState('');

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const filtered = userList.filter(data =>
        data.displayName.includes(keyword)
      );
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
            Participants <span>150</span>
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
