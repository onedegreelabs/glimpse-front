'use client';

import Link from 'next/link';
import styles from './page.module.scss';
import glimpseMock from './mock';
import Card from '@/components/Card/page';
import Avatar from '@/app/glimpse-list/components/Avatar/page';
import Image from 'next/image';
import Chip from '@/components/Chip/page';

// NOTE: 아이콘 + 텍스트는 추후 공통컴포넌트로 대체
// NOTE: select box 추구 공통컴포넌트로 대체

export default function Glimpselist() {
  return (
    <div className={styles['glimpse-list-wrapper']}>
      <section className={styles['header-content-area']}>
        <div className={styles['event-thumbnail-wrapper']}>
          <img
            className={styles['event-thumbnail']}
            src="/assets/glimpse-list/temp-glimpse-list-img.jpg"
            alt="이벤트 썸네일"
          />
        </div>
        <section className={styles['event-info-area']}>
          <div className={styles['event-info-top-wrapper']}>
            <div className={styles['event-date-wrapper']}>
              <div className={styles['event-info-with-icon-wrapper']}>
                <img
                  className={styles['icon']}
                  src="/assets/glimpse-list/calendar-icon.svg"
                  alt="달력 아이콘"
                />
                <span>2023/12/13</span>
              </div>
              <div className={styles['event-info-with-icon-wrapper']}>
                <img
                  className={styles['icon']}
                  src="/assets/glimpse-list/clock-icon.svg"
                  alt="시계 아이콘"
                />
                <span>8:00 PM (EST)</span>
              </div>
            </div>
            <div className={styles['event-info-with-icon-wrapper']}>
              <img
                className={styles['icon']}
                src="/assets/glimpse-list/location-icon.svg"
                alt="위치 아이콘"
              />
              <span>Seoul, Korea</span>
            </div>
          </div>
          <div className={styles['event-middle-area']}>
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
          <div className={styles['event-bottom-area']}>
            <div className={styles['event-page-link-wrapper']}>
              <Link
                className={styles['page-link']}
                href={'https://www.saasstudygroup.xyz/'}
              >
                https://www.saasstudygroup.xyz/
              </Link>
            </div>
          </div>
        </section>
      </section>
      <section className={styles['body-content-area']}>
        <section className={styles['search-area']}>
          <div className={styles['search-wrapper']}>
            <input type="text" placeholder="search..." />
            <img src="/assets/glimpse-list/search-icon.svg" alt="검색 아이콘" />
          </div>
          <div className={styles['grid-icon-wrapper']}>
            <div>1</div>
            <div>2</div>
            <div>2</div>
          </div>
        </section>
        <div className={styles['divider']} />
        <section className={styles['filtering-area']}>
          <select className={styles['filtering']} name="all" defaultValue="all">
            <option value="all" disabled hidden>
              all
            </option>
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
          {glimpseMock.glimpses.map(data => (
            <Card key={data.id}>
              <div className={styles['glimpse-card-wrapper']}>
                <div className={styles['card-header']}>
                  <img src="/assets/glimpse-list/bookmark-icon.svg" />
                </div>
                <div className={styles['profile-wrapper']}>
                  <div>
                    <div className={styles['event-info-with-icon-wrapper']}>
                      <Image
                        className={styles['icon']}
                        src="/assets/glimpse-list/location-icon.svg"
                        alt="위치 아이콘"
                        width={24}
                        height={24}
                      />
                      <span>Seoul, Korea</span>
                    </div>
                    <p className={styles['profile-name']}>{data.name}</p>
                    <div className={styles['position-wrapper']}>
                      {data.position.map((d: string, index: number) => (
                        <Chip
                          key={index}
                          label={d}
                          backgroundColor={index === 0 ? '#C1AEF6' : '#F3F3F3'}
                          borderRadius={4}
                        />
                      ))}
                    </div>
                  </div>
                  <Avatar
                    src="/assets/glimpse-list/avatar-img.png"
                    alt="프로필이미지"
                    height={70}
                    width={70}
                  />
                </div>
                <div>
                  <p>{data.text}</p>
                </div>
                <div className={styles['hobby-wrapper']}>
                  {data.hobby.map((d: string, index: number) => (
                    <Chip
                      key={`hobby-${index}`}
                      label={`#${d}`}
                      backgroundColor="#F3F3F3"
                      borderRadius={30}
                    />
                  ))}
                </div>
                <div></div>
              </div>
            </Card>
          ))}
        </section>
      </section>
    </div>
  );
}
