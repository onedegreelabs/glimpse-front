import styles from './index.module.scss';

import {Profile} from '@/types/profileType';
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

const getProfilesFetch = async (id: number): Promise<Profile> => {
  const result = await getUserOther(id);
  const profile: Profile = {
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
      <Intro cards={profile.profileCard} isOtherProfile={true} />
      <AboutMe cards={profile.profileCard} isOtherProfile={true} />
      <Connect cards={profile.profileCard} isOtherProfile={true} />
      <HashTag cards={profile.profileCard} isOtherProfile={true} />
    </div>
  );
};

export default ProfilesContainer;
