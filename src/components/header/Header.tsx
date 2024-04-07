'use client';
import {useProfileStore} from '@/stores/profile';
import styles from './header.module.scss';
import {useEffect} from 'react';
import {useMyProfile} from '@/hooks/swr/useProfiles';
import {getAccessTokenByRefreshToken, logout} from '@/services/api';
import {useIsLoginStore} from '@/stores/auth';
export default function Header() {
  const setProfile = useProfileStore(state => state.setProfile);
  const profile = useProfileStore(state => state.profile);
  const {data, error} = useMyProfile();
  const setIsLogin = useIsLoginStore(state => state.setIsLogin);
  useEffect(() => {
    if (data?.statusCode === 200) {
      setProfile(data.data);
    }
  }, [profile, data]);
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

  // // 로그아웃 기능 추가 시 아래 코드 사용
  // const clearUserIdStorage = useProfileStore.persist.clearStorage;

  return (
    <div className={styles['header-wrapper']}>
      <div
        className={styles['text-area']}
        onClick={() => {
          logout();
        }}
      >
        로그아웃
      </div>
    </div>
  );
}
