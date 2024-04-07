'use client';
import {useRouter} from 'next/navigation';
import SignCard from './components/SignCard';
import {useIsLoginStore} from '@/stores/auth';
import {useEffect} from 'react';

export default function SignContainer() {
  const router = useRouter();
  const isLogin = useIsLoginStore(state => state.isLogin);

  useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, [isLogin]);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[350px] px-4 flex flex-col justify-center items-center gap-6">
        <div className="w-[110px] h-[50px] flex items-center justify-center text-white text-[12px] font-semibold bg-[#7E51FD] rounded-[100px] p-2">
          Glimpse
        </div>
        <div className="shadow-[0px_0px_9px_0px_#00000033] py-10 px-5 min-h-[280px] w-full">
          <SignCard />
        </div>
      </div>
    </div>
  );
}
