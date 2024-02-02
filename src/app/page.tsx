'use client';
import {profileApi} from '@/network/api';
import _ from 'lodash';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function Home() {
  const router = useRouter();
  const getMyUserData = async function () {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/sign');
      return;
    }
    try {
      const myUserData = await profileApi.getUserMe();
      const myUserId = _.get(myUserData, 'id');
      if (myUserId) {
        router.replace('/profile');
      } else {
        router.replace('/sign');
      }
    } catch (error) {
      console.error('Error:', error);
      router.replace('/sign');
    }
  };

  useEffect(() => {
    getMyUserData();
  }, []);
  return <div></div>;
}
