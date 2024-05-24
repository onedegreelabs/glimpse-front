'use client';
import styles from './page.module.scss';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import Card from '@/components/card/Card';
import clsx from 'clsx';

// type
import {SnsType, ProfileCardType} from '@/types/profileType';
import {usePathname} from 'next/navigation';
import {useUserProfile} from '@/hooks/swr/useProfiles';

export default function ProfilePage() {
  const pathname = usePathname();
  const pathnameList = pathname?.split('/');
  const userId = Number(pathnameList?.[pathnameList.length - 1]);
  const userProfile = useUserProfile(userId);

  // profile 정보 할당

  useEffect(() => {
    if (userProfile?.data?.data) {
      return;
    }
  }, [userProfile]);

  const TAB_ITEM_LIST = ['Profile', 'Connection', 'Activity'];
  const [tabList, setTabList] = useState([true, false, false]);
  const changeActiveTab = (idx: number) => {
    const newTabList = [false, false, false];
    newTabList[idx] = true;
    setTabList(() => newTabList);
  };

  return (
    <div className={styles['my-profile-wrapper']}>
      <div className={styles['card-wrapper']}>
        <div className={styles['card']}>
          <div className={styles['name-wrapper']}>
            <p className={styles['name-text']}>Sarah</p>
            <p className={styles['name-text']}>Kim</p>
          </div>
          <p className={styles['role-text']}>Product Manager @ XYZ</p>
        </div>
      </div>

      <div className={styles['tab-wrapper']}>
        {TAB_ITEM_LIST.map((tab, idx) => {
          return (
            <div
              key={idx}
              className={clsx(styles['tab-item'], {
                [styles['active-tab']]: tabList[idx],
              })}
              onClick={() => {
                changeActiveTab(idx);
              }}
            >
              {TAB_ITEM_LIST[idx]}
            </div>
          );
        })}
      </div>

      <div className={styles['section-title']}>About me</div>
      <div className={clsx(styles['gray-box'], styles['about-me-box'])}>
        Passionate about the product cycle, I specialize in developing
        strategies, managing complex projects/products, and leveraging data to
        drive impactful business decisions.
      </div>

      <div className={styles['section-title']}>Social</div>
      <div className={clsx(styles['gray-box'], styles['link-box'])}>
        <Image
          src={'/assets/sns-link/linkedin.svg'}
          width={32}
          height={32}
          alt="dirrble-icon"
        />
        <p>LinkdIn</p>
      </div>
      <div className={clsx(styles['gray-box'], styles['link-box'])}>
        <Image
          src={'/assets/sns-link/dribble.svg'}
          width={32}
          height={32}
          alt="dirrble-icon"
        />
        <p>Dribble</p>
      </div>

      <div className={styles['section-title']}>Experience</div>
      <div className={clsx(styles['gray-box'], styles['work-box'])}>
        <button className={styles['arrow-button']}>
          <Image
            src={'/icons/right_top_arrow.svg'}
            width={14}
            height={14}
            alt="dirrble-icon"
          />
        </button>
        <p className={styles['work-text']}>Work</p>
        <hr />
        <div className={styles['link-item']}>
          <Image
            src={'/assets/sns-link/github.svg'}
            width={32}
            height={32}
            alt="dirrble-icon"
          />
          <div className={styles['text-area']}>
            <p className={styles['title-text']}>Information Process Analyst</p>
            <p className={styles['sub-text']}>
              Developed an onboarding automation flow that acted as a blueprint
              for different departments
            </p>
          </div>
        </div>
        <div className={styles['link-item']}>
          <Image
            src={'/assets/sns-link/instagram.svg'}
            width={32}
            height={32}
            alt="dirrble-icon"
          />
          <div className={styles['text-area']}>
            <p className={styles['title-text']}>Product Strategy </p>
            <p className={styles['sub-text']}>
              Analyzed KPIs, resulting in a 17% increase in user engagement
              within three months
            </p>
          </div>
        </div>
        <div className={styles['link-item']}>
          <Image
            src={'/assets/sns-link/facebook.svg'}
            width={32}
            height={32}
            alt="dirrble-icon"
          />
          <div className={styles['text-area']}>
            <p className={styles['title-text']}>It Intern</p>
            <p className={styles['sub-text']}>
              Developed and deployed AI solutions resulting in 23% increase in
              email open rates
            </p>
          </div>
        </div>
        <div className={styles['link-item']}>
          <Image
            src={'/assets/sns-link/medium.svg'}
            width={32}
            height={32}
            alt="dirrble-icon"
          />
          <div className={styles['text-area']}>
            <p className={styles['title-text']}>Business Development Intern</p>
            <p className={styles['sub-text']}>
              Conducted competitive research to help formulate the company’s
              3-year strategy
            </p>
          </div>
        </div>
      </div>

      <div className={styles['section-title']}>Projects</div>
      <div className={clsx(styles['gray-box'], styles['project-box'])}>
        <button className={styles['arrow-button']}>
          <Image
            src={'/icons/right_top_arrow.svg'}
            width={14}
            height={14}
            alt="dirrble-icon"
          />
        </button>
        <p className={styles['work-text']}>Hackathon</p>
        <hr />
        <div className={styles['project-item']}>
          <p className={styles['project-title']}>Project 1</p>
          <div className={styles['circle-wrapper']}>
            {[0, 0, 0].map((_, idx) => {
              return <div key={idx} className={styles['round-circle']} />;
            })}
          </div>
          <div className={styles['picture-wrapper']}>
            <Image
              src={'/test/example1.jpg'}
              width={86}
              height={56}
              alt="dirrble-icon"
            />
            <Image
              src={'/test/example2.jpg'}
              width={86}
              height={56}
              alt="dirrble-icon"
            />
          </div>
        </div>
        <div className={styles['project-item']}>
          <p className={styles['project-title']}>Project 2</p>
          <div className={styles['circle-wrapper']}>
            {[0, 0].map((_, idx) => {
              return <div key={idx} className={styles['round-circle']} />;
            })}
          </div>
          <div className={styles['picture-wrapper']}>
            <Image
              src={'/test/example3.jpg'}
              width={86}
              height={56}
              alt="dirrble-icon"
            />
            <Image
              src={'/test/example4.jpg'}
              width={86}
              height={56}
              alt="dirrble-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
