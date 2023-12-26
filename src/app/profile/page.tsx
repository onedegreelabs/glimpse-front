'use client';

import CircleImage from './components/CircleImage/page';
import styles from './page.module.scss';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {profileApi} from '@/network/api';
import {IProfile, IProfileCard, IProfileUpdate} from '@/types/profileType';
import {useState, useEffect, ChangeEvent} from 'react';
import IconText from '@/components/IconText/page';
import FloatingButton from './components/FloatingButton/page';
import Card from '@/components/Card/page';
import SaveButton from './SaveButton';

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<IProfile>({
    id: 0,
    firstName: '',
    lastName: '',
    displayName: '',
    profileImageUrl: '',
    introSnippet: '',
    department: '',
    location: '',
    belong: '',
    viewCount: 0,
    cards: [],
  });
  const [introTitle, setIntroTitle] = useState<IProfileCard>({
    id: 0,
    type: 'INTROTITLE',
    content: [],
    isVisible: true,
    color: '#FFFFFF',
  });
  const [introCareer, setIntroCareer] = useState<IProfileCard>({
    id: 0,
    type: 'INTROCAREE',
    content: [],
    isVisible: true,
    color: '#FFFFFF',
  });
  const [aboutMe, setAboutMe] = useState<IProfileCard>({
    id: 0,
    type: 'ABOUTME',
    content: [],
    isVisible: true,
    color: '#FFFFFF',
  });
  const [connects, setConnects] = useState<IProfileCard>({
    id: 0,
    type: 'LINK',
    content: [],
    isVisible: true,
    color: '#FFFFFF',
  });
  const [hashTags, setHashTags] = useState<IProfileCard>({
    id: 0,
    type: 'HASHTAG',
    content: [],
    isVisible: true,
    color: '#FFFFFF',
  });
  const [isSaving, setIsSaving] = useState(false);

  const goToBack = () => {
    router.back();
  };

  const getCardsByType = (cards: IProfileCard[]) => {
    setIntroTitle(cards[0]);
    setIntroCareer(cards[1]);
    setAboutMe(cards[2]);
    setConnects(cards[3]);
    setHashTags(cards[4]);
  };

  const changeBelong = (e: ChangeEvent<HTMLInputElement>) => {
    const newBelong = e.target.value;
    setProfile({...profile, belong: newBelong});
  };

  const changeItroTitleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setIntroTitle({...introTitle, content: [newContent]});
  };

  const changeItroCareerContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setIntroCareer({...introTitle, content: [newContent]});
  };

  const changeAboutMeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setAboutMe({...introTitle, content: [newContent]});
  };

  const changeConnectContent = (e: ChangeEvent<HTMLInputElement>) => {
    const prevConnect = connects.content === null ? [] : [...connects.content];
    const newConnect = e.target.value;

    setAboutMe({...introTitle, content: [...prevConnect, newConnect]});
  };

  const handleSave = () => {
    console.log('save click');
    const {cards, ...rest} = profile;
    const updateCards = [introTitle, introCareer, aboutMe, connects, hashTags];
    const updateProfile: IProfileUpdate = {
      profileImage: profile.profileImageUrl,
      data: {
        ...rest,
        cards: updateCards,
      },
    };
    console.log('updateProfile', updateProfile);
    setIsSaving(true);
    profileApi.updateUserMe(updateProfile).then(() => setIsSaving(false));
  };

  useEffect(() => {
    profileApi.getUserMe().then(res => {
      setProfile(res);
      getCardsByType(res.cards);
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
              src={
                profile.profileImageUrl === null
                  ? '/assets/profile/temp-glimpse-list-img.jpg'
                  : profile.profileImageUrl
              }
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
          >{`${profile.lastName} ${profile.firstName}`}</p>
          <p>{profile.introSnippet}</p>
          <div className={styles['company-wrapper']}>
            <p>{profile.department}</p>
            <>
              <p className={styles['divider']}>|</p>
              <input
                className={styles['company-name']}
                placeholder="company"
                value={profile.belong}
                onChange={changeBelong}
                maxLength={20}
              />
            </>
          </div>
          <IconText
            src="/assets/glimpse-list/location-icon.svg"
            alt="위치아이콘"
            width={24}
            height={24}
            text={profile.location || ''}
          />
        </div>
      </section>
      <section className={styles['content-section']}>
        <div className={styles['title']}>
          <span>Intro</span>
        </div>
        <div className={styles['content-wrapper']}>
          <Card height={168} width={168}>
            <div className={styles['content']}>
              <textarea
                placeholder="add title..."
                value={introTitle.content?.[0] || ''}
                onChange={changeItroTitleContent}
              />
            </div>
          </Card>
          <Card height={168} width={168}>
            <div className={styles['content']}>
              <textarea
                placeholder="add title..."
                value={introCareer.content?.[0] || ''}
                onChange={changeItroCareerContent}
              />
            </div>
          </Card>
        </div>
      </section>
      <section className={styles['content-section']}>
        <div className={styles['title']}>
          <span>About me</span>
        </div>
        <div className={styles['content-wrapper']}>
          <Card height={168} width={358}>
            <div className={styles['content']}>
              <textarea
                placeholder="Write down what you want to say..."
                value={aboutMe.content?.[0] || ''}
                onChange={changeAboutMeContent}
              />
            </div>
          </Card>
        </div>
      </section>
      <section className={styles['content-section']}>
        <div className={styles['title']}>
          <span>Connect</span>
        </div>
        <div className={styles['content-wrapper']}>
          {connects.content === null ? (
            <Card height={64} width={358}>
              <div className={styles['link-content']}>
                <div />
                <input
                  placeholder="link add..."
                  value={''}
                  onChange={changeConnectContent}
                />
              </div>
            </Card>
          ) : (
            connects.content?.map((text, index) => (
              <Card height={64} width={358} key={`conent-${index}`}>
                <div className={styles['link-content']}>
                  <div />
                  <input
                    placeholder="link add..."
                    value={text}
                    onChange={changeConnectContent}
                  />
                </div>
              </Card>
            ))
          )}
        </div>
      </section>
      <section className={styles['content-section']}>
        <div className={styles['title']}>
          <span> Hashtag of interest </span>
        </div>
        <div className={styles['content-wrapper']}>
          <Card height={358} width={358}>
            <div className={styles['content']}>
              {hashTags.content === null ? (
                <textarea placeholder="Add your interests..." />
              ) : (
                hashTags.content?.map((tag, index) => (
                  <div key={`hashTag-${index}`}>{tag}</div>
                ))
              )}
            </div>
          </Card>
        </div>
      </section>
      <FloatingButton />
      <div className={styles['save-button-wrapper']}>
        <SaveButton isSaving={isSaving} onSave={handleSave} />
      </div>
    </div>
  );
}
