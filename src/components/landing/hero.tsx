import {Button} from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="mt-[100px] flex flex-col items-center justify-center sm:mt-[250px]">
      <div className="relative flex flex-col items-center justify-center gap-5 text-center">
        <h1 className="text-[24px] font-bold sm:text-[70px]">
          이벤트 생애주기의 모든 접점을
          <br />
          글림스와 함께하세요.
        </h1>
        <p className="text-[12px] sm:text-[22px]">
          GLIMPSE는 10X 더 효율적인 이벤트 경험을
          <br className="hidden max-sm:block" /> 제공하는 올인원 서비스입니다.
        </p>
        <Button
          variant="secondary"
          size="lg"
          className="mt-6 bg-black text-white hover:bg-black/75"
        >
          데모요청하기
        </Button>
      </div>
      <Image
        src="/assets/landing/hero-bg.png"
        alt="hero-bg"
        width={1400}
        height={900}
        className="absolute left-[50%] top-[600px] hidden translate-x-[-50%] xl:block"
      />
      <Image
        src="/assets/landing/hero-img.png"
        alt="hero"
        width={720}
        height={724}
        className="mt-[100px]"
      />
      <div className="mt-[150px] flex flex-col items-center justify-center gap-12 max-sm:text-center">
        <h2 className="text-[24px] font-bold sm:text-[44px]">
          전 세계 수백만 명이 매일 사용하는 GLIMPSE
        </h2>
        <div className="flex items-center gap-10 max-sm:w-screen">
          <Image
            src="/assets/landing/s01.png"
            alt="s01"
            width={110}
            height={33}
          />
          <Image
            src="/assets/landing/s02.png"
            alt="s02"
            width={110}
            height={33}
          />
          <Image
            src="/assets/landing/s03.png"
            alt="s03"
            width={110}
            height={33}
          />
        </div>
      </div>
    </div>
  );
}
