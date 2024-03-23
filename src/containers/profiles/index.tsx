import styles from './index.module.scss';

import {TempPropfile} from '@/types/profileType';
import {
  AboutMe,
  ActionHeader,
  Connect,
  HashTag,
  Intro,
  Profile,
} from '@/components/profile';
import {getUserOther} from '@/services/profile';

interface UserIdProps {
  id: string;
}

const getProfilesFetch = async (id: number): Promise<TempPropfile> => {
  const result = await getUserOther(id);
  const profile: TempPropfile = {
    ...result.data,
    isOtherProfile: true,
    isChangeProfile: false,
  };
  return profile;
};

const ProfilesContainer = async ({id}: UserIdProps) => {
  const profile = await getProfilesFetch(Number(id));

  return (
    <div className={styles['profile-container']}>
      <ActionHeader profile={profile} />
      <Profile profile={profile} />
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
