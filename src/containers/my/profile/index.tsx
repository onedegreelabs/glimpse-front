'use client';
import styles from './index.module.scss';
import {useEffect, useState} from 'react';
import {getCookie} from 'cookies-next';

import AddInput from './components/AddInput/AddInput';
import FloatingButton from './components/FloatingButton/FloatingButton';
import SaveButton from './components/SaveButton/SaveButton';
import {
  AboutMe,
  ActionHeader,
  Connect,
  HashTag,
  Intro,
  Profile,
} from '@/components/profile';
import {useProfileStore} from '@/stores/profile';

interface Props {
  isShowAddInput: boolean;
  addTarget: string;
  setIsShowAddInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyProfileContainer = ({
  isShowAddInput,
  addTarget,
  setIsShowAddInput,
}: Props) => {
  const {profile} = useProfileStore();

  useEffect(() => {
    // 쿠키에서 액세시 토큰 가져오기
    const myCookies = document.cookie;
    console.log(myCookies);
    const accessToken = getCookie('accessToken');
    console.log('get cookie', accessToken);
    const cookieData = document.cookie;
    console.log('cookieData', cookieData);
    // const decoded = jwtDecode(accessToken);
    // console.log('decoded', decoded);
  }, []);

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
      <Intro isOtherProfile={profile.isOtherProfile} />
      <AboutMe cards={[]} isOtherProfile={profile.isOtherProfile} />
      <Connect cards={[]} isOtherProfile={false} />
      <HashTag cards={[]} isOtherProfile={false} />
      <div className={styles['floating-button-container']}>
        <FloatingButton onClickShowAddInput={onClickShowAddInput} />
      </div>
      {profile.isChangeProfile && (
        <div className={styles['save-button-wrapper']}>
          <SaveButton />
        </div>
      )}
      {isShowAddInput && (
        <AddInput
          currentTarget={addTarget}
          onClickAddContent={onClickAddContent}
          setIsShowAddInput={setIsShowAddInput}
        />
      )}
    </div>
  );
};

export default MyProfileContainer;
