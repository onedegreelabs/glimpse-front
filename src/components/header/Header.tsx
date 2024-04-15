'use client';
import {useProfileStore} from '@/stores/profile';
import styles from './header.module.scss';
import {useEffect, useState} from 'react';
import {useMyProfile} from '@/hooks/swr/useProfiles';
import {getAccessTokenByRefreshToken, logout} from '@/apis/signApi';
import {useIsLoginStore} from '@/stores/auth';
import {useRouter} from 'next/navigation';
export default function Header() {
  const setProfile = useProfileStore(state => state.setProfile);
  const profile = useProfileStore(state => state.profile);
  const {data, error} = useMyProfile();
  const setIsLogin = useIsLoginStore(state => state.setIsLogin);
  const isLogin = useIsLoginStore(state => state.isLogin);
  useEffect(() => {
    if (data?.statusCode === 200) {
      setProfile(data.data);
      setIsLogin(true);
    }
  }, [data]);

  useEffect(() => {
    if (error?.response) {
      const status = error.response.status;
      if (status === 401) {
        getNewAccessToken();
      }
    }
  }, [error]);

  // at만료로 인해 요청 실패의 경우 리프레시 요청 해보고 이것도 실패하면 로그아웃 처리
  const getNewAccessToken = async () => {
    try {
      await getAccessTokenByRefreshToken();
    } catch (err: any) {
      if (err.response.status !== 200) {
        setIsLogin(false);
      }
    }
  };

  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (profile.email) {
      if (profile.givenName) {
        setUserName(profile.givenName);
      } else {
        setUserName('guest');
      }
    } else {
      setUserName('guest');
    }
  }, [profile]);

  const router = useRouter();

  const onLogout = () => {
    logout();
    setProfile({
      createdAt: '',
      updatedAt: '',
      id: 1,
      familyName: '',
      givenName: '',
      image: '',
      introduction: '',
      department: '',
      regionId: '',
      belong: '',
      isOtherProfile: false,
      isChangeProfile: false,
      email: '',
      role: '',
      sns: [
        {
          createdAt: '',
          updatedAt: '',
          id: 1,
          type: '',
          account: '',
        },
      ],
      authentication: {},
      profileCard: [],
      userTag: [],
    });
    setIsLogin(false);
  };

  const onLogin = () => {
    router.push('/sign');
  };

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles['text-area']}>{userName && `Hi ${userName}`}</div>

      {userName && (
        <div
          className={styles['btn-area']}
          onClick={() => {
            isLogin ? onLogout() : onLogin();
          }}
        >
          {isLogin ? '로그아웃' : '로그인'}
        </div>
      )}
    </div>
  );
}
