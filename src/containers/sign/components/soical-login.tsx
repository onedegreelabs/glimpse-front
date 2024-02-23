import {Button} from '@/components/ui/button';
import {socialLoginData} from '@/lib/contents';
import {cn} from '@/lib/utils';
import Image from 'next/image';

export default function SoicalLogin() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {socialLoginData.map(social => (
        <Button
          variant="default"
          size="lg"
          className={cn(
            'flex w-full !py-2.5 items-center gap-2.5',
            social.className
          )}
        >
          <Image src={social.imgUrl} alt="social" width={18} height={18} />
          <span className="text-[16px] font-semibold">{social.text}</span>
        </Button>
      ))}
    </div>
  );
}
