'use client';
import {useProfileStore} from '@/stores/profile';
import styles from './header.module.scss';
import {useEffect, useState} from 'react';
import {useMyProfile} from '@/hooks/swr/useProfiles';
import {getAccessTokenByRefreshToken, logout} from '@/apis/signApi';
import {useIsLoginStore} from '@/stores/auth';
import {useRouter} from 'next/navigation';
import {useSession, signIn, signOut} from 'next-auth/react';
import {customAxios} from '@/apis/headers';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const setProfile = useProfileStore(state => state.setProfile);
  const profile = useProfileStore(state => state.profile);
  const {data, error} = useMyProfile();
  const setIsLogin = useIsLoginStore(state => state.setIsLogin);
  const isLogin = useIsLoginStore(state => state.isLogin);
  const {status, data: session} = useSession(); // 구글 로그인

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

  const moveToPage = (page: string) => {
    router.push(`/${page}`);
    setShowSetting(false);
  };

  const [showSetting, setShowSetting] = useState<boolean>(false);

  //
  useEffect(() => {
    if (session?.idToken) {
      const fetchToken = async () => {
        try {
          const {data} = await customAxios.get('/auth/token', {
            headers: {
              Authorization: `Bearer ${session.idToken}`,
            },
          });
          if (data) {
            window.location.href = '/';
          }
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      };
      fetchToken();
    }
  }, [session]);
  //
  console.log(session);
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles['header-top']}>
        <Image
          alt="glimpse-logo"
          src={'/icons/header/glimpse_logo.svg'}
          width={124}
          height={24}
          onClick={() => {
            moveToPage('/');
          }}
        />
        {/* 인증 된 경우 */}
        {status === 'authenticated' && (
          <div>
            {/* Hello !<Link href="/api/auth/signout">Sign Out</Link> */}
            <button onClick={() => signOut()}>SignOut</button>
          </div>
        )}
        {/* 인증 되지 않은 경우 */}
        {status === 'unauthenticated' && (
          // <Link href="/api/auth/signin">Google Login</Link>
          <button onClick={() => signIn()}>SignIn</button>
        )}
        <Image
          alt="open-menu-icon"
          src={'/icons/burger.svg'}
          width={24}
          height={24}
          onClick={() => {
            setShowSetting(!showSetting);
          }}
        />
      </div>
      {showSetting && (
        <div className={styles['setting-wrapper']}>
          {/* <div className={styles['devidor']} /> */}
          <div
            className={styles['row-wrapper']}
            onClick={() => {
              moveToPage('my/profile');
            }}
          >
            <Image
              alt="my-profile"
              src={'/icons/header/my-profile.svg'}
              width={20}
              height={20}
            />
            <p>My profile</p>
          </div>
          <div className={styles['row-wrapper']}>
            <Image
              alt="bookmark"
              src={'/icons/header/bookmark-icon.svg'}
              width={20}
              height={20}
            />
            <p>Bookmark</p>
          </div>
          <div className={styles['row-wrapper']}>
            <Image
              alt="host-page"
              src={'/icons/header/host-page.svg'}
              width={20}
              height={20}
            />
            <p>Host page</p>
          </div>
          <div className={styles['row-wrapper']}>
            <Image
              alt="language"
              src={'/icons/header/language.svg'}
              width={20}
              height={20}
            />
            <p>Language</p>
          </div>
          {/* <div className={styles['devidor']} /> */}
          {/* 아래 주석은 아직 개발이 안된 페이지라 주석처리 */}
          {/* <div className={styles['row-wrapper']}>
            <Image
              alt="setting"
              src={'/icons/header/setting.svg'}
              width={20}
              height={20}
            />
            <p>Setting</p>
          </div>
          <div className={styles['row-wrapper']}>
            <Image
              alt="share-feedback"
              src={'/icons/header/share-feedback.svg'}
              width={20}
              height={20}
            />
            <p>Share feedback</p>
          </div>
          <div className={styles['row-wrapper']}>
            <Image
              alt="customer-service"
              src={'/icons/header/customer-service.svg'}
              width={20}
              height={20}
            />
            <p>Customer service</p>
          </div>
          <div className={styles['devidor']} /> */}
          {/* <div className={styles['sign-row']}>
            <p className={styles['user-mail']}>{profile?.email}</p>
          </div> */}
        </div>
      )}
    </div>
  );
}
