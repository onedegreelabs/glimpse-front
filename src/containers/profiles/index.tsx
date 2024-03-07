import styles from './index.module.scss';

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
import {getUserOther} from '@/services/profile';

const getProfilesFetch = async (id: number): Promise<IProfile> => {
  const result = await getUserOther(id);
  return result;
};

const ProfilesContainer = async () => {
  // TODO: api 연결 테스트
  const profile = await getProfilesFetch(1);

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
