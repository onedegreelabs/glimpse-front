'use client';

import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {cn} from '@/lib/utils';

type IntroCardType = {
  intro: string;
  subIntro: string;
  title: string;
  title2?: string;
  subTitle?: string;
  img: string;
  img2?: string;
};

export function IntroCard({
  intro,
  subIntro,
  title,
  title2,
  subTitle,
  img,
  img2,
}: IntroCardType) {
  const [viewType, setViewType] = useState('D');

  return (
    <div className="mt-[100px]">
      <div className="flex w-screen flex-col items-center justify-center sm:w-full">
        <div className="flex w-full flex-col gap-5 whitespace-pre-line text-center sm:w-[800px]">
          <h3 className="text-[24px] font-bold sm:text-[44px]">{intro}</h3>
          <p className="text-[12px] sm:text-[22px]">{subIntro}</p>
        </div>
      </div>
      {img2 ? (
        <div className="flex w-screen items-center justify-center gap-[116px] max-sm:flex-col sm:w-full">
          <div className="mt-12 max-h-[400px] w-full overflow-hidden rounded-[40px] bg-[#F7F7F7] p-10 sm:w-[420px]">
            <div className="flex flex-col items-start justify-center gap-5 text-left">
              <h3 className="text-[16px] font-semibold sm:text-[22px]">
                {title}
              </h3>
            </div>
            <Image
              src={img}
              alt="intro-card"
              width={500}
              height={1000}
              className="mt-10"
            />
          </div>
          <div className="mt-12 max-h-[400px] w-full overflow-hidden rounded-[40px] bg-[#F7F7F7] p-10 sm:w-[420px]">
            <div className="flex flex-col items-start justify-center gap-5 text-left">
              <h3 className="text-[14px] font-semibold sm:text-[22px]">
                {title2}
              </h3>
            </div>
            <Image
              src={img2}
              alt="intro-card"
              width={500}
              height={1000}
              className="mt-10"
            />
          </div>
        </div>
      ) : (
        <div className="flex w-screen items-center justify-center sm:w-full">
          <div className="mt-12 w-full rounded-[40px] bg-[#F7F7F7] p-10 sm:w-[880px]">
            <div className="flex flex-col items-start justify-center gap-5 text-left">
              <h3 className="text-[16px] font-semibold sm:text-[22px]">
                {title}
              </h3>
              <p className="text-[14px] sm:text-[22px]">{subTitle}</p>
            </div>
            <Image
              src={
                img === '/assets/landing/intro05.png' ||
                '/assets/landing/intro06.png'
                  ? viewType === 'D'
                    ? '/assets/landing/intro05.png'
                    : '/assets/landing/intro06.png'
                  : img
              }
              alt="intro-card"
              width={1200}
              height={1000}
              className="mt-10"
            />
            {title === 'GLIMPSE 페이지' && (
              <div className="mt-8 flex w-full items-center justify-center gap-5">
                <Button
                  variant="outline"
                  size="default"
                  className={cn(
                    'h-[45px] w-[130px]',
                    viewType === 'D' ? 'bg-[#DEDEDE]' : 'bg-transparent'
                  )}
                  onClick={() => setViewType('D')}
                >
                  데스크탑
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className={cn(
                    'h-[45px] w-[130px]',
                    viewType === 'M' ? 'bg-[#DEDEDE]' : 'bg-transparent'
                  )}
                  onClick={() => setViewType('M')}
                >
                  모바일
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
