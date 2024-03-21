import styles from './index.module.scss';

import {TProfile} from '@/types/profileType';
import {
  AboutMe,
  ActionHeader,
  Connect,
  HashTag,
  Intro,
  Profile,
} from '@/components/profile';
import {getUserOther} from '@/services/profile';

const getProfilesFetch = async (id: number): Promise<TProfile> => {
  const result = await getUserOther(id);
  return {...result, isOtherProfile: true, isChangeProfile: false};
};

const ProfilesContainer = async () => {
  // TODO: api 연결 테스트
  // const profile = await getProfilesFetch(1);

  return (
    <div className={styles['profile-container']}>
      <ActionHeader
        profile={{
          id: 1,
          firstName: '테',
          lastName: '스트',
          displayName: '없어질수도',
          profileImageUrl: '',
          introSnippet: '하이',
          department: '개발자',
          location: '서울',
          belong: '글림스',
          viewCount: 0,
          cards: [],
          isOtherProfile: true,
          isChangeProfile: false,
        }}
      />
      <Profile
        profile={{
          id: 1,
          firstName: '테',
          lastName: '스트',
          displayName: '없어질수도',
          profileImageUrl: '',
          introSnippet: '하이',
          department: '개발자',
          location: '서울',
          belong: '글림스',
          viewCount: 0,
          cards: [],
          isOtherProfile: true,
          isChangeProfile: false,
        }}
      />
      <Intro isOtherProfile={true} />
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
