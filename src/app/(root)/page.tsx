'use client';
import {useRouter} from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  router.push('events/discover');
  return <div>준비중 입니다...🙇‍♀️</div>;
}
