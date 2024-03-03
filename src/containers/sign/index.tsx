import SignCard from './components/SignCard';

export default function SignContainer() {
  return (
    <div className="w-full px-4 flex flex-col justify-center items-center gap-6">
      <div className="w-[110px] h-[50px] flex items-center justify-center text-white text-[12px] font-semibold bg-[#7E51FD] rounded-[100px] p-2">
        Glimpse
      </div>
      <div className="shadow-[0px_0px_9px_0px_#00000033] py-10 px-5 min-h-[280px] w-full">
        <SignCard />
      </div>
    </div>
  );
}
