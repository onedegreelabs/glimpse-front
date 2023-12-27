'use client';

import CircleImage from './components/CircleImage/page';
import styles from './page.module.scss';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {profileApi} from '@/network/api';
import {
  ILinkImg,
  IProfile,
  IProfileCard,
  IProfileUpdate,
} from '@/types/profileType';
import {useState, useEffect, ChangeEvent} from 'react';
import IconText from '@/components/IconText/page';
import FloatingButton from './components/FloatingButton/page';
import Card from '@/components/Card/page';
import SaveButton from './SaveButton';
import AddInput from './components/AddInput/AddInput';
import clsx from 'clsx';
import {linkImg} from './const/profile';

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
    content: '',
    isVisible: true,
    color: '#FFFFFF',
  });
  const [introCareer, setIntroCareer] = useState<IProfileCard>({
    id: 0,
    type: 'INTROCAREER',
    content: '',
    isVisible: true,
    color: '#FFFFFF',
  });
  const [aboutMe, setAboutMe] = useState<IProfileCard>({
    id: 0,
    type: 'ABOUTME',
    content: '',
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
  const [isShowAddInput, setIsShowAddInput] = useState(false);
  const [addTarget, setAddTarget] = useState('LINK');

  const goToBack = () => {
    router.back();
  };

  const getCardsByType = (cards: IProfileCard[]) => {
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].type === 'INTROTITLE') setIntroTitle(cards[i]);
      if (cards[i].type === 'INTROCAREER') setIntroCareer(cards[i]);
      if (cards[i].type === 'ABOUTME') setAboutMe(cards[i]);
      if (cards[i].type === 'LINK') setConnects(cards[i]);
      if (cards[i].type === 'HASHTAG') setHashTags(cards[i]);
    }
  };

  const getConnectImg = (connectUrl: string): ILinkImg => {
    const filteredLinkImg = linkImg.filter(link =>
      connectUrl.includes(link.alt)
    );

    return filteredLinkImg.length === 0
      ? {alt: 'link', src: '/icons/link_icon.svg'}
      : filteredLinkImg[0];
  };

  const changeBelong = (e: ChangeEvent<HTMLInputElement>) => {
    const newBelong = e.target.value;
    setProfile({...profile, belong: newBelong});
  };

  const changeItroTitleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setIntroTitle({...introTitle, content: newContent});
  };

  const changeItroCareerContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setIntroCareer({...introCareer, content: newContent});
  };

  const changeAboutMeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setAboutMe({...aboutMe, content: newContent});
  };

  const changeConnectContent = (content: string) => {
    const prevConnect = connects.content === null ? [] : [...connects.content];
    const newConnect = content;

    setConnects({...connects, content: [...prevConnect, newConnect]});
  };

  const handleSave = () => {
    const {firstName, lastName, profileImageUrl, viewCount, ...rest} = profile;
    const updateCards = [introTitle, introCareer, aboutMe, connects, hashTags];
    const updateProfile: IProfileUpdate = {
      profileImage: profile.profileImageUrl,
      data: {
        ...rest,
        cards: updateCards,
      },
    };
    setIsSaving(true);
    profileApi.updateUserMe(updateProfile).then(() => setIsSaving(false));
  };

  const onClickShowAddInput = (target: 'LINK' | 'HASHTAG') => {
    setIsShowAddInput(true);
    setAddTarget(target);
    document.body.style.overflow = 'hidden';
  };

  const onClickAddContent = (value: string) => {
    const content = value;
    if (content === '') {
      alert('추가 할 내용을 입력해주세요✍️');
      return;
    }
    if (addTarget === 'LINK') {
      changeConnectContent(content);
      setIsShowAddInput(false);
    }
  };

  useEffect(() => {
    profileApi.getUserMe().then(res => {
      setProfile(res);
      getCardsByType(res.cards);
    });
  }, [isSaving]);

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
            <p className={styles['company-department']}>{profile.department}</p>
            <p className={styles['divider']}>|</p>
            <input
              className={styles['company-name']}
              placeholder="company"
              value={profile.belong}
              onChange={changeBelong}
              maxLength={20}
            />
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
                value={introTitle.content || ''}
                onChange={changeItroTitleContent}
              />
            </div>
          </Card>
          <Card height={168} width={168}>
            <div className={styles['content']}>
              <textarea
                placeholder="add title..."
                value={introCareer.content || ''}
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
                value={aboutMe.content || ''}
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
        <div
          className={clsx(
            styles['content-wrapper'],
            styles['link-content-wrapper']
          )}
        >
          {connects.content === null ? (
            <Card height={64} width={340}>
              <div className={styles['link-content']}>
                <div />
                <button onClick={() => onClickShowAddInput('LINK')}>
                  link add...
                </button>
              </div>
            </Card>
          ) : (
            Array.isArray(connects.content) &&
            connects.content.map((connect, index) => {
              const connectImg = getConnectImg(connect);
              return (
                <Card height={64} width={340} key={`conent-${index}`}>
                  <div className={styles['link-content']}>
                    <Image
                      src={connectImg.src}
                      alt={connectImg.alt}
                      width={32}
                      height={32}
                    />
                    <span>{connect}</span>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </section>
      <section className={styles['content-section']}>
        <div className={styles['title']}>
          <span> Hashtag of interest </span>
        </div>
        <div className={styles['content-wrapper']}>
          <Card height={358} width={340}>
            <div className={styles['content']}>
              {hashTags.content === null ? (
                <textarea placeholder="Add your interests..." />
              ) : (
                Array.isArray(hashTags.content) &&
                hashTags.content.map((tag, index) => (
                  <div key={`hashTag-${index}`}>{tag}</div>
                ))
              )}
            </div>
          </Card>
        </div>
      </section>
      <FloatingButton onClickShowAddInput={onClickShowAddInput} />
      <div className={styles['save-button-wrapper']}>
        <SaveButton isSaving={isSaving} onSave={handleSave} />
      </div>
      {isShowAddInput && (
        <AddInput
          onClickAddContent={onClickAddContent}
          setIsShowAddInput={setIsShowAddInput}
        />
      )}
    </div>
  );
}
