import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Marquee } from '@/components/ui/marquee';

export default function LandingNavbar() {
  return (
    <div className="flex items-center justify-between p-5">
      <Image src="/assets/landing/logo.png" alt="hero-logo" width={110} height={33} className="object-cover" />
      <div className="flex items-center gap-6">
        <div className="hidden cursor-pointer items-center gap-6 sm:flex">
          <span className="text-[16px] text-[#1E1E1E]">ENG</span>
          <Separator orientation="vertical" className="h-4 w-0.5 bg-[#1E1E1E]" />
          <span className="text-[16px] text-[#1E1E1E]">KOR</span>
        </div>
        <Marquee
          data={['Request Demo', 'Contact Us']}
          className="!w-[150px] rounded-[50px] bg-[#7E51FE] p-2.5 sm:!w-[220px]"
          innerClassName="ml-16 text-white"
        />
      </div>
    </div>
  );
}
