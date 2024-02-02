import styles from './actionHeader.module.scss';
import {useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {IProfile} from '@/types/profileType';
import CircleImage from '../components/CircleImage/CircleImage';
import UploadImage from './UploadImage';

const DEFAULT_IMG_URL = '/assets/profile/temp-glimpse-list-img.jpg';

interface Props {
  profile: IProfile;
}

function ActionHeader({profile: {profileImageUrl}}: Props) {
  console.log('ActionHeader');
  const router = useRouter();

  const [preViewImgUrl, setPreViewImgUrl] = useState<string>(DEFAULT_IMG_URL);

  const [imgUrl, setImgUrl] = useState<File>();

  const handleUploadImage = (e: any) => {
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = e => {
      if (e.type === 'load') {
        setPreViewImgUrl(reader.result as string);
        setImgUrl(selectedFile);
      }
    };
  };

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
            src={
              profileImageUrl === null || preViewImgUrl !== DEFAULT_IMG_URL
                ? `${preViewImgUrl}`
                : profileImageUrl
            }
            alt="프로필사진"
            width={120}
            height={120}
          />
          <UploadImage onUploadImage={handleUploadImage} />
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
