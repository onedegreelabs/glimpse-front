import styles from './actionHeader.module.scss';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {IProfile} from '@/types/profileType';
import CircleImage from '@/containers/my/profile/components/CircleImage/CircleImage';

const DEFAULT_IMG_URL = '/assets/profile/temp-glimpse-list-img.jpg';

interface Props {
  profile: IProfile;
}

function ActionHeader({profile}: Props) {
  const router = useRouter();

  return (
    <section className={styles['profile-section']}>
      <div className={styles['profile-image-wrapper']}>
        <CircleImage
          src="/assets/profile/caret-left.svg"
          alt="뒤로가기"
          width={32}
          height={32}
          isAbsolute={false}
          onClick={() => router.back()}
        />
        <div className={styles['profile-image']}>
          <Image
            src={profile.profileImageUrl || DEFAULT_IMG_URL}
            alt="프로필사진"
            width={120}
            height={120}
          />
        </div>
        <CircleImage
          src="/assets/profile/share-box.svg"
          alt="공유버튼"
          width={20}
          height={20}
          isAbsolute={false}
        />
      </div>
    </section>
  );
}

export default ActionHeader;
