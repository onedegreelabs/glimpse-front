'use client';

import Link from 'next/link';
import styles from './page.module.scss';
import {usePathname, useRouter} from 'next/navigation';
import {useSearchParams} from 'next/navigation';
import {ChangeEvent, useEffect, useState} from 'react';
import List from './components/List/page';
import Grid from './components/Grid/page';
import Compact from './components/Compact/page';
import CoverPhoto from './components/CoverPhoto/page';
import {Glimpse, dummyGlimpses} from './mock/glimpses';
import IconText from '@/components/IconText/page';
import SelectBox from '@/components/SelectBox/page';

const ALL = [
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
  LIST: 'list',
  GIRD: 'grid',
  COMPACT: 'compact',
} as const;

export type ViewType = (typeof ViewTypes)[keyof typeof ViewTypes];

export default function Glimpselist() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [glimpses, setGlimpses] = useState<Glimpse[]>([]);
  const [toggleView, setToggleVIew] = useState<ViewType>('list');
  const [searchWord, setSerachWord] = useState('');

  const onChangeView = (viewType: ViewType): void => {
    setToggleVIew(viewType);
  };

  // TODO: API 연결 필요
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyword = e.target.value;
    const filtered = dummyGlimpses.filter(data => data.name.includes(keyword));
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    const params = new URLSearchParams(searchParams);
    setGlimpses(filtered);
    setSerachWord(keyword);
    params.set('search', keyword);
    router.replace(`${pathname}?${params.toString()}`);
  };

  //

  useEffect(() => {
    setGlimpses(dummyGlimpses);
  }, []);

  return (
    <div className={styles['glimpse-list-wrapper']}>
      <section className={styles['header-content-area']}>
        <CoverPhoto />
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
            <span>
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
            </span>
          </div>
        </section>
      </section>
      <section className={styles['body-content-area']}>
        <section className={styles['search-area']}>
          <div className={styles['search-wrapper']}>
            <input
              type="text"
              placeholder="search..."
              onChange={onSearch}
              value={searchWord}
            />
            <img src="/assets/glimpse-list/search-icon.svg" alt="검색 아이콘" />
          </div>
          <div className={styles['grid-icon-wrapper']}>
            <button onClick={() => onChangeView('list')}>1</button>
            <button onClick={() => onChangeView('grid')}>2</button>
            <button onClick={() => onChangeView('compact')}>3</button>
          </div>
        </section>
        <div className={styles['divider']} />
        <section className={styles['filtering-area']}>
          <SelectBox
            name="all"
            defaultValue="all"
            options={ALL}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              console.log(e.target.value)
            }
          />
          <SelectBox
            name="industry"
            defaultValue="industry"
            options={INDUSTRY}
            hidden
            hiddenOption={{value: 'industry', name: 'industry'}}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              console.log(e.target.value)
            }
          />
          <SelectBox
            name="hobby"
            defaultValue="hobby"
            options={HOBBY}
            hidden
            hiddenOption={{value: 'hobby', name: 'hobby'}}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              console.log(e.target.value)
            }
          />
          <SelectBox
            name={'interest'}
            defaultValue={'interest'}
            options={INTEREST}
            hidden
            hiddenOption={{value: 'interest', name: 'interest'}}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              console.log(e.target.value)
            }
          />
          <SelectBox
            name={'favorite'}
            defaultValue={'favorite'}
            options={FAVORITE}
            hidden
            hiddenOption={{value: 'favorite', name: 'favorite'}}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              console.log(e.target.value)
            }
          />
        </section>
        <section className={styles['glimpse-area']}>
          {toggleView === 'list' && <List glimpses={glimpses} />}
          {toggleView === 'grid' && <Grid glimpses={glimpses} />}
          {toggleView === 'compact' && <Compact glimpses={glimpses} />}
        </section>
      </section>
    </div>
  );
}
