import CircleImage from '@/app/profile/CircleImage';
import styles from './userProfile.module.scss';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import IconText from '@/components/ui/icon-text';
import {profile} from '@/types/profileType';

interface UserProfileProps {
  profile: profile;
}

export default function UserProfile({profile}: UserProfileProps) {
  const router = useRouter();
  const goToBack = () => {
    router.back();
  };

  return (
    <>
      <div className={styles['profile-image-wrapper']}>
        <button onClick={goToBack}>
          <CircleImage
            src="/assets/profile/caret-left.svg"
            alt="뒤로가기"
            width={32}
            height={32}
            isAbsolute={false}
          />
        </button>
        <div className={styles['profile-image']}>
          <Image
            src={
              profile.profileImageUrl === null
                ? '/assets/profile/temp-glipse-list-img.jpg'
                : profile.profileImageUrl
            }
            alt="프로필사진"
            width={120}
            height={120}
          />
        </div>
        <button>
          <CircleImage
            src="/assets/profile/share-box.svg"
            alt="공유버튼"
            width={20}
            height={20}
            isAbsolute={false}
          />
        </button>
      </div>
      <div className={styles['profile-info-wrapper']}>
        <p className={styles['name']}>{`${
          profile.displayName !== null
            ? profile.displayName
            : `${profile.firstName} ${profile.lastName}`
        }`}</p>
        <p>{profile.introSnippet}</p>
        <div className={styles['company-wrapper']}>
          <p className={styles['company-department']}>{profile.department}</p>
          <p className={styles['divider']}>|</p>
          <p>{profile.belong}</p>
        </div>
        <IconText
          src="/assets/glimpse-list/location-icon.svg"
          alt="위치아이콘"
          width={24}
          height={24}
          text={profile.location || ''}
        />
      </div>
    </>
  );
}
