import Image from 'next/image';

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
  return (
    <div className="mt-[100px]">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-[800px] whitespace-pre-line flex flex-col gap-5 text-center">
          <h3 className="font-bold text-[44px]">{intro}</h3>
          <p className="text-[22px]">{subIntro}</p>
        </div>
      </div>
      {img2 ? (
        <div className="w-full flex items-center justify-center gap-[116px]">
          <div className="w-[420px] max-h-[400px] overflow-hidden bg-[#F7F7F7] rounded-[40px] mt-12 p-10">
            <div className="flex flex-col items-start justify-center gap-5 text-left">
              <h3 className="font-semibold text-[22px]">{title}</h3>
            </div>
            <Image
              src={img}
              alt="intro-card"
              width={500}
              height={1000}
              className="mt-10"
            />
          </div>
          <div className="w-[420px] max-h-[400px] overflow-hidden bg-[#F7F7F7] rounded-[40px] mt-12 p-10">
            <div className="flex flex-col items-start justify-center gap-5 text-left">
              <h3 className="font-semibold text-[22px]">{title2}</h3>
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
        <div className="w-full flex items-center justify-center">
          <div className="w-[880px] bg-[#F7F7F7] rounded-[40px] mt-12 p-10">
            <div className="flex flex-col items-start justify-center gap-5 text-left">
              <h3 className="font-semibold text-[22px]">{title}</h3>
              <p className="text-[22px]">{subTitle}</p>
            </div>
            <Image
              src={img}
              alt="intro-card"
              width={1200}
              height={1000}
              className="mt-10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
