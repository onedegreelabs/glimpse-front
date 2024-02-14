import { introBox, introData } from '@/lib/contents';
import { IntroCard } from '@/components/landing/intro-card';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Intro() {
  return (
    <div className="mb-[100px] mt-[100px] flex flex-col items-center justify-center sm:mb-[250px]">
      {introData.map((intro) => (
        <IntroCard key={intro.id} {...intro} />
      ))}
      <div className="mt-14 flex flex-col items-center gap-8 sm:flex-row">
        {introBox.map((box) => (
          <div key={box.img} className="relative flex h-[350px] w-screen flex-col gap-5 rounded-[40px] bg-[#F7F7F7] p-10 sm:w-[270px]">
            <h3 className="text-[22px] font-semibold">{box.title}</h3>
            <p className="text-[16px]">{box.desc}</p>
            <Image
              src={box.img}
              alt="box"
              width={226}
              height={76}
              className={cn(
                'absolute left-[50%] mx-auto my-1 w-[150px] translate-x-[-50%]',
                box.img === '/box03.png' ? 'bottom-10' : 'bottom-4'
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
