'use client';

import styles from './middleControlSection.module.scss';
import Image from 'next/image';
import {useState} from 'react';
import SelectBox from '@/components/SelectBox/page';
import {userData} from '../type';
import Button from '@/components/button/page';

const PERSON_TYPE = [
  {value: 'all', name: 'all'},
  {value: 'host', name: 'host'},
  {value: 'speaker', name: 'speaker'},
];

const INDUSTRY = [
  {value: '프론트엔드', name: '프론트엔드'},
  {value: '백엔드', name: '백엔드'},
  {value: '디자인', name: '디자인'},
  {value: '앱', name: '앱'},
];

const HOBBY = [
  {value: '수영', name: '수영'},
  {value: '등산', name: '등산'},
  {value: '노래', name: '노래'},
];

const INTEREST = [
  {value: '개발', name: '개발'},
  {value: '여행', name: '여행'},
];

const FAVORITE = [
  {value: '과일', name: '과일'},
  {value: '빵', name: '빵'},
  {value: '게임', name: '게임'},
];

const ViewTypes = {
  BOX: 'box',
  DESKTOPGIRD: 'desktopGrid',
  MOBILEGIRD: 'mobileGrid',
  LIST: 'list',
} as const;

export type ViewType = (typeof ViewTypes)[keyof typeof ViewTypes];

export default function MiddleControlSection() {
  const [userList, setUserList] = useState<userData[]>([]);
  const [userListForRender, setUserListForRender] = useState<userData[]>([]);
  const [toggleView, setToggleVIew] = useState<ViewType>('box');
  const [openMore, setOpenMore] = useState(false);
  const [searchWord, setSerachWord] = useState('');
  const [filters, setFilters] = useState({
    personType: 'all',
    industry: '',
    hobby: '',
    interest: '',
    favorite: '',
  });

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // 검색 조건 수정 필요
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

  const onChangeView = (viewType: ViewType): void => {
    setToggleVIew(viewType);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prevFilters => ({...prevFilters, [filterType]: value}));
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
      <section className={styles['filtering-area']}>
        <SelectBox
          name="personType"
          defaultValue="all"
          options={PERSON_TYPE}
          value={filters.personType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange('personType', e.target.value)
          }
        />
        <SelectBox
          name="industry"
          defaultValue="industry"
          options={INDUSTRY}
          value={filters.industry}
          hidden
          hiddenOption={{value: 'industry', name: 'industry'}}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange('industry', e.target.value)
          }
        />
        <SelectBox
          name="hobby"
          defaultValue="hobby"
          options={HOBBY}
          value={filters.hobby}
          hidden
          hiddenOption={{value: 'hobby', name: 'hobby'}}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange('hobby', e.target.value)
          }
        />
        <SelectBox
          name={'interest'}
          defaultValue={'interest'}
          options={INTEREST}
          value={filters.interest}
          hidden
          hiddenOption={{value: 'interest', name: 'interest'}}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange('interest', e.target.value)
          }
        />
        <SelectBox
          name={'favorite'}
          defaultValue={'favorite'}
          options={FAVORITE}
          value={filters.favorite}
          hidden
          hiddenOption={{value: 'favorite', name: 'favorite'}}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange('favorite', e.target.value)
          }
        />
      </section>
    </div>
  );
}
