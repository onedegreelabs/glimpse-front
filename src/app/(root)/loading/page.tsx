'use client';

import {getQueryString} from '@/lib/utils';
import _ from 'lodash';
import {useRouter} from 'next/navigation';
export default function Loading() {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    const url = window.location.href;
    const query = getQueryString(url);
    const accessToken = _.get(query, 'at');
    const refreshToken = _.get(query, 'rt');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      router.push('/profile');
    }
  }
  return <div>loading</div>;
}
