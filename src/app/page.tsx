'use client';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('events/discover');
  }, []);
  return <div>준비중 입니다...🙇‍♀️</div>;
}
