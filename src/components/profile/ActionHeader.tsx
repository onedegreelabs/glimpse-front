'use client';
import styles from './actionHeader.module.scss';
import Image from 'next/image';
import {useCallback, useRef, useState} from 'react';
import {useRouter} from 'next/navigation';

import CircleImage from '@/containers/my/profile/components/CircleImage/CircleImage';
import {useProfileStore} from '@/stores/profile';
import {TProfile} from '@/types/profileType';

const DEFAULT_IMG_URL = '/assets/profile/temp-glimpse-list-img.jpg';

interface Props {
  profile: TProfile;
}

function ActionHeader({profile}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const {setProfileImage} = useProfileStore();
  const [preViewImgUrl, setPreViewImgUrl] = useState<string>(DEFAULT_IMG_URL);

  const handleImageUpload = (e: any) => {
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = e => {
      if (e.type === 'load') {
        setPreViewImgUrl(reader.result as string);
        setProfileImage(selectedFile);
      }
    };
  };

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      handleImageUpload(e);
    },
    []
  );

  return (
    <section className={styles['profile-section']}>
      <div className={styles['profile-wrapper']}>
        <CircleImage
          src="/assets/profile/caret-left.svg"
          alt="뒤로가기"
          width={32}
          height={32}
          isAbsolute={false}
          onClick={() => router.back()}
        />
        <div className={styles['profile-image-wrapper']}>
          <div className={styles['profile-image']}>
            <Image
              src={profile.image || preViewImgUrl}
              alt="프로필사진"
              width={120}
              height={120}
            />
          </div>
          {!profile.isOtherProfile && (
            <>
              <CircleImage
                src="/assets/profile/image.svg"
                alt="프로필이미지 업로드"
                width={20}
                height={20}
                isAbsolute={true}
                onClick={onUploadImageButtonClick}
              />
              <input
                style={{display: 'none'}}
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={onUploadImage}
              />
            </>
          )}
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
