'use client';
import isTokenValid from '@/utils/isTokenValid';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (isTokenValid()) {
      router.replace('/glimpse-list');
    } else {
      router.replace('sign');
    }
  }, []);
  return <div></div>;
}
