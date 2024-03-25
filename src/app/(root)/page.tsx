'use client';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/events/discover');
  }, []);
  return <div>메인페이지를 지정해주세요.</div>;
}
