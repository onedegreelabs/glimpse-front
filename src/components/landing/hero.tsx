import {Button} from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="flex flex-col mt-[250px] items-center justify-center">
      <div className="relative flex flex-col gap-5 text-center items-center justify-center">
        <h1 className="font-bold text-[70px]">
          이벤트 생애주기의 모든 접점을
          <br />
          글림스와 함께하세요.
        </h1>
        <p className="text-[22px]">
          GLIMPSE는 10X 더 효율적인 이벤트 경험을 제공하는 올인원 서비스입니다.
        </p>
        <Button
          variant="secondary"
          size="lg"
          className="bg-black text-white hover:bg-black/75 mt-6"
        >
          데모요청하기
        </Button>
      </div>
      <Image
        src="/hero-bg.png"
        alt="hero-bg"
        width={1400}
        height={900}
        className="absolute top-[600px] left-[50%] translate-x-[-50%]"
      />
      <Image
        src="/hero-img.png"
        alt="hero"
        width={720}
        height={724}
        className="mt-[100px]"
      />
      <div className="mt-[150px] flex flex-col gap-12 items-center justify-center">
        <h2 className="font-bold text-[44px]">
          전 세계 수백만 명이 매일 사용하는 GLIMPSE
        </h2>
        <div className="flex items-center gap-10">
          <Image src="/s01.png" alt="s01" width={110} height={33} />
          <Image src="/s02.png" alt="s02" width={110} height={33} />
          <Image src="/s03.png" alt="s03" width={110} height={33} />
        </div>
      </div>
    </div>
  );
}
