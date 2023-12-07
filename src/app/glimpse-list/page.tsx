'use client';

import Link from 'next/link';
import styles from './page.module.scss';
import {usePathname, useRouter} from 'next/navigation';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import List from './components/List/page';
import Grid from './components/Grid/page';
import Compact from './components/Compact/page';
import CoverPhoto from './components/CoverPhoto/page';
import {Glimpse, dummyGlimpses} from './mock/glimpses';
import IconText from '@/components/IconText/page';

// NOTE: 아이콘 + 텍스트는 추후 공통컴포넌트로 대체
// NOTE: select box 추구 공통컴포넌트로 대체

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
          <select className={styles['filtering']} name="all" defaultValue="all">
            <option value="all" disabled hidden>
              all
            </option>
            <option value="host">host</option>
            <option value="speaker">speaker</option>
          </select>
          <select
            className={styles['filtering']}
            name="industry"
            defaultValue="industry"
          >
            <option value="industry" disabled hidden>
              industry
            </option>
            <option value="front-end">프론트엔드</option>
            <option value="back-end">백엔드</option>
            <option value="design">디자인</option>
            <option value="app">앱개발</option>
          </select>
          <select
            className={styles['filtering']}
            name="hobby"
            defaultValue="hobby"
          >
            <option value="hobby" disabled hidden>
              hobby
            </option>
            <option value="swimming">수영</option>
            <option value="song">노래</option>
            <option value="hiking">등산</option>
            <option value="run">달리기</option>
          </select>
          <select
            className={styles['filtering']}
            name="interest"
            defaultValue="interest"
          >
            <option value="interest" disabled hidden>
              interest
            </option>
            <option value="programming">개발</option>
            <option value="networking">네트워킹</option>
            <option value="travel">여행</option>
          </select>
          <select
            className={styles['filtering']}
            name="favorite"
            defaultValue="favorite"
          >
            <option value="favorite" disabled hidden>
              favorite
            </option>
            <option value="bread">빵</option>
            <option value="fruit">과일</option>
            <option value="idol">아이돌</option>
          </select>
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
