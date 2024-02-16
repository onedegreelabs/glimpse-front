import Header from '@/components/Header/page';

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
