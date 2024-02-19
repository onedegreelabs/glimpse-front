'use client';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';

import { profileApi } from '@/services/api';
import { DEFAULT_PROFILE } from './constans/defaultValue';

import AddInput from './components/AddInput/AddInput';
import { IProfile } from '@/types/profileType';
import FloatingButton from './components/FloatingButton/FloatingButton';
import SaveButton from './components/SaveButton/SaveButton';
import { AboutMe, ActionHeader, Connect, HashTag, Intro, Profile } from '@/components/profile';

// TODO: 전역상태 설정한후 모두 바꿔야함
const MyProfileContainer = () => {
  ///// Profile /////
  const [profile, setProfile] = useState<IProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    profileApi.getUserMe().then((res) => {
      setProfile(res);
      //   getCardsByType(res.cards);
    });
  }, []);
  //   }, [isSaving]);

  const changeBelong = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, belong: e.target.value }));
  };

  ///// Add Link /////
  const [isShowAddInput, setIsShowAddInput] = useState(false);
  const [addTarget, setAddTarget] = useState('LINK');

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
      //   changeConnectContent(content);
      setIsShowAddInput(false);
    }
    if (addTarget === 'HASHTAG') {
      //   changeHashTagContent(content);
      setIsShowAddInput(false);
    }
    document.body.style.overflow = 'unset';
  };

  return (
    <div className={styles['my-profile-container']}>
      <ActionHeader profile={profile} />
      <Profile profile={profile} />
      <Intro
        cards={[
          {
            id: 0,
            type: 'INTROTITLE',
            content: ['리팩토링중'],
            isVisible: true,
            color: '#FFFFFF'
          },
          {
            id: 0,
            type: 'INTROCAREER',
            content: ['일단 더미데이터 테스트중'],
            isVisible: true,
            color: '#FFFFFF'
          }
        ]}
      />
      <AboutMe
        cards={[
          {
            id: 0,
            type: 'ABOUTME',
            content: ['UI테스트중'],
            isVisible: true,
            color: '#FFFFFF'
          }
        ]}
      />
      <Connect
        cards={[
          {
            id: 0,
            type: 'LINK',
            content: ['http://github.com/monii'],
            isVisible: true,
            color: '#FFFFFF'
          }
        ]}
      />
      <HashTag
        cards={[
          {
            id: 0,
            type: 'HASHTAG',
            content: ['강아지', '고양이'],
            isVisible: true,
            color: '#FFFFFF'
          }
        ]}
      />
      <div className={styles['floating-button-container']}>
        <FloatingButton onClickShowAddInput={onClickShowAddInput} />
      </div>
      <div className={styles['save-button-wrapper']}>
        <SaveButton />
      </div>
      {isShowAddInput && <AddInput currentTarget={addTarget} onClickAddContent={onClickAddContent} setIsShowAddInput={setIsShowAddInput} />}
    </div>
  );
};

export default MyProfileContainer;
