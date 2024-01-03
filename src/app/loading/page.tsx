'use client';

import getQueryString from '@/utils/getQueryString';
import _ from 'lodash';
import {useRouter} from 'next/navigation';
export default function Loading() {
  const url = window.location.href;
  const query = getQueryString(url);
  const accessToken = _.get(query, 'at');
  const refreshToken = _.get(query, 'rt');
  const router = useRouter();

  if (accessToken && refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    router.push('/glimpse-list');
  }
  return <div>loading</div>;
}
