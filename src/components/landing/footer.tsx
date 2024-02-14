import {Button} from '@/components/ui/button';

export default function Footer() {
  return (
    <div className="w-full h-[700px] flex flex-col items-center justify-center bg-[#F5F4F3] text-center">
      <div className="flex flex-col items-center justify-center gap-12">
        <h1 className="font-bold text-[70px]">GLIMPSE 사용해보기</h1>
        <Button
          variant="secondary"
          size="lg"
          className="bg-black text-white hover:bg-black/75"
        >
          데모요청하기
        </Button>
        <div className="flex items-center gap-8 text-[12px]">
          <span>sign in</span>
          <span>about glimpse</span>
          <span>customer service</span>
          <span>share feedback</span>
        </div>
      </div>
    </div>
  );
}
