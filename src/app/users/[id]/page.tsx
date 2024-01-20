'use client';

import Container from '@/components/Container/Container';
import styles from './page.module.scss';
import {useEffect, useState} from 'react';
import {profileApi} from '@/network/api';
import {IProfileCard, profile} from '@/types/profileType';
import UserProfile from './components/UserProfile/UserProfile';
import IntroCard from './components/IntroCard/IntroCard';
import AboutMeCard from './components/AboutMeCard/AboutMeCard';
import ConnectCard from './components/ConnectCard/ConnectCard';
import HashTagCard from './components/HashTagCard/HashTagCard';

export default function Users({params}: {params: {id: string}}) {
  const [profileCards, setProfileCards] = useState<IProfileCard[]>([]);
  const [userProfile, setUserProfile] = useState<profile>({
    id: 0,
    firstName: '',
    lastName: '',
    displayName: '',
    profileImageUrl: '',
    introSnippet: '',
    department: '',
    location: '',
    belong: '',
    viewCount: 0,
  });

  useEffect(() => {
    profileApi.getUserOther(Number(params.id)).then(res => {
      const {cards, ...other} = res;
      setProfileCards(cards);
      setUserProfile(other);
    });
  }, []);

  return (
    <Container>
      <div className={styles['user-container']}>
        <section>
          <UserProfile profile={userProfile} />
        </section>
        <section className={styles['content-section']}>
          <IntroCard cards={profileCards} />
        </section>
        <section className={styles['content-section']}>
          <AboutMeCard cards={profileCards} />
        </section>
        <section className={styles['content-section']}>
          <ConnectCard cards={profileCards} />
        </section>
        <section className={styles['content-section']}>
          <HashTagCard cards={profileCards} />
        </section>
      </div>
    </Container>
  );
}
