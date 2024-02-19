'use client';

import styles from './userList.module.scss';
import {useEffect, useState} from 'react';
import clsx from 'clsx';
import BoxView from '../components/BoxView';
import GridView from '../components/GridView';
import ListView from '../components/ListView';
import {userData} from '../type';
import eventUserListData from '../mock/mock'; //임시 데이터
export default function UserList() {
  const [userList, setUserList] = useState<userData[]>();
  const [userListForRender, setUserListForRender] = useState<userData[]>([]);
  const [toggleView, setToggleVIew] = useState('box');

  // useEffect(() => {
  //   setUserListForRender(userList);
  // }, [userList]);

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

  return (
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
  );
}
