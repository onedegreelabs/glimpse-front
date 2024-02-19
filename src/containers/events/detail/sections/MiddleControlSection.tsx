'use client';

import styles from './middleControlSection.module.scss';
import {useState} from 'react';
import {userData} from '../type';
import Button from '@/components/button/page';
import ViewIconWrapper from '../components/ViewIconWrapper';
import SearchWrapper from '../components/SearchWrapper';
import FilteringWrapper from '../components/FilteringWrapper';

export default function MiddleControlSection() {
  const [userList, setUserList] = useState<userData[]>([]);
  const [userListForRender, setUserListForRender] = useState<userData[]>([]);

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
  );
}
