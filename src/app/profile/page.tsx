'use client';

import CircleImage from './CircleImage';
import styles from './page.module.scss';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {profileApi} from '@/network/api';
import {
  GetProfileResponseDto,
  IProfileCard,
  IProfileUpdate,
} from '@/types/profileType';
import {useState, useEffect, ChangeEvent, useRef, useCallback} from 'react';
import IconText from '@/components/IconText/page';
import FloatingButton from './FloatingButton';
import Card from '@/components/Card/page';
import SaveButton from './SaveButton';
import AddInput from './components/AddInput/AddInput';
import clsx from 'clsx';
import Chip from '@/components/Chip/page';
import Container from '@/components/Container/Container';
import getConnectImg from '@/utils/getConnectImg';

const DEFAULT_IMG_URL = '/assets/profile/temp-glimpse-list-img.jpg';
export default function Profile() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [profile, setProfile] = useState<GetProfileResponseDto>({
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
    type: 'INTROCAREER',
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
  const [isShowAddInput, setIsShowAddInput] = useState(false);
  const [addTarget, setAddTarget] = useState('LINK');
  const [preViewImgUrl, setPreViewImgUrl] = useState<string>(DEFAULT_IMG_URL);
  const [imgUrl, setImgUrl] = useState<File>();

  const goToBack = () => {
    router.back();
  };

  const changeBelong = (e: ChangeEvent<HTMLInputElement>) => {
    const newBelong = e.target.value;
    setProfile({...profile, belong: newBelong});
  };

  const changeItroTitleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setIntroTitle({
      ...introTitle,
      content: [newContent],
    });
  };

  const changeItroCareerContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setIntroCareer({
      ...introCareer,
      content: [newContent],
    });
  };

  const changeAboutMeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setAboutMe({...aboutMe, content: [newContent]});
  };

  const changeConnectContent = (content: string) => {
    const prevConnect = connects.content === null ? [] : [...connects.content];
    const newConnect = content;

    setConnects({...connects, content: [...prevConnect, newConnect]});
  };

  const changeHashTagContent = (content: string) => {
    const prevHashTags = hashTags.content === null ? [] : [...hashTags.content];
    const newHashTag = content;

    setHashTags({...hashTags, content: [...prevHashTags, newHashTag]});
  };

  const handleImageUpload = (e: any) => {
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

  const handleSave = () => {
    const {firstName, lastName, profileImageUrl, viewCount, ...rest} = profile;
    const updateCards = [introTitle, introCareer, aboutMe, connects, hashTags];
    const updateProfile: IProfileUpdate = {
      profileImage: imgUrl,
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
    if (addTarget === 'HASHTAG') {
      changeHashTagContent(content);
      setIsShowAddInput(false);
    }
    document.body.style.overflow = 'unset';
  };

  const onDeleteHashTag = (index: number) => {
    let filteredHashTags: string[] = [];
    if (Array.isArray(hashTags.content)) {
      filteredHashTags = hashTags.content?.filter(
        (_, i: number) => index !== i
      );
    }
    setHashTags({...hashTags, content: filteredHashTags});
  };

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      handleImageUpload(e);
    },
    []
  );

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  useEffect(() => {
    profileApi.getUserMe().then(res => {
      setProfile(res);
      //  getCardsByType(res.cards);

      for (let i = 0; i < res.cards.length; i++) {
        if (res.cards[i].type === 'INTROTITLE') setIntroTitle(res.cards[i]);
        if (res.cards[i].type === 'INTROCAREER') setIntroCareer(res.cards[i]);
        if (res.cards[i].type === 'ABOUTME') setAboutMe(res.cards[i]);
        if (res.cards[i].type === 'LINK') setConnects(res.cards[i]);
        if (res.cards[i].type === 'HASHTAG') setHashTags(res.cards[i]);
      }
    });
  }, [isSaving]);

  return (
    <Container>
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
                  profile.profileImageUrl === null ||
                  preViewImgUrl !== DEFAULT_IMG_URL
                    ? `${preViewImgUrl}`
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
                onClick={onUploadImageButtonClick}
              />
              <input
                style={{display: 'none'}}
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={onUploadImage}
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
              <p className={styles['company-department']}>
                {profile.department}
              </p>
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
            <Card height={168}>
              <div className={styles['content']}>
                <textarea
                  placeholder="add title..."
                  value={introTitle.content || ''}
                  onChange={changeItroTitleContent}
                />
              </div>
            </Card>
            <Card height={168}>
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
            <Card height={168}>
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
            {connects.content.length === 0 ? (
              <Card height={64}>
                <div className={styles['link-content']}>
                  <div />
                  <button
                    className={styles['input-type-button']}
                    onClick={() => onClickShowAddInput('LINK')}
                  >
                    link add...
                  </button>
                </div>
              </Card>
            ) : (
              Array.isArray(connects.content) &&
              connects.content.map((connect, index) => {
                const connectImg = getConnectImg(connect);
                return (
                  <Card height={64} key={`conent-${index}`}>
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
            <Card height={358}>
              <div className={styles['content']}>
                {hashTags.content === null ? (
                  <button
                    className={styles['input-type-button']}
                    onClick={() => onClickShowAddInput('HASHTAG')}
                  >
                    Add your interests...
                  </button>
                ) : (
                  <div className={styles['hashtag-content']}>
                    {Array.isArray(hashTags.content) &&
                      hashTags.content.map((tag, index) => (
                        <Chip
                          key={`hashTag-${index}`}
                          label={tag}
                          height={24}
                          backgroundColor={'#D9D9D9'}
                          borderRadius={4}
                          onDelete={() => onDeleteHashTag(index)}
                        />
                      ))}
                  </div>
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
            currentTarget={addTarget}
            onClickAddContent={onClickAddContent}
            setIsShowAddInput={setIsShowAddInput}
          />
        )}
      </div>
    </Container>
  );
}
