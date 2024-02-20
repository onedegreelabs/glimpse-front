'use client';
import styles from './index.module.scss';
import {useEffect, useState} from 'react';

import {profileApi} from '@/services/api';
import {IProfile} from '@/types/profileType';
import {DEFAULT_PROFILE} from '../my/profile/constans/defaultValue';
import {
  AboutMe,
  ActionHeader,
  Connect,
  HashTag,
  Intro,
  Profile,
} from '@/components/profile';

// TODO: 전역상태 설정한후 모두 바꿔야함
const ProfilesContainer = () => {
  ///// Profile /////
  const [profile, setProfile] = useState<IProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    profileApi.getUserMe().then(res => {
      setProfile(res);
      //   getCardsByType(res.cards);
    });
  }, []);

  return (
    <div className={styles['profile-container']}>
      <ActionHeader profile={profile} />
      <Profile profile={profile} />
      <Intro
        cards={[
          {
            id: 0,
            type: 'INTROTITLE',
            content: ['리팩토링중'],
            isVisible: true,
            color: '#FFFFFF',
          },
          {
            id: 0,
            type: 'INTROCAREER',
            content: ['일단 더미데이터 테스트중'],
            isVisible: true,
            color: '#FFFFFF',
          },
        ]}
      />
      <AboutMe
        cards={[
          {
            id: 0,
            type: 'ABOUTME',
            content: ['UI테스트중'],
            isVisible: true,
            color: '#FFFFFF',
          },
        ]}
      />
      <Connect
        cards={[
          {
            id: 0,
            type: 'LINK',
            content: ['http://github.com/monii', 'instagram.com/monii'],
            isVisible: true,
            color: '#FFFFFF',
          },
        ]}
      />
      <HashTag
        cards={[
          {
            id: 0,
            type: 'HASHTAG',
            content: [
              '강아지',
              '고양이',
              '강아지',
              '고양이',
              '강아지',
              '고양이',
              '강아지',
              '고양이',
              '강아지',
              '고양이',
              '강아지',
              '고양이',
            ],
            isVisible: true,
            color: '#FFFFFF',
          },
        ]}
      />
    </div>
  );
};

export default ProfilesContainer;
