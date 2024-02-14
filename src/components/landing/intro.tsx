import {introBox, introData} from '@/lib/contents';
import {IntroCard} from '@/components/landing/intro-card';
import Image from 'next/image';
import {cn} from '@/lib/utils';

export default function Intro() {
  return (
    <div className="flex flex-col items-center justify-center mt-[100px] mb-[250px]">
      {introData.map(intro => (
        <IntroCard key={intro.id} {...intro} />
      ))}
      <div className="flex flex-row items-center gap-8 mt-14">
        {introBox.map(box => (
          <div
            key={box.img}
            className="relative flex flex-col gap-5 p-10 bg-[#F7F7F7] rounded-[40px] w-[270px] h-[350px]"
          >
            <h3 className="font-semibold text-[22px]">{box.title}</h3>
            <p className="text-[16px]">{box.desc}</p>
            <Image
              src={box.img}
              alt="box"
              width={226}
              height={76}
              className={cn(
                'absolute w-[150px] my-1 mx-auto left-[50%] translate-x-[-50%]',
                box.img === '/box03.png' ? 'bottom-10' : 'bottom-4'
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
