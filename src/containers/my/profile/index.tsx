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
import {getUserMe as getUserMeFetch} from '@/services/profile';
import {useProfileStore} from '@/stores/profile';

// TODO: 전역상태 설정한후 모두 바꿔야함
const MyProfileContainer = () => {
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
      <Intro isOtherProfile={profile.isOtherProfile} />
      <AboutMe
        cards={[
          {
            id: 0,
            type: 'ABOUTME',
            content: ['UI테스트중'],
            isVisible: true,
            color: '#FFFFFF',
          },
        ]}
        isOtherProfile={profile.isOtherProfile}
      />
      <Connect
        cards={[
          {
            id: 0,
            type: 'LINK',
            content: ['http://github.com/monii'],
            isVisible: true,
            color: '#FFFFFF',
          },
        ]}
      />
      <HashTag
        cards={[
          {
            id: 0,
            type: 'HASHTAG',
            content: ['강아지', '고양이'],
            isVisible: true,
            color: '#FFFFFF',
          },
        ]}
      />
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
function jwtDecode(token: any) {
  throw new Error('Function not implemented.');
}
