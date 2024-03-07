'use client';
import styles from './profile.module.scss';

import IconText from '@/components/iconText/IconText';
import {IProfile} from '@/types/profileType';

interface Props {
  profile: IProfile;
}

function Profile({profile}: Props) {
  const {firstName, lastName, introSnippet, department, belong, location} =
    profile;

  return (
    <div className={styles['profile-info-wrapper']}>
      <p className={styles['name']}>{`${lastName} ${firstName}`}</p>
      <p>{introSnippet}</p>
      <div className={styles['company-wrapper']}>
        <p className={styles['company-department']}>{department}</p>
        <p className={styles['divider']}>|</p>
        <input
          className={styles['company-name']}
          placeholder="company"
          value={belong}
          maxLength={20}
        />
      </div>
      <IconText
        src="/assets/glimpse-list/location-icon.svg"
        alt="위치아이콘"
        width={24}
        height={24}
        text={location || ''}
      />
    </div>
  );
}

export default Profile;
