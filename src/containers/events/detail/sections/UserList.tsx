'use client';

import styles from './userList.module.scss';
import {useEffect, useState} from 'react';
import clsx from 'clsx';
import BoxView from '../components/BoxView';
import GridView from '../components/GridView';
import ListView from '../components/ListView';
import {userData} from '../type';
import {eventUserListData} from '../mock/mock';
import Button from '@/components/button/Button';
import SearchWrapper from '../components/SearchWrapper';
import ViewIconWrapper from '../components/ViewIconWrapper';
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
        <div className={styles['button-wrapper']}>
          <div className={styles['rsvp-wrapper']}>
            <Button
              color={'ffffff'}
              bgColor={'7E51FD'}
              text={'RSVP'}
              width={240}
              height={44}
              clickEvent={() => {}}
            />
          </div>
          <div className={styles['share-wrapper']}>
            <Button
              color={'ffffff'}
              bgColor={'8B8B8B'}
              text={'Share'}
              width={240}
              height={44}
              clickEvent={() => {}}
            />
          </div>
        </div>
        <section className={styles['search-area']}>
          <p className={styles['list-title']}>Participant List</p>
          <div className={styles['list-setting']}>
            <SearchWrapper onSearch={onSearch} searchWord={searchWord} />
            <ViewIconWrapper />
          </div>
        </section>
        <div className={styles['divider']} />
        <FilteringWrapper />
      </div>
      <div className={styles['user-list-wrapper']}>
        <section
          className={clsx(styles['view-area'], {
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
      </div>
    </>
  );
}
