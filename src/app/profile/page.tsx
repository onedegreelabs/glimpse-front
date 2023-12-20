'use client';

import CircleImage from './components/CircleImage/page';
import styles from './page.module.scss';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {profileApi} from '@/network/api';
import {ICombinedDataItem, IProfile, IProfileCard} from '@/types/profileType';
import {useState, useEffect} from 'react';
import IconText from '@/components/IconText/page';
import FloatingButton from './components/FloatingButton/page';
import CardSection from './CardSection';
import {section} from './const/profile';

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<IProfile>();
  const [combinedData, setCombinedData] = useState<ICombinedDataItem[]>([]);

  const goToBack = () => {
    router.back();
  };

  // NOTE: 이게 좋은 것인지 모르겠다.
  // 데이터 형태는 어떻게 주는 것이 좋은 것일까?
  // 화면용 card 데이터로 전처리
  const rebuildCard = (cards: IProfileCard[]): IProfileCard[][] => {
    const itroContent = cards.slice(0, 2);
    const aboutContent = [cards[2]];
    const linkContent = [cards[3]];
    const hashTagContent = [cards[4]];

    const rebuild = [itroContent, aboutContent, linkContent, hashTagContent];

    return rebuild;
  };
  const combineDataWithCard = (card: IProfileCard[]) => {
    const rebuildCards = rebuildCard(card);
    const combinedData = section.map((section, index) => {
      const newSection = {...section, content: rebuildCards[index]};
      return newSection;
    });
    setCombinedData(combinedData);
  };

  const getContentIndex = (title: string, id: number): number => {
    if (title === 'Intro') {
      return id - 1;
    } else {
      return 0;
    }
  };

  const updateCardContent = (
    oldContents: IProfileCard[],
    id: number,
    content: string
  ): IProfileCard[] => {
    const newContents = oldContents.map(oldContent => {
      if (oldContent.id === id) {
        return {...oldContent, content: [content]};
      }
      return oldContent;
    });

    return newContents;
  };

  const updateCard = (title: string, id: number, updatedContent: string) => {
    // const index = getContentIndex(title, id);
    const updatedCombineData = combinedData.map(data => {
      const oldContents = data.content;
      const updatedCards = updateCardContent(oldContents, id, updatedContent);
      return {...data, content: [...updatedCards]};
    });
    console.log('updatedCombineData', updatedCombineData);
    setCombinedData(updatedCombineData);
  };

  useEffect(() => {
    profileApi.getUserMe().then(res => {
      setProfile(res);
      combineDataWithCard(res.cards);
    });
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
      <section className={styles['profile-card-section']}>
        {combinedData.length > 0 && (
          <CardSection
            cardSectionItems={combinedData}
            updateCard={updateCard}
          />
        )}
      </section>
      <FloatingButton />
    </div>
  );
}
