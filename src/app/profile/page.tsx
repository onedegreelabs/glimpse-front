'use client';

import Card from '@/components/Card/page';
import CircleImage from './components/CircleImage/page';
import styles from './page.module.scss';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {profileApi} from '@/network/api';
import {IProfile} from '@/types/profileType';
import {useState, useEffect} from 'react';
import IconText from '@/components/IconText/page';
import FloatingButton from './components/FloatingButton/page';

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<IProfile>();

  const goToBack = () => {
    router.back();
  };

  useEffect(() => {
    profileApi.getUserMe().then(res => setProfile(res));
  }, []);

  return (
    <div className={styles['profile-container']}>
      <section className={styles['profile-section']}>
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
              src={profile?.profileImageUrl || '/assets/profile/profile.png'}
              alt="프로필사진"
              width={120}
              height={120}
            />
            <CircleImage
              src="/assets/profile/image.svg"
              alt="프로필이미지 업로드"
              width={20}
              height={20}
              isAbsolute={true}
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
          <p
            className={styles['name']}
          >{`${profile?.lastName} ${profile?.firstName}`}</p>
          <p>{profile?.introSnippet}</p>
          <div className={styles['company-wrapper']}>
            <p>{profile?.department}</p>
            {profile?.belong && (
              <>
                <p className={styles['divider']}>|</p>
                <p>{profile.belong}</p>
              </>
            )}
          </div>
          <IconText
            src="/assets/glimpse-list/location-icon.svg"
            alt="위치아이콘"
            width={24}
            height={24}
            text={profile?.location || ''}
          />
        </div>
      </section>
      <section className={styles['intro-section']}>
        <div className={styles['title']}>
          <span>Intro</span>
        </div>
        <div className={styles['content-wrapper']}>
          <Card height={168} width={168}>
            <div className={styles['content']}>
              <textarea placeholder="add title..." />
            </div>
          </Card>
          <Card height={168} width={168}>
            <div className={styles['content']}>
              <textarea placeholder="add title..." />
            </div>
          </Card>
        </div>
      </section>
      <section className={styles['about-me-section']}>
        <div className={styles['title']}>
          <span>About me</span>
        </div>
        <div className={styles['content-wrapper']}>
          <Card height={168} width={358}>
            <div className={styles['content']}>
              <textarea placeholder="Write down what you want to say..." />
            </div>
          </Card>
        </div>
      </section>
      <section className={styles['connect-section']}>
        <div className={styles['title']}>
          <span>Connect</span>
        </div>
        <div className={styles['content-wrapper']}>
          <Card height={64} width={358}>
            <div className={styles['link-content']}>
              <div />
              <input placeholder="link add..." />
            </div>
          </Card>
        </div>
      </section>
      <section className={styles['hashtag-section']}>
        <div className={styles['title']}>
          <span> Hashtag of interest </span>
        </div>
        <div className={styles['content-wrapper']}>
          <Card height={358} width={358}>
            <div className={styles['content']}>
              <textarea placeholder="Add your interests..." />
            </div>
          </Card>
        </div>
      </section>
      <FloatingButton />
    </div>
  );
}
