import {Button} from '@/components/ui/button';

export default async function SignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <Button
        variant="default"
        size="lg"
        className="h-[56px] w-[120px] rounded-[100px] bg-[#7E51FD] p-2 text-[12px]"
      >
        Glimpse
      </Button>
      <div className="w-[350px] rounded-[16px] px-5 py-10 shadow-[0px_0px_9px_0px_#00000033]">
        {children}
      </div>
    </div>
  );
}
