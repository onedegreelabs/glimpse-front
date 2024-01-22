'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import clsx from 'clsx';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import CoverPhoto from './CoverPhoto';
import {Glimpse, dummyGlimpses} from './mock/glimpses';
import IconText from '@/components/IconText/page';
import SelectBox from '@/components/SelectBox/page';
import BoxView from './BoxView';
import GridView from './GridView';
import ListView from './ListView';
import Container from '@/components/Container/Container';
import {glimpseList} from '@/network/api';

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
  GIRD: 'grid',
  LIST: 'list',
} as const;

export type ViewType = (typeof ViewTypes)[keyof typeof ViewTypes];

export default function Glimpselist() {
  const searchParams = useSearchParams();

  const eventId = Number(searchParams?.get('eventId'));
  const [eventType, setEventType] = useState('');
  const [eventVisibility, setEventVisibility] = useState('');
  const [coverImgUrl, setCoverImgUrl] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [viewCount, setViewCount] = useState('');

  const getEventData = async (id: number) => {
    const res = await glimpseList.getEventList(id);
    if (res?.data?.data) {
      setEventType(res.data.data.type);
      setEventVisibility(res.data.data.visibility);
      setCoverImgUrl(res.data.data.coverImageUrl);
      setEventTitle(res.data.data.title);
      setViewCount(res.data.data.viewCount);
    }
    return res?.data?.data;
  };
  const getEventUserData = async (id: number) => {
    const res = await glimpseList.getEventUserList(id);
    if (res?.data?.data) {
      // console.log('eventUserList!');
      // console.log(res.data.data);
      // setGlimpses(res.data.data);
    }
  };

  // console.log('dummy!');
  // console.log(dummyGlimpses);
  useEffect(() => {
    setGlimpses(dummyGlimpses);
  }, [dummyGlimpses]);

  useEffect(() => {
    if (eventId) {
      getEventData(eventId);
      getEventUserData(eventId);
    }
  }, [eventId]);

  const [glimpses, setGlimpses] = useState<Glimpse[]>([]);
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

  const onChangeView = (viewType: ViewType): void => {
    setToggleVIew(viewType);
  };

  // TODO: API 연결 필요
  // TODO: URL 쿼리스트링 연결 필요
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyword = e.target.value;
    const filtered = dummyGlimpses.filter(data => data.name.includes(keyword));
    setGlimpses(filtered);
    setSerachWord(keyword);
    // searchParams.set('search', keyword);
    // router.replace(`${pathname}?${params.toString()}`);
  };

  // TODO: transition 효과가 제대로 작동하지 않음
  const onClickMore = () => {
    setOpenMore(!openMore);
  };

  // TODO: URL 쿼리스트링 연결 필요
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prevFilters => ({...prevFilters, [filterType]: value}));
  };

  return (
    <Container>
      <div className={styles['glimpse-list-wrapper']}>
        <section className={styles['header-content-area']}>
          <CoverPhoto
            eventType={eventType}
            eventVisibility={eventVisibility}
            coverImgUrl={coverImgUrl}
            eventTitle={eventTitle}
            viewCount={viewCount}
          />
          <section className={styles['event-info-area']}>
            <div className={styles['event-page-link-wrapper']}>
              <Link
                className={styles['page-link']}
                href={'https://www.saasstudygroup.xyz/'}
              >
                https://www.saasstudygroup.xyz/
              </Link>
            </div>
            <div className={styles['event-info-top-wrapper']}>
              <div className={styles['event-date-wrapper']}>
                <IconText
                  src={'/assets/glimpse-list/calendar-icon.svg'}
                  alt={'달력 아이콘'}
                  width={24}
                  height={24}
                  text={'2023/12/13'}
                />
                <IconText
                  src={'/assets/glimpse-list/clock-icon.svg'}
                  alt={'시계 아이콘'}
                  width={24}
                  height={24}
                  text={'8:00 PM (EST)'}
                />
              </div>
              <div>
                <IconText
                  src={'/assets/glimpse-list/location-icon.svg'}
                  alt={'위치 아이콘'}
                  width={24}
                  height={24}
                  text={'Seoul, Korea'}
                />
              </div>
            </div>
            <div className={styles['event-content-area']}>
              <p
                className={clsx({
                  [styles['close']]: !openMore,
                  [styles['open']]: openMore,
                })}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
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
                  height={24}
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
                <button onClick={() => onChangeView('grid')}>
                  <Image
                    src={
                      toggleView === ViewTypes.GIRD
                        ? '/assets/glimpse-list/dark-grid.svg'
                        : '/assets/glimpse-list/light-grid.svg'
                    }
                    alt="그리드뷰"
                    width={22}
                    height={22}
                  />
                </button>
                <button onClick={() => onChangeView('list')}>
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
          <section
            className={clsx(styles['glimpse-area'], {
              [styles['grid-view']]: toggleView === 'grid',
            })}
          >
            {toggleView === 'box' && <BoxView glimpses={glimpses} />}
            {toggleView === 'grid' && <GridView glimpses={glimpses} />}
            {toggleView === 'list' && <ListView glimpses={glimpses} />}
          </section>
        </section>
      </div>
    </Container>
  );
}
